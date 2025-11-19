import { disguiseParagraphs } from './code';
import {
	fetchChaperFragmentPage,
	paragraphsFromElement,
	rebuildChapterBody,
	VM_log
} from './utils';

export function handleDamiRoute() {
	VM_log('handleDamiRoute');

	if (/^\/book\/[^/]+\.html$/.test(location.pathname)) {
		handleBookPage();
	} else if (/^\/book\/[^/]+\/[^/]+\.html$/.test(location.pathname)) {
		handleChapterPage();
	}
}

function handleBookPage() {
	VM_log('handleBookPage');
}
function handleChapterPage() {
	VM_log('handleChapterPage');

	const con = document.getElementById('htmlContent')!;
	let multiPage = false;
	const linkNext = document.getElementById('linkNext');
	if (linkNext) {
		if (linkNext instanceof HTMLAnchorElement) {
			if (linkNext.textContent.includes('最后一章了')) {
				const page = getChapterPage();
				rebuildChapterBody(page);
			} else {
				(() => {
					const page = getChapterPage();
					rebuildChapterBody(page);
				})();
				multiPage = true;
			}
		} else if (linkNext instanceof HTMLSpanElement) {
			const varName = varnameFromDocument(document);
			VM_log(`varName = ${varName}`);
			linkNext.classList.remove('btn', 'btn-default');
			if (varName) {
				let nextHref = (document.defaultView as any)[varName] as string | undefined;
				if (nextHref) {
					multiPage = true;
					void (async () => {
						let counter = 0;
						let next = await fetchChaperFragmentPage(nextHref, parseFragmentPage);
						con.append(...next.paragraphs);
						while (next.next && counter < 20) {
							counter++;
							next = await fetchChaperFragmentPage(next.next, parseFragmentPage);
							VM_log(`result: ${next.next} ${next.paragraphs.length}`);
							con.append(...next.paragraphs);
						}

						if (next.nextChapter) {
							const nextLink = document.createElement('a');
							nextLink.id = 'linkNext';
							nextLink.href = next.nextChapter;
							nextLink.innerHTML = '下一章';
							linkNext.replaceWith(nextLink);
						}

						const page = getChapterPage();
						rebuildChapterBody(page);
					})();
				}
			}
		}
	}

	if (!multiPage) {
		const page = getChapterPage();
		rebuildChapterBody(page);
	}

	document.head.querySelectorAll('link[href][rel="stylesheet"]').forEach((ln) => ln.remove());
}
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

function parseFragmentPage(doc: Document): FragmentPage {
	const con = doc.getElementById('htmlContent')!;
	const paragraphs = paragraphsFromElement(con);
	const linkNext = doc.getElementById('linkNext');
	const page: FragmentPage = {
		paragraphs
	};
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

function getChapterPage(): Page {
	const con = document.getElementById('htmlContent')!;
	con.className = '';
	con.querySelectorAll('p').forEach((p) => {
		const s = p.textContent.trim();
		if (s) {
			if (
				s.includes('退#出#阅#读#模#式') ||
				s.includes('你推荐他的其他作品') ||
				s.includes('米小说移动版') ||
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

	const prenexts = Array.from<HTMLAnchorElement>(document.querySelectorAll('.readPager a'));
	const navigationBar: NavLinks = {};
	for (const element of prenexts) {
		if (element instanceof HTMLAnchorElement) {
			element.className = '';
			switch (element.id) {
				case 'linkPrev':
					element.innerHTML = '上一章';
					navigationBar.prevAnchor = element;
					break;
				case 'linkIndex':
					element.innerHTML = '目录';
					navigationBar.infoAnchor = element;
					break;
				case 'linkNext':
					element.innerHTML = '下一章';
					navigationBar.nextAnchor = element;
					break;
				default:
					break;
			}
		}
	}
	const breadcrumbBar = document.querySelector('.breadcrumb')!;
	const title = document.querySelector('h1.readTitle')?.textContent;
	const page = {
		breadcrumbBar,
		title,
		mainSection,
		navigationBar
	};

	return page;
}
