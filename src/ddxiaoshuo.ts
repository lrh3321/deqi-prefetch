import { disguiseParagraphs } from './code';
import { createSettingForm } from './config';
import {
	fetchChaperFragmentPage,
	isInIframe,
	paragraphsFromElement,
	rebuildChapterBody,
	VM_log
} from './utils';

function cleanupBody() {
	const children = Array.from(document.body.children).filter((it) => it.id != 'ss-reader-main');
	children.forEach((it) => {
		it.remove();
	});
}

function cleanBookPage() {
	const articleMain = document.createElement('div');
	articleMain.id = 'ss-reader-main';

	const containers = Array.from(document.body.querySelectorAll('.container'));
	containers.forEach((container) => {
		container.className = '';
		articleMain.appendChild(container);
	});
	document.body.appendChild(articleMain);
	cleanupBody();
}
function handleSettingPage() {
	const articleMain = document.getElementById('ss-reader-main')!;
	const settingForm = createSettingForm();
	articleMain.appendChild(settingForm);
}

export function handleDDxiaoshuoRoute() {
	document.body.style.display = 'flex';
	document.body.style.justifyContent = 'center';

	const segments = location.pathname.split('/').filter(Boolean);
	const lastSegment = segments[segments.length - 1];
	switch (segments.length) {
		case 0:
			document.body.style.flexDirection = 'column';
			break;
		case 1:
			cleanBookPage();
			if (location.pathname == '/history.html') {
				handleSettingPage();
			}
			break;
		case 2:
			if (/[\d\w]+_\d+$/.test(lastSegment)) {
				// 不是章节首页
				return;
			}
			handleChapterPage();
			break;
		default:
			break;
	}
}

function handleChapterPage() {
	VM_log('handleChapterPage');

	const con = document.getElementById('article')!;
	let multiPage = false;
	if (isInIframe) {
		return;
	}
	const a = document.getElementById('next_url') as HTMLAnchorElement | null;

	if (a) {
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
}

function parseFragmentPage(doc: Document): FragmentPage {
	const nestedCon = doc.getElementById('article')!;
	VM_log('content', nestedCon.outerHTML);

	const paragraphs = paragraphsFromElement(nestedCon);

	let next: HTMLAnchorElement | undefined;
	let nextChapter: HTMLAnchorElement | undefined;

	const element = doc.getElementById('next_url');
	if (element) {
		if (element instanceof HTMLAnchorElement) {
			if (element.textContent.includes('下一页')) {
				next = element;
			} else if (element.textContent.includes('下一章')) {
				nextChapter = element;
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
	let con = document.getElementById('article')!;
	con.className = '';
	if (con.tagName == 'ARTICLE') {
		const d = document.createElement('div');
		d.innerHTML = con.innerHTML;
		con.replaceWith(d);
		con = d;
	}
	const mainSection = disguiseParagraphs(con);

	const prenexts = [
		document.getElementById('prev_url') as HTMLAnchorElement | null,
		document.getElementById('info_url') as HTMLAnchorElement | null,
		document.getElementById('next_url') as HTMLAnchorElement | null
	];
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
	const breadcrumbBar = document.querySelector('.info-title') as HTMLElement;
	const title = document.title.split('-').shift();
	const page = {
		breadcrumbBar,
		title,
		mainSection,
		navigationBar
	};

	return page;
}
