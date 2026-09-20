import { GM_xmlhttpRequest } from '$';
import { disguiseParagraphs } from './code';
import {
	ensureDoc,
	isInIframe,
	NavLinks,
	Page,
	paragraphsFromElement,
	rebuildChapterBody,
	setAccessKeys,
	VM_log
} from './utils';

export function handleBuoloumaoRoute() {
	VM_log('handleBuoloumaoRoute');

	if (/\/book\/[^/]+/.test(location.pathname)) {
		handleBookPage();
	} else if (/\/read\/[^/]+\/[^/]+/.test(location.pathname)) {
		handleChapterPage();
	}
}

function handleBookPage() {
	VM_log('handleBookPage');
}

function handleChapterPage() {
	VM_log('handleChapterPage');

	const con = document.querySelector('.content')!;
	const anchors = Array.from<HTMLAnchorElement>(document.querySelectorAll('.readPage a'));
	let multiPage = false;
	if (isInIframe) {
		return;
	}

	for (const a of anchors) {
		VM_log(a.textContent);
		if (a.textContent.includes('下一页')) {
			multiPage = true;
			void (async () => {
				let counter = 0;
				let next = await fetchChaperFragmentPage(a.href);
				con.append(...next.paragraphs);
				while (next.next && counter < 20) {
					counter++;
					next = await fetchChaperFragmentPage(next.next);
					VM_log(`result: ${a.href} ${next.paragraphs.length}`);
					con.append(...next.paragraphs);
				}

				if (next.nextChapter) {
					a.textContent = '下一章';
					a.href = next.nextChapter;
				}

				const page = getChapterPage();
				rebuildChapterBody(page);
			})();
		} else if (a.textContent.includes('下一章')) {
			(() => {
				const page = getChapterPage();
				rebuildChapterBody(page);
			})();
			multiPage = true;
		}
	}
	if (!multiPage) {
		const page = getChapterPage();
		rebuildChapterBody(page);
	}

	document.head.querySelectorAll('link[href][rel="stylesheet"]').forEach((ln) => ln.remove());
}

type FragmentPage = {
	next?: string;
	nextChapter?: string;
	paragraphs: HTMLParagraphElement[];
};

async function fetchChaperFragmentPage(href: string): Promise<FragmentPage> {
	VM_log(`fetchChaperFragmentPage: ${href}`);
	const p = new Promise<FragmentPage>((resolve, reject) => {
		GM_xmlhttpRequest({
			method: 'GET',
			url: href,
			responseType: 'document',
			onload: (response) => {
				const doc = ensureDoc(response.response);
				const nestedCon = doc.querySelector('.content')!;
				VM_log('content', nestedCon.outerHTML);
				nestedCon.querySelectorAll('p').forEach((p) => {
					if (p.dataset.obf) {
						if (!p.textContent.trim()) {
							p.append(decode(p.dataset.obf));
						}
					}
				});
				const paragraphs = paragraphsFromElement(nestedCon);
				const prenexts = Array.from<HTMLAnchorElement>(doc.querySelectorAll('.readPage a'));
				let next: HTMLAnchorElement | undefined;
				let nextChapter: HTMLAnchorElement | undefined;

				for (const element of prenexts) {
					if (element instanceof HTMLAnchorElement) {
						if (element.textContent.includes('下一页')) {
							next = element;
							break;
						} else if (element.textContent.includes('下一章')) {
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

function getChapterPage(): Page {
	const con = document.querySelector('.content')!;
	con.className = '';
	const mainSection = disguiseParagraphs(con);

	const prenexts = Array.from<HTMLAnchorElement>(document.querySelectorAll('.readPage a'));
	const navigationBar: NavLinks = {};
	for (const element of prenexts) {
		if (element instanceof HTMLAnchorElement) {
			element.className = '';
			if (element.textContent.includes('上一章')) {
				element.innerHTML = '上一章';
				navigationBar.prevAnchor = element;
			} else if (element.textContent.includes('目录')) {
				element.innerHTML = '目录';
				navigationBar.infoAnchor = element;
			} else if (element.textContent.includes('下一章')) {
				element.innerHTML = '下一章';
				navigationBar.nextAnchor = element;
			}
		}
	}
	setAccessKeys(navigationBar);
	const breadcrumbBar = document.querySelector('.position')!;
	const title = document.querySelector('h1.title')?.textContent;
	const page = {
		breadcrumbBar,
		title,
		mainSection,
		navigationBar
	};

	return page;
}

function decode(s: string): string {
	var raw = atob(s);
	var bytes = new Uint8Array(raw.length);
	for (var i = 0; i < raw.length; i++) {
		bytes[i] = raw.charCodeAt(i) ^ ((i % 127) + 1);
	}
	// 用 TextDecoder 将 UTF-8 字节数组正确解码为字符串
	return new TextDecoder('utf-8').decode(bytes);
}
