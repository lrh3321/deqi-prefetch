import { disguiseParagraphs, paragraphsFromElement, tidyStyle } from '../common';
import {
	AbstractPartedRebuilder,
	navLinksFromSelector,
	nextAnchor,
	PageType,
	pageURLFromSelector
} from './base';

export { Boluomao } from './boluomao';

 
// https://www.rrssk.com/
// 可乐小说的搜索服务
// 
// https://www.bishuxsw.com/
// https://www.202book.com/
// https://www.piaohuaxs.com/
// https://www.96cbtxt.com/ 
export class RRSSK extends AbstractPartedRebuilder {
	protected parseFragmentPageURL(doc: Document): PageURL {
		return pageURLFromSelector(doc, '.readPage a, a.btnBlack');
	}
	protected async parseFragmentPage(doc: Document): Promise<FragmentPage> {
		const con = doc.querySelector('.content')!;
		let paragraphs = paragraphsFromElement(con);

		return {
			...this.parseFragmentPageURL(doc),
			paragraphs
		};
	}

	protected override rewriteNextChapterLink(href: string): void {
		const a = nextAnchor(document, '.readPage a, a.btnBlack');
		if (a && a.textContent.includes('下一页')) {
			a.textContent = '下一章';
			a.href = href;
		}
	}
	handleNextPage(_doc: Document, page: FragmentPage): void {
		const con = document.querySelector('.content');
		con?.append(...page.paragraphs);
	}
	public canHandle(): boolean {
		const { hostname } = location;
		return (
			hostname.endsWith('96cbtxt.com') ||
			hostname.endsWith('202book.com') ||
			hostname.endsWith('bishuxsw.com') ||
			hostname.endsWith('piaohuaxs.com')
		);
	}
	public getPageType(): PageType {
  		// https://www.202book.com/book/2CTS.html
  		// https://www.202book.com/book/2CTS-125.html
  		// https://www.202book.com/book/2CTS-125-2.html

		// https://www.96cbtxt.com/book/511PP.html
		// https://www.96cbtxt.com/book/511PP-101.html
		// https://www.96cbtxt.com/book/511PP-101-2.html
		const { pathname } = location;
		switch (pathname.split('-').length) {
			case 1:
				return PageType.Book;
			case 2:
				return PageType.Chapter;
			case 3:
				return PageType.ChapterNext;
		}
		return PageType.Unknown;
	}
	getChapterPage(): Page {
		const con = document.querySelector('.content')!;
		con.className = '';
		const mainSection = disguiseParagraphs(con);

		const navigationBar: NavLinks = navLinksFromSelector('.readPage a, a.btnBlack');
		const breadcrumbBar = document.querySelector('.position, .top > .conL')!;
		const title = document.querySelector('h1.title')?.textContent;
		const page = {
			breadcrumbBar,
			title,
			mainSection,
			navigationBar
		};
		tidyStyle();
		return page;
	}
}
