import { GM_openInTab, GM_registerMenuCommand, GM_xmlhttpRequest } from '$';
import { AbstractPartedRebuilder, PageType } from './base';
import {
	disguiseParagraphs,
	paragraphsFromElement,
	VM_log,
	createSettingForm,
	refreshInterval
} from '../common';

async function fetchParagraphes(href: string): Promise<HTMLParagraphElement[]> {
	const u = new URL(href, location.href);
	const pathname = u.pathname;
	// /52/4662012-2.html
	const segments = pathname.split(/[/\-.]/).filter((s) => s.length > 0 && s !== 'html');

	const req = {
		method: 'GET',
		url: new URL(
			`/i/a.aspx?id=${segments[1]}&p=${segments[2]}&bid=${segments[0]}`,
			location.href
		).toString()
	};
	const p = new Promise<HTMLParagraphElement[]>((resolve, reject) => {
		GM_xmlhttpRequest({
			...req,
			onload: (response) => {
				const parser = new DOMParser();
				const s = response.responseText.replace('document.write("', '').replace('");', '');
				const realDoc = parser.parseFromString(s, 'text/html');
				resolve(paragraphsFromElement(realDoc.body));
			},
			onerror: (response) => {
				VM_log(['fetchChaperFragmentPage error', response]);
				reject(response);
			},
			ontimeout: () => {
				VM_log('fetchChaperFragmentPage timeout');
				reject('timeout');
			}
		});
	});

	return p;
}

export class Deqi extends AbstractPartedRebuilder {
	public canHandle(): boolean {
		const hostname = location.hostname;
		return (
			hostname.endsWith('shudugu.org') || hostname.includes('sudugu') || hostname.includes('deqixs')
		);
	}
	public getPageType(): PageType {
		GM_registerMenuCommand('脚本设置', function () {
			GM_openInTab(`${location.protocol}//${location.host}/history.html#script-setting`);
		});
		if (location.pathname == '/history.html') {
			return PageType.Setting;
		} else if (location.pathname.endsWith('.html')) {
			return PageType.Chapter;
		} else if (location.pathname.startsWith('/xiaoshuo/')) {
			// 书籍主页处理逻辑
			return PageType.Book;
		} else if (location.pathname.endsWith('.aspx')) {
			return PageType.Setting;
		}
		return PageType.Unknown;
	}
	protected parseFragmentPageURL(doc: Document): PageURL {
		const container = doc.querySelector('div.container')!;
		const prenexts = container.querySelectorAll('div.prenext a');
		let next: HTMLAnchorElement | undefined;
		let nextChapter: HTMLAnchorElement | undefined;

		for (const el of prenexts) {
			if (el instanceof HTMLAnchorElement) {
				if (el.textContent == '下一页') {
					next = el;
					break;
				} else if (el.textContent == '下一章') {
					nextChapter = el;
					break;
				}
			}
		}

		return {
			next: next?.href,
			nextChapter: nextChapter?.href
		};
	}
	protected async parseFragmentPage(doc: Document): Promise<FragmentPage> {
		const container = doc.querySelector('div.container')!;
		const nestedCon = container.querySelector('.con')!;
		let paragraphs = paragraphsFromElement(nestedCon);
		if (paragraphs.length == 0) {
			paragraphs = await fetchParagraphes(doc.documentElement.dataset.src!);
		}
		return {
			...this.parseFragmentPageURL(doc),
			paragraphs: paragraphs
		};
	}
	handleNextPage(_doc: Document, page: FragmentPage): void {
		if (page.paragraphs.length > 0) {
			const con = document.querySelector('div.container .con')!;
			con.append(...page.paragraphs);
		}
	}
	getChapterPage(): Page {
		const con = document.querySelector('div.container .con')!;
		con.className = '';
		con.querySelectorAll('p').forEach((p) => {
			const s = p.textContent;
			if (s.includes('官方纸飞机') || s.includes('完整章节')) {
				p.remove();
			}
		});
		const mainSection = disguiseParagraphs(con);

		const prenexts = document.querySelectorAll('div.prenext a');
		const navigationBar: NavLinks = {};
		for (const el of prenexts) {
			if (el instanceof HTMLAnchorElement) {
				if (el.textContent == '上一章') {
					navigationBar.prevAnchor = el;
				} else if (el.textContent == '目录' || el.textContent == '章节目录') {
					navigationBar.infoAnchor = el;
				} else if (el.textContent == '下一章') {
					navigationBar.nextAnchor = el;
				}
			}
		}
		const breadcrumbBar = document.querySelector('div.container > div.submenu h1')!;
		let title = breadcrumbBar
			?.querySelector('a:last-child')
			?.nextSibling?.textContent?.replace(/(^ > |（\d+ \/ \d+）$)/g, '');
		const page = {
			breadcrumbBar,
			title,
			mainSection,
			navigationBar
		};

		return page;
	}

	protected override rewriteNextChapterLink(href: string): void {
		const prenexts = document.querySelectorAll('div.prenext a');
		for (const el of prenexts) {
			if (el instanceof HTMLAnchorElement) {
				if (el.textContent == '下一页') {
					el.textContent = '下一章';
					el.href = href;
					return;
				}
			}
		}
	}
	protected override async handleBookPage(): Promise<void> {
		VM_log('handleBookPage');

		let finished = false;
		const itemtxt = document.querySelector('.itemtxt')!;
		const spans = Array.from(itemtxt.querySelectorAll('p > span'));

		spans.forEach((span) => {
			if (span.textContent?.trim() == '已完结') {
				finished = true;
			}
		});
		if (finished || __LITE__) {
			return;
		}

		const title = itemtxt.querySelector('h1>a')!.textContent;
		const latestChapter = itemtxt.querySelector('ul>li>a')!.textContent;

		const current = document.createElement('p');
		current.innerText = `当前时间：${new Date().toTimeString()}`;
		itemtxt.appendChild(current);

		document.title = `${title} - ${latestChapter}`;

		if (refreshInterval > 0) {
			const next = document.createElement('p');
			next.innerText = `刷新时间：${new Date(Date.now() + refreshInterval).toTimeString()}`;
			itemtxt.appendChild(next);

			setTimeout(() => {
				location.reload();
			}, refreshInterval);
		}
	}
	protected override async handleSettingPage(): Promise<void> {
		VM_log('handleSettingPage');
		const settingForm = createSettingForm();
		const container = document.querySelector('div.container')!;
		container.appendChild(settingForm);
	}
}
