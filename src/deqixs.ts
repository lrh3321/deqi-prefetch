import { GM_getValue } from '$';
import { disguiseParagraphs, setupExtendLanguageSupport } from './code';
import {
	bookPageAccessKey,
	createSettingForm,
	disguiseMode,
	nextChapterAccessKey,
	previousChapterAccessKey,
	refreshInterval,
	setupCodeTheme
} from './config';
import { isInIframe } from './utils';
function handleBookPage() {
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
	const settingForm = createSettingForm();
	const container = document.querySelector('div.container')!!;
	container.appendChild(settingForm);
}

function handleChaperPage() {
	const container = document.querySelector('div.container')!!;
	if (location.pathname.includes('-') && container && isInIframe) {
		const con = container.querySelector('div.con');

		let nextHref = '';
		let nextChapter = '';
		const prenexts = document.querySelectorAll('div.prenext a');
		for (const element of prenexts) {
			if (element instanceof HTMLAnchorElement) {
				if (element.textContent == '下一页') {
					nextHref = element.href;
					break;
				}
				if (element.textContent == '下一章') {
					nextChapter = element.href;
					break;
				}
			}
		}

		window.parent.postMessage({
			con: con!!.innerHTML,
			next: nextHref,
			nextChapter: nextChapter,
			href: location.href
		});
		return;
	}

	if (GM_getValue('disguiseDebug', false)) {
		disguiseParagraphs(document.querySelector('div.container .con')!!);
		return;
	}

	const prenexts = container.querySelectorAll('div.prenext a');

	window.addEventListener('message', (e) => {
		if (e.data.con) {
			const next = document.createElement('div');
			next.className = 'con';
			next.innerHTML = e.data.con;
			const container = document.querySelector('div.container .con')!!;
			next.querySelectorAll('p').forEach((p) => container.appendChild(p));
		}

		if (e.data.next) {
			const iframe = document.querySelector('iframe');
			if (iframe) {
				iframe.contentWindow!!.location.replace(e.data.next);
			}
		} else {
			console.debug('no next');
			if (!isInIframe && disguiseMode != 'none') {
				const container = document.querySelector('div.container .con')!!;
				disguiseParagraphs(container);
			}
			const iframe = document.querySelector('iframe');
			if (iframe) {
				iframe.remove();
			}

			const nextChapter = e.data.nextChapter;
			if (nextChapter) {
				for (const element of prenexts) {
					if (element instanceof HTMLAnchorElement) {
						if (element.textContent == '下一页') {
							element.href = nextChapter;
							if (nextChapter.endsWith('.html')) {
								element.innerText = '下一章';
								element.accessKey = nextChapterAccessKey;
								element.ariaKeyShortcuts = `Alt+${nextChapterAccessKey}`;
							} else {
								element.innerText = '返回目录';
							}
							break;
						}
					}
				}
			}
		}
	});

	for (const element of prenexts) {
		if (element instanceof HTMLAnchorElement) {
			if (element.textContent == '下一页') {
				const next = document.createElement('iframe');
				next.src = element.href;
				next.style.display = 'none';
				container && container.appendChild(next);
			} else if (element.textContent == '上一章') {
				element.accessKey = previousChapterAccessKey;
				element.ariaKeyShortcuts = `Alt+${previousChapterAccessKey}`;
			} else if (element.textContent == '目录') {
				element.accessKey = bookPageAccessKey;
				element.ariaKeyShortcuts = `Alt+${bookPageAccessKey}`;
			} else if (element.textContent == '下一章') {
				element.accessKey = nextChapterAccessKey;
				element.ariaKeyShortcuts = `Alt+${nextChapterAccessKey}`;
				if (!isInIframe && disguiseMode != 'none') {
					const container = document.querySelector('div.container .con')!!;
					disguiseParagraphs(container);
				}
			}
		}
	}
}
export function handleDeqiRoute() {
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
