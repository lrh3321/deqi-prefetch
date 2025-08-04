import { GM_addElement } from '$';
import { codeLang, coreLanguages, fakeCodeSnippet, inlineLengthMax } from './config';

let extendLanguageElement: HTMLScriptElement | null = null;
export function setupExtendLanguageSupport() {
	if (!coreLanguages.has(codeLang)) {
		console.log('loading language', codeLang);
		const src = `https://dev.prismjs.com/components/prism-${codeLang}.js`;
		if (extendLanguageElement?.src == src) {
			return;
		}
		extendLanguageElement?.remove();
		extendLanguageElement = GM_addElement('script', { src });
	}
}

export function disguiseToCode(container: Element) {
	/**
	 * 将文章段落伪装成代码显示
	 * @param container - 包含需要伪装的段落元素的容器
	 */
	const fakeCodes: string[] = fakeCodeSnippet.split('====');

	const getRandomCode = () => fakeCodes[Math.floor(Math.random() * fakeCodes.length)];

	var lines: string[] = [];
	const paragraphs = Array.from(container.querySelectorAll('p'));

	// 根据编程语言设置相应的注释符号
	let blockCommentStart = '/*';
	let blockCommentEnd = '*/';
	let shortCommnet = '';
	switch (codeLang) {
		case 'clike':
		case 'javascript':
		case 'c':
		case 'csharp':
		case 'cpp':
		case 'go':
		case 'java':
		case 'kotlin':
		case 'rust':
		case 'php':
			shortCommnet = '// ';
			break;
		case 'python':
			shortCommnet = '# ';
			break;
		case 'markup':
			blockCommentStart = '<!--';
			blockCommentEnd = '-->';
			break;
		default:
			break;
	}

	const codeSegments: string[] = [];
	paragraphs.forEach((p) => {
		const textContent = p.textContent!!.trim();
		let line = '';
		// 获取下一行有效代码
		while (line.trim() == '') {
			if (lines.length == 0) {
				lines.push(...getRandomCode().split(/[\r]?\n/));
			}
			line = lines.shift()!!;
			if (line.trim().length === 1) {
				codeSegments.push(line);
				line = '';
			}
		}

		// 处理缩进并根据长度决定使用行内注释还是块注释
		const trimed = line.replace(/^[\s\t]+/, '');
		if (trimed !== line) {
			const prefix = line.substring(0, line.length - trimed.length);
			if (
				textContent.length + shortCommnet.length + prefix.length < inlineLengthMax &&
				shortCommnet != ''
			) {
				codeSegments.push(`${prefix}${shortCommnet}${textContent}`);
			} else {
				codeSegments.push(
					`${prefix}${blockCommentStart}\n${prefix}  ${textContent}\n${prefix}${blockCommentEnd}`
				);
			}
		} else {
			if (textContent.length + shortCommnet.length < inlineLengthMax && shortCommnet != '') {
				codeSegments.push(`${shortCommnet}${textContent}`);
			} else {
				codeSegments.push(`${blockCommentStart}\n  ${textContent}\n${blockCommentEnd}`);
			}
		}

		codeSegments.push(line);
		p.remove();
	});

	codeSegments.push(...lines);
	const pre = createPreformattedCode(codeSegments.join('\n'));

	container.parentElement!!.replaceChild(pre, container);

	highlightElement(pre, false, (_) => {
		document.body.style.backgroundColor = getComputedStyle(pre).backgroundColor;
	});
}

/**
 * 创建一个预格式化的代码块元素
 * @param snippet - 要显示在代码块中的代码片段
 * @returns 包含代码的HTMLPreElement元素
 */
export function createPreformattedCode(snippet: string): HTMLPreElement {
	const code = document.createElement('code');
	code.className = `language-${codeLang} match-braces rainbow-braces`;
	code.style.whiteSpace = 'pre-wrap';
	code.style.textWrap = 'pretty';
	code.style.overflowX = 'auto';
	code.innerHTML = snippet;
	const pre = document.createElement('pre');
	pre.style.whiteSpace = 'pre-wrap';
	pre.style.textWrap = 'pretty';
	pre.style.overflowX = 'auto';
	pre.className = `language-${codeLang} match-braces rainbow-braces`;
	if (pre.firstChild) {
		pre.replaceChild(code, pre.firstChild);
	} else {
		pre.appendChild(code);
	}
	return pre;
}

/**
 * 高亮显示代码元素
 * @param el - 需要高亮显示的元素
 * @param async - 是否异步执行高亮操作
 * @param callback - 高亮操作完成后的回调函数
 */
export function highlightElement(
	el: Element,
	async?: boolean,
	callback?: (element: Element) => void
) {
	console.log(Prism.hooks.all['complete']);
	const codes = Array.from(el.querySelectorAll('code'));
	const highlightAll = () => {
		codes.forEach((code) => {
			Prism.highlightElement(code, async, callback);
		});
	};
	if (coreLanguages.has(codeLang)) {
		highlightAll();
	} else {
		let count = 0;
		const lazyHighlightElement = () => {
			count++;
			// 检查语言包是否已加载，如果已加载则执行高亮
			if (codeLang in Prism.languages) {
				highlightAll();
				return;
			}
			// 限制重试次数，避免无限循环
			if (count > 10) {
				return;
			}
			setTimeout(lazyHighlightElement, 200);
		};
		setTimeout(lazyHighlightElement, 200);
	}
}
