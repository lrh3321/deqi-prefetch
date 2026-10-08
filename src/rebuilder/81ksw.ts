import { AbstractPartedRebuilder, PageType, pageURLFromSelector } from './base';
import { disguiseParagraphs, paragraphsFromElement, tidyStyle } from '../common';

/**
 * 八一中文网
 */
export class KSW81 extends AbstractPartedRebuilder {
	public canHandle(): boolean {
		const hostname = location.hostname;
		return hostname.endsWith('81ksw.com');
	}
	public getPageType(): PageType {
		if (/\/index\/[^/]+/.test(location.pathname)) {
			return PageType.Book;
		} else if (/\/read\/[^/]+\/[^/]+/.test(location.pathname)) {
			return PageType.Chapter;
		}
		return PageType.Unknown;
	}
	protected parseFragmentPageURL(doc: Document): PageURL {
		return pageURLFromSelector(doc, '#next_url');
	}
	protected async parseFragmentPage(doc: Document): Promise<FragmentPage> {
		const nestedCon = doc.getElementById('content');
		// VM_log('content', nestedCon.outerHTML);
		const paragraphs = paragraphsFromElement(nestedCon);
		return {
			...this.parseFragmentPageURL(doc),
			paragraphs
		};
	}
	handleNextPage(_doc: Document, page: FragmentPage): void {
		const con = document.getElementById('content')!;
		con.append(...page.paragraphs);
	}
	getChapterPage(): Page {
		const con = document.querySelector('.content')!;
		con.className = '';
		const mainSection = disguiseParagraphs(con);
		const navigationBar: NavLinks = {
			prevAnchor: document.getElementById('prev_url') as HTMLAnchorElement | null,
			infoAnchor: document.getElementById('info_url') as HTMLAnchorElement | null,
			nextAnchor: document.getElementById('next_url') as HTMLAnchorElement | null
		};

		const breadcrumbBar = document.querySelector('div.layout-tit')!;
		breadcrumbBar.querySelector('.reader-fun')?.remove();
		const title = document.querySelector('h1.title')?.textContent;
		const page = {
			breadcrumbBar,
			title,
			mainSection,
			navigationBar
		};

		return page;
	}

	protected override async afterRebuilt() {
		tidyStyle();

		const ob = new MutationObserver((mutations: MutationRecord[]) => {
			mutations.forEach((mutation) => {
				if (mutation.type == 'childList') {
					mutation.addedNodes.forEach((it) => {
						if (it instanceof HTMLDivElement) {
							if (it.classList.length === 0) {
								it.remove();
							}
						}
					});
				}
			});
		});
		ob.observe(document.body, { childList: true });
	}
	protected rewriteNextChapterLink(href: string): void {
		const a = document.getElementById('next_url')! as HTMLAnchorElement;
		a.textContent = '下一章';
		a.href = href;
	}
}
