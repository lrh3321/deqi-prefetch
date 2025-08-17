import { GM_xmlhttpRequest } from '$';
import { disguiseParagraphs, setupExtendLanguageSupport } from './code';
import { createSettingForm, disguiseDebug, disguiseMode, setupCodeTheme } from './config';
import { ensureDoc, NavLinks, rebuildChapterBody, setAccessKeys } from './utils';

let bookID: string = '';
const chapterLinks = new Array<ChapterLink>();
const chapterLinkSet = new Set<string>();
function cleanupBody() {
	const ob = new MutationObserver((mutations: MutationRecord[]) => {
		mutations.forEach((mutation) => {
			if (mutation.type == 'childList') {
				mutation.addedNodes.forEach((node) => {
					if (node.nodeType == Node.ELEMENT_NODE) {
						(node as Element).remove();
					}
				});
			}
		});
	});
	ob.observe(document.body, { childList: true });

	const children = Array.from(document.body.children).filter(
		(it) => it.id != 'main' && it.id != 'mainboxs'
	);
	children.forEach((it) => {
		if (it.tagName == 'STYLE' || it.className == 'article-root') {
			return;
		}
		it.remove();
	});
}
function handleSettingPage() {
	const settingForm = createSettingForm();
	const articleMain = document.createElement('div');
	articleMain.id = 'article_main';
	articleMain.classList = 'container';
	const container = document.getElementById('main')!!;
	articleMain.appendChild(settingForm);
	container.appendChild(articleMain);
}
type ChapterLink = { href: string; title: string };
function handleBookPage() {
	const rowDiv = document.querySelector('#main > div.nine-item > div.container > div.row')!!;

	const moreItem = createAttrOneItem();
	moreItem.id = 'more-item';
	moreItem.appendChild(createMoreAnchor());
	const resetItem = createAttrOneItem();
	resetItem.id = 'reset-item';
	resetItem.appendChild(createResetAnchor());
	rowDiv.append(moreItem, resetItem);

	const links = Array.from(rowDiv.querySelectorAll('a[href][title]')).map((it) => {
		return { href: (it as HTMLAnchorElement).href, title: (it as HTMLAnchorElement).title };
	});

	const indexStr = localStorage.getItem(`book_index_${bookID}`);
	if (indexStr) {
		const oldLinks = JSON.parse(indexStr) as Array<ChapterLink>;
		// TODO:
		const linkSet = new Set(links.map((it) => it.href));
		oldLinks.forEach((it) => {
			if (!linkSet.has(it.href)) {
				links.push(it);
				rowDiv.insertBefore(createChapterLink(it.href, it.title), moreItem);
			}
		});
		links.sort((a, b) => {
			return b.href.localeCompare(a.href);
		});
	}
	chapterLinks.push(...links);
	chapterLinkSet.clear();
	chapterLinks.forEach((it) => {
		chapterLinkSet.add(it.href);
	});
	localStorage.setItem(`book_index_${bookID}`, JSON.stringify(chapterLinks));
}

function fetchPreviousChapter(href: string, limit: number) {
	if (limit <= 0) {
		return;
	}

	GM_xmlhttpRequest({
		method: 'GET',
		url: href,
		responseType: 'document',
		onload: (response) => {
			const link = getPrevLink(response.response);
			if (!chapterLinkSet.has(href)) {
				chapterLinkSet.add(href);
				chapterLinks.push({ title: link.title, href: href });
				chapterLinks.sort((a, b) => {
					return b.href.localeCompare(a.href);
				});
				localStorage.setItem(`book_index_${bookID}`, JSON.stringify(chapterLinks));

				const moreItem = document.getElementById('more-item')!!;
				const element = createChapterLink(href, link.title);
				moreItem.parentElement?.insertBefore(element, moreItem);
			}
			fetchPreviousChapter(link.href, limit - 1);
		}
	});
}

function createAttrOneItem(): HTMLDivElement {
	const div = document.createElement('div');
	div.className = 'col-md-4 col-sm-12 att-one-item';
	return div;
}

function getLastestHref(): string {
	const moreItem = document.getElementById('more-item')!!;
	const lastAnchor = moreItem.previousElementSibling?.querySelector('a')?.href!!;
	return lastAnchor;
}
function createMoreAnchor(): HTMLAnchorElement {
	const a = document.createElement('a');
	a.role = 'button';
	a.onclick = () => {
		const latest = getLastestHref();
		console.log('more', latest);
		fetchPreviousChapter(latest, 10);
	};
	a.title = '更多';
	a.innerHTML = '更多';
	return a;
}
function createResetAnchor(): HTMLAnchorElement {
	const a = document.createElement('a');
	a.role = 'button';
	a.onclick = () => {
		console.log('reset');
		localStorage.removeItem(`book_index_${bookID}`);
	};
	a.title = '重置';
	a.innerHTML = '重置';
	return a;
}
function createChapterLink(href: string, title: string): HTMLDivElement {
	const div = createAttrOneItem();
	const a = document.createElement('a');
	a.href = new URL(href).pathname;
	a.title = title;
	a.innerText = title;
	div.append(a);
	return div;
}

function appendRemainPages(
	netxDivs: Array<string | HTMLScriptElement | undefined>,
	hasCanvas: boolean
) {
	const articleMain = document.getElementById('article_main');
	const mainboxs = document.getElementById('mainboxs')!!;
	const scripts: string[] = [];
	netxDivs.forEach((div) => {
		if (typeof div === 'undefined') {
			return;
		}
		if (typeof div === 'string') {
			const next = document.createElement('div');
			next.innerHTML = div!!;
			mainboxs.appendChild(next);
		} else {
			scripts.push(div.innerHTML);
		}
	});

	const mainSection = disguiseParagraphs(mainboxs);
	const prenexts = document.querySelectorAll('div.prenext a');
	const navigationBar: NavLinks = {};
	for (const element of prenexts) {
		if (element instanceof HTMLAnchorElement) {
			if (element.textContent == '上一章') {
				navigationBar.prevAnchor = element;
			} else if (element.textContent == '章节目录') {
				navigationBar.infoAnchor = element;
			} else if (element.textContent == '下一章') {
				navigationBar.nextAnchor = element;
			}
		}
	}
	setAccessKeys(navigationBar);
	const title = document.getElementById('post-h2')?.innerHTML;
	const page = {
		breadcrumbBar: document.querySelector('div.page-links')!!,
		title,
		mainSection,
		navigationBar
	};
	if (articleMain) {
		if (hasCanvas) {
			const styles = Array.from(document.body.querySelectorAll('style'));
			const pageLinks = document.getElementById('page-links')!!;
			rebuildChapterBody(page);
			document.body.append(...styles);
			const articleFooter = document.querySelector('div.article-root footer')!!;
			articleFooter.append('章节不完整');
			articleFooter.appendChild(pageLinks);
			// cleanupBody();
			handleCanvasScript(scripts);
		} else {
			rebuildChapterBody(page);
		}
	}
}

function handleCanvasScript(scripts: string[]) {
	// #mainboxs
	if (scripts.length > 0) {
		console.log('handleCanvasScript');
	// 	const mainboxs = document.createElement('div');
	// 	mainboxs.id = 'mainboxs';
	// 	const scriptElement = document.createElement('script');
	// 	scriptElement.innerHTML = scripts.shift()!!;
	// 	document.body.appendChild(mainboxs);
	// 	mainboxs.after(scriptElement);
	}
}

function getMainBox(doc: Document | string): Element {
	return ensureDoc(doc).getElementById('mainboxs')!!;
}
function getCanvasScript(doc: Document | string): HTMLScriptElement | undefined {
	const document = ensureDoc(doc);
	let scriptCopy: HTMLScriptElement | undefined = undefined;
	const scripts = Array.from(document.body.querySelectorAll('script:not([src])'));
	scripts.forEach((script) => {
		if (typeof scriptCopy != 'undefined') {
			return;
		}
		if (script.innerHTML.includes(`if(!isMobile)`) && !script.innerHTML.includes(`qrcode`)) {
			// 有手机浏览器限制
			console.log('有手机浏览器限制');
			scriptCopy = document.createElement('script');
			scriptCopy.innerHTML = script.innerHTML;
			return;
		}
	});
	return scriptCopy;
}

function getPrevLink(doc: Document | string): ChapterLink {
	const rDoc = ensureDoc(doc);
	return {
		href: (rDoc.querySelector('.prenext > a[rel="prev"]') as HTMLAnchorElement).href,
		title: rDoc.getElementById('post-h2')!!.innerText
	};
}
function handleChapterPage() {
	if (disguiseDebug) {
		disguiseParagraphs(document.getElementById('mainboxs')!!);
		return;
	}

	const articleMain = document.getElementById('article_main');
	const nextLinks = Array.from(
		document.querySelectorAll('#page-links a.post-page-numbers')
	) as HTMLAnchorElement[];

	const netxDivs = new Array<string | HTMLScriptElement | undefined>(nextLinks.length);
	let remainLinks = nextLinks.length;
	let hasCanvas = false;
	for (let index = 0; index < nextLinks.length; index++) {
		const anchor = nextLinks[index];
		GM_xmlhttpRequest({
			method: 'GET',
			url: anchor.href,
			responseType: 'document',
			onload: (response) => {
				try {
					const doc = response.response;
					const div: Element = getMainBox(doc);
					if (div.getElementsByTagName('p').length == 0) {
						hasCanvas = true;
						netxDivs[index] = getCanvasScript(doc);
					} else {
						netxDivs[index] = div.innerHTML;
					}
					if (!hasCanvas) {
						anchor.remove();
					}
					remainLinks--;
				} catch (error) {
					const div = document.createElement('div');
					div.innerText = `error: ${error} with resolve ${anchor.href}`;
					articleMain?.append(div);
					if (error instanceof Error) {
						const div = document.createElement('div');
						div.innerText = `name: ${error.name}, stack: ${error.stack}`;
						articleMain?.append(div);
					}
				}
				if (remainLinks == 0) {
					appendRemainPages(netxDivs, hasCanvas);
				}
			}
		});
	}
}

export function handleBiqu33Route() {
	const segments = location.pathname.split('/').filter(Boolean);
	const lastSegment = segments[segments.length - 1];
	switch (segments.length) {
		case 0:
		case 1:
		case 2:
			cleanupBody();
			setupCodeTheme();
			setupExtendLanguageSupport();
			handleSettingPage();
			if (segments.length == 2 && segments[0] == 'book') {
				bookID = segments[1];
				handleBookPage();
			}
			break;
		case 3:
			if (/[\d\w]+_\d+$/.test(lastSegment)) {
				// 不是章节首页
				const rows = Array.from(document.querySelectorAll('#article_main .row'));
				rows.forEach((row) => {
					(row as HTMLElement).style.display = 'flex';
				});

				const thisWin = document.defaultView as docThis;
				let scriptCopy = getCanvasScript(document);

				cleanupBody();
				if (scriptCopy && !thisWin.isMobile) {
					document.getElementById('qrcode')?.remove();
					thisWin.isMobile = true;
					document.body.appendChild(scriptCopy);
				}
				return;
			}
			switch (disguiseMode) {
				case 'code':
					setupCodeTheme();
					setupExtendLanguageSupport();
					break;
				default:
					break;
			}
			handleChapterPage();
			break;
		default:
			break;
	}
}

type docThis = (WindowProxy & typeof globalThis) & { isMobile?: boolean };
