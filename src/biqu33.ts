import { disguiseParagraphs } from './code';
import {
	ensureDoc,
	fetchChaperFragmentPage,
	isInIframe,
	paragraphsFromElement,
	rebuildChapterBody,
	VM_log
} from './utils';

export function handleBiqu33Route() {
	if (document.documentElement.lang == 'zh-TW') {
		document.documentElement.lang = 'zh-CN';
	}
	const segments = location.pathname.split('/').filter(Boolean);
	const lastSegment = segments[segments.length - 1];
	switch (segments.length) {
		case 0:
		case 1:
		case 2:
			if (segments.length == 2 && (segments[0] == 'book' || segments[0] == 'xs')) {
				// bookID = segments[1];
				handleBookPage();
			}
			break;
		case 3:
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

function handleBookPage() {}

function mergeCanvases(canvases: HTMLCanvasElement[]): HTMLCanvasElement | undefined {
	VM_log('canvases', canvases.length);
	canvases = canvases.filter((c) => c.width > 0 && c.height > 0);
	VM_log('canvases trimed', canvases.length);
	if (canvases.length == 0) {
		return undefined;
	}
	const result = document.createElement('canvas');
	let totalWidth = 0,
		totalHeight = 0;
	canvases.forEach((canvas) => {
		totalHeight += canvas.height;
		totalWidth = Math.max(totalWidth, canvas.width);
	});
	result.width = totalWidth;
	result.height = totalHeight;

	let heightOffset = 0;
	canvases.forEach((canvas) => {
		const ctx = result.getContext('2d');
		ctx?.drawImage(canvas, 0, heightOffset);
		heightOffset += canvas.height;
	});

	return result;
}

function getCanvasScript(doc: Document | string): HTMLScriptElement | undefined {
	const document = ensureDoc(doc);
	let scriptCopy: HTMLScriptElement | undefined = undefined;
	const scripts = Array.from(document.body.querySelectorAll('script:not([src])'));
	scripts.forEach((script) => {
		if (typeof scriptCopy != 'undefined') {
			return;
		}
		if (script.innerHTML.includes(`if(!isMobile)`) && !script.innerHTML.includes(`qrcode`)) {
			// 有手机浏览器限制
			console.log('有手机浏览器限制');
			scriptCopy = document.createElement('script');
			scriptCopy.innerHTML = script.innerHTML.split(';').join(';\r\n');
			return;
		}
	});
	if (typeof scriptCopy == 'undefined') {
		scripts.forEach((script) => {
			if (typeof scriptCopy != 'undefined') {
				return;
			}
			if (script.innerHTML.includes(`display_img_line`)) {
				scriptCopy = document.createElement('script');
				scriptCopy.innerHTML = script.innerHTML;
			}
		});
	}
	return scriptCopy;
}

function canvasToImage(canvas: HTMLCanvasElement): HTMLImageElement {
	const image = new Image();
	image.src = canvas.toDataURL();
	image.style.visibility = 'visible';
	return image;
}

const scriptCopyArray: HTMLScriptElement[] = [];
const styleSet = new Set<string>();
function handleChapterPage() {
	VM_log('handleChapterPage');

	const con = document.getElementById('txtbody')!;
	const page = parseFragmentPageURL(document);

	let multiPage = false;
	if (isInIframe) {
		return;
	}

	if (page.next) {
		const href = page.next;
		multiPage = true;
		void (async () => {
			let counter = 0;
			let next = await fetchChaperFragmentPage(href, parseFragmentPage);
			con.append(...next.paragraphs);
			while (next.next && counter < 20) {
				counter++;
				next = await fetchChaperFragmentPage(next.next, parseFragmentPage);
				VM_log(`result: ${href} ${next.paragraphs.length}`);
				con.append(...next.paragraphs);
			}

			rebuild();
		})();
	} else if (page.nextChapter) {
		(() => {
			rebuild();
		})();
		multiPage = true;
	}

	if (!multiPage) {
		rebuild();
	}
}

function appendImage() {
	const con = document.getElementById('txtbody')!;
	const merged = mergeCanvases(
		Array.from(con.querySelectorAll('table canvas')).filter((c) => {
			if (c instanceof HTMLCanvasElement) {
				return c.width > 0 && c.height > 0;
			}
			return false;
		}) as HTMLCanvasElement[]
	);
	if (merged) {
		con.append(canvasToImage(merged));
	}
	con.querySelectorAll('table').forEach((t) => t.remove());
}

function rebuild() {
	const con = document.getElementById('txtbody')!;
	const loading = con.querySelector('[id^="loading_peu_p_"]');
	if (loading) {
		VM_log('loading');
		const ob = new MutationObserver((mutations: MutationRecord[]) => {
			mutations.forEach((mutation) => {
				if (mutation.type == 'childList') {
					if (mutation.removedNodes.length > 0) {
						if (!con.querySelector('[id^="loading_peu_p_"]')) {
							ob.disconnect();
							setTimeout(rebuild, 20);
						}
					}
				}
			});
		});
		ob.observe(loading.parentElement!, { childList: true });
		return;
	}
	if (scriptCopyArray.length > 0) {
		appendImage();

		const thisWin = document.defaultView as docThis;
		thisWin.isMobile = true;
		const s = scriptCopyArray.shift()!;
		document.body.appendChild(s);
		VM_log(s.innerHTML);

		VM_log('wait loading');
		setTimeout(rebuild, 100);
		s.remove();
		return;
	}
	appendImage();

	const page = getChapterPage();
	rebuildChapterBody(page);
}

function parseFragmentPageURL(doc: Document): PageURL {
	let next: HTMLAnchorElement | undefined;
	let nextChapter = doc.getElementById('u_next') as HTMLAnchorElement | null;

	const span = doc.querySelector('#pageseg > span');
	if (span) {
		const nextElementSibling = span.nextElementSibling;
		if (nextElementSibling && nextElementSibling instanceof HTMLAnchorElement) {
			next = nextElementSibling;
		}
	}

	return {
		next: next?.href,
		nextChapter: nextChapter?.href
	};
}

function parseFragmentPage(doc: Document): FragmentPage {
	const nestedCon = doc.getElementById('txtbody')!;
	VM_log('content', nestedCon.outerHTML);

	const paragraphs = paragraphsFromElement(nestedCon);
	// 判断是否为 canvas 页
	if (!nestedCon.firstElementChild) {
		VM_log('image page');
		let scriptCopy = getCanvasScript(doc);
		if (scriptCopy) {
			scriptCopyArray.push(scriptCopy);
		}
	} else {
		VM_log('text page');
		doc.body.querySelectorAll('style').forEach((s) => {
			if (styleSet.has(s.innerHTML)) {
				return;
			}
			document.head.append(s);
			styleSet.add(s.innerHTML);
		});
	}

	return {
		...parseFragmentPageURL(doc),
		paragraphs: paragraphs
	};
}

function getChapterPage(): Page {
	const con = document.getElementById('txtbody')!;
	con.className = '';

	const mainSection = disguiseParagraphs(con);

	const prenexts = Array.from<HTMLAnchorElement>(document.querySelectorAll('.rdpg > a'));
	const navigationBar: NavLinks = {};
	for (const element of prenexts) {
		if (element instanceof HTMLAnchorElement) {
			element.className = '';
			const textContent = element.textContent;
			if (textContent.includes('上一章')) {
				element.innerHTML = '上一章';
				navigationBar.prevAnchor = element;
			} else if (textContent.includes('目') && textContent.includes('录')) {
				element.innerHTML = '目录';
				navigationBar.infoAnchor = element;
			} else if (textContent.includes('下一章')) {
				element.innerHTML = '下一章';
				navigationBar.nextAnchor = element;
			}
		}
	}
	const breadcrumbBar = document.querySelector('.crumb')!;
	const title = document.querySelector('h1.rd-ttl')?.textContent;
	const page = {
		breadcrumbBar,
		title,
		mainSection,
		navigationBar
	};

	return page;
}

type docThis = (WindowProxy & typeof globalThis) & { isMobile?: boolean; cenabled(): boolean };
