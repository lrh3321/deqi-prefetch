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
import { ensureDoc } from './utils';

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
	const articleMain = document.getElementById('ss-reader-main')!!;
	const settingForm = createSettingForm();
	articleMain.appendChild(settingForm);
}

function formatArticle() {
	const prevURL = document.getElementById('prev_url')!! as HTMLAnchorElement;
	const infoURL = document.getElementById('info_url')!! as HTMLAnchorElement;
	const nextURL = document.getElementById('next_url')!! as HTMLAnchorElement;

	prevURL.accessKey = previousChapterAccessKey;
	prevURL.ariaKeyShortcuts = `Alt+${previousChapterAccessKey}`;

	infoURL.accessKey = bookPageAccessKey;
	infoURL.ariaKeyShortcuts = `Alt+${bookPageAccessKey}`;

	nextURL.accessKey = nextChapterAccessKey;
	nextURL.ariaKeyShortcuts = `Alt+${nextChapterAccessKey}`;

	disguiseParagraphs(document.getElementById('article')!!);
	document.body.appendChild(document.getElementById('ss-reader-main')!!);
	cleanupBody();
}

function continueFetchPages(curDoc: Document) {
	const nextURL = curDoc.getElementById('next_url')!! as HTMLAnchorElement;
	if (nextURL.textContent.trim() == '下一章') {
		const t = document.getElementById('next_url')!! as HTMLAnchorElement;
		t.parentElement?.replaceChild(nextURL, t);
		formatArticle();
	} else {
		GM_xmlhttpRequest({
			method: 'GET',
			url: nextURL.href,
			responseType: 'document',
			onload: (response) => {
				const doc = ensureDoc(response.response);
				const article = document.getElementById('article')!!;
				const nextArticle = doc.getElementById('article')!!;
				const children = Array.from(nextArticle.children);
				children.forEach((child) => {
					article.appendChild(child);
				});

				continueFetchPages(doc);
			}
		});
	}
}

function handleChapterPage() {
	if (disguiseDebug) {
		disguiseParagraphs(document.getElementById('article')!!);
		return;
	}

	const readNav = document.querySelector('.read_nav');
	if (readNav) {
		readNav.remove();
	}

	continueFetchPages(document);
}

export function handleDDxiaoshuoRoute() {
	document.body.style.display = 'flex';
	document.body.style.justifyContent = 'center';

	const segments = location.pathname.split('/').filter(Boolean);
	const lastSegment = segments[segments.length - 1];
	switch (segments.length) {
		case 0:
			break;
		case 1:
			cleanBookPage();
			setupCodeTheme();
			setupExtendLanguageSupport();
			if (location.pathname == '/history.html') {
				handleSettingPage();
			}
			break;
		case 2:
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
