import { GM_addElement, GM_getValue, GM_setValue } from '$';
import { setupExtendLanguageSupport } from './code';
import { EditableList, setupEditableList } from './editable-list';
import { getCodeThemeURL } from './utils';

// 是否伪装成代码
export let disguiseMode = GM_getValue<DisguiseMode>('disguise-mode', 'none');
export let codeLang = GM_getValue<string>('code-lang', 'javascript');
export const defaultCodeSnippet = `var x = 1;
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

export let codeTheme = GM_getValue('code-theme', 'prism');
export let codeParagraphItalic = GM_getValue('code-italic', true);

export let refreshInterval = GM_getValue('refreshInterval', 15 * 60000);

const avalibleCodeThemes = [
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

const avalibleCodeLanguages = [
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

export function changeCodeTheme(theme: string) {
	GM_setValue('code-theme', theme);
	codeTheme = theme;
	codeThemeElement?.remove();
	codeThemeElement = GM_addElement(document.head, 'link', {
		href: getCodeThemeURL(theme),
		rel: 'stylesheet',
		type: 'text/css'
	});
}

let codeThemeElement: HTMLStyleElement | null = null;

export function setupCodeTheme() {
	codeThemeElement = GM_addElement(document.head, 'link', {
		href: getCodeThemeURL(codeTheme),
		rel: 'stylesheet',
		type: 'text/css'
	});

	if (!codeParagraphItalic) {
		document.body.dataset.comment = 'normal';
	}
}

export let bookPageAccessKey = GM_getValue('bookPageAccessKey', 'h');
export let previousChapterAccessKey = GM_getValue('previousChapterAccessKey', 'b');
export let nextChapterAccessKey = GM_getValue('nextChapterAccessKey', 'n');

function createAccessKeysFieldset(): HTMLFieldSetElement {
	const accessKeysFieldset = document.createElement('fieldset');
	accessKeysFieldset.innerHTML = `<legend>快捷键设置
	<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/accesskey#%E5%B0%9D%E8%AF%95%E4%B8%80%E4%B8%8B" target="_blank" style="margin-left: 5rem;">快捷键使用帮助</a>
</legend>
<div style="display: flex;gap: 1rem;">
    <label>上一章:
        <select id="previousChapterAccessKey"></select>
    </label>
    <label>目录:
        <select id="bookPageAccessKey"></select>
    </label>
    <label>下一章:
        <select id="nextChapterAccessKey"></select>
    </label>
</div>`;
	const previousChapterAccessKey = accessKeysFieldset.querySelector<HTMLSelectElement>(
		'#previousChapterAccessKey'
	)!!;
	const bookPageAccessKey =
		accessKeysFieldset.querySelector<HTMLSelectElement>('#bookPageAccessKey')!!;
	const nextChapterAccessKey =
		accessKeysFieldset.querySelector<HTMLSelectElement>('#nextChapterAccessKey')!!;

	for (let i = 0; i < 10; i++) {
		const option = document.createElement('option');
		const charCode = 48 + i; // '0' is 97 in ASCII
		option.value = String.fromCharCode(charCode);
		option.text = String.fromCharCode(charCode);
		previousChapterAccessKey.appendChild(option);
		bookPageAccessKey.appendChild(option.cloneNode(true));
		nextChapterAccessKey.appendChild(option.cloneNode(true));
	}

	for (let i = 0; i < 26; i++) {
		const option = document.createElement('option');
		const charCode = 97 + i; // 'a' is 97 in ASCII
		option.value = String.fromCharCode(charCode);
		option.text = String.fromCharCode(charCode);
		previousChapterAccessKey.appendChild(option);
		bookPageAccessKey.appendChild(option.cloneNode(true));
		nextChapterAccessKey.appendChild(option.cloneNode(true));
	}

	bookPageAccessKey.value = GM_getValue('bookPageAccessKey', 'h');
	previousChapterAccessKey.value = GM_getValue('previousChapterAccessKey', 'b');
	nextChapterAccessKey.value = GM_getValue('nextChapterAccessKey', 'n');

	previousChapterAccessKey.onchange = () => {
		if (previousChapterAccessKey.selectedOptions.length > 0) {
			GM_setValue('previousChapterAccessKey', previousChapterAccessKey.value);
		}
	};

	bookPageAccessKey.onchange = () => {
		if (bookPageAccessKey.selectedOptions.length > 0) {
			GM_setValue('bookPageAccessKey', bookPageAccessKey.value);
		}
	};

	nextChapterAccessKey.onchange = () => {
		if (nextChapterAccessKey.selectedOptions.length > 0) {
			GM_setValue('nextChapterAccessKey', nextChapterAccessKey.value);
		}
	};

	return accessKeysFieldset;
}

export let inlineLengthMax = GM_getValue('inlineLengthMax', 40);

function createDisguiseCodeFieldset(): HTMLFieldSetElement {
	setupExtendLanguageSupport();
	const disguiseFieldset = document.createElement('fieldset');
	const codeThemeInput = document.createElement('select');
	codeThemeInput.name = 'theme';
	avalibleCodeThemes.forEach((theme) => {
		const option = document.createElement('option');
		option.value = theme.code;
		option.text = theme.Name;
		codeThemeInput.appendChild(option);
	});
	codeThemeInput.value = codeTheme;
	codeThemeInput.onchange = () => {
		console.log('change');
		const theme = codeThemeInput.value;
		if (codeThemeInput.selectedIndex >= 0 && theme && theme != codeTheme) {
			console.log(`Change code theme to ${theme}`);
			changeCodeTheme(theme);
		}
	};

	let editableList: EditableList | null = null;

	const codeThemeLabel = document.createElement('label');
	codeThemeLabel.innerText = '代码主题：';
	codeThemeLabel.appendChild(codeThemeInput);
	disguiseFieldset.appendChild(codeThemeLabel);

	const codeLangInput = document.createElement('select');
	codeLangInput.name = 'lang';
	avalibleCodeLanguages.forEach((theme) => {
		const option = document.createElement('option');
		option.value = theme.code;
		option.text = theme.Name;
		codeLangInput.appendChild(option);
	});
	codeLangInput.value = codeLang;
	codeLangInput.onchange = () => {
		if (codeLangInput.selectedIndex >= 0) {
			codeLang = codeLangInput.value;
			GM_setValue('code-lang', codeLang);
			setupExtendLanguageSupport();
			editableList?.render();
		}
	};

	const codeLangLabel = document.createElement('label');
	codeLangLabel.innerText = '代码语言：';
	codeLangLabel.style.marginLeft = '0.5rem';
	codeLangLabel.appendChild(codeLangInput);
	disguiseFieldset.appendChild(codeLangLabel);

	const codeItalicInput = document.createElement('input');
	codeItalicInput.type = 'checkbox';
	codeItalicInput.name = 'font-italic';
	codeItalicInput.checked = codeParagraphItalic;
	codeItalicInput.onchange = () => {
		const checked = codeItalicInput.checked;
		GM_setValue('code-italic', checked);
		if (checked) {
			document.body.dataset.comment = undefined;
		} else {
			document.body.dataset.comment = 'normal';
		}
	};

	const codeInlineLengthInput = document.createElement('input');
	codeInlineLengthInput.name = 'comment-lenth-limit';
	codeInlineLengthInput.type = 'number';
	codeInlineLengthInput.min = '15';
	codeInlineLengthInput.max = '200';
	codeInlineLengthInput.valueAsNumber = inlineLengthMax;
	codeInlineLengthInput.onchange = () => {
		GM_setValue('inlineLengthMax', codeInlineLengthInput.value);
	};

	const codeInlineLengthLabel = document.createElement('label');
	codeInlineLengthLabel.innerText = '单行注释长度限制：';
	codeInlineLengthLabel.appendChild(codeInlineLengthInput);
	disguiseFieldset.appendChild(codeInlineLengthLabel);

	const codeItalicLabel = document.createElement('label');
	codeItalicLabel.style.marginLeft = '0.5rem';
	codeItalicLabel.appendChild(codeItalicInput);
	codeItalicLabel.append(' 小说斜体');
	disguiseFieldset.appendChild(codeItalicLabel);

	const demoCodeTitle = document.createElement('h3');
	demoCodeTitle.innerText = '主题效果：';
	disguiseFieldset.appendChild(demoCodeTitle);
	const preDemo = document.createElement('pre');
	preDemo.innerHTML = `<code class="language-javascript"><span class="token comment">/*
	让我们说中文
 */</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">bar</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 短的注释</span>
	<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">,</span>
		b <span class="token operator">=</span> <span class="token string">'Prism'</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> a <span class="token operator">+</span> <span class="token function">bar</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code>`;
	preDemo.className = 'language-javascript';
	disguiseFieldset.appendChild(preDemo);

	setupEditableList();

	setTimeout(() => {
		editableList = document.createElement('editable-list') as EditableList;
		disguiseFieldset.appendChild(editableList);
		editableList.updateCodeSnippets(fakeCodeSnippet.split('====\n'));

		const onItemChange = () => {
			GM_setValue('fake-codes', editableList?.codeSnippets.join('====\n'));
		};
		editableList.addEventListener('add-item', onItemChange);
		editableList.addEventListener('remove-item', onItemChange);
	}, 500);

	return disguiseFieldset;
}

export let containerWidth = GM_getValue('container-width', '1200px');

function createContainerStyleFieldset(): HTMLFieldSetElement {
	const containerStyleFieldset = document.createElement('fieldset');

	const legend = document.createElement('legend');
	legend.innerText = '正文式样';
	containerStyleFieldset.appendChild(legend);

	const widthInput = document.createElement('input');
	widthInput.value = containerWidth;
	widthInput.style.width = '4rem';
	widthInput.onchange = () => {
		containerWidth = widthInput.value;
		document.body.style.setProperty('--container-width', containerWidth);
		GM_setValue('container-width', widthInput.value);
	};

	const widthLabel = document.createElement('label');
	widthLabel.innerText = '正文宽度：';
	widthLabel.title = '单位可以是 rem, px, %, svw, vw';
	widthLabel.appendChild(widthInput);

	containerStyleFieldset.appendChild(widthLabel);
	return containerStyleFieldset;
}

export function createSettingForm(): HTMLFormElement {
	const form = document.createElement('form');

	form.appendChild(createContainerStyleFieldset());

	const intervalInput = document.createElement('input');
	intervalInput.type = 'number';
	intervalInput.min = '0';
	intervalInput.valueAsNumber = refreshInterval / 60000;
	intervalInput.style.width = '4rem';

	const intervalLabel = document.createElement('label');
	intervalLabel.innerText = '刷新间隔（分钟）：';
	intervalLabel.appendChild(intervalInput);
	form.appendChild(intervalLabel);

	const button = document.createElement('button');
	button.type = 'submit';
	button.innerText = '保存刷新设置';
	button.style.marginLeft = '0.75rem';
	form.appendChild(button);

	form.appendChild(createAccessKeysFieldset());
	const disguiseCodeFieldset = createDisguiseCodeFieldset();
	const updateFieldSetsState = (label: DisguiseMode) => {
		switch (label) {
			case 'none':
				disguiseCodeFieldset.style.display = 'none';
				break;
			case 'code':
				disguiseCodeFieldset.style.display = 'block';
				break;
		}
	};
	updateFieldSetsState(disguiseMode);

	const radioDiv = document.createElement('div');
	radioDiv.style.display = 'flex';
	radioDiv.innerHTML = `<p>伪装模式：</p>`;
	[
		['none', '无'],
		['code', '代码']
	].forEach(([label, placeholder]) => {
		const disguiseInput = document.createElement('input');
		disguiseInput.name = 'disguise-radio';
		disguiseInput.type = 'radio';
		disguiseInput.value = label;
		disguiseInput.checked = disguiseMode == label;
		disguiseInput.style.marginLeft = '0.5rem';
		disguiseInput.style.marginRight = '0.5rem';

		disguiseInput.onchange = () => {
			const disguiseEnabled = disguiseInput.checked;
			// GM_setValue('disguise', disguiseEnabled);
			if (disguiseEnabled) {
				GM_setValue('disguise-mode', label);
				updateFieldSetsState(label as DisguiseMode);
			}
		};

		const disguiseLabel = document.createElement('label');
		disguiseLabel.style.display = 'flex';
		disguiseLabel.style.alignItems = 'center';
		disguiseLabel.appendChild(disguiseInput);
		const disguiseP = document.createElement('p');
		disguiseP.innerText = placeholder;
		disguiseLabel.appendChild(disguiseP);
		radioDiv.appendChild(disguiseLabel);
	});
	form.appendChild(radioDiv);

	form.appendChild(disguiseCodeFieldset);

	form.onsubmit = (e) => {
		e.preventDefault();
		const interval = parseInt(intervalInput.value) * 60000;
		if (interval >= 0 && interval != refreshInterval) {
			GM_setValue('refreshInterval', interval);
			refreshInterval = interval;
		}
	};

	return form;
}
