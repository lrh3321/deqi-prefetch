import { bookPageAccessKey, nextChapterAccessKey, previousChapterAccessKey } from './config';

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
	const $ = (globalThis as any).$;
	if ($) {
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

export type NavLinks = {
	prevAnchor?: HTMLAnchorElement;
	infoAnchor?: HTMLAnchorElement;
	nextAnchor?: HTMLAnchorElement;
};

export function setAccessKeys(nav: NavLinks) {
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

export type Page = {
	breadcrumbBar?: Element;
	searchForm?: Element;
	title?: string;
	mainSection: Element;
	navigationBar: NavLinks;
};

export type CleanPage = {
	root: HTMLDivElement;
	header: HTMLElement;
	main: HTMLElement;
	footer: HTMLElement;
};

export function rebuildChapterBody(page: Page): CleanPage {
	const newBody = document.createElement('body');
	newBody.style = document.body.style.cssText;
	newBody.dataset.comment = document.body.dataset.comment;

	const root = document.createElement('div');
	root.className = 'article-root';

	const header = buildNovelHeader(page);
	const main = buildNovelMain(page);
	const footer = buildNovelFooter(page.navigationBar);

	root.append(header, main, footer);
	newBody.append(root);
	document.body.replaceWith(newBody);

	return { root, header, main, footer };
}

export function updateStyle(pre: HTMLPreElement) {
	const computedStyle = getComputedStyle(pre);
	document.body.style.backgroundColor = getComputedStyle(pre).backgroundColor;
	document.body.style.setProperty('--primary-color', computedStyle.color);
	const comment = pre.querySelector('span.token.comment');
	if (comment) {
		const computedStyle = getComputedStyle(comment);
		document.body.style.setProperty('--secondary-color', computedStyle.color);
	}
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
			li.innerHTML = title;
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
	return footer;
}
