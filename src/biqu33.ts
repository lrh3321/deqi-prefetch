import { GM_xmlhttpRequest } from '$';
import { disguiseParagraphs, setupExtendLanguageSupport } from './code';
import {
	bookPageAccessKey,
	createSettingForm,
	disguiseDebug,
	disguiseMode,
	nextChapterAccessKey,
	previousChapterAccessKey,
	setupCodeTheme
} from './config';

function cleanupBody() {
	Object.defineProperty(location, 'replace', {
		value: function () {
			console.warn('location.replace is disabled!');
			return false;
		},
		writable: false, // 禁止重新赋值
		configurable: false // 禁止删除或重新配置
	});

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

	const children = Array.from(document.body.children).filter((it) => it.id != 'main');
	children.forEach((it) => {
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

function appendRemainPages(netxDivs: Array<string | undefined>, hasCanvas: boolean) {
	const articleMain = document.getElementById('article_main');
	const mainboxs = document.getElementById('mainboxs')!!;
	netxDivs.forEach((div) => {
		const next = document.createElement('div');
		next.innerHTML = div!!;
		mainboxs.appendChild(next);
	});

	if (articleMain) {
		articleMain.appendChild(document.querySelector('div.page-links')!!);
		articleMain.appendChild(document.getElementById('post-h2')!!);
		articleMain.appendChild(mainboxs);
		articleMain.appendChild(document.querySelector('div.prenext')!!);
		articleMain.appendChild(document.querySelector('div.post-content')!!);
		articleMain.querySelectorAll('.page-links, .post-content');
	}
	if (hasCanvas) {
		document.body.append('章节不完整');
	}
	disguiseParagraphs(mainboxs);
}

function getMainBox(doc: Document | string): Element {
	if (typeof doc === 'string') {
		// 创建解析器
		const parser = new DOMParser();
		const realDoc = parser.parseFromString(doc, 'text/html');
		return realDoc.getElementById('mainboxs')!!;
	}
	return doc.getElementById('mainboxs')!!;
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

	const netxDivs = new Array<string | undefined>(nextLinks.length);
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
					}
					netxDivs[index] = div.innerHTML;

					anchor.remove();
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

	const prenexts = document.querySelectorAll('div.prenext a');
	for (const element of prenexts) {
		if (element instanceof HTMLAnchorElement) {
			if (element.textContent == '上一章') {
				element.accessKey = previousChapterAccessKey;
				element.ariaKeyShortcuts = `Alt+${previousChapterAccessKey}`;
			} else if (element.textContent == '章节目录') {
				element.accessKey = bookPageAccessKey;
				element.ariaKeyShortcuts = `Alt+${bookPageAccessKey}`;
			} else if (element.textContent == '下一章') {
				element.accessKey = nextChapterAccessKey;
				element.ariaKeyShortcuts = `Alt+${nextChapterAccessKey}`;
			}
		}
	}
	cleanupBody();

	// document.body.querySelectorAll('[style*="position:fixed"]')
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
			break;
		case 3:
			if (/[\d\w]+_\d+$/.test(lastSegment)) {
				// 不是章节首页
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
