import { GM_openInTab, GM_registerMenuCommand } from '$';
import { AbstractPartedRebuilder, PageType } from './base';
import { disguiseParagraphs, paragraphsFromElement, tidyStyle, VM_log } from '../common';

function _scriptFromDocument(doc: Document): HTMLScriptElement | undefined {
	const linkNext = doc.getElementById('linkNext')!;

	const cls = Array.from(linkNext.classList)
		.filter((it) => !it.startsWith('btn'))
		.join()
		.trim();
	VM_log(`CLS = ${cls}`);
	if (cls) {
		const scripts = Array.from(
			doc.querySelectorAll('body > div.container.body-content.read-container > script[type]')
		).filter((it) => it.innerHTML.includes(cls));
		if (scripts && scripts.length > 0) {
			VM_log(`scripts ${scripts.length}`);
			const s = scripts.pop();
			const m = /var (__.*) = '';/.exec(s?.innerHTML || '');
			if (m && m?.length > 1) {
				return s as HTMLScriptElement;
			}
		} else {
			VM_log('No scripts');
		}
	}
}
function varnameFromDocument(doc: Document): string {
	const s = _scriptFromDocument(doc);
	if (s) {
		const m = /var (__.*) = '';/.exec(s?.innerHTML || '');
		if (m && m?.length > 1) {
			VM_log(`varName = ${m[1]}`);
			return m[1];
		}
	}
	return '';
}
function varScriptsFromDocument(doc: Document): string[] {
	const s = _scriptFromDocument(doc);
	if (s) {
		return s.innerHTML.split(/[\r\n]+/).slice(0, 4) || [];
	}
	return [];
}

/**
 * 大米小说
 */
export class Dmxs extends AbstractPartedRebuilder {
	public canHandle(): boolean {
		return location.hostname.endsWith('dmxs2.com');
	}
	public getPageType(): PageType {
		GM_registerMenuCommand('脚本设置', function () {
			GM_openInTab(`${location.protocol}//${location.host}/history.html#script-setting`);
		});
		if (/^\/book\/[^/]+\.html$/.test(location.pathname)) {
			return PageType.Book;
		} else if (/^\/book\/[^/]+\/[^/]+\.html$/.test(location.pathname)) {
			return PageType.Chapter;
		}
		return PageType.Unknown;
	}
	protected parseFragmentPageURL(doc: Document): PageURL {
		const linkNext = doc.getElementById('linkNext');
		const page: PageURL = {};
		if (linkNext instanceof HTMLAnchorElement) {
			page.nextChapter = linkNext.href;
			VM_log(`nextChapter: ${page.nextChapter}`);
		} else {
			const varName = varnameFromDocument(doc);
			if (doc.defaultView) {
				page.next = (doc.defaultView as any)[varName];
			} else {
				const line = doc.querySelector('body > script')?.innerHTML || '';
				const lines = [line, ...varScriptsFromDocument(doc)];
				VM_log(`fn = ${lines.join('\r\n')}`);

				const script = document.createElement('script');
				script.innerHTML = lines.join('\r\n');
				document.body.append(script);
				script.remove();

				page.next = (document.defaultView as any)[varName];
			}
			VM_log(`next: ${page.next}`);
		}
		return page;
	}
	protected async parseFragmentPage(doc: Document): Promise<FragmentPage> {
		const con = doc.getElementById('htmlContent')!;
		const paragraphs = paragraphsFromElement(con);
		return {
			...this.parseFragmentPageURL(doc),
			paragraphs
		};
	}
	handleNextPage(_doc: Document, page: FragmentPage): void {
		const con = document.getElementById('htmlContent')!;
		con.append(...page.paragraphs);
	}
	getChapterPage(): Page {
		const con = document.getElementById('htmlContent')!;
		con.className = '';
		con.querySelectorAll('p').forEach((p) => {
			const s = p.textContent.trim();
			if (s) {
				if (
					s.includes('退#出#阅#读#模#式') ||
					s.includes('你推荐他的其他作品') ||
					s.includes('米小说移动版') ||
					s.includes('本书精彩情节') ||
					s.includes('最新章节') ||
					s.includes('完整章节') ||
					p.classList.contains('pmore')
				) {
					p.remove();
				}
			} else {
				p.remove();
			}
		});
		const mainSection = disguiseParagraphs(con);

		const navigationBar: NavLinks = {
			prevAnchor: document.getElementById('linkPrev') as HTMLAnchorElement | undefined,
			infoAnchor: document.getElementById('linkIndex') as HTMLAnchorElement | undefined,
			nextAnchor: document.getElementById('linkNext') as HTMLAnchorElement | undefined
		};
		const breadcrumbBar = document.querySelector('.breadcrumb')!;
		const title = document.querySelector('h1.readTitle')?.textContent;
		const page = {
			breadcrumbBar,
			title,
			mainSection,
			navigationBar
		};
		tidyStyle();
		return page;
	}
	protected override rewriteNextChapterLink(href: string): void {
		const linkNext = document.getElementById('linkNext');
		const nextLink = document.createElement('a');
		nextLink.id = 'linkNext';
		nextLink.href = href;
		nextLink.innerHTML = '下一章';
		linkNext?.replaceWith(nextLink);
	}
}
