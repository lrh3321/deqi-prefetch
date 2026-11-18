import { AbstractPartedRebuilder, nextAnchor, PageType, pageURLFromSelector } from './base';
import {
	buildArticleRoot,
	createChapterListRoot,
	disguiseParagraphs,
	paragraphsFromElement,
	tidyStyle
} from '../common';

const aSelector = '.readPage a';
export class Boluomao extends AbstractPartedRebuilder {
	public canHandle(): boolean {
		const hostname = location.hostname;
		return hostname.endsWith('boluomao1.com') || hostname.endsWith('yxshufang.com');
	}
	public getPageType(): PageType {
		const { pathname, search, hash } = location;
		if (/\/book\/[^/]+/.test(pathname)) {
			if (/-\d+\.html/.test(pathname)) {
				if (location.search.includes('p=')) {
					return PageType.ChapterNext;
				}
				return PageType.Chapter;
			}
			if (hash == '#chapters' && search.includes('cp=')) {
				return PageType.Index;
			}
			return PageType.Book;
		} else if (/\/read\/[^/]+\/[^/]+/.test(pathname)) {
			if (location.search.includes('p=')) {
				return PageType.ChapterNext;
			}
			return PageType.Chapter;
		}
		return PageType.Unknown;
	}
	protected parseFragmentPageURL(doc: Document): PageURL {
		return pageURLFromSelector(doc, aSelector);
	}
	protected async parseFragmentPage(doc: Document): Promise<FragmentPage> {
		const con = doc.querySelector('.content');
		// if (!nestedCon) {
		// 	prompt('No Content');
		// 	prompt(doc.body.outerHTML);
		// }
		// VM_log('content', nestedCon.outerHTML);
		con?.querySelectorAll('p').forEach((p) => {
			if (p.dataset.obf) {
				if (!p.textContent.trim()) {
					p.append(this.decode(p.dataset.obf));
				}
			}
		});
		const paragraphs = paragraphsFromElement(con || document.createElement('div'));
		return {
			...this.parseFragmentPageURL(doc),
			paragraphs: paragraphs
		};
	}
	handleNextPage(_doc: Document, page: FragmentPage): void {
		const con = document.querySelector('.content');
		con?.append(...page.paragraphs);
		const a = nextAnchor(document, aSelector);
		if (!page.next && !page.nextChapter) {
			a?.remove();
		} else if (a) {
			a.href = page.nextChapter || page.next || a.href;
		}
	}
	getChapterPage(): Page {
		const con = document.querySelector('.content')!;
		con.className = '';
		const mainSection = disguiseParagraphs(con);

		const anchors = Array.from<HTMLAnchorElement>(document.querySelectorAll(aSelector));
		const navigationBar: NavLinks = {};
		for (const el of anchors) {
			if (el instanceof HTMLAnchorElement) {
				el.className = '';
				if (el.textContent.includes('上一')) {
					navigationBar.prevAnchor = el;
				} else if (el.textContent.includes('目录')) {
					navigationBar.infoAnchor = el;
				} else if (el.textContent.includes('下一')) {
					navigationBar.nextAnchor = el;
				}
			}
		}
		const breadcrumbBar = document.querySelector('.position')!;
		const titleEL = document.querySelector('h1.title');
		titleEL?.querySelector('.pageLabel')?.remove();
		const title = titleEL?.textContent;
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

	protected override async handleIndexPage(): Promise<void> {
		const mainSection = createChapterListRoot('#chapters li a');
		const { root, main } = buildArticleRoot({
			mainSection,
			navigationBar: {
				jump: document.querySelector('#chapters .page-range-list'),
				forPage: true
			}
		});
		main.id = 'chapters';
		main.remove();
		document.getElementById('chapters')?.remove();
		document.querySelector('.bgCon')?.remove();
		document.querySelector('.wrap')?.append(main, root);
	}

	decode(s: string): string {
		var raw = atob(s);
		var bytes = new Uint8Array(raw.length);
		for (var i = 0; i < raw.length; i++) {
			bytes[i] = raw.charCodeAt(i) ^ ((i % 127) + 1);
		}
		// 用 TextDecoder 将 UTF-8 字节数组正确解码为字符串
		return new TextDecoder('utf-8').decode(bytes);
	}
}
