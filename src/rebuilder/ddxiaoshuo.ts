import { AbstractPartedRebuilder, PageType } from './base';
import { disguiseParagraphs, paragraphsFromElement, createSettingForm, tidyStyle } from '../common';

function cleanupBody() {
	const children = Array.from(document.body.children).filter((it) => it.id != 'ss-reader-main');
	children.forEach((it) => {
		it.remove();
	});
}

function cleanBookPage() {
	const articleMain = document.createElement('div');
	articleMain.id = 'ss-reader-main';

	const containers = Array.from(document.body.querySelectorAll('.container'));
	containers.forEach((container) => {
		container.className = '';
		articleMain.appendChild(container);
	});
	document.body.appendChild(articleMain);
	cleanupBody();
}

/**
 * 顶点小说
 */
export class DDxs extends AbstractPartedRebuilder {
	public canHandle(): boolean {
		return location.hostname.endsWith('ddxiaoshuo.cc');
	}
	public getPageType(): PageType {
		document.body.style.display = 'flex';
		document.body.style.justifyContent = 'center';

		const segments = location.pathname.split('/').filter(Boolean);
		const lastSegment = segments[segments.length - 1];
		switch (segments.length) {
			case 0:
				document.body.style.flexDirection = 'column';
				break;
			case 1:
				if (location.pathname == '/history.html') {
					return PageType.Setting;
				}
				return PageType.Book;
			case 2:
				if (/[\d\w]+_\d+$/.test(lastSegment)) {
					// 不是章节首页
					return PageType.ChapterNext;
				}
				return PageType.Chapter;
			default:
				break;
		}
		return PageType.Unknown;
	}
	protected parseFragmentPageURL(doc: Document): PageURL {
		let next: HTMLAnchorElement | undefined;
		let nextChapter: HTMLAnchorElement | undefined;

		const element = doc.getElementById('next_url');
		if (element) {
			if (element instanceof HTMLAnchorElement) {
				if (element.textContent.includes('下一页')) {
					next = element;
				} else if (element.textContent.includes('下一章')) {
					nextChapter = element;
				}
			}
		}
		return {
			next: next?.href,
			nextChapter: nextChapter?.href
		};
	}
	protected async parseFragmentPage(doc: Document): Promise<FragmentPage> {
		const nestedCon = doc.getElementById('article')!;
		// VM_log('content', nestedCon.outerHTML);

		const paragraphs = paragraphsFromElement(nestedCon);
		return {
			...this.parseFragmentPageURL(doc),
			paragraphs
		};
	}
	handleNextPage(_doc: Document, page: FragmentPage): void {
		const con = document.getElementById('article')!;
		con.append(...page.paragraphs);
	}
	getChapterPage(): Page {
		let con = document.getElementById('article')!;
		con.className = '';
		if (con.tagName == 'ARTICLE') {
			const d = document.createElement('div');
			d.innerHTML = con.innerHTML;
			con.replaceWith(d);
			con = d;
		}
		const mainSection = disguiseParagraphs(con);
		const navigationBar: NavLinks = {
			prevAnchor: document.getElementById('prev_url') as HTMLAnchorElement | undefined,
			infoAnchor: document.getElementById('info_url') as HTMLAnchorElement | undefined,
			nextAnchor: document.getElementById('next_url') as HTMLAnchorElement | undefined
		};
		const breadcrumbBar = document.querySelector('.info-title') as HTMLElement;
		const title = document.title.split('-').shift();
		const page = {
			breadcrumbBar,
			title,
			mainSection,
			navigationBar
		};

		tidyStyle();
		return page;
	}
	protected rewriteNextChapterLink(href: string): void {
		const a = document.getElementById('next_url') as HTMLAnchorElement;
		a.textContent = '下一章';
		a.href = href;
	}
	protected override async handleBookPage() {
		cleanBookPage();
	}
	protected override async handleSettingPage() {
		const articleMain = document.getElementById('ss-reader-main')!;
		const settingForm = createSettingForm();
		articleMain.appendChild(settingForm);
	}
}
