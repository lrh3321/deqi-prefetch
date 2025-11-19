import { disguiseParagraphs } from './code';
import {
	fetchChaperFragmentPage,
	isInIframe,
	paragraphsFromElement,
	rebuildChapterBody,
	VM_log
} from './utils';

export function handle81kswRoute() {
	VM_log('handle81kswRoute');

	if (/\/index\/[^/]+/.test(location.pathname)) {
		handleBookPage();
	} else if (/\/read\/[^/]+\/[^/]+/.test(location.pathname)) {
		handleChapterPage();
	}
}

export function is81kswLike() {
	const hostname = location.hostname;
	return hostname.endsWith('81ksw.com');
}

function handleBookPage() {
	VM_log('handleBookPage');
}

function handleChapterPage() {
	VM_log('handleChapterPage');

	const con = document.getElementById('content')!;
	const anchors = [
		document.getElementById('prev_url'),
		document.getElementById('info_url'),
		document.getElementById('next_url')
	].filter((it) => it && it instanceof HTMLAnchorElement) as HTMLAnchorElement[];
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
				let next = await fetchChaperFragmentPage(a.href, parseFragmentPage);
				con.append(...next.paragraphs);
				while (next.next && counter < 20) {
					counter++;
					next = await fetchChaperFragmentPage(next.next, parseFragmentPage);
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

	const ob = new MutationObserver((mutations: MutationRecord[]) => {
		mutations.forEach((mutation) => {
			if (mutation.type == 'childList') {
				mutation.addedNodes.forEach((it) => {
					if (it instanceof HTMLDivElement) {
						if (it.classList.length === 0) {
							it.remove();
						}
					}
				});
			}
		});
	});
	ob.observe(document.body, { childList: true });
}

function parseFragmentPage(doc: Document): FragmentPage {
	const nestedCon = doc.getElementById('content')!;
	VM_log('content', nestedCon.outerHTML);

	const paragraphs = paragraphsFromElement(nestedCon);
	const prenexts = [doc.getElementById('next_url')].filter(
		(it) => it && it instanceof HTMLAnchorElement
	) as HTMLAnchorElement[];
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

	return {
		next: next?.href,
		nextChapter: nextChapter?.href,
		paragraphs: paragraphs
	};
}

function getChapterPage(): Page {
	const con = document.querySelector('.content')!;
	con.className = '';
	const mainSection = disguiseParagraphs(con);
	const prenexts = [
		document.getElementById('prev_url'),
		document.getElementById('info_url'),
		document.getElementById('next_url')
	].filter((it) => it && it instanceof HTMLAnchorElement) as HTMLAnchorElement[];
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
	const breadcrumbBar = document.querySelector('div.layout-tit')!;
	breadcrumbBar.querySelector('.reader-fun')?.remove();
	const title = document.querySelector('h1.title')?.textContent;
	const page = {
		breadcrumbBar,
		title,
		mainSection,
		navigationBar
	};

	return page;
}
