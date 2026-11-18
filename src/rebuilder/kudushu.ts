import { AbstractPartedRebuilder, PageType } from './base';
import { disguiseParagraphs, paragraphsFromElement, VM_log } from '../common';

/**
 * 苦读书
 */
export class Kudushu extends AbstractPartedRebuilder {
	public canHandle(): boolean {
		return location.hostname.endsWith('kudushu.org');
	}
	public getPageType(): PageType {
		if (
			/\/book\/[^/]+/.test(location.pathname) ||
			/\/html\/[^/]+\/[^/]+\/index\.html/.test(location.pathname)
		) {
			return PageType.Book;
		} else if (
			/\/html\/[^/]+\/[^/]+/.test(location.pathname) ||
			/\/html\/[^/]+\/[^/]+\/[^/]+\.html/.test(location.pathname)
		) {
			return PageType.Chapter;
		}
		return PageType.Unknown;
	}
	protected parseFragmentPageURL(doc: Document): PageURL {
		const container = doc.getElementById('novelcontent')!;
		const ul = container.querySelector('ul')!;
		// ul.remove();
		const prenexts = ul.querySelectorAll('ul li a');
		let next: HTMLAnchorElement | undefined;
		let nextChapter: HTMLAnchorElement | undefined;

		for (const el of prenexts) {
			if (el instanceof HTMLAnchorElement) {
				if (el.textContent == '下—页') {
					next = el;
					break;
				} else if (el.textContent == '下—章') {
					nextChapter = el;
					nextChapter.textContent = '下一章';
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
		const con = doc.getElementById('novelcontent');
		const paragraphs = paragraphsFromElement(con);
		return {
			...this.parseFragmentPageURL(doc),
			paragraphs
		};
	}
	handleNextPage(_doc: Document, page: FragmentPage): void {
		const con = document.getElementById('novelcontent')!;
		con.append(...page.paragraphs);
	}
	getChapterPage(): Page {
		const con = document.getElementById('novelcontent')!;
		con.className = '';
		con.id = '';
		con.querySelectorAll('p').forEach((p) => {
			if (p.textContent.trim().length == 0 || p.textContent.includes('本章未完')) {
				p.remove();
			}
		});
		con.querySelectorAll('img,.novelbutton,div[id]').forEach((it) => it.remove());

		const mainSection = disguiseParagraphs(con);

		let content_tip = document.getElementById('content_tip');
		while (content_tip) {
			content_tip.remove();
			content_tip = document.getElementById('content_tip');
		}

		const title = document.getElementById('chaptertitle')?.textContent;
		const prenexts = Array.from(document.querySelectorAll('#novelbody ul li p a')).map(
			(a) => a.cloneNode(true) as HTMLAnchorElement
		);
		const navigationBar: NavLinks = {};
		for (const el of prenexts) {
			if (el.textContent == '上一章' || el.textContent.includes('上')) {
				el.textContent = '上—章';
				navigationBar.prevAnchor = el;
			} else if (el.textContent.includes('录')) {
				el.textContent = '目录';
				navigationBar.infoAnchor = el;
			} else if (el.textContent == '下一章') {
				navigationBar.nextAnchor = el;
			} else {
				VM_log(el.outerHTML);
			}
		}
		const page = {
			mainSection,
			title,
			navigationBar
		};

		return page;
	}
	protected override rewriteNextChapterLink(href: string): void {
		const anchors = Array.from(document.querySelectorAll('#novelbody ul li p a'));
		for (const a of anchors) {
			if (a instanceof HTMLAnchorElement && a.textContent.includes('下')) {
				a.textContent = '下一章';
				a.href = href;
				break;
			}
		}
	}
}
