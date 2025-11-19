import { GM_xmlhttpRequest } from '$';
import { disguiseParagraphs, setupExtendLanguageSupport } from './code';
import { createSettingForm, disguiseMode, refreshInterval, setupCodeTheme } from './config';
import {
	ensureDoc,
	isInIframe,
	NavLinks,
	Page,
	rebuildChapterBody,
	setAccessKeys,
	VM_log
} from './utils';
function handleBookPage() {
	VM_log('handleBookPage');

	let finished = false;
	const itemtxt = document.querySelector('.itemtxt')!!;
	const spans = Array.from(itemtxt.querySelectorAll('p > span'));

	spans.forEach((span) => {
		if (span.textContent?.trim() == '已完结') {
			finished = true;
		}
	});

	const settingAnchor = document.createElement('a');
	settingAnchor.href = '/pifu/';
	settingAnchor.style.float = 'right';
	settingAnchor.style.marginRight = '0.5rem';
	settingAnchor.innerText = '脚本设置';
	itemtxt.firstElementChild!!.appendChild(settingAnchor);

	if (!finished) {
		const title = itemtxt.querySelector('h1>a')!!.textContent;
		const latestChapter = itemtxt.querySelector('ul>li>a')!!.textContent;

		const current = document.createElement('p');
		current.innerText = `当前时间：${new Date().toTimeString()}`;
		itemtxt.appendChild(current);

		document.title = `${title} - ${latestChapter}`;

		if (refreshInterval > 0) {
			const next = document.createElement('p');
			next.innerText = `刷新时间：${new Date(Date.now() + refreshInterval).toTimeString()}`;
			itemtxt.appendChild(next);

			setTimeout(() => {
				location.reload();
			}, refreshInterval);
		}
	}
}

function handleSettingPage() {
	VM_log('handleSettingPage');
	const settingForm = createSettingForm();
	const container = document.querySelector('div.container')!!;
	container.appendChild(settingForm);
}

type FragmentPage = {
	next?: string;
	nextChapter?: string;
	paragraphs: HTMLParagraphElement[];
};

async function fetchChaperFragmentPage(href: string): Promise<FragmentPage> {
	const p = new Promise<FragmentPage>((resolve, reject) => {
		GM_xmlhttpRequest({
			method: 'GET',
			url: href,
			responseType: 'document',
			onload: (response) => {
				const doc = ensureDoc(response.response);
				const container = doc.querySelector('div.container')!!;
				const nestedCon = doc.querySelector('div.container .con')!!;

				const paragraphs = Array.from(nestedCon.querySelectorAll('p'));
				const prenexts = container.querySelectorAll('div.prenext a');
				let next: HTMLAnchorElement | undefined;
				let nextChapter: HTMLAnchorElement | undefined;

				for (const element of prenexts) {
					if (element instanceof HTMLAnchorElement) {
						if (element.textContent == '下一页') {
							next = element;
							break;
						} else if (element.textContent == '下一章') {
							nextChapter = element;
							break;
						}
					}
				}

				VM_log({
					next: next?.href,
					nextChapter: nextChapter?.href,
					paragraphs: paragraphs
				});
				resolve({
					next: next?.href,
					nextChapter: nextChapter?.href,
					paragraphs: paragraphs
				});
			},
			onerror: (response) => {
				VM_log(['handleSettingPage error', response]);
				reject(response);
			},
			ontimeout: () => {
				VM_log('handleSettingPage timeout');
				reject('timeout');
			}
		});
	});
	return p;
}

function handleChaperPage() {
	VM_log('handleChaperPage');

	const container = document.querySelector('div.container')!!;
	const prenexts = container.querySelectorAll('div.prenext a');

	const con = document.querySelector('div.container .con')!!;
	for (const element of prenexts) {
		if (element instanceof HTMLAnchorElement) {
			if (element.textContent == '下一页') {
				(async () => {
					let counter = 0;
					let next = await fetchChaperFragmentPage(element.href);
					con.append(...next.paragraphs);
					while (next.next && counter < 20) {
						counter++;
						next = await fetchChaperFragmentPage(next.next);
						con.append(...next.paragraphs);
					}

					if (next.nextChapter) {
						element.textContent = '下一章';
						element.href = next.nextChapter;
					}

					const page = getChapterPage();
					rebuildChapterBody(page);
				})();
				break;
			} else if (element.textContent == '下一章') {
				(async () => {
					const page = getChapterPage();
					rebuildChapterBody(page);
				})();
				break;
			}
		}
	}
}
export function handleDeqiRoute() {
	if (isSudugu()) {
		handleSuduguRoute();
		return;
	}

	// 设置页面处理逻辑
	if (location.pathname === '/pifu/') {
		setupCodeTheme();
		setupExtendLanguageSupport();
		handleSettingPage();
	}
	// 章节页面处理逻辑
	else if (location.pathname.endsWith('.html')) {
		// 非iframe环境下根据伪装模式设置代码主题
		if (!isInIframe) {
			switch (disguiseMode) {
				case 'code':
					setupCodeTheme();
					setupExtendLanguageSupport();
					break;
				default:
					break;
			}
		}
		handleChaperPage();
	} else if (location.pathname.startsWith('/xiaoshuo/')) {
		// 书籍主页处理逻辑
		handleBookPage();
	}
}

function handleSuduguRoute() {
	VM_log('handleSuduguRoute');
	// 设置页面处理逻辑
	if (location.pathname === '/i/pifu.aspx') {
		setupCodeTheme();
		setupExtendLanguageSupport();
		handleSettingPage();
	}
	// 章节页面处理逻辑
	else if (location.pathname.endsWith('.html')) {
		// 非iframe环境下根据伪装模式设置代码主题
		if (!isInIframe) {
			switch (disguiseMode) {
				case 'code':
					setupCodeTheme();
					setupExtendLanguageSupport();
					break;
				default:
					break;
			}
		}
		handleChaperPage();
	} else if (location.pathname.match(/\/\d+\/(p-\d+\.html)?/)) {
		// 书籍主页处理逻辑
		handleBookPage();
	}
}

function isSudugu(): boolean {
	return location.host.endsWith('sudugu.org');
}

function getChapterPage(): Page {
	const con = document.querySelector('div.container .con')!;
	con.className = '';
	const mainSection = disguiseParagraphs(con);

	const prenexts = document.querySelectorAll('div.prenext a');
	const navigationBar: NavLinks = {};
	for (const element of prenexts) {
		if (element instanceof HTMLAnchorElement) {
			if (element.textContent == '上一章') {
				navigationBar.prevAnchor = element;
			} else if (element.textContent == '目录' || element.textContent == '章节目录') {
				navigationBar.infoAnchor = element;
			} else if (element.textContent == '下一章') {
				navigationBar.nextAnchor = element;
			}
		}
	}
	setAccessKeys(navigationBar);
	const breadcrumbBar = document.querySelector('div.container > div.submenu h1')!!;
	const title = con.querySelector('p')?.textContent;
	const page = {
		breadcrumbBar,
		title,
		mainSection,
		navigationBar
	};

	return page;
}
