// ==UserScript==
// @name         Deqi Prefech
// @namespace    https://greasyfork.org/zh-CN/users/14997-lrh3321
// @version      2026-09-110
// @author       LRH3321
// @description  得奇小说网, biqu33.cc, ddxiaoshuo.cc, cuoceng.com 看单个章节免翻页，把小说伪装成代码
// @license      MIT
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deqixs.com
// @homepageURL  https://greasyfork.org/zh-CN/scripts/537588-deqi-prefech
// @source       https://github.com/lrh3321/deqi-prefetch
// @supportURL   https://github.com/lrh3321/deqi-prefetch/issues
// @downloadURL  https://update.greasyfork.org/scripts/537588/Deqi%20Prefech.user.js
// @updateURL    https://update.greasyfork.org/scripts/537588/Deqi%20Prefech.user.js
// @match        http*://*.shudugu.org/*
// @match        http*://*.deqixs.org/*
// @match        http*://*.kudushu.org/*
// @match        http*://www.sudugu.org/*
// @match        http*://www.sudugu.org/i/pifu.aspx
// @match        http*://www.deqixs.com/pifu/
// @match        http*://www.deqixs.com/xiaoshuo/*/*.html
// @match        http*://www.deqixs.com/xiaoshuo/*/
// @match        http*://www.biqu33.cc/*
// @match        http*://www.ddxiaoshuo.cc/*
// @match        http*://cuoceng.com/*
// @match        http*://www.cuoceng.com/*
// @require      https://cdn.jsdelivr.net/npm/prismjs@1.30.0/prism.min.js
// @require      https://cdn.jsdelivr.net/npm/prismjs@1.30.0/plugins/match-braces/prism-match-braces.min.js
// @require      https://cdn.jsdelivr.net/npm/prismjs@1.30.0/plugins/line-numbers/prism-line-numbers.min.js
// @tag          novels
// @connect      self
// @grant        GM_addElement
// @grant        GM_addStyle
// @grant        GM_getResourceURL
// @grant        GM_getValue
// @grant        GM_log
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// ==/UserScript==

(function() {
	"use strict";
	var s = new Set();
	var _css = async (t) => {
		if (s.has(t)) return;
		s.add(t);
		((c) => {
			if (typeof GM_addStyle === "function") GM_addStyle(c);
			else (document.head || document.documentElement).appendChild(document.createElement("style")).append(c);
		})(t);
	};
	_css("[data-comment=normal] span.token.comment{font-style:normal}img[alt],.menu,.header p,h2 a,div.footer,div.container>ul.list{display:none!important}h2.op a{display:block}body>div.container,body>div.header,#article_main,#ss-reader-main{width:min(calc(100svw - 1em), var(--container-width,\"1200px\"))}span.token.comment{font-family:var(--novel-font-family)!important}body{--primary-color:black;--primary-bg-color:#f5f2f0;--secondary-color:gray;background:var(--primary-bg-color)}img{visibility:hidden}details#script-setting>summary,form{color:var(--primary-color)}details#script-setting>summary{font-size:x-large;font-weight:700}form fieldset{margin-inline:2px;border:2px groove gray;border-image:initial;min-inline-size:min-content;margin-top:1rem;margin-bottom:1rem;padding-block:.35em .625em;padding-inline:.75em;display:block}form fieldset>div{flex-wrap:wrap;gap:.5rem;display:flex}fieldset label{white-space:nowrap;gap:.4rem;width:fit-content;display:flex}@media (orientation:portrait){fieldset label{white-space:nowrap;flex-wrap:wrap;gap:.4rem;width:100%;display:flex}}label input{border:1px solid var(--lightningcss-light,#767676)var(--lightningcss-dark,#858585);max-width:75svw;padding-left:.5rem}editable-list li{align-items:baseline;width:fit-content;height:fit-content;display:flex}editable-list figure{margin:0}editable-list figcaption{-webkit-backdrop-filter:contrast(120%);backdrop-filter:contrast(120%);text-align:end}editable-list .icon{cursor:pointer;border:none;font-size:1.8rem}editable-list textarea{border-radius:.75rem;width:95%;padding-block:.25rem;padding-inline:.75rem}editable-list ul{flex-wrap:wrap;justify-content:flex-start;column-gap:1rem;max-width:80svw;display:flex}#header,#main .container-fluid,#article_main .row,body>[id][style],body>[style*=display],body>[style*=position\\:fixed]{display:none!important}#article_main{background:0 0}#article_main #page-links a,#article_main #page-links span{text-align:center;background:#1a73e8;width:28px;height:28px;margin-right:10px;padding:1px 10px;line-height:25px;display:inline-block;color:#fff!important;text-decoration:none!important}#article_main #page-links span{background:#ccc}#main a[role=button]{color:#555}#main a[role=button]:hover{color:#fa2080;text-decoration:none}#ss-reader-main,.info-title{border-width:0;background-color:#0000!important}#ss-reader-main .info-commend,#ss-reader-main .reader-hr,#ss-reader-main .readSet,#ss-reader-main .info-chapters-title,#ss-reader-main h1,body.read_style_1 .header,body.read_style_1 #showDetail,#readcontent .textbox.cf,body.read_style_1 .textinfo{display:none!important}@media screen and (width<=1200px){#list.dir{width:calc(100svw - 30px);margin:0}#list.dir ul li{float:left;width:33%}.container .itemtxt{float:unset;padding-right:unset;width:unset}}body:has(.article-root){--primary-color:black;--primary-bg-color:#f5f2f0;background-color:color-mix(in srgb, var(--primary-bg-color) 80%, var(--primary-color) 20%)}.article-root{max-height:100vh;width:min(100svw, var(--container-width,\"1200px\"));color:var(--primary-color);grid-template-rows:auto 1fr auto;justify-self:center;display:grid}.article-root header{opacity:.6;background-color:color-mix(in srgb, var(--primary-bg-color) 90%, var(--primary-color) 10%);margin-top:.5rem;line-height:2rem}.article-root .breadcrumb,.article-root .breadcrumb a{color:var(--secondary-color);background-color:#0000;flex-wrap:wrap;align-items:center;gap:1rem;margin:0;display:flex}.article-root .breadcrumb li{text-wrap:nowrap;text-overflow:ellipsis;list-style-type:none;overflow-x:hidden}.article-root .breadcrumb li[aria-hidden]{opacity:.5}.article-root .breadcrumb a :hover{opacity:.6;text-decoration:underline}.article-root .article-title{white-space:nowrap;text-overflow:ellipsis;justify-content:center;min-width:0;max-width:95svw;font-size:1.5rem;display:inline-block;overflow:hidden}.article-root .article-title code{background-color:#0000}.article-root section.img-container{flex-direction:column;display:flex}.article-root section.img-container img{visibility:initial}.article-root section p{text-indent:2em;margin-top:unset;margin-bottom:.5em;line-height:120%}@media (orientation:landscape){.article-root section.img-container{align-items:center}.article-root section.img-container img{max-width:35rem}}.article-root footer{opacity:.6;margin-bottom:.5rem;line-height:2rem}.article-root .article-nav{background-color:lch(from var(--primary-bg-color) l c h / .75);border-radius:.75rem;justify-self:center}.article-root .article-nav a{color:var(--secondary-color);background-color:#0000;padding-inline:1rem}.article-root hr{width:90%}body[hidden]{display:none!important}");
	var _GM_addElement = (() => typeof GM_addElement != "undefined" ? GM_addElement : void 0)();
	var _GM_getValue = (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
	var _GM_log = (() => typeof GM_log != "undefined" ? GM_log : void 0)();
	var _GM_registerMenuCommand = (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
	var _GM_setValue = (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
	var _GM_xmlhttpRequest = (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
	var VM_log = _GM_log;
	function getCodeThemeURL(theme) {
		if (new Set([
			"prism",
			"prism-dark",
			"prism-funky",
			"prism-okaidia",
			"prism-twilight",
			"prism-coy",
			"prism-solarizedlight",
			"prism-tomorrow"
		]).has(theme)) return `https://dev.prismjs.com/themes/${theme}.min.css`;
		return `https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/${theme}.min.css`;
	}
	function releaseCopy() {
		const $ = document.defaultView.$;
		if ($) {
			_GM_log("has jQuery");
			const doc = $(document);
			doc.off("contextmenu");
			doc.off("copy");
			doc.off("cut");
		}
		document.onclick = null;
		document.oncontextmenu = null;
		document.oncopy = null;
		document.oncut = null;
		document.body.onclick = null;
		document.body.oncontextmenu = null;
		document.body.oncopy = null;
		document.body.oncut = null;
		const native_replaceState = history.replaceState;
		history.replaceState = function(data, unused, url) {
			if (url) {
				if (url instanceof URL) {
					if (url.hostname != location.hostname) return;
				} else if (url.startsWith("http://") || url.startsWith("https://")) {
					if (new URL(url).hostname != location.hostname) return;
				}
			}
			native_replaceState(data, unused, url);
		};
	}
	var isInIframe = window.self !== window.top;
	function ensureDoc(doc) {
		if (typeof doc === "string") return new DOMParser().parseFromString(doc, "text/html");
		return doc;
	}
	function setAccessKeys(nav) {
		const { prevAnchor, infoAnchor, nextAnchor } = nav;
		if (prevAnchor) {
			prevAnchor.accessKey = previousChapterAccessKey;
			prevAnchor.ariaKeyShortcuts = `Alt+${previousChapterAccessKey}`;
		}
		if (infoAnchor) {
			infoAnchor.accessKey = bookPageAccessKey;
			infoAnchor.ariaKeyShortcuts = `Alt+${bookPageAccessKey}`;
		}
		if (nextAnchor) {
			nextAnchor.accessKey = nextChapterAccessKey;
			nextAnchor.ariaKeyShortcuts = `Alt+${nextChapterAccessKey}`;
		}
	}
	function rebuildChapterBody(page) {
		const newBody = document.createElement("body");
		newBody.style = document.body.style.cssText;
		newBody.dataset.comment = document.body.dataset.comment;
		const root = document.createElement("div");
		root.className = "article-root";
		const header = buildNovelHeader(page);
		const main = buildNovelMain(page);
		const footer = buildNovelFooter(page.navigationBar);
		root.append(header, document.createElement("hr"), main, document.createElement("hr"), footer);
		newBody.append(root);
		document.body.replaceWith(newBody);
		return {
			root,
			header,
			main,
			footer
		};
	}
	function updateStyle(pre) {
		const computedStyle = getComputedStyle(pre);
		document.body.style.setProperty("--primary-color", computedStyle.color);
		document.body.style.setProperty("--primary-bg-color", computedStyle.backgroundColor);
		const comment = pre.querySelector("span.token.comment");
		if (comment) {
			const computedStyle = getComputedStyle(comment);
			document.body.style.setProperty("--secondary-color", computedStyle.color);
		}
	}
	function paragraphsFromElement(el) {
		const paragraphs = [];
		let paragraph = el.ownerDocument.createElement("p");
		const appendParagraph = () => {
			if (paragraph.textContent?.trim() || paragraph.children.length > 0) paragraphs.push(paragraph);
			paragraph = el.ownerDocument.createElement("p");
		};
		for (const node of Array.from(el.childNodes)) if (node.nodeType === Node.ELEMENT_NODE && node.matches("br")) appendParagraph();
		else if (node.nodeType === Node.TEXT_NODE && node.textContent) paragraph.append(node.textContent.trim());
		else if (!(node instanceof HTMLAnchorElement || node instanceof HTMLScriptElement || node instanceof HTMLUListElement)) {
			if (node instanceof HTMLParagraphElement) {
				if (node.querySelector("br")) {
					for (const subNode of Array.from(node.childNodes)) if (subNode.nodeType === Node.ELEMENT_NODE && subNode.matches("br")) appendParagraph();
					else if (subNode.nodeType === Node.TEXT_NODE && subNode.textContent) paragraph.append(subNode.textContent.trim());
					node.innerHTML = "";
				}
			}
			paragraph.append(node.cloneNode(true));
		}
		appendParagraph();
		return paragraphs;
	}
	function buildNovelHeader(page) {
		const { breadcrumbBar, title } = page;
		const header = document.createElement("header");
		if (breadcrumbBar) {
			const breadcrumb = document.createElement("ol");
			breadcrumb.className = "breadcrumb";
			breadcrumbBar.querySelectorAll("a").forEach((a) => {
				const li = document.createElement("li");
				const newA = a.cloneNode(true);
				li.appendChild(newA);
				breadcrumb.appendChild(li);
				const li2 = document.createElement("li");
				li2.ariaHidden = "";
				li2.innerHTML = "&rsaquo;";
				breadcrumb.appendChild(li2);
			});
			breadcrumb.lastElementChild?.remove();
			if (title) {
				const li = document.createElement("li");
				if (title.length > 20) li.innerHTML = title.substring(0, 20) + "...";
				else li.innerHTML = title;
				breadcrumb.appendChild(li);
			}
			header.appendChild(breadcrumb);
		}
		return header;
	}
	function buildNovelMain(page) {
		const { title, mainSection } = page;
		const main = document.createElement("main");
		const article = document.createElement("article");
		if (title) {
			const h2 = document.createElement("h2");
			h2.className = "article-title";
			h2.innerText = title;
			h2.title = title;
			article.appendChild(h2);
		}
		const section = document.createElement("section");
		section.appendChild(mainSection);
		article.appendChild(section);
		main.appendChild(article);
		return main;
	}
	function buildNovelFooter(nav) {
		const footer = document.createElement("footer");
		const navBar = document.createElement("nav");
		navBar.className = "article-nav";
		if (nav.prevAnchor) navBar.appendChild(nav.prevAnchor);
		if (nav.infoAnchor) navBar.appendChild(nav.infoAnchor);
		if (nav.nextAnchor) navBar.appendChild(nav.nextAnchor);
		navBar.insertAdjacentHTML("beforeend", "<a href=\"/\">小说列表</a>");
		footer.appendChild(navBar);
		return footer;
	}
	var extendLanguageElement = null;
	function setupExtendLanguageSupport() {
		if (!coreLanguages.has(codeLang)) {
			console.log("loading language", codeLang);
			const src = `https://dev.prismjs.com/components/prism-${codeLang}.js`;
			if (extendLanguageElement?.src == src) return;
			extendLanguageElement?.remove();
			extendLanguageElement = _GM_addElement("script", { src });
		}
	}
	function disguiseToCode(container) {
		const fakeCodes = fakeCodeSnippet.split("====");
		const getRandomCode = () => fakeCodes[Math.floor(Math.random() * fakeCodes.length)];
		var lines = [];
		const paragraphs = Array.from(container.querySelectorAll("p"));
		let blockCommentStart = "/*";
		let blockCommentEnd = "*/";
		let shortCommnet = "";
		switch (codeLang) {
			case "clike":
			case "javascript":
			case "c":
			case "csharp":
			case "cpp":
			case "go":
			case "java":
			case "kotlin":
			case "rust":
			case "php":
				shortCommnet = "// ";
				break;
			case "python":
				shortCommnet = "# ";
				break;
			case "markup":
				blockCommentStart = "<!--";
				blockCommentEnd = "-->";
		}
		const codeSegments = [];
		paragraphs.forEach((p) => {
			const textContent = p.textContent.trim();
			let line = "";
			while (line.trim() == "") {
				if (lines.length == 0) lines.push(...getRandomCode().split(/[\r]?\n/));
				line = lines.shift();
				if (line.trim().length === 1) {
					codeSegments.push(line);
					line = "";
				}
			}
			const trimed = line.replace(/^[\s\t]+/, "");
			if (trimed !== line) {
				const prefix = line.substring(0, line.length - trimed.length);
				if (textContent.length + shortCommnet.length + prefix.length < inlineLengthMax && shortCommnet != "") codeSegments.push(`${prefix}${shortCommnet}${textContent}`);
				else codeSegments.push(`${prefix}${blockCommentStart}\n${prefix}  ${textContent}\n${prefix}${blockCommentEnd}`);
			} else if (textContent.length + shortCommnet.length < inlineLengthMax && shortCommnet != "") codeSegments.push(`${shortCommnet}${textContent}`);
			else codeSegments.push(`${blockCommentStart}\n  ${textContent}\n${blockCommentEnd}`);
			codeSegments.push(line);
			p.remove();
		});
		codeSegments.push(...lines);
		const pre = createPreformattedCode(codeSegments.join("\n"));
		container.parentElement.replaceChild(pre, container);
		highlightElement(pre, false, (_) => {
			updateStyle(pre);
		});
		return pre;
	}
	function disguiseParagraphs(container) {
		switch (disguiseMode) {
			case "none":
				container.style.fontSize = "var(--novel-font-size)";
				container.style.fontFamily = "var(--novel-font-family)";
				break;
			default: return disguiseToCode(container);
		}
		return container;
	}
	function createPreformattedCode(snippet) {
		const code = document.createElement("code");
		code.className = `language-${codeLang} match-braces rainbow-braces`;
		code.innerHTML = snippet;
		const pre = document.createElement("pre");
		pre.style.whiteSpace = "pre-wrap";
		pre.style.textWrap = "pretty";
		pre.style.overflowX = "auto";
		pre.className = `language-${codeLang} match-braces rainbow-braces ${codeShowLineNumbers ? "line-numbers" : ""}`;
		if (pre.firstChild) pre.replaceChild(code, pre.firstChild);
		else pre.appendChild(code);
		return pre;
	}
	function highlightElement(el, async, callback) {
		if (el instanceof HTMLElement) el.style.fontSize = "var(--novel-font-size)";
		const codes = Array.from(el.querySelectorAll("code"));
		const highlightAll = () => {
			codes.forEach((code) => {
				Prism.highlightElement(code, async, callback);
			});
		};
		if (coreLanguages.has(codeLang)) highlightAll();
		else {
			let count = 0;
			const lazyHighlightElement = () => {
				count++;
				if (codeLang in Prism.languages) {
					highlightAll();
					return;
				}
				if (count > 10) return;
				setTimeout(lazyHighlightElement, 200);
			};
			setTimeout(lazyHighlightElement, 200);
		}
	}
	var EditableList = class extends HTMLElement {
		itemList = null;
		textInput = null;
		codeSnippetsStore;
		counter;
		constructor() {
			super();
			this.addListItem = this.addListItem.bind(this);
			this.handleRemoveItemListeners = this.handleRemoveItemListeners.bind(this);
			this.removeListItem = this.removeListItem.bind(this);
			this.counter = 0;
			this.codeSnippetsStore = new Map();
		}
		lazyInit() {
			this.innerHTML = `<h3>伪装代码段</h3>
<div>
    <label>输入代码片段：</label>
    <textarea rows="20" class="add-new-list-item-input"></textarea>
    <button class="editable-list-add-item icon">&oplus;</button>
</div>
<ul class="item-list"></ul>`;
			this.itemList = this.querySelector("ul.item-list");
			this.textInput = this.querySelector(".add-new-list-item-input");
			this.textInput.onkeydown = this.onKeydown.bind(this);
		}
		connectedCallback() {
			this.lazyInit();
			this.querySelector(".editable-list-add-item")?.addEventListener("click", this.addListItem, false);
		}
		onKeydown(e) {
			if (e.ctrlKey && e.key === "Enter") {
				e.preventDefault();
				this.addListItem();
			}
		}
		addListItem() {
			const textInput = this.textInput;
			let snippet = textInput?.value.trim();
			if (snippet) {
				this.counter++;
				const idx = this.counter.toString();
				this.codeSnippetsStore.set(idx, snippet);
				snippet = this.trimSnippet(snippet);
				this.addCodeSnippet(idx, snippet);
				textInput.value = "";
				this.dispatchEvent(new CustomEvent("add-item"));
			}
		}
		trimSnippet(s) {
			return s.split(/[\r\n]+/).filter((l) => l.trim()).join("\n");
		}
		updateCodeSnippets(snippets) {
			this.codeSnippetsStore.clear();
			snippets.forEach((snippet) => {
				this.counter++;
				snippet = this.trimSnippet(snippet);
				this.codeSnippetsStore.set(this.counter.toString(), snippet);
			});
			this.render();
		}
		get codeSnippets() {
			return Array.from(this.codeSnippetsStore.values());
		}
		render() {
			if (!this.itemList) this.lazyInit();
			this.itemList.innerHTML = ``;
			this.codeSnippetsStore.forEach((snippet, idx) => {
				this.addCodeSnippet(idx, snippet);
			});
		}
		addCodeSnippet(idx, snippet) {
			const li = document.createElement("li");
			li.dataset.snippetId = idx;
			const figure = document.createElement("figure");
			const figcaption = document.createElement("figcaption");
			const button = document.createElement("button");
			const pre = createPreformattedCode(snippet);
			button.classList.add("editable-list-remove-item", "icon");
			button.innerHTML = "&ominus;";
			figcaption.appendChild(button);
			figure.appendChild(figcaption);
			figure.appendChild(pre);
			li.appendChild(figure);
			this.itemList?.appendChild(li);
			this.handleRemoveItemListeners([button]);
			highlightElement(pre, false);
		}
		handleRemoveItemListeners(arrayOfElements) {
			arrayOfElements.forEach((element) => {
				element.addEventListener("click", this.removeListItem, false);
			});
		}
		removeListItem(e) {
			const parent = e.target?.parentNode;
			if (parent) {
				parent?.parentElement?.parentElement?.remove();
				this.codeSnippetsStore.delete(parent?.parentElement?.parentElement?.dataset.snippetId || "");
				this.dispatchEvent(new CustomEvent("remove-item"));
			}
		}
	};
	function setupEditableList() {
		customElements.define("editable-list", EditableList);
	}
	var disguiseDebug = _GM_getValue("disguiseDebug", false);
	var novelFontSize = _GM_getValue("novel-font-size", "16px");
	var novelFontFamily = _GM_getValue("novel-font-family", `system-ui, -apple-system, '微软雅黑', 'PingFang SC', BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`);
	var disguiseMode = _GM_getValue("disguise-mode", "none");
	var codeLang = _GM_getValue("code-lang", "javascript");
	var defaultCodeSnippet = `var x = 1;
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
	var fakeCodeSnippet = _GM_getValue("fake-codes", defaultCodeSnippet);
	if (fakeCodeSnippet.trim() == "") fakeCodeSnippet = defaultCodeSnippet;
	var codeTheme = _GM_getValue("code-theme", "prism");
	var codeParagraphItalic = _GM_getValue("code-italic", true);
	var codeShowLineNumbers = _GM_getValue("line-numbers", false);
	var refreshInterval = _GM_getValue("refreshInterval", 9e5);
	var avalibleCodeThemes = [
		{
			Name: "Default",
			code: "prism"
		},
		{
			Name: "Dark",
			code: "prism-dark"
		},
		{
			Name: "Funky",
			code: "prism-funky"
		},
		{
			Name: "Okaidia",
			code: "prism-okaidia"
		},
		{
			Name: "Twilight",
			code: "prism-twilight"
		},
		{
			Name: "Coy",
			code: "prism-coy"
		},
		{
			Name: "Solarized Light",
			code: "prism-solarizedlight"
		},
		{
			Name: "Tomorrow Night",
			code: "prism-tomorrow"
		},
		{
			Name: "CB",
			code: "prism-cb"
		},
		{
			Name: "GHColors",
			code: "prism-ghcolors"
		},
		{
			Name: "Pojoaque",
			code: "prism-pojoaque"
		},
		{
			Name: "Xonokai",
			code: "prism-xonokai"
		},
		{
			Name: "Ateliersulphurpool-light",
			code: "prism-base16-ateliersulphurpool.light"
		},
		{
			Name: "Hopscotch",
			code: "prism-hopscotch"
		},
		{
			Name: "Atom Dark",
			code: "prism-atom-dark"
		},
		{
			Name: "Duotone Dark",
			code: "prism-duotone-dark"
		},
		{
			Name: "Duotone Sea",
			code: "prism-duotone-sea"
		},
		{
			Name: "Duotone Space",
			code: "prism-duotone-space"
		},
		{
			Name: "Duotone Earth",
			code: "prism-duotone-earth"
		},
		{
			Name: "Duotone Forest",
			code: "prism-duotone-forest"
		},
		{
			Name: "Duotone Light",
			code: "prism-duotone-light"
		},
		{
			Name: "VS",
			code: "prism-vs"
		},
		{
			Name: "VS Code Dark+",
			code: "prism-vsc-dark-plus"
		},
		{
			Name: "Darcula",
			code: "prism-darcula"
		},
		{
			Name: "a11y Dark",
			code: "prism-a11y-dark"
		},
		{
			Name: "Dracula",
			code: "prism-dracula"
		},
		{
			Name: "Synthwave '84",
			code: "prism-synthwave84"
		},
		{
			Name: "Shades of Purple",
			code: "prism-shades-of-purple"
		},
		{
			Name: "Material Dark",
			code: "prism-material-dark"
		},
		{
			Name: "Material Light",
			code: "prism-material-light"
		},
		{
			Name: "Material Oceanic",
			code: "prism-oceanic"
		},
		{
			Name: "Nord",
			code: "prism-nord"
		},
		{
			Name: "Coldark Cold",
			code: "prism-coldark-cold"
		},
		{
			Name: "Coldark Dark",
			code: "prism-coldark-dark"
		},
		{
			Name: "Coy without shadows",
			code: "prism-coy-without-shadows"
		},
		{
			Name: "Gruvbox Dark",
			code: "prism-gruvbox-dark"
		},
		{
			Name: "Gruvbox Light",
			code: "prism-gruvbox-light"
		},
		{
			Name: "Lucario",
			code: "prism-lucario"
		},
		{
			Name: "Night Owl",
			code: "prism-night-owl"
		},
		{
			Name: "Holi Theme",
			code: "prism-holi-theme"
		},
		{
			Name: "Z-Touch",
			code: "prism-z-touch"
		},
		{
			Name: "Solarized Dark Atom",
			code: "prism-solarized-dark-atom"
		},
		{
			Name: "One Dark",
			code: "prism-one-dark"
		},
		{
			Name: "One Light",
			code: "prism-one-light"
		},
		{
			Name: "Laserwave",
			code: "prism-laserwave"
		}
	];
	var avalibleCodeLanguages = [
		{
			Name: "Markup — markup, html, xml, svg, mathml, ssml, atom, rss",
			code: "markup"
		},
		{
			Name: "CSS — css",
			code: "css"
		},
		{
			Name: "C-like — clike",
			code: "clike"
		},
		{
			Name: "JavaScript — javascript, js",
			code: "javascript"
		},
		{
			Name: "C —c",
			code: "c"
		},
		{
			Name: "C# —csharp, cs, dotnet",
			code: "csharp"
		},
		{
			Name: "C++ —cpp",
			code: "cpp"
		},
		{
			Name: "Go —go",
			code: "go"
		},
		{
			Name: "Java —java",
			code: "java"
		},
		{
			Name: "Kotlin —kotlin, kt, kts",
			code: "kotlin"
		},
		{
			Name: "PHP —php",
			code: "php"
		},
		{
			Name: "Python —python, py",
			code: "python"
		},
		{
			Name: "Rust —rust",
			code: "rust"
		}
	];
	var coreLanguages = new Set([
		"markup",
		"css",
		"clike",
		"javascript"
	]);
	function changeCodeTheme(theme) {
		_GM_setValue("code-theme", theme);
		codeTheme = theme;
		codeThemeElement?.remove();
		codeThemeElement = _GM_addElement(document.head, "link", {
			href: getCodeThemeURL(theme),
			rel: "stylesheet",
			type: "text/css"
		});
	}
	var codeThemeElement = null;
	function setupCodeTheme() {
		codeThemeElement = _GM_addElement(document.head, "link", {
			href: getCodeThemeURL(codeTheme),
			rel: "stylesheet",
			type: "text/css"
		});
		if (!codeParagraphItalic) document.body.dataset.comment = "normal";
		["match-braces", "line-numbers"].forEach((pluginName) => {
			_GM_addElement(document.head, "link", {
				href: `https://cdn.jsdelivr.net/npm/prismjs@1.30.0/plugins/${pluginName}/prism-${pluginName}.min.css`,
				rel: "stylesheet",
				type: "text/css"
			});
		});
	}
	var bookPageAccessKey = _GM_getValue("bookPageAccessKey", "h");
	var previousChapterAccessKey = _GM_getValue("previousChapterAccessKey", "b");
	var nextChapterAccessKey = _GM_getValue("nextChapterAccessKey", "n");
	function createAccessKeysFieldset() {
		const accessKeysFieldset = document.createElement("fieldset");
		accessKeysFieldset.innerHTML = `<legend>快捷键设置
	<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes/accesskey#%E5%B0%9D%E8%AF%95%E4%B8%80%E4%B8%8B" target="_blank" style="margin-left: 5rem;">快捷键使用帮助</a>
</legend>
<div>
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
		const previousChapterAccessKey = accessKeysFieldset.querySelector("#previousChapterAccessKey");
		const bookPageAccessKey = accessKeysFieldset.querySelector("#bookPageAccessKey");
		const nextChapterAccessKey = accessKeysFieldset.querySelector("#nextChapterAccessKey");
		for (let i = 0; i < 10; i++) {
			const option = document.createElement("option");
			const charCode = 48 + i;
			option.value = String.fromCharCode(charCode);
			option.text = String.fromCharCode(charCode);
			previousChapterAccessKey.appendChild(option);
			bookPageAccessKey.appendChild(option.cloneNode(true));
			nextChapterAccessKey.appendChild(option.cloneNode(true));
		}
		for (let i = 0; i < 26; i++) {
			const option = document.createElement("option");
			const charCode = 97 + i;
			option.value = String.fromCharCode(charCode);
			option.text = String.fromCharCode(charCode);
			previousChapterAccessKey.appendChild(option);
			bookPageAccessKey.appendChild(option.cloneNode(true));
			nextChapterAccessKey.appendChild(option.cloneNode(true));
		}
		bookPageAccessKey.value = _GM_getValue("bookPageAccessKey", "h");
		previousChapterAccessKey.value = _GM_getValue("previousChapterAccessKey", "b");
		nextChapterAccessKey.value = _GM_getValue("nextChapterAccessKey", "n");
		previousChapterAccessKey.onchange = () => {
			if (previousChapterAccessKey.selectedOptions.length > 0) _GM_setValue("previousChapterAccessKey", previousChapterAccessKey.value);
		};
		bookPageAccessKey.onchange = () => {
			if (bookPageAccessKey.selectedOptions.length > 0) _GM_setValue("bookPageAccessKey", bookPageAccessKey.value);
		};
		nextChapterAccessKey.onchange = () => {
			if (nextChapterAccessKey.selectedOptions.length > 0) _GM_setValue("nextChapterAccessKey", nextChapterAccessKey.value);
		};
		return accessKeysFieldset;
	}
	var inlineLengthMax = _GM_getValue("inlineLengthMax", 40);
	function createDisguiseCodeFieldset() {
		setupExtendLanguageSupport();
		const disguiseFieldset = document.createElement("fieldset");
		const div = document.createElement("div");
		disguiseFieldset.appendChild(div);
		const codeThemeInput = document.createElement("select");
		codeThemeInput.name = "theme";
		avalibleCodeThemes.forEach((theme) => {
			const option = document.createElement("option");
			option.value = theme.code;
			option.text = theme.Name;
			codeThemeInput.appendChild(option);
		});
		codeThemeInput.value = codeTheme;
		codeThemeInput.onchange = () => {
			console.log("change");
			const theme = codeThemeInput.value;
			if (codeThemeInput.selectedIndex >= 0 && theme && theme != codeTheme) {
				console.log(`Change code theme to ${theme}`);
				changeCodeTheme(theme);
			}
		};
		let editableList = null;
		const codeThemeLabel = document.createElement("label");
		codeThemeLabel.innerText = "代码主题：";
		codeThemeLabel.appendChild(codeThemeInput);
		div.appendChild(codeThemeLabel);
		const codeDemo = `<code class="language-javascript match-braces rainbow-braces">/*
	让我们说中文
 */
function foo(bar) {
	// 短的注释
	var a = 42,
		b = 'Prism';
	return a + bar(b);
}</code>`;
		let preDemo = document.createElement("pre");
		const renderDemo = () => {
			let newPre = document.createElement("pre");
			newPre.innerHTML = codeDemo;
			newPre.className = `language-javascript match-braces ${codeShowLineNumbers ? "line-numbers" : ""}`;
			if (codeShowLineNumbers) newPre.querySelector("code").classList.add("line-numbers");
			highlightElement(newPre);
			disguiseFieldset.replaceChild(newPre, preDemo);
			preDemo = newPre;
			console.log("update demo");
		};
		const codeLangInput = document.createElement("select");
		codeLangInput.name = "lang";
		avalibleCodeLanguages.forEach((theme) => {
			const option = document.createElement("option");
			option.value = theme.code;
			option.text = theme.Name;
			codeLangInput.appendChild(option);
		});
		codeLangInput.value = codeLang;
		codeLangInput.onchange = () => {
			if (codeLangInput.selectedIndex >= 0) {
				codeLang = codeLangInput.value;
				_GM_setValue("code-lang", codeLang);
				setupExtendLanguageSupport();
				editableList?.render();
				renderDemo();
			}
		};
		const codeLangLabel = document.createElement("label");
		codeLangLabel.innerText = "代码语言：";
		codeLangLabel.appendChild(codeLangInput);
		div.appendChild(codeLangLabel);
		const codeShowLineNumbersInput = document.createElement("input");
		codeShowLineNumbersInput.type = "checkbox";
		codeShowLineNumbersInput.name = "line-numbers";
		codeShowLineNumbersInput.checked = codeShowLineNumbers;
		codeShowLineNumbersInput.onchange = () => {
			codeShowLineNumbers = codeShowLineNumbersInput.checked;
			_GM_setValue("line-numbers", codeShowLineNumbers);
			console.log(`Change code show line numbers to ${codeShowLineNumbers}`, editableList);
			editableList?.render();
			renderDemo();
		};
		const codeShowLineNumbersLabel = document.createElement("label");
		codeShowLineNumbersLabel.appendChild(codeShowLineNumbersInput);
		codeShowLineNumbersLabel.append(" 显示行号");
		div.appendChild(codeShowLineNumbersLabel);
		const codeItalicInput = document.createElement("input");
		codeItalicInput.type = "checkbox";
		codeItalicInput.name = "font-italic";
		codeItalicInput.checked = codeParagraphItalic;
		codeItalicInput.onchange = () => {
			const checked = codeItalicInput.checked;
			_GM_setValue("code-italic", checked);
			if (checked) document.body.dataset.comment = void 0;
			else document.body.dataset.comment = "normal";
		};
		const codeItalicLabel = document.createElement("label");
		codeItalicLabel.appendChild(codeItalicInput);
		codeItalicLabel.append(" 小说斜体");
		div.appendChild(codeItalicLabel);
		const codeInlineLengthInput = document.createElement("input");
		codeInlineLengthInput.name = "comment-lenth-limit";
		codeInlineLengthInput.type = "number";
		codeInlineLengthInput.min = "15";
		codeInlineLengthInput.max = "200";
		codeInlineLengthInput.valueAsNumber = inlineLengthMax;
		codeInlineLengthInput.onchange = () => {
			_GM_setValue("inlineLengthMax", codeInlineLengthInput.value);
		};
		const codeInlineLengthLabel = document.createElement("label");
		codeInlineLengthLabel.innerText = "单行注释长度限制：";
		codeInlineLengthLabel.appendChild(codeInlineLengthInput);
		div.appendChild(codeInlineLengthLabel);
		const demoCodeTitle = document.createElement("h3");
		demoCodeTitle.innerText = "主题效果：";
		disguiseFieldset.appendChild(demoCodeTitle);
		disguiseFieldset.appendChild(preDemo);
		setupEditableList();
		setTimeout(() => {
			editableList = document.createElement("editable-list");
			disguiseFieldset.appendChild(editableList);
			editableList.updateCodeSnippets(fakeCodeSnippet.split("====\n"));
			renderDemo();
			const onItemChange = () => {
				_GM_setValue("fake-codes", editableList?.codeSnippets.join("====\n"));
			};
			editableList.addEventListener("add-item", onItemChange);
			editableList.addEventListener("remove-item", onItemChange);
		}, 500);
		return disguiseFieldset;
	}
	var containerWidth = _GM_getValue("container-width", "1200px");
	function createContainerStyleFieldset() {
		const containerStyleFieldset = document.createElement("fieldset");
		const legend = document.createElement("legend");
		legend.innerText = "正文式样";
		containerStyleFieldset.appendChild(legend);
		const div = document.createElement("div");
		const widthInput = document.createElement("input");
		widthInput.value = containerWidth;
		widthInput.size = 10;
		widthInput.onchange = () => {
			containerWidth = widthInput.value;
			document.body.style.setProperty("--container-width", containerWidth);
			_GM_setValue("container-width", widthInput.value);
		};
		const widthLabel = document.createElement("label");
		widthLabel.innerText = "宽度：";
		widthLabel.title = "单位可以是 rem, px, %, svw, vw";
		widthLabel.appendChild(widthInput);
		div.appendChild(widthLabel);
		const fontSizeInput = document.createElement("input");
		fontSizeInput.value = novelFontSize;
		fontSizeInput.size = 10;
		fontSizeInput.onchange = () => {
			novelFontSize = fontSizeInput.value;
			document.body.style.setProperty("--novel-font-size", novelFontSize);
			_GM_setValue("novel-font-size", fontSizeInput.value);
		};
		const fontSizeLabel = document.createElement("label");
		fontSizeLabel.innerText = "字体大小：";
		fontSizeLabel.appendChild(fontSizeInput);
		div.appendChild(fontSizeLabel);
		const fontFamilyInput = document.createElement("input");
		fontFamilyInput.value = novelFontFamily;
		fontFamilyInput.onchange = () => {
			novelFontFamily = fontFamilyInput.value;
			document.body.style.setProperty("--novel-font-family", novelFontFamily);
			_GM_setValue("novel-font-family", fontFamilyInput.value);
		};
		const fontFamilyLabel = document.createElement("label");
		fontFamilyLabel.innerText = "字体：";
		fontFamilyLabel.appendChild(fontFamilyInput);
		div.appendChild(fontFamilyLabel);
		containerStyleFieldset.appendChild(div);
		return containerStyleFieldset;
	}
	function createSettingForm() {
		const form = document.createElement("form");
		form.appendChild(createContainerStyleFieldset());
		const intervalInput = document.createElement("input");
		intervalInput.type = "number";
		intervalInput.min = "0";
		intervalInput.valueAsNumber = refreshInterval / 6e4;
		intervalInput.style.width = "4rem";
		const intervalLabel = document.createElement("label");
		intervalLabel.innerText = "刷新间隔（分钟）：";
		intervalLabel.appendChild(intervalInput);
		form.appendChild(intervalLabel);
		const button = document.createElement("button");
		button.type = "submit";
		button.innerText = "保存刷新设置";
		button.style.marginLeft = "0.75rem";
		form.appendChild(button);
		form.appendChild(createAccessKeysFieldset());
		const disguiseCodeFieldset = createDisguiseCodeFieldset();
		const updateFieldSetsState = (label) => {
			switch (label) {
				case "none":
					disguiseCodeFieldset.style.display = "none";
					break;
				case "code": disguiseCodeFieldset.style.display = "block";
			}
		};
		updateFieldSetsState(disguiseMode);
		const radioDiv = document.createElement("div");
		radioDiv.style.display = "flex";
		radioDiv.innerHTML = `<p>伪装模式：</p>`;
		[["none", "无"], ["code", "代码"]].forEach(([label, placeholder]) => {
			const disguiseInput = document.createElement("input");
			disguiseInput.name = "disguise-radio";
			disguiseInput.type = "radio";
			disguiseInput.value = label;
			disguiseInput.checked = disguiseMode == label;
			disguiseInput.style.marginLeft = "0.5rem";
			disguiseInput.style.marginRight = "0.5rem";
			disguiseInput.onchange = () => {
				if (disguiseInput.checked) {
					_GM_setValue("disguise-mode", label);
					updateFieldSetsState(label);
				}
			};
			const disguiseLabel = document.createElement("label");
			disguiseLabel.style.display = "flex";
			disguiseLabel.style.alignItems = "center";
			disguiseLabel.appendChild(disguiseInput);
			const disguiseP = document.createElement("p");
			disguiseP.innerText = placeholder;
			disguiseLabel.appendChild(disguiseP);
			radioDiv.appendChild(disguiseLabel);
		});
		form.appendChild(radioDiv);
		form.appendChild(disguiseCodeFieldset);
		form.onsubmit = (e) => {
			e.preventDefault();
			const interval = parseInt(intervalInput.value) * 6e4;
			if (interval >= 0 && interval != refreshInterval) {
				_GM_setValue("refreshInterval", interval);
				refreshInterval = interval;
			}
		};
		setTimeout(() => {
			const pre = document.querySelector("pre");
			if (pre) updateStyle(pre);
		}, 1e3);
		const details = document.createElement("details");
		details.id = "script-setting";
		if (location.hash === "#script-setting") {
			details.open = true;
			setTimeout(() => {
				details.scrollIntoView(true);
			}, 500);
		}
		const summary = document.createElement("summary");
		summary.innerText = "脚本设置";
		details.appendChild(summary);
		details.appendChild(form);
		return details;
	}
	function setDefaultStyle() {
		document.body.style.setProperty("--container-width", containerWidth);
		document.body.style.setProperty("--novel-font-size", novelFontSize);
		document.body.style.setProperty("--novel-font-family", novelFontFamily);
	}
	function handleBookPage$2() {
		VM_log("handleBookPage");
		let finished = false;
		const itemtxt = document.querySelector(".itemtxt");
		Array.from(itemtxt.querySelectorAll("p > span")).forEach((span) => {
			if (span.textContent?.trim() == "已完结") finished = true;
		});
		const settingAnchor = document.createElement("a");
		settingAnchor.href = "/pifu/";
		settingAnchor.style.float = "right";
		settingAnchor.style.marginRight = "0.5rem";
		settingAnchor.innerText = "脚本设置";
		itemtxt.firstElementChild.appendChild(settingAnchor);
		if (!finished) {
			const title = itemtxt.querySelector("h1>a").textContent;
			const latestChapter = itemtxt.querySelector("ul>li>a").textContent;
			const current = document.createElement("p");
			current.innerText = `当前时间：${new Date().toTimeString()}`;
			itemtxt.appendChild(current);
			document.title = `${title} - ${latestChapter}`;
			if (refreshInterval > 0) {
				const next = document.createElement("p");
				next.innerText = `刷新时间：${new Date(Date.now() + refreshInterval).toTimeString()}`;
				itemtxt.appendChild(next);
				setTimeout(() => {
					location.reload();
				}, refreshInterval);
			}
		}
	}
	function handleSettingPage$3() {
		VM_log("handleSettingPage");
		const settingForm = createSettingForm();
		document.querySelector("div.container").appendChild(settingForm);
	}
	async function fetchChaperFragmentPage$1(href) {
		return new Promise((resolve, reject) => {
			_GM_xmlhttpRequest({
				method: "GET",
				url: href,
				responseType: "document",
				onload: (response) => {
					const doc = ensureDoc(response.response);
					const container = doc.querySelector("div.container");
					const paragraphs = paragraphsFromElement(doc.querySelector("div.container .con"));
					const prenexts = container.querySelectorAll("div.prenext a");
					let next;
					let nextChapter;
					for (const element of prenexts) if (element instanceof HTMLAnchorElement) {
						if (element.textContent == "下一页") {
							next = element;
							break;
						} else if (element.textContent == "下一章") {
							nextChapter = element;
							break;
						}
					}
					VM_log({
						next: next?.href,
						nextChapter: nextChapter?.href,
						paragraphs
					});
					resolve({
						next: next?.href,
						nextChapter: nextChapter?.href,
						paragraphs
					});
				},
				onerror: (response) => {
					VM_log(["handleSettingPage error", response]);
					reject(response);
				},
				ontimeout: () => {
					VM_log("handleSettingPage timeout");
					reject("timeout");
				}
			});
		});
	}
	function handleChaperPage() {
		VM_log("handleChaperPage");
		const prenexts = document.querySelector("div.container").querySelectorAll("div.prenext a");
		const con = document.querySelector("div.container .con");
		const paragraphs = paragraphsFromElement(con);
		con.replaceChildren(...paragraphs);
		for (const element of prenexts) if (element instanceof HTMLAnchorElement) {
			if (element.textContent == "下一页") {
				(async () => {
					let counter = 0;
					let next = await fetchChaperFragmentPage$1(element.href);
					con.append(...next.paragraphs);
					while (next.next && counter < 20) {
						counter++;
						next = await fetchChaperFragmentPage$1(next.next);
						con.append(...next.paragraphs);
					}
					if (next.nextChapter) {
						element.textContent = "下一章";
						element.href = next.nextChapter;
					}
					rebuildChapterBody(getChapterPage$1());
				})();
				break;
			} else if (element.textContent == "下一章") {
				(() => {
					rebuildChapterBody(getChapterPage$1());
				})();
				break;
			}
		}
	}
	function handleDeqiRoute() {
		if (isSudugu()) {
			handleSuduguRoute();
			return;
		}
		if (location.pathname === "/pifu/") {
			setupCodeTheme();
			setupExtendLanguageSupport();
			handleSettingPage$3();
		} else if (location.pathname.endsWith(".html")) {
			if (!isInIframe) switch (disguiseMode) {
				case "code":
					setupCodeTheme();
					setupExtendLanguageSupport();
			}
			handleChaperPage();
		} else if (location.pathname.startsWith("/xiaoshuo/")) handleBookPage$2();
	}
	function handleSuduguRoute() {
		VM_log("handleSuduguRoute");
		if (location.pathname === "/i/pifu.aspx") {
			setupCodeTheme();
			setupExtendLanguageSupport();
			handleSettingPage$3();
		} else if (location.pathname.endsWith(".html")) {
			if (!isInIframe) switch (disguiseMode) {
				case "code":
					setupCodeTheme();
					setupExtendLanguageSupport();
			}
			handleChaperPage();
		} else if (location.pathname.match(/\/\d+\/(p-\d+\.html)?/)) handleBookPage$2();
	}
	function isSudugu() {
		return location.host.endsWith("sudugu.org") || location.host.endsWith("shudugu.org");
	}
	function getChapterPage$1() {
		const con = document.querySelector("div.container .con");
		con.className = "";
		const mainSection = disguiseParagraphs(con);
		const prenexts = document.querySelectorAll("div.prenext a");
		const navigationBar = {};
		for (const element of prenexts) if (element instanceof HTMLAnchorElement) {
			if (element.textContent == "上一章") navigationBar.prevAnchor = element;
			else if (element.textContent == "目录" || element.textContent == "章节目录") navigationBar.infoAnchor = element;
			else if (element.textContent == "下一章") navigationBar.nextAnchor = element;
		}
		setAccessKeys(navigationBar);
		return {
			breadcrumbBar: document.querySelector("div.container > div.submenu h1"),
			mainSection,
			navigationBar
		};
	}
	var bookID = "";
	var chapterLinks = new Array();
	var chapterLinkSet = new Set();
	function cleanupBody$1() {
		Array.from(document.body.children).filter((it) => it.id != "main" && it.id != "mainboxs").forEach((it) => {
			if (it.className == "article-root") return;
			it.remove();
		});
	}
	function handleSettingPage$2() {
		const settingForm = createSettingForm();
		const articleMain = document.createElement("div");
		articleMain.id = "article_main";
		articleMain.classList = "container";
		const container = document.getElementById("main");
		articleMain.appendChild(settingForm);
		container.appendChild(articleMain);
	}
	function handleBookPage$1() {
		const rowDiv = document.querySelector("#main > div.nine-item > div.container > div.row");
		const moreItem = createAttrOneItem();
		moreItem.id = "more-item";
		moreItem.appendChild(createMoreAnchor());
		const resetItem = createAttrOneItem();
		resetItem.id = "reset-item";
		resetItem.appendChild(createResetAnchor());
		rowDiv.append(moreItem, resetItem);
		const links = Array.from(rowDiv.querySelectorAll("a[href][title]")).map((it) => {
			return {
				href: it.href,
				title: it.title
			};
		});
		const indexStr = localStorage.getItem(`book_index_${bookID}`);
		if (indexStr) {
			const oldLinks = JSON.parse(indexStr);
			const linkSet = new Set(links.map((it) => it.href));
			oldLinks.forEach((it) => {
				if (!linkSet.has(it.href)) {
					links.push(it);
					rowDiv.insertBefore(createChapterLink(it.href, it.title), moreItem);
				}
			});
			links.sort((a, b) => {
				return b.href.localeCompare(a.href);
			});
		}
		chapterLinks.push(...links);
		chapterLinkSet.clear();
		chapterLinks.forEach((it) => {
			chapterLinkSet.add(it.href);
		});
		localStorage.setItem(`book_index_${bookID}`, JSON.stringify(chapterLinks));
	}
	function fetchPreviousChapter(href, limit) {
		if (limit <= 0) return;
		_GM_xmlhttpRequest({
			method: "GET",
			url: href,
			responseType: "document",
			onload: (response) => {
				const link = getPrevLink(response.response);
				if (!chapterLinkSet.has(href)) {
					chapterLinkSet.add(href);
					chapterLinks.push({
						title: link.title,
						href
					});
					chapterLinks.sort((a, b) => {
						return b.href.localeCompare(a.href);
					});
					localStorage.setItem(`book_index_${bookID}`, JSON.stringify(chapterLinks));
					const moreItem = document.getElementById("more-item");
					const element = createChapterLink(href, link.title);
					moreItem.parentElement?.insertBefore(element, moreItem);
				}
				fetchPreviousChapter(link.href, limit - 1);
			}
		});
	}
	function createAttrOneItem() {
		const div = document.createElement("div");
		div.className = "col-md-4 col-sm-12 att-one-item";
		return div;
	}
	function getLastestHref() {
		return document.getElementById("more-item").previousElementSibling?.querySelector("a")?.href;
	}
	function createMoreAnchor() {
		const a = document.createElement("a");
		a.role = "button";
		a.onclick = () => {
			const latest = getLastestHref();
			console.log("more", latest);
			fetchPreviousChapter(latest, 10);
		};
		a.title = "更多";
		a.innerHTML = "更多";
		return a;
	}
	function createResetAnchor() {
		const a = document.createElement("a");
		a.role = "button";
		a.onclick = () => {
			console.log("reset");
			localStorage.removeItem(`book_index_${bookID}`);
		};
		a.title = "重置";
		a.innerHTML = "重置";
		return a;
	}
	function createChapterLink(href, title) {
		const div = createAttrOneItem();
		const a = document.createElement("a");
		a.href = new URL(href).pathname;
		a.title = title;
		a.innerText = title;
		div.append(a);
		return div;
	}
	function getPage() {
		const mainSection = disguiseParagraphs(document.getElementById("mainboxs"));
		const prenexts = document.querySelectorAll("div.prenext a");
		const navigationBar = {};
		for (const element of prenexts) if (element instanceof HTMLAnchorElement) {
			if (element.textContent == "上一章") navigationBar.prevAnchor = element;
			else if (element.textContent == "章节目录") navigationBar.infoAnchor = element;
			else if (element.textContent == "下一章") navigationBar.nextAnchor = element;
		}
		setAccessKeys(navigationBar);
		const title = document.getElementById("post-h2")?.innerHTML;
		return {
			breadcrumbBar: document.querySelector("div.page-links"),
			title,
			mainSection,
			navigationBar
		};
	}
	function appendRemainPages(netxDivs, hasCanvas) {
		const articleMain = document.getElementById("article_main");
		const mainboxs = document.getElementById("mainboxs");
		const scripts = [];
		netxDivs.forEach((div) => {
			if (typeof div === "undefined") return;
			if (typeof div === "string") {
				const next = document.createElement("div");
				next.innerHTML = div;
				mainboxs.appendChild(next);
			} else scripts.push(div.innerHTML);
		});
		const page = getPage();
		if (articleMain) {
			if (hasCanvas) {
				const cleanPage = rebuildChapterBody(page);
				mainboxs.id = "";
				const section = cleanPage.main.querySelector("section");
				const canvasList = Array.from(cleanPage.main.querySelectorAll("canvas"));
				if (canvasList.length > 0) {
					section.classList.add("img-container");
					const result = mergeCanvases(canvasList);
					section.firstElementChild?.replaceWith(canvasToImage(result));
				}
				handleCanvasScript(scripts);
			} else rebuildChapterBody(page);
			cleanupBody$1();
		}
	}
	function mergeCanvases(canvases) {
		const result = document.createElement("canvas");
		let totalWidth = 0, totalHeight = 0;
		canvases.forEach((canvas) => {
			totalHeight += canvas.height;
			totalWidth = Math.max(totalWidth, canvas.width);
		});
		result.width = totalWidth;
		result.height = totalHeight;
		let heightOffset = 0;
		canvases.forEach((canvas) => {
			result.getContext("2d")?.drawImage(canvas, 0, heightOffset);
			heightOffset += canvas.height;
		});
		return result;
	}
	function handleCanvasScript(scripts) {
		if (scripts.length > 0) {
			console.log("handleCanvasScript", scripts);
			const script = document.createElement("script");
			script.textContent = scripts.shift();
			forCleanCanvas(() => {
				setTimeout(() => {
					script.remove();
					handleCanvasScript(scripts);
				}, 1e3);
			});
			document.body.appendChild(script);
		}
	}
	function getMainBox(doc) {
		return ensureDoc(doc).getElementById("mainboxs");
	}
	function getCanvasScript(doc) {
		const document = ensureDoc(doc);
		let scriptCopy = void 0;
		const scripts = Array.from(document.body.querySelectorAll("script:not([src])"));
		scripts.forEach((script) => {
			if (typeof scriptCopy != "undefined") return;
			if (script.innerHTML.includes(`if(!isMobile)`) && !script.innerHTML.includes(`qrcode`)) {
				console.log("有手机浏览器限制");
				scriptCopy = document.createElement("script");
				scriptCopy.innerHTML = script.innerHTML;
				return;
			}
		});
		if (typeof scriptCopy == "undefined") scripts.forEach((script) => {
			if (typeof scriptCopy != "undefined") return;
			if (script.innerHTML.includes(`display_img_line`)) {
				scriptCopy = document.createElement("script");
				scriptCopy.innerHTML = script.innerHTML;
			}
		});
		return scriptCopy;
	}
	function getPrevLink(doc) {
		const rDoc = ensureDoc(doc);
		return {
			href: rDoc.querySelector(".prenext > a[rel=\"prev\"]").href,
			title: rDoc.getElementById("post-h2").innerText
		};
	}
	function handleChapterPage$3() {
		if (disguiseDebug) {
			disguiseParagraphs(document.getElementById("mainboxs"));
			return;
		}
		const articleMain = document.getElementById("article_main");
		const nextLinks = Array.from(document.querySelectorAll("#page-links a.post-page-numbers"));
		const netxDivs = new Array(nextLinks.length);
		let remainLinks = nextLinks.length;
		let hasCanvas = false;
		for (let index = 0; index < nextLinks.length; index++) {
			const anchor = nextLinks[index];
			_GM_xmlhttpRequest({
				method: "GET",
				url: anchor.href,
				responseType: "document",
				onload: (response) => {
					try {
						const doc = response.response;
						const div = getMainBox(doc);
						if (div.getElementsByTagName("p").length == 0) {
							hasCanvas = true;
							netxDivs[index] = getCanvasScript(doc);
						} else netxDivs[index] = div.innerHTML;
						if (!hasCanvas) anchor.remove();
						remainLinks--;
					} catch (error) {
						const div = document.createElement("div");
						div.innerText = `error: ${error} with resolve ${anchor.href}`;
						articleMain?.append(div);
						if (error instanceof Error) {
							const div = document.createElement("div");
							div.innerText = `name: ${error.name}, stack: ${error.stack}`;
							articleMain?.append(div);
						}
					}
					if (remainLinks == 0) appendRemainPages(netxDivs, hasCanvas);
				}
			});
		}
	}
	function canvasToImage(canvas) {
		const image = new Image();
		image.src = canvas.toDataURL();
		return image;
	}
	function forCleanCanvas(callback) {
		const thisWin = document.defaultView;
		thisWin.cenabled = () => {
			return true;
		};
		thisWin.isMobile = true;
		const mainboxs = document.createElement("div");
		mainboxs.id = "mainboxs";
		document.body.appendChild(mainboxs);
		console.log("forCleanCanvas");
		const ob = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type == "childList") mutation.removedNodes.forEach((node) => {
					if (node.nodeType == Node.ELEMENT_NODE) {
						if (node.tagName == "DIV") {
							console.log("done");
							ob.disconnect();
							setTimeout(() => {
								const article = document.querySelector(".article-root article");
								const table = mainboxs.querySelector("table");
								if (article && table) {
									const section = document.createElement("section");
									section.className = "img-container";
									mainboxs.remove();
									const result = mergeCanvases(Array.from(table.querySelectorAll("canvas")));
									section.appendChild(canvasToImage(result));
									article.appendChild(section);
								}
								callback && callback();
							}, 100);
						}
					}
				});
			});
		});
		ob.observe(mainboxs, {
			childList: true,
			subtree: true
		});
	}
	function handleBiqu33Route() {
		if (document.documentElement.lang == "zh-TW") document.documentElement.lang = "zh-CN";
		const segments = location.pathname.split("/").filter(Boolean);
		const lastSegment = segments[segments.length - 1];
		switch (segments.length) {
			case 0:
			case 1:
			case 2:
				cleanupBody$1();
				setupCodeTheme();
				setupExtendLanguageSupport();
				handleSettingPage$2();
				if (segments.length == 2 && segments[0] == "book") {
					bookID = segments[1];
					handleBookPage$1();
				}
				break;
			case 3:
				if (/[\d\w]+_\d+$/.test(lastSegment)) {
					Array.from(document.querySelectorAll("#article_main .row")).forEach((row) => {
						row.style.display = "flex";
					});
					const thisWin = document.defaultView;
					let scriptCopy = getCanvasScript(document);
					cleanupBody$1();
					if (scriptCopy && !thisWin.isMobile) {
						const page = getPage();
						page.mainSection.innerHTML = "";
						rebuildChapterBody(page);
						forCleanCanvas();
						thisWin.isMobile = true;
						document.body.appendChild(scriptCopy);
					}
					return;
				}
				switch (disguiseMode) {
					case "code":
						setupCodeTheme();
						setupExtendLanguageSupport();
				}
				handleChapterPage$3();
		}
	}
	function cleanupBody() {
		Array.from(document.body.children).filter((it) => it.id != "ss-reader-main").forEach((it) => {
			it.remove();
		});
	}
	function cleanBookPage() {
		const articleMain = document.createElement("div");
		articleMain.id = "ss-reader-main";
		Array.from(document.body.querySelectorAll(".container")).forEach((container) => {
			container.className = "";
			articleMain.appendChild(container);
		});
		document.body.appendChild(articleMain);
		cleanupBody();
	}
	function handleSettingPage$1() {
		const articleMain = document.getElementById("ss-reader-main");
		const settingForm = createSettingForm();
		articleMain.appendChild(settingForm);
	}
	function formatArticle() {
		const navigationBar = {
			prevAnchor: document.getElementById("prev_url"),
			infoAnchor: document.getElementById("info_url"),
			nextAnchor: document.getElementById("next_url")
		};
		setAccessKeys(navigationBar);
		rebuildChapterBody({
			breadcrumbBar: document.querySelector(".info-title"),
			title: document.title.split("-").shift(),
			mainSection: disguiseParagraphs(document.getElementById("article")),
			navigationBar
		});
	}
	function continueFetchPages(curDoc) {
		const nextURL = curDoc.getElementById("next_url");
		if (nextURL.textContent.trim() == "下一章") {
			document.getElementById("next_url").replaceWith(nextURL);
			formatArticle();
		} else {
			if (nextURL.href.startsWith("javascript:")) {
				console.error("Cannot fetch next page");
				return;
			}
			_GM_xmlhttpRequest({
				method: "GET",
				url: nextURL.href,
				responseType: "document",
				onload: (response) => {
					const doc = ensureDoc(response.response);
					const article = document.getElementById("article");
					const nextArticle = doc.getElementById("article");
					Array.from(nextArticle.children).forEach((child) => {
						article.appendChild(child);
					});
					continueFetchPages(doc);
				}
			});
		}
	}
	function handleChapterPage$2() {
		if (disguiseDebug) {
			disguiseParagraphs(document.getElementById("article"));
			return;
		}
		document.body.setAttribute("hidden", "");
		continueFetchPages(document);
	}
	function handleDDxiaoshuoRoute() {
		document.body.style.display = "flex";
		document.body.style.justifyContent = "center";
		const segments = location.pathname.split("/").filter(Boolean);
		const lastSegment = segments[segments.length - 1];
		switch (segments.length) {
			case 0:
				document.body.style.flexDirection = "column";
				break;
			case 1:
				cleanBookPage();
				setupCodeTheme();
				setupExtendLanguageSupport();
				if (location.pathname == "/history.html") handleSettingPage$1();
				break;
			case 2:
				if (/[\d\w]+_\d+$/.test(lastSegment)) return;
				switch (disguiseMode) {
					case "code":
						setupCodeTheme();
						setupExtendLanguageSupport();
				}
				handleChapterPage$2();
		}
	}
	function handleChapterPage$1() {
		const showReading = document.getElementById("showReading");
		const bookTitle = document.querySelector("#readcontent .book_title h1");
		const nextPageBox = document.querySelector(".nextPageBox");
		const navigationBar = {
			prevAnchor: nextPageBox.querySelector(".prev"),
			infoAnchor: nextPageBox.querySelector(".dir"),
			nextAnchor: nextPageBox.querySelector(".next")
		};
		setAccessKeys(navigationBar);
		const title = bookTitle.textContent;
		rebuildChapterBody({
			breadcrumbBar: document.querySelector(".bookNav"),
			title,
			mainSection: disguiseParagraphs(showReading),
			navigationBar
		});
	}
	function handleSettingPage() {
		const settingForm = createSettingForm();
		const articleMain = document.createElement("div");
		articleMain.id = "article_main";
		articleMain.classList = "container";
		const container = document.querySelector(".wrap_bg");
		articleMain.appendChild(settingForm);
		container.appendChild(articleMain);
	}
	function handleCuoCengRoute() {
		switch (location.pathname.split("/").filter(Boolean).length) {
			case 0:
				document.body.style.flexDirection = "column";
				break;
			case 2:
				setupCodeTheme();
				setupExtendLanguageSupport();
				handleSettingPage();
				break;
			case 3:
				if (location.pathname.startsWith("/book/chapter/")) {
					_GM_registerMenuCommand("脚本设置", function() {
						open(location.pathname.replace("/book/chapter/", "/book/"));
					});
					return;
				}
				_GM_registerMenuCommand("脚本设置", function() {
					open(location.pathname.replace(/\/[\d\w\-]+\.html/, ".html"));
				});
				switch (disguiseMode) {
					case "code":
						setupCodeTheme();
						setupExtendLanguageSupport();
				}
				handleChapterPage$1();
		}
	}
	function handleKudushuRoute() {
		VM_log("handleKudushuRoute");
		if (/\/book\/[^/]+/.test(location.pathname) || /\/html\/[^/]+\/[^/]+\/index\.html/.test(location.pathname)) handleBookPage();
		else if (/\/html\/[^/]+\/[^/]+/.test(location.pathname) || /\/html\/[^/]+\/[^/]+\/[^/]+\.html/.test(location.pathname)) handleChapterPage();
	}
	function handleBookPage() {
		VM_log("handleBookPage");
	}
	function handleChapterPage() {
		VM_log("handleChapterPage");
		const container = document.getElementById("novelcontent");
		const ul = document.querySelector("ul");
		if (ul) document.getElementById("novelbody")?.append(ul);
		const prenexts = Array.from(container.querySelectorAll("#novelcontent ul li a")).filter((it) => it instanceof HTMLAnchorElement).map((it) => it.cloneNode(true));
		container.querySelector("ul")?.remove();
		document.getElementById("content_tip")?.remove();
		const con = container;
		const paragraphs = paragraphsFromElement(con);
		con.replaceChildren(...paragraphs.filter((p) => p.textContent.length > 0 && !p.textContent.includes("本章未完")));
		for (const element of prenexts) if (element instanceof HTMLAnchorElement) {
			if (element.textContent == "下—页") {
				(async () => {
					let counter = 0;
					let next = await fetchChaperFragmentPage(element.href);
					con.append(...next.paragraphs);
					while (next.next && counter < 20) {
						counter++;
						next = await fetchChaperFragmentPage(next.next);
						con.append(...next.paragraphs);
					}
					if (next.nextChapter) {
						Array.from(document.querySelectorAll("#novelbody ul li p a")).forEach((a) => {
							console.log("UL", a.outerHTML);
							if (a instanceof HTMLAnchorElement && a.textContent.includes("下")) {
								a.textContent = "下一章";
								a.href = next.nextChapter || a.href;
							}
						});
						element.textContent = "下一章";
						element.href = next.nextChapter;
					}
					rebuildChapterBody(getChapterPage());
				})();
				break;
			} else if (element.textContent == "下—章") {
				(() => {
					rebuildChapterBody(getChapterPage());
				})();
				break;
			}
		}
	}
	async function fetchChaperFragmentPage(href) {
		VM_log("fetchChaperFragmentPage", href);
		return new Promise((resolve, reject) => {
			_GM_xmlhttpRequest({
				method: "GET",
				url: href,
				responseType: "document",
				onload: (response) => {
					const container = ensureDoc(response.response).getElementById("novelcontent");
					const nestedCon = container;
					const ul = container.querySelector("ul");
					ul.remove();
					const paragraphs = paragraphsFromElement(nestedCon);
					const prenexts = ul.querySelectorAll("ul li a");
					let next;
					let nextChapter;
					for (const element of prenexts) if (element instanceof HTMLAnchorElement) {
						if (element.textContent == "下—页") {
							next = element;
							break;
						} else if (element.textContent == "下—章") {
							nextChapter = element;
							nextChapter.textContent = "下一章";
							break;
						}
					}
					VM_log({
						next: next?.href,
						nextChapter: nextChapter?.href,
						paragraphs
					});
					resolve({
						next: next?.href,
						nextChapter: nextChapter?.href,
						paragraphs: paragraphs?.filter((p) => p.textContent.length > 0 && !p.textContent.includes("本章未完"))
					});
				},
				onerror: (response) => {
					VM_log(["handleSettingPage error", response]);
					reject(response);
				},
				ontimeout: () => {
					VM_log("handleSettingPage timeout");
					reject("timeout");
				}
			});
		});
	}
	function getChapterPage() {
		const con = document.getElementById("novelcontent");
		con.className = "";
		con.id = "";
		const mainSection = disguiseParagraphs(con);
		let content_tip = document.getElementById("content_tip");
		while (content_tip) {
			content_tip.remove();
			content_tip = document.getElementById("content_tip");
		}
		const title = document.getElementById("chaptertitle")?.textContent;
		const prenexts = Array.from(document.querySelectorAll("#novelbody ul li p a")).map((a) => a.cloneNode(true));
		const navigationBar = {};
		for (const element of prenexts) if (element.textContent == "上一章" || element.textContent.includes("上")) {
			element.textContent = "上—章";
			navigationBar.prevAnchor = element;
		} else if (element.textContent == "目录" || element.textContent == "章节目录" || element.textContent == "返 回 目 录" || element.textContent.includes("录")) {
			element.textContent = "目录";
			navigationBar.infoAnchor = element;
		} else if (element.textContent == "下一章") navigationBar.nextAnchor = element;
		else console.log(element.outerHTML);
		setAccessKeys(navigationBar);
		return {
			mainSection,
			title,
			navigationBar
		};
	}
	document.defaultView.Prism = globalThis.Prism;
	VM_log("init");
	function handleRoute() {
		if (location.host.endsWith("deqixs.com") || location.host.endsWith("sudugu.org") || location.host.endsWith("shudugu.org") || location.host.endsWith("deqixs.org")) {
			handleDeqiRoute();
			_GM_registerMenuCommand("脚本设置", function() {
				if (location.host.endsWith("deqixs.com")) open("/pifu/#script-setting");
				else open("/i/pifu.aspx#script-setting");
			});
		} else if (location.hostname == "www.ddxiaoshuo.cc") {
			handleDDxiaoshuoRoute();
			_GM_registerMenuCommand("脚本设置", function() {
				open("/history.html#script-setting");
			});
		} else if (location.hostname == "www.cuoceng.com" || location.hostname == "cuoceng.com") handleCuoCengRoute();
		else if (location.hostname.endsWith("kudushu.org")) handleKudushuRoute();
		else if (location.hostname == "www.biqu33.cc" || location.pathname.startsWith("/book/")) {
			handleBiqu33Route();
			_GM_registerMenuCommand("脚本设置", function() {
				open("/#script-setting");
			});
		}
	}
	setDefaultStyle();
	handleRoute();
	releaseCopy();
})();
