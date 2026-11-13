import { GM_openInTab, GM_registerMenuCommand } from '$';
import { AbstractRebuilder, PageType } from './base';
import { disguiseParagraphs, createSettingForm, tidyStyle } from '../common';

function handleSettingPage() {
	const settingForm = createSettingForm();
	const articleMain = document.createElement('div');
	articleMain.id = 'article_main';
	articleMain.classList = 'container';
	const container = document.querySelector('.wrap_bg')!;
	articleMain.appendChild(settingForm);
	container.appendChild(articleMain);
}
/**
 * 错层小说
 */
export class Cuoceng extends AbstractRebuilder {
	public canHandle(): boolean {
		return location.hostname.endsWith('cuoceng.com');
	}
	public getPageType(): PageType {
		const segments = location.pathname.split('/').filter(Boolean);
		switch (segments.length) {
			case 0:
				document.body.style.flexDirection = 'column';
				break;
			case 2:
				// 书页
				// /book/b5dd4ab4-6131-4867-9d80-d81ef7bcfe28.html
				handleSettingPage();
				return PageType.Book;
			case 3:
				if (location.pathname.startsWith('/book/chapter/')) {
					// 目录页
					GM_registerMenuCommand('脚本设置', function () {
						GM_openInTab(location.pathname.replace('/book/chapter/', '/book/'));
					});
					// /book/chapter/b5dd4ab4-6131-4867-9d80-d81ef7bcfe28.html
					return PageType.Index;
				}
				GM_registerMenuCommand('脚本设置', function () {
					GM_openInTab(location.pathname.replace(/\/[\d\w-]+\.html/, '.html'));
				});
				// /book/b5dd4ab4-6131-4867-9d80-d81ef7bcfe28/1dec3f46-2e5a-4a3a-9a15-97c4e96c101e.html
				return PageType.Chapter;

			default:
				break;
		}
		return PageType.Unknown;
	}
	protected parseFragmentPageURL(doc: Document): PageURL {
		const linkNext = doc.getElementById('linkNext') as HTMLAnchorElement;
		return {
			nextChapter: linkNext?.href
		};
	}
	getChapterPage(): Page {
		const con = document.getElementById('content')!;
		con.className = '';
		const mainSection = disguiseParagraphs(con);

		const navigationBar: NavLinks = {
			prevAnchor: document.getElementById('linkPrev') as HTMLAnchorElement,
			infoAnchor: document.getElementById('linkIndex') as HTMLAnchorElement,
			nextAnchor: document.getElementById('linkNext') as HTMLAnchorElement
		};
		const breadcrumbBar = document.querySelector('.breadcrumb')!;
		const title = document.querySelector('body > div.container > div > div > h1')?.textContent;
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
