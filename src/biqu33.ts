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
import { isInIframe } from './utils';

function handleSettingPage() {
	const settingForm = createSettingForm();
	const articleMain = document.createElement('div');
	articleMain.id = 'article_main';
	articleMain.classList = 'container';
	const container = document.getElementById('main')!!;
	articleMain.appendChild(settingForm);
	container.appendChild(articleMain);
}
function handleChapterPage() {
	if (isInIframe) {
		const mainboxs = document.getElementById('mainboxs');
		window.parent.postMessage({
			mainboxs: mainboxs?.innerHTML,
			href: location.href
		});
		return;
	}

	if (disguiseDebug) {
		disguiseParagraphs(document.getElementById('mainboxs')!!);
		return;
	}

	const nextLinks = Array.from(
		document.querySelectorAll('#page-links a.post-page-numbers')
	) as HTMLAnchorElement[];
	const netxDivs = new Array<string | undefined>(nextLinks.length);
	let remainLinks = nextLinks.length;
	for (let index = 0; index < nextLinks.length; index++) {
		const element = nextLinks[index];
		GM_xmlhttpRequest({
			method: 'GET',
			url: element.href,
			responseType: 'document',
			onload: (response) => {
				const div = response.response.getElementById('mainboxs')!!;
				netxDivs[index] = div.innerHTML;
				console.log(div, netxDivs);
				element.remove();
				remainLinks--;
				if (remainLinks == 0) {
					const mainboxs = document.getElementById('mainboxs')!!;
					netxDivs.forEach((div) => {
						const next = document.createElement('div');
						next.innerHTML = div!!;
						mainboxs.appendChild(next);
					});

					const main = document.getElementById('article_main');
					if (main) {
						main.appendChild(document.querySelector('div.page-links')!!);
						main.appendChild(mainboxs);
						main.appendChild(document.querySelector('div.prenext')!!);
						main.appendChild(document.querySelector('div.post-content')!!);
						main.querySelectorAll('.page-links, .post-content');
					}
					disguiseParagraphs(mainboxs);
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
}

export function handleBiqu33Route() {
	switch (location.pathname.split('/').length) {
		case 2:
		case 4:
			setupCodeTheme();
			setupExtendLanguageSupport();
			handleSettingPage();
			break;
		case 5:
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
			handleChapterPage();
			break;
		default:
			break;
	}
}
