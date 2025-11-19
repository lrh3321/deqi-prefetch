import { GM_xmlhttpRequest } from '$';
import { disguiseParagraphs, setupExtendLanguageSupport } from './code';
import { createSettingForm, disguiseMode, refreshInterval, setupCodeTheme } from './config';
import {
	fetchChaperFragmentPage,
	isInIframe,
	paragraphsFromElement,
	rebuildChapterBody,
	VM_log
} from './utils';
function handleBookPage() {
	VM_log('handleBookPage');

	let finished = false;
	const itemtxt = document.querySelector('.itemtxt')!;
	const spans = Array.from(itemtxt.querySelectorAll('p > span'));

	spans.forEach((span) => {
		if (span.textContent?.trim() == '已完结') {
			finished = true;
		}
	});

	const settingAnchor = document.createElement('a');
	settingAnchor.href = '/pifu/';
	settingAnchor.style.float = 'right';
	settingAnchor.style.marginRight = '0.5rem';
	settingAnchor.innerText = '脚本设置';
	itemtxt.firstElementChild!.appendChild(settingAnchor);

	if (!finished) {
		if (__LITE__) {
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
}

function handleSettingPage() {
	VM_log('handleSettingPage');
	const settingForm = createSettingForm();
	const container = document.querySelector('div.container')!;
	container.appendChild(settingForm);
}

function parseFragmentPage(doc: Document): FragmentPage {
	const container = doc.querySelector('div.container')!;
	const nestedCon = doc.querySelector('div.container .con')!;

	const paragraphs = paragraphsFromElement(nestedCon);
	const prenexts = container.querySelectorAll('div.prenext a');
	let next: HTMLAnchorElement | undefined;
	let nextChapter: HTMLAnchorElement | undefined;

	for (const element of prenexts) {
		if (element instanceof HTMLAnchorElement) {
			if (element.textContent == '下一页') {
				next = element;
				break;
			} else if (element.textContent == '下一章') {
				nextChapter = element;
				break;
			}
		}
	}

	return {
		next: next?.href,
		nextChapter: nextChapter?.href,
		paragraphs: paragraphs
	};
}

function handleChaperPage() {
	VM_log('handleChaperPage');

	const container = document.querySelector('div.container')!;
	const prenexts = container.querySelectorAll('div.prenext a');

	const con = document.querySelector('div.container .con')!;
	const paragraphs = paragraphsFromElement(con);
	con.replaceChildren(...paragraphs);

	for (const element of prenexts) {
		if (element instanceof HTMLAnchorElement) {
			if (element.textContent == '下一页') {
				void (async () => {
					let counter = 0;
					let next = await fetchChaperFragmentPage(element.href, parseFragmentPage);
					if (next.paragraphs.length === 0) {
						con.append(...(await fetchParagraphes(element.href)));
					} else {
						con.append(...next.paragraphs);
					}
					while (next.next && counter < 20) {
						counter++;
						const href = next.next;
						next = await fetchChaperFragmentPage(next.next, parseFragmentPage);
						if (next.paragraphs.length === 0) {
							con.append(...(await fetchParagraphes(href)));
						} else {
							con.append(...next.paragraphs);
						}
					}

					if (next.nextChapter) {
						element.textContent = '下一章';
						element.href = next.nextChapter;
					}

					const page = getChapterPage();
					rebuildChapterBody(page);
				})();
				break;
			} else if (element.textContent == '下一章') {
				(() => {
					const page = getChapterPage();
					rebuildChapterBody(page);
				})();
				break;
			}
		}
	}
}
export function handleDeqiRoute() {
	if (isSudugu()) {
		handleSuduguRoute();
		return;
	}

	// 设置页面处理逻辑
	if (location.pathname === '/pifu/') {
		setupCodeTheme();
		setupExtendLanguageSupport();
		handleSettingPage();
	}
	// 章节页面处理逻辑
	else if (location.pathname.endsWith('.html')) {
		// 非iframe环境下根据伪装模式设置代码主题
		if (!isInIframe) {
			switch (disguiseMode) {
				case 'code':
					setupCodeTheme();
					setupExtendLanguageSupport();
					break;
				default:
					break;
			}
		}
		handleChaperPage();
	} else if (location.pathname.startsWith('/xiaoshuo/')) {
		// 书籍主页处理逻辑
		handleBookPage();
	}
}

function handleSuduguRoute() {
	VM_log('handleSuduguRoute');
	// 设置页面处理逻辑
	if (location.pathname === '/i/pifu.aspx') {
		setupCodeTheme();
		setupExtendLanguageSupport();
		handleSettingPage();
	}
	// 章节页面处理逻辑
	else if (location.pathname.endsWith('.html')) {
		// 非iframe环境下根据伪装模式设置代码主题
		if (!isInIframe) {
			switch (disguiseMode) {
				case 'code':
					setupCodeTheme();
					setupExtendLanguageSupport();
					break;
				default:
					break;
			}
		}
		handleChaperPage();
	} else if (location.pathname.match(/\/\d+\/(p-\d+\.html)?/)) {
		// 书籍主页处理逻辑
		handleBookPage();
	}
}

export function isSudugu(): boolean {
	const hostname = location.hostname;
	return (
		hostname.endsWith('shudugu.org') ||
		hostname.endsWith('sudugu.org') ||
		hostname.endsWith('sudugu.cc') ||
		hostname.endsWith('suduguu.com') ||
		hostname.includes('sudugu')
	);
}

function getChapterPage(): Page {
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
	for (const element of prenexts) {
		if (element instanceof HTMLAnchorElement) {
			if (element.textContent == '上一章') {
				navigationBar.prevAnchor = element;
			} else if (element.textContent == '目录' || element.textContent == '章节目录') {
				navigationBar.infoAnchor = element;
			} else if (element.textContent == '下一章') {
				navigationBar.nextAnchor = element;
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
