import { GM_xmlhttpRequest } from '$';
import { disguiseParagraphs } from './code';
import {
	ensureDoc,
	NavLinks,
	paragraphsFromElement,
	rebuildChapterBody,
	setAccessKeys,
	VM_log
} from './utils';

export function handleKudushuRoute() {
	VM_log('handleKudushuRoute');

	if (
		/\/book\/[^/]+/.test(location.pathname) ||
		/\/html\/[^/]+\/[^/]+\/index\.html/.test(location.pathname)
	) {
		handleBookPage();
	} else if (
		/\/html\/[^/]+\/[^/]+/.test(location.pathname) ||
		/\/html\/[^/]+\/[^/]+\/[^/]+\.html/.test(location.pathname)
	) {
		handleChapterPage();
	}
}

function handleBookPage() {
	VM_log('handleBookPage');
}

function handleChapterPage() {
	VM_log('handleChapterPage');

	const container = document.getElementById('novelcontent')!;
	const ul = document.querySelector('ul')!;
	if (ul) {
		document.getElementById('novelbody')?.append(ul);
	}
	const prenexts = Array.from(container.querySelectorAll('#novelcontent ul li a'))
		.filter((it) => it instanceof HTMLAnchorElement)
		.map((it) => it.cloneNode(true) as HTMLAnchorElement);

	container.querySelector('ul')?.remove();
	document.getElementById('content_tip')?.remove();

	const con = container!;
	const paragraphs = paragraphsFromElement(con);

	con.replaceChildren(
		...paragraphs.filter((p) => p.textContent.length > 0 && !p.textContent.includes('本章未完'))
	);

	for (const element of prenexts) {
		if (element instanceof HTMLAnchorElement) {
			if (element.textContent == '下—页') {
				void (async () => {
					let counter = 0;
					let next = await fetchChaperFragmentPage(element.href);
					con.append(...next.paragraphs);
					while (next.next && counter < 20) {
						counter++;
						next = await fetchChaperFragmentPage(next.next);
						con.append(...next.paragraphs);
					}
					if (next.nextChapter) {
						Array.from(document.querySelectorAll('#novelbody ul li p a')).forEach((a) => {
							console.log('UL', a.outerHTML);
							if (a instanceof HTMLAnchorElement && a.textContent.includes('下')) {
								a.textContent = '下一章';
								a.href = next.nextChapter || a.href;
							}
						});
						element.textContent = '下一章';
						element.href = next.nextChapter;
					}
					const page = getChapterPage();
					rebuildChapterBody(page);
				})();
				break;
			} else if (element.textContent == '下—章') {
				(() => {
					const page = getChapterPage();
					rebuildChapterBody(page);
				})();
				break;
			}
		}
	}
}

type FragmentPage = {
	next?: string;
	nextChapter?: string;
	paragraphs: HTMLParagraphElement[];
};

async function fetchChaperFragmentPage(href: string): Promise<FragmentPage> {
	VM_log('fetchChaperFragmentPage', href);
	const p = new Promise<FragmentPage>((resolve, reject) => {
		GM_xmlhttpRequest({
			method: 'GET',
			url: href,
			responseType: 'document',
			onload: (response) => {
				const doc = ensureDoc(response.response);
				const container = doc.getElementById('novelcontent')!;
				const nestedCon = container;

				const ul = container.querySelector('ul')!;
				ul.remove();

				const paragraphs = paragraphsFromElement(nestedCon);

				const prenexts = ul.querySelectorAll('ul li a');
				let next: HTMLAnchorElement | undefined;
				let nextChapter: HTMLAnchorElement | undefined;

				for (const element of prenexts) {
					if (element instanceof HTMLAnchorElement) {
						if (element.textContent == '下—页') {
							next = element;
							break;
						} else if (element.textContent == '下—章') {
							nextChapter = element;
							nextChapter.textContent = '下一章';
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
					paragraphs: paragraphs?.filter(
						(p) => p.textContent.length > 0 && !p.textContent.includes('本章未完')
					)
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

function getChapterPage() {
	const con = document.getElementById('novelcontent')!;
	con.className = '';
	con.id = '';
	const mainSection = disguiseParagraphs(con);

	let content_tip = document.getElementById('content_tip');
	while (content_tip) {
		content_tip.remove();
		content_tip = document.getElementById('content_tip');
	}

	const title = document.getElementById('chaptertitle')?.textContent;
	const prenexts = Array.from(document.querySelectorAll('#novelbody ul li p a')).map(
		(a) => a.cloneNode(true) as HTMLAnchorElement
	);
	const navigationBar: NavLinks = {};
	for (const element of prenexts) {
		if (element.textContent == '上一章' || element.textContent.includes('上')) {
			element.textContent = '上—章';
			navigationBar.prevAnchor = element;
		} else if (
			element.textContent == '目录' ||
			element.textContent == '章节目录' ||
			element.textContent == '返 回 目 录' ||
			element.textContent.includes('录')
		) {
			element.textContent = '目录';
			navigationBar.infoAnchor = element;
		} else if (element.textContent == '下一章') {
			navigationBar.nextAnchor = element;
		} else {
			console.log(element.outerHTML);
		}
	}
	setAccessKeys(navigationBar);
	const page = {
		mainSection,
		title,
		navigationBar
	};

	return page;
}
