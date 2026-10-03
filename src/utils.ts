import { GM_log, GM_xmlhttpRequest, GmLogType } from '$';
import {
	bookPageAccessKey,
	nextChapterAccessKey,
	previousChapterAccessKey,
	setupConfigButton
} from './config';
// import VConsole from 'vconsole';
// const vConsole = new VConsole({ theme: 'dark' });
// console.log(vConsole.version);

export let VM_log: GmLogType = GM_log;

// VM_log = function (message: any): void {
// 	GM_log(message);
// 	console.log(message);
// };

/**
 * 获取代码主题的CSS文件URL
 *
 * 根据主题名称判断是官方主题还是第三方主题，并返回对应的CDN链接。
 * 官方主题使用PrismJS官方CDN，第三方主题使用cdnjs提供的链接。
 *
 * @param theme - 主题名称
 * @returns 对应主题CSS文件的完整URL地址
 */
export function getCodeThemeURL(theme: string): string {
	const officialThemes = new Set([
		'prism',
		'prism-dark',
		'prism-funky',
		'prism-okaidia',
		'prism-twilight',
		'prism-coy',
		'prism-solarizedlight',
		'prism-tomorrow'
	]);
	// 判断是否为官方主题
	if (officialThemes.has(theme)) {
		return `https://dev.prismjs.com/themes/${theme}.min.css`;
	}
	// 第三方主题使用cdnjs链接
	return `https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/${theme}.min.css`;
}

/**
 * 释放文档的复制相关事件绑定
 *
 * 该函数会解除jQuery绑定在document上的contextmenu、copy和cut事件，
 * 恢复浏览器默认的右键菜单、复制和剪切功能。
 *
 * 主要用于解除页面对复制粘贴和右键菜单的限制。
 */
export function releaseCopy() {
	const $ = (document.defaultView as any).$;
	if ($) {
		GM_log('has jQuery');
		const doc = $(document);
		doc.off('contextmenu');
		doc.off('copy');
		doc.off('cut');
	}
	document.onclick = null;
	document.oncontextmenu = null;
	document.oncopy = null;
	document.oncut = null;

	document.body.onclick = null;
	document.body.oncontextmenu = null;
	document.body.oncopy = null;
	document.body.oncut = null;

	// oxlint-disable-next-line typescript/unbound-method
	const native_replaceState = history.replaceState;
	history.replaceState = function (data: any, unused: string, url?: string | URL | null) {
		if (url) {
			if (url instanceof URL) {
				if (url.hostname != location.hostname) {
					return;
				}
			} else {
				if (url.startsWith('http://') || url.startsWith('https://')) {
					if (new URL(url).hostname != location.hostname) {
						return;
					}
				}
			}
		}
		native_replaceState(data, unused, url);
	};
}

export const isInIframe = window.self !== window.top;

export function ensureDoc(doc: Document | string): Document {
	if (typeof doc === 'string') {
		// 创建解析器
		const parser = new DOMParser();
		const realDoc = parser.parseFromString(doc, 'text/html');
		return realDoc;
	}
	return doc;
}

function setAccessKeys(nav: NavLinks) {
	const { prevAnchor, infoAnchor, nextAnchor } = nav;

	if (prevAnchor) {
		prevAnchor.accessKey = previousChapterAccessKey;
		prevAnchor.ariaKeyShortcuts = `Alt+${previousChapterAccessKey}`;
	}
	if (infoAnchor) {
		infoAnchor.accessKey = bookPageAccessKey;
		infoAnchor.ariaKeyShortcuts = `Alt+${bookPageAccessKey}`;
	}
	if (nextAnchor) {
		nextAnchor.accessKey = nextChapterAccessKey;
		nextAnchor.ariaKeyShortcuts = `Alt+${nextChapterAccessKey}`;
	}
}

export function rebuildChapterBody(page: Page): CleanPage {
	const newBody = document.createElement('body');
	newBody.style = document.body.style.cssText;
	newBody.dataset.comment = document.body.dataset.comment;

	const root = document.createElement('div');
	root.className = 'article-root';

	const header = buildNovelHeader(page);
	const main = buildNovelMain(page);
	const footer = buildNovelFooter(page.navigationBar);

	root.append(header, document.createElement('hr'), main, document.createElement('hr'), footer);
	newBody.append(root);
	document.body.replaceWith(newBody);

	const scripts = Array.from(document.head.querySelectorAll('script'));
	scripts.forEach((it) => it.remove());

	setupConfigButton();
	boilerplate();

	return { root, header, main, footer };
}

function boilerplate() {
	ensureMeta('viewport', 'width=device-width');
	ensureMeta('text-scale', 'scale');
}

function ensureMeta(name: string, content: string) {
	const docHeader = document.head;
	const meta = docHeader.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
	if (meta) {
		meta.content = content;
	} else {
		const meta = document.createElement('meta');
		meta.name = name;
		meta.content = content;
		docHeader.appendChild(meta);
	}
}

export function updateStyle(pre: HTMLPreElement) {
	const computedStyle = getComputedStyle(pre);
	document.body.style.setProperty('--primary-color', computedStyle.color);
	document.body.style.setProperty('--primary-bg-color', computedStyle.backgroundColor);
	const comment = pre.querySelector('span.token.comment');
	if (comment) {
		const computedStyle = getComputedStyle(comment);
		document.body.style.setProperty('--secondary-color', computedStyle.color);
	}
}

export function paragraphsFromElement(el: Element): HTMLParagraphElement[] {
	const paragraphs: HTMLParagraphElement[] = [];

	let paragraph = el.ownerDocument.createElement('p');
	const appendParagraph = () => {
		if (paragraph.textContent?.trim() || paragraph.children.length > 0) {
			if (paragraph.querySelector('p')) {
				const children = Array.from(paragraph.children);
				children.forEach((it) => {
					if (it instanceof HTMLParagraphElement) {
						paragraphs.push(it);
					} else {
						if (it.textContent?.trim() || it instanceof HTMLImageElement) {
							const p = el.ownerDocument.createElement('p');
							paragraphs.push(p);
						}
					}
				});
			} else {
				paragraphs.push(paragraph);
			}
		}
		paragraph = el.ownerDocument.createElement('p');
	};

	for (const node of Array.from(el.childNodes)) {
		if (node.nodeType === Node.ELEMENT_NODE && (node as Element).matches('br')) {
			appendParagraph();
		} else if (node.nodeType === Node.TEXT_NODE && node.textContent) {
			paragraph.append(node.textContent.trim());
		} else {
			if (
				!(
					node instanceof HTMLAnchorElement ||
					node instanceof HTMLScriptElement ||
					node instanceof HTMLUListElement
				)
			) {
				if (node instanceof HTMLParagraphElement) {
					if (node.querySelector('br')) {
						for (const subNode of Array.from(node.childNodes)) {
							if (subNode.nodeType === Node.ELEMENT_NODE && (subNode as Element).matches('br')) {
								appendParagraph();
							} else if (subNode.nodeType === Node.TEXT_NODE && subNode.textContent) {
								paragraph.append(subNode.textContent.trim());
							}
						}
						node.innerHTML = '';
					}
				}
				paragraph.append(node.cloneNode(true));
			}
		}
	}
	appendParagraph();

	const demo = paragraphs.filter((p) => p.querySelector('p'));
	if (demo.length > 0) {
		GM_log('nest', demo);
	}

	return paragraphs;
}

type ParseFragmentCallback = (doc: Document) => FragmentPage;

export async function fetchChaperFragmentPage(
	href: string,
	callback: ParseFragmentCallback
): Promise<FragmentPage> {
	VM_log(`fetchChaperFragmentPage: ${href}`);
	const p = new Promise<FragmentPage>((resolve, reject) => {
		GM_xmlhttpRequest({
			method: 'GET',
			url: href,
			responseType: 'document',
			onload: (response) => {
				const doc = ensureDoc(response.response);
				const f = callback(doc);
				VM_log(f);
				resolve(f);
			},
			onerror: (response) => {
				VM_log(['fetchChaperFragmentPage error', response]);
				reject(response);
			},
			ontimeout: () => {
				VM_log('fetchChaperFragmentPage timeout');
				reject('timeout');
			}
		});
	});
	return p;
}

function buildNovelHeader(page: Page): HTMLElement {
	const { breadcrumbBar, title } = page;
	const header = document.createElement('header');
	if (breadcrumbBar) {
		const breadcrumb = document.createElement('ol');
		breadcrumb.className = 'breadcrumb';
		breadcrumbBar.querySelectorAll('a').forEach((a) => {
			const li = document.createElement('li');
			const newA = a.cloneNode(true);
			li.appendChild(newA);
			breadcrumb.appendChild(li);

			const li2 = document.createElement('li');
			li2.ariaHidden = '';
			li2.innerHTML = '&rsaquo;';
			breadcrumb.appendChild(li2);
		});
		breadcrumb.lastElementChild?.remove();
		if (title) {
			const li = document.createElement('li');
			if (title.length > 20) {
				li.innerHTML = title.substring(0, 20) + '...';
			} else {
				li.innerHTML = title;
			}
			breadcrumb.appendChild(li);
		}
		header.appendChild(breadcrumb);
	}
	return header;
}
function buildNovelMain(page: Page): HTMLElement {
	const { title, mainSection } = page;
	const main = document.createElement('main');
	const article = document.createElement('article');
	if (title) {
		const h2 = document.createElement('h2');
		h2.className = 'article-title';
		h2.innerText = title;
		h2.title = title;
		article.appendChild(h2);
	}
	const section = document.createElement('section');

	section.appendChild(mainSection);
	article.appendChild(section);
	if (mainSection.querySelector('img')) {
		const imgSection = document.createElement('section');
		imgSection.classList.add('img-container');
		mainSection.querySelectorAll('img').forEach((img) => imgSection.appendChild(img));
		article.appendChild(imgSection);
	}
	main.appendChild(article);
	return main;
}
function buildNovelFooter(nav: NavLinks): HTMLElement {
	const footer = document.createElement('footer');
	const navBar = document.createElement('nav');
	navBar.className = 'article-nav';
	if (nav.prevAnchor) {
		navBar.appendChild(nav.prevAnchor);
	}
	if (nav.infoAnchor) {
		navBar.appendChild(nav.infoAnchor);
	}
	if (nav.nextAnchor) {
		navBar.appendChild(nav.nextAnchor);
	}
	navBar.insertAdjacentHTML('beforeend', '<a href="/">小说列表</a>');
	footer.appendChild(navBar);
	setAccessKeys(nav);
	return footer;
}

export function freezePage() {
	const noop = () => {};

	// 1. 清空所有定时器 ID（暴力法：从 1 到最大 ID 清一遍）
	const maxId = setTimeout(noop, 0);
	for (let i = 0; i <= maxId; i++) {
		clearTimeout(i);
		clearInterval(i);
	}

	const window = document.defaultView!;

	// 2. 移除 document/window 上常见监听
	['click', 'mousedown', 'mouseup', 'keydown', 'keyup', 'submit', 'scroll', 'touchstart'].forEach(
		(type) => {
			document.removeEventListener(type, noop, true);
			window.removeEventListener(type, noop, true);
		}
	);

	// 3. 禁用动态脚本入口
	window.eval = noop;
	(window as any).setTimeout = noop;
	(window as any).setInterval = noop;
	(window as any).requestAnimationFrame = noop;

	// 4. 禁用动态 script 插入
	// oxlint-disable-next-line typescript/unbound-method
	const origAppend = Node.prototype.appendChild;
	Node.prototype.appendChild = function <T extends Node>(node: T): T {
		if (node instanceof Element && node.tagName === 'SCRIPT') return node;
		return origAppend.call(this, node) as T;
	};

	// 5. 冻结表单、链接
	document.querySelectorAll('a').forEach((a) => (a.onclick = (e) => e.preventDefault()));
	document.querySelectorAll('form').forEach((f) => (f.onsubmit = (e) => e.preventDefault()));
}
