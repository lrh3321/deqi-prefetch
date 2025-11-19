import { GM_addElement, GM_getValue } from '$';
import { codeLang, codeShowLineNumbers, disguiseMode, inlineLengthMax } from './config';
import { updateStyle } from './utils';

let extendLanguageElement: HTMLScriptElement | null = null;

export function setupExtendLanguageSupport() {
	if (__LITE__) {
		return;
	}
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

function disguiseToCode(container: Element): HTMLPreElement {
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
		const textContent = p.textContent!.trim();
		let line = '';
		// 获取下一行有效代码
		while (line.trim() == '') {
			if (lines.length == 0) {
				lines.push(...getRandomCode().split(/[\r]?\n/));
			}
			line = lines.shift()!;
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

	container.parentElement!.replaceChild(pre, container);

	highlightElement(pre, false, () => {
		updateStyle(pre);
	});
	return pre;
}

export function disguiseParagraphs(container: Element): Element {
	if (__LITE__) {
		return container;
	}

	switch (disguiseMode) {
		case 'none':
			(container as HTMLElement).style.fontSize = 'var(--novel-font-size)';
			(container as HTMLElement).style.fontFamily = 'var(--novel-font-family)';
			break;
		case 'code':
		default:
			// 伪装成代码
			return disguiseToCode(container);
	}
	return container;
}

/**
 * 创建一个预格式化的代码块元素
 * @param snippet - 要显示在代码块中的代码片段
 * @returns 包含代码的HTMLPreElement元素
 */
export function createPreformattedCode(snippet: string): HTMLPreElement {
	const code = document.createElement('code');
	code.className = `language-${codeLang} match-braces rainbow-braces`;
	// code.style.whiteSpace = 'pre-wrap';
	// code.style.textWrap = 'pretty';
	// code.style.overflowX = 'auto';
	code.innerHTML = snippet;
	const pre = document.createElement('pre');
	pre.style.whiteSpace = 'pre-wrap';
	pre.style.textWrap = 'pretty';
	pre.style.overflowX = 'auto';
	pre.className = `language-${codeLang} match-braces rainbow-braces ${codeShowLineNumbers ? 'line-numbers' : ''}`;
	// console.log(pre.className, codeShowLineNumbers);
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
	if (import.meta.env.LITE === 'ON') {
		return;
	}
	if (el instanceof HTMLElement) {
		el.style.fontSize = 'var(--novel-font-size)';
	}
	// console.log(Prism.hooks.all['complete']);
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

export const avalibleCodeThemes = [
	{ Name: 'Default', code: 'prism' },
	{ Name: 'Dark', code: 'prism-dark' },
	{ Name: 'Funky', code: 'prism-funky' },
	{ Name: 'Okaidia', code: 'prism-okaidia' },
	{ Name: 'Twilight', code: 'prism-twilight' },
	{ Name: 'Coy', code: 'prism-coy' },
	{ Name: 'Solarized Light', code: 'prism-solarizedlight' },
	{ Name: 'Tomorrow Night', code: 'prism-tomorrow' },
	// A wider selection of Prism themes
	{ Name: 'CB', code: 'prism-cb' },
	{ Name: 'GHColors', code: 'prism-ghcolors' },
	{ Name: 'Pojoaque', code: 'prism-pojoaque' },
	{ Name: 'Xonokai', code: 'prism-xonokai' },
	{ Name: 'Ateliersulphurpool-light', code: 'prism-base16-ateliersulphurpool.light' },
	{ Name: 'Hopscotch', code: 'prism-hopscotch' },
	{ Name: 'Atom Dark', code: 'prism-atom-dark' },
	{ Name: 'Duotone Dark', code: 'prism-duotone-dark' },
	{ Name: 'Duotone Sea', code: 'prism-duotone-sea' },
	{ Name: 'Duotone Space', code: 'prism-duotone-space' },
	{ Name: 'Duotone Earth', code: 'prism-duotone-earth' },
	{ Name: 'Duotone Forest', code: 'prism-duotone-forest' },
	{ Name: 'Duotone Light', code: 'prism-duotone-light' },
	{ Name: 'VS', code: 'prism-vs' },
	{ Name: 'VS Code Dark+', code: 'prism-vsc-dark-plus' },
	{ Name: 'Darcula', code: 'prism-darcula' },
	{ Name: 'a11y Dark', code: 'prism-a11y-dark' },
	{ Name: 'Dracula', code: 'prism-dracula' },
	{ Name: "Synthwave '84", code: 'prism-synthwave84' },
	{ Name: 'Shades of Purple', code: 'prism-shades-of-purple' },
	{ Name: 'Material Dark', code: 'prism-material-dark' },
	{ Name: 'Material Light', code: 'prism-material-light' },
	{ Name: 'Material Oceanic', code: 'prism-oceanic' },
	{ Name: 'Nord', code: 'prism-nord' },
	{ Name: 'Coldark Cold', code: 'prism-coldark-cold' },
	{ Name: 'Coldark Dark', code: 'prism-coldark-dark' },
	{ Name: 'Coy without shadows', code: 'prism-coy-without-shadows' },
	{ Name: 'Gruvbox Dark', code: 'prism-gruvbox-dark' },
	{ Name: 'Gruvbox Light', code: 'prism-gruvbox-light' },
	{ Name: 'Lucario', code: 'prism-lucario' },
	{ Name: 'Night Owl', code: 'prism-night-owl' },
	{ Name: 'Holi Theme', code: 'prism-holi-theme' },
	{ Name: 'Z-Touch', code: 'prism-z-touch' },
	{ Name: 'Solarized Dark Atom', code: 'prism-solarized-dark-atom' },
	{ Name: 'One Dark', code: 'prism-one-dark' },
	{ Name: 'One Light', code: 'prism-one-light' },
	{ Name: 'Laserwave', code: 'prism-laserwave' }
];

export const avalibleCodeLanguages = [
	{ Name: 'Markup — markup, html, xml, svg, mathml, ssml, atom, rss', code: 'markup' },
	{ Name: 'CSS — css', code: 'css' },
	{ Name: 'C-like — clike', code: 'clike' },
	{ Name: 'JavaScript — javascript, js', code: 'javascript' },

	{ Name: 'C —c', code: 'c' },
	{ Name: 'C# —csharp, cs, dotnet', code: 'csharp' },
	{ Name: 'C++ —cpp', code: 'cpp' },
	{ Name: 'Go —go', code: 'go' },
	{ Name: 'Java —java', code: 'java' },
	{ Name: 'Kotlin —kotlin, kt, kts', code: 'kotlin' },
	{ Name: 'PHP —php', code: 'php' },
	{ Name: 'Python —python, py', code: 'python' },
	{ Name: 'Rust —rust', code: 'rust' }
];

export const coreLanguages = new Set(['markup', 'css', 'clike', 'javascript']);

const defaultCodeSnippet = `var x = 1;
switch (x) {
  case 1:
    console.log('x 等于1');
  case 2:
    console.log('x 等于2');
  default:
    console.log('x 等于其他值');
}
====
switch (x) {
  case 1:
    console.log('x 等于1');
    break;
  case 2:
    console.log('x 等于2');
    break;
  default:
    console.log('x 等于其他值');
}
====
switch (1 + 3) {
  case 2 + 2:
    f();
    break;
  default:
    neverHappens();
}
====
var x = 1;
switch (x) {
  case true:
    console.log('x 发生类型转换');
    break;
  default:
    console.log('x 没有发生类型转换');
}
`;
export let fakeCodeSnippet = GM_getValue<string>('fake-codes', defaultCodeSnippet);
if (fakeCodeSnippet.trim() == '') {
	fakeCodeSnippet = defaultCodeSnippet;
}
if (__LITE__) {
	fakeCodeSnippet = '';
}
