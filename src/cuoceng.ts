import { GM_registerMenuCommand } from '$';
import { disguiseParagraphs, setupExtendLanguageSupport } from './code';
import { createSettingForm, disguiseMode, setupCodeTheme } from './config';
import { setAccessKeys } from './utils';

function handleChapterPage() {
	const showReading = document.getElementById('showReading')!!;

	const article = document.createElement('div');
	article.innerHTML = showReading.innerHTML;
	showReading.remove();

	const readcontent = document.getElementById('readcontent')!!;
	const bookTitle = readcontent.querySelector('.book_title')!!;
	const nextPageBox = document.querySelector('.nextPageBox')!!;

	const prevAnchor = nextPageBox.querySelector('.prev')!! as HTMLAnchorElement;
	const infoAnchor = nextPageBox.querySelector('.dir')!! as HTMLAnchorElement;
	const nextAnchor = nextPageBox.querySelector('.next')!! as HTMLAnchorElement;
	setAccessKeys({ prevAnchor, infoAnchor, nextAnchor });

	readcontent.appendChild(bookTitle);
	readcontent.appendChild(article);
	disguiseParagraphs(article);
	readcontent.appendChild(nextPageBox);

	const body = document.createElement('body');
	getComputedStyle(document.body);
	body.style = document.body.style.cssText;
	document.body = body;
	body.appendChild(readcontent);
}
function handleSettingPage() {
	const settingForm = createSettingForm();
	const articleMain = document.createElement('div');
	articleMain.id = 'article_main';
	articleMain.classList = 'container';
	const container = document.querySelector('.wrap_bg')!!;
	articleMain.appendChild(settingForm);
	container.appendChild(articleMain);
}
function cleanBookPage() {}

export function handleCuoCengRoute() {
	document.body.style.display = 'flex';
	document.body.style.flexDirection = 'column';
	document.body.style.justifyContent = 'center';

	const segments = location.pathname.split('/').filter(Boolean);
	switch (segments.length) {
		case 0:
			document.body.style.flexDirection = 'column';
			break;
		case 2:
			// 书页
			// /book/b5dd4ab4-6131-4867-9d80-d81ef7bcfe28.html
			cleanBookPage();
			setupCodeTheme();
			setupExtendLanguageSupport();
			handleSettingPage();
			break;
		case 3:
			if (location.pathname.startsWith('/book/chapter/')) {
				// 目录页
				GM_registerMenuCommand('脚本设置', function () {
					open(location.pathname.replace('/book/chapter/', '/book/'));
				});
				// /book/chapter/b5dd4ab4-6131-4867-9d80-d81ef7bcfe28.html
				return;
			}
			GM_registerMenuCommand('脚本设置', function () {
				open(location.pathname.replace(/\/[\d\w\-]+\.html/, '.html'));
			});
			// /book/b5dd4ab4-6131-4867-9d80-d81ef7bcfe28/1dec3f46-2e5a-4a3a-9a15-97c4e96c101e.html
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
