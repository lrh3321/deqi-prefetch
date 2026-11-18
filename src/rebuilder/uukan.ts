import { AbstractRebuilder, PageType } from './base';
import { createChapterList, disguiseParagraphs, rebuildChapterBody, tidyStyle } from '../common';

/**
 * UU 看书
 */
export class UUKan extends AbstractRebuilder {
	public canHandle(): boolean {
		return location.hostname.endsWith('uukan.org');
	}
	public getPageType(): PageType {
		// https://www.uukan.org/book/1dFbOKkStaFk7Nw4I2vxDp.html
		// https://www.uukan.org/chapter/1dFbOKkStaFk7Nw4I2vxDp.html
		// https://www.uukan.org/chapter/1dFbOKkStaFk7Nw4I2vxDp/2.html
		// https://www.uukan.org/chapter/1dFbOKkStaFk7Nw4I2vxDp/cOK6S5eRaPSzXeyDxhn6n.html
		if (/\/book\/[^/]+/.test(location.pathname)) {
			return PageType.Book;
		} else if (/\/chapter\/[^/]+(\/\d+)?\.html/.test(location.pathname)) {
			return PageType.Index;
		} else if (/\/chapter\/[^/]+\/[^/]{3,}\.html/.test(location.pathname)) {
			if (document.getElementById('allchapter')) {
				return PageType.Index;
			}
			return PageType.Chapter;
		}
		return PageType.Unknown;
	}
	protected parseFragmentPageURL(doc: Document): PageURL {
		return {
			nextChapter: (doc.getElementById('linkNext') as HTMLAnchorElement | null)?.href
		};
	}
	getChapterPage(): Page {
		tidyStyle();
		const con = document.getElementById('content')!;
		con.className = '';
		con.id = '';
		con.querySelectorAll('p').forEach((p) => {
			if (p.textContent.trim().length == 0 || p.textContent.includes('本章未完')) {
				p.remove();
			}
		});
		con.querySelectorAll('img,.novelbutton,div[id]').forEach((it) => it.remove());

		const breadcrumbBar = document.querySelector('ol.breadcrumb') || undefined;
		const mainSection = disguiseParagraphs(con);

		const title = document.querySelector('h1.pt10')?.textContent;
		const navigationBar: NavLinks = {
			prevAnchor: document.getElementById('linkPrev') as HTMLAnchorElement | null,
			infoAnchor: document.getElementById('linkIndex') as HTMLAnchorElement | null,
			nextAnchor: document.getElementById('linkNext') as HTMLAnchorElement | null
		};
		const page = {
			mainSection,
			breadcrumbBar,
			title,
			navigationBar
		};

		return page;
	}

	protected override async handleBookPage(): Promise<void> {
		document.querySelectorAll('a.bookchapter, dd > a').forEach((a) => {
			if (a instanceof HTMLAnchorElement) {
				const anchor = document.createElement('a');
				anchor.innerHTML = a.innerHTML;
				anchor.href = a.href;
				anchor.title = a.title;
				a.replaceWith(anchor);
			}
		});
	}
	protected override async handleIndexPage(): Promise<void> {
		tidyStyle();

		const mainSection = createChapterList('#allchapter a[id][target="_blank"]');
		const breadcrumbBar = document.querySelector('ol.breadcrumb') || undefined;
		const navigationBar: NavLinks = {
			prevAnchor: document.getElementById('linkPrev') as HTMLAnchorElement | null,
			jump: document.getElementById('linkIndex'),
			nextAnchor: document.getElementById('linkNext') as HTMLAnchorElement | null,
			forPage: true
		};
		const page = {
			mainSection,
			breadcrumbBar,
			navigationBar
		};

		rebuildChapterBody(page);
	}
}
