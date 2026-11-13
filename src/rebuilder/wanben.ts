import { AbstractRebuilder, PageType } from './base';
import { disguiseParagraphs, tidyStyle } from '../common';

export class WanbenRebuilder extends AbstractRebuilder {
	public canHandle(): boolean {
		return location.hostname.endsWith('wanbenshenzhan.com');
	}
	public getPageType(): PageType {
		const { pathname } = location;
		if (pathname.endsWith('.html')) {
			return PageType.Chapter;
		}
		return PageType.Unknown;
	}
	getChapterPage(): Page {
		const con = document.querySelector('.chapter-content')!;
		con.className = '';
		const mainSection = disguiseParagraphs(con);
		const navigationBar: NavLinks = {
			prevAnchor: document.querySelector('.chapter-nav .nav-prev > a') as HTMLAnchorElement,
			infoAnchor: document.querySelector('.chapter-nav .nav-center > a') as HTMLAnchorElement,
			nextAnchor: document.querySelector('.chapter-nav .nav-next > a') as HTMLAnchorElement
		};
		const breadcrumbBar = document.querySelector('.breadcrumb')!;
		const title = document.querySelector('h1.chapter-title')?.textContent;
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
