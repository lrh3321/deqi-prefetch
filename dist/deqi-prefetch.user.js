// ==UserScript==
// @name         Deqi Prefech
// @namespace    https://greasyfork.org/zh-CN/users/14997-lrh3321
// @version      2025-07-31
// @author       LRH3321
// @description  得奇小说网，看单个章节免翻页，把小说伪装成代码
// @license      MIT
// @icon         https://www.google.com/s2/favicons?sz=64&domain=deqixs.com
// @homepageURL  https://greasyfork.org/zh-CN/scripts/537588-deqi-prefech
// @downloadURL  https://update.greasyfork.org/scripts/537588/Deqi%20Prefech.user.js
// @updateURL    https://update.greasyfork.org/scripts/537588/Deqi%20Prefech.user.js
// @match        https://www.deqixs.com/pifu/
// @match        https://www.deqixs.com/xiaoshuo/*/*.html
// @match        https://www.deqixs.com/xiaoshuo/*/
// @require      https://cdn.jsdelivr.net/npm/prismjs@1.30.0/prism.min.js
// @tag          novels
// @grant        GM_addElement
// @grant        GM_addStyle
// @grant        GM_getResourceURL
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(e=>{if(typeof GM_addStyle=="function"){GM_addStyle(e);return}const t=document.createElement("style");t.textContent=e,document.head.append(t)})(' [data-comment=normal] span.token.comment{font-style:normal}img[alt],.menu,.header p,h2 a,div.footer,div.container>ul.list{display:none}h2.op a{display:block}body>div.container,body>div.header{width:var(--container-width, "1200px")}body{-webkit-backdrop-filter:contrast(110%);backdrop-filter:contrast(110%)}fieldset{display:block;min-inline-size:min-content;margin-inline:2px;margin-top:1rem;margin-bottom:1rem;border-width:2px;border-style:groove;border-color:gray;border-image:initial;padding-block:.35em .625em;padding-inline:.75em}input[type=number]{padding-left:.5rem}editable-list li{width:fit-content;height:fit-content;display:flex;align-items:baseline;--list-display: none}editable-list li:hover{--list-display: block}editable-list li:hover .icon{top:0rem;right:3rem}editable-list .icon{border:none;cursor:pointer;position:relative;font-size:1.8rem;display:var(--list-display)}editable-list textarea{padding:.5rem;width:95%}editable-list ul{display:flex;max-width:80svw;flex-wrap:wrap;justify-content:space-around} ');

(function () {
  'use strict';

  var _GM_addElement = /* @__PURE__ */ (() => typeof GM_addElement != "undefined" ? GM_addElement : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  let extendLanguageElement = null;
  function setupExtendLanguageSupport() {
    if (!coreLanguages.has(codeLang)) {
      _unsafeWindow.Prism = _unsafeWindow.Prism || window.Prism;
      console.log("loading language", codeLang);
      const src = `https://dev.prismjs.com/components/prism-${codeLang}.js`;
      if (extendLanguageElement?.src == src) {
        return;
      }
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
        break;
    }
    const codeSegments = [];
    paragraphs.forEach((p) => {
      const textContent = p.textContent.trim();
      let line = "";
      while (line.trim() == "") {
        if (lines.length == 0) {
          lines.push(...getRandomCode().split(/[\r]?\n/));
        }
        line = lines.shift();
        if (line.trim() == "}") {
          codeSegments.push(line);
          line = "";
        }
      }
      const trimed = line.replace(/^[\s\t]+/, "");
      if (trimed !== line) {
        const prefix = line.substring(0, line.length - trimed.length);
        if (textContent.length + shortCommnet.length + prefix.length < inlineLengthMax && shortCommnet != "") {
          codeSegments.push(`${prefix}${shortCommnet}${textContent}`);
        } else {
          codeSegments.push(
            `${prefix}${blockCommentStart}
${prefix}  ${textContent}
${prefix}${blockCommentEnd}`
          );
        }
      } else {
        if (textContent.length + shortCommnet.length < inlineLengthMax && shortCommnet != "") {
          codeSegments.push(`${shortCommnet}${textContent}`);
        } else {
          codeSegments.push(`${blockCommentStart}
  ${textContent}
${blockCommentEnd}`);
        }
      }
      codeSegments.push(line);
      p.remove();
    });
    codeSegments.push(...lines);
    const pre = createPreformattedCode(codeSegments.join("\n"));
    container.parentElement.replaceChild(pre, container);
    highlightElement(pre, false, (_) => {
      document.body.style.backgroundColor = getComputedStyle(pre).backgroundColor;
    });
  }
  function createPreformattedCode(snippet) {
    const code = document.createElement("code");
    code.className = `language-${codeLang}`;
    code.style.whiteSpace = "pre-wrap";
    code.style.textWrap = "pretty";
    code.style.overflowX = "auto";
    code.innerHTML = snippet;
    const pre = document.createElement("pre");
    pre.style.whiteSpace = "pre-wrap";
    pre.style.textWrap = "pretty";
    pre.style.overflowX = "auto";
    pre.className = `language-${codeLang}`;
    if (pre.firstChild) {
      pre.replaceChild(code, pre.firstChild);
    } else {
      pre.appendChild(code);
    }
    return pre;
  }
  function highlightElement(el, async, callback) {
    if (coreLanguages.has(codeLang)) {
      Prism.highlightElement(el, async, callback);
    } else {
      let count = 0;
      const lazyHighlightElement = () => {
        count++;
        if (codeLang in Prism.languages) {
          Prism.highlightElement(el, async, callback);
          return;
        }
        if (count > 10) {
          return;
        }
        setTimeout(lazyHighlightElement, 200);
      };
      setTimeout(lazyHighlightElement, 200);
    }
  }
  class EditableList extends HTMLElement {
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
      this.codeSnippetsStore = /* @__PURE__ */ new Map();
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
    }
    // fires after the element has been attached to the DOM
    connectedCallback() {
      this.lazyInit();
      const addElementButton = this.querySelector(".editable-list-add-item");
      addElementButton?.addEventListener("click", this.addListItem, false);
    }
    // add items to the list
    addListItem() {
      const textInput = this.textInput;
      let snippet = textInput?.value;
      if (snippet) {
        this.counter++;
        const idx = this.counter.toString();
        snippet = this.trimSnippet(snippet);
        this.addCodeSnippet(idx, snippet);
        textInput.value = "";
        this.dispatchEvent(new CustomEvent("add-item"));
      }
    }
    trimSnippet(s) {
      const lines = s.split(/[\r\n]+/).filter((l) => l.trim());
      return lines.join("\n");
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
      if (!this.itemList) {
        this.lazyInit();
      }
      this.itemList.innerHTML = ``;
      this.codeSnippetsStore.forEach((snippet, idx) => {
        this.addCodeSnippet(idx, snippet);
      });
    }
    addCodeSnippet(idx, snippet) {
      const li = document.createElement("li");
      li.dataset.snippetId = idx;
      const button = document.createElement("button");
      const pre = createPreformattedCode(snippet);
      button.classList.add("editable-list-remove-item", "icon");
      button.innerHTML = "&ominus;";
      li.appendChild(pre);
      li.appendChild(button);
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
        parent.remove();
        this.codeSnippetsStore.delete(parent.dataset.snippetId || "");
        this.dispatchEvent(new CustomEvent("remove-item"));
      }
    }
  }
  function setupEditableList() {
    customElements.define("editable-list", EditableList);
  }
  function getCodeThemeURL(theme) {
    const officialThemes = /* @__PURE__ */ new Set([
      "prism",
      "prism-dark",
      "prism-funky",
      "prism-okaidia",
      "prism-twilight",
      "prism-coy",
      "prism-solarizedlight",
      "prism-tomorrow"
    ]);
    if (officialThemes.has(theme)) {
      return `https://dev.prismjs.com/themes/${theme}.min.css`;
    }
    return `https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/${theme}.min.css`;
  }
  function releaseCopy() {
    const $ = _unsafeWindow.$ || window.$;
    if ($) {
      const doc = $(document);
      doc.off("contextmenu");
      doc.off("copy");
      doc.off("cut");
    }
  }
  let disguiseMode = _GM_getValue("disguise-mode", "none");
  let codeLang = _GM_getValue("code-lang", "javascript");
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
  let fakeCodeSnippet = _GM_getValue("fake-codes", defaultCodeSnippet);
  if (fakeCodeSnippet.trim() == "") {
    fakeCodeSnippet = defaultCodeSnippet;
  }
  let codeTheme = _GM_getValue("code-theme", "prism");
  let codeParagraphItalic = _GM_getValue("code-italic", true);
  let refreshInterval = _GM_getValue("refreshInterval", 15 * 6e4);
  const avalibleCodeThemes = [
    { Name: "Default", code: "prism" },
    { Name: "Dark", code: "prism-dark" },
    { Name: "Funky", code: "prism-funky" },
    { Name: "Okaidia", code: "prism-okaidia" },
    { Name: "Twilight", code: "prism-twilight" },
    { Name: "Coy", code: "prism-coy" },
    { Name: "Solarized Light", code: "prism-solarizedlight" },
    { Name: "Tomorrow Night", code: "prism-tomorrow" },
    // A wider selection of Prism themes
    { Name: "CB", code: "prism-cb" },
    { Name: "GHColors", code: "prism-ghcolors" },
    { Name: "Pojoaque", code: "prism-pojoaque" },
    { Name: "Xonokai", code: "prism-xonokai" },
    { Name: "Ateliersulphurpool-light", code: "prism-base16-ateliersulphurpool.light" },
    { Name: "Hopscotch", code: "prism-hopscotch" },
    { Name: "Atom Dark", code: "prism-atom-dark" },
    { Name: "Duotone Dark", code: "prism-duotone-dark" },
    { Name: "Duotone Sea", code: "prism-duotone-sea" },
    { Name: "Duotone Space", code: "prism-duotone-space" },
    { Name: "Duotone Earth", code: "prism-duotone-earth" },
    { Name: "Duotone Forest", code: "prism-duotone-forest" },
    { Name: "Duotone Light", code: "prism-duotone-light" },
    { Name: "VS", code: "prism-vs" },
    { Name: "VS Code Dark+", code: "prism-vsc-dark-plus" },
    { Name: "Darcula", code: "prism-darcula" },
    { Name: "a11y Dark", code: "prism-a11y-dark" },
    { Name: "Dracula", code: "prism-dracula" },
    { Name: "Synthwave '84", code: "prism-synthwave84" },
    { Name: "Shades of Purple", code: "prism-shades-of-purple" },
    { Name: "Material Dark", code: "prism-material-dark" },
    { Name: "Material Light", code: "prism-material-light" },
    { Name: "Material Oceanic", code: "prism-oceanic" },
    { Name: "Nord", code: "prism-nord" },
    { Name: "Coldark Cold", code: "prism-coldark-cold" },
    { Name: "Coldark Dark", code: "prism-coldark-dark" },
    { Name: "Coy without shadows", code: "prism-coy-without-shadows" },
    { Name: "Gruvbox Dark", code: "prism-gruvbox-dark" },
    { Name: "Gruvbox Light", code: "prism-gruvbox-light" },
    { Name: "Lucario", code: "prism-lucario" },
    { Name: "Night Owl", code: "prism-night-owl" },
    { Name: "Holi Theme", code: "prism-holi-theme" },
    { Name: "Z-Touch", code: "prism-z-touch" },
    { Name: "Solarized Dark Atom", code: "prism-solarized-dark-atom" },
    { Name: "One Dark", code: "prism-one-dark" },
    { Name: "One Light", code: "prism-one-light" },
    { Name: "Laserwave", code: "prism-laserwave" }
  ];
  const avalibleCodeLanguages = [
    { Name: "Markup — markup, html, xml, svg, mathml, ssml, atom, rss", code: "markup" },
    { Name: "CSS — css", code: "css" },
    { Name: "C-like — clike", code: "clike" },
    { Name: "JavaScript — javascript, js", code: "javascript" },
    { Name: "C —c", code: "c" },
    { Name: "C# —csharp, cs, dotnet", code: "csharp" },
    { Name: "C++ —cpp", code: "cpp" },
    { Name: "Go —go", code: "go" },
    { Name: "Java —java", code: "java" },
    { Name: "Kotlin —kotlin, kt, kts", code: "kotlin" },
    { Name: "PHP —php", code: "php" },
    { Name: "Python —python, py", code: "python" },
    { Name: "Rust —rust", code: "rust" }
  ];
  const coreLanguages = /* @__PURE__ */ new Set(["markup", "css", "clike", "javascript"]);
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
  let codeThemeElement = null;
  function setupCodeTheme() {
    codeThemeElement = _GM_addElement(document.head, "link", {
      href: getCodeThemeURL(codeTheme),
      rel: "stylesheet",
      type: "text/css"
    });
    if (!codeParagraphItalic) {
      document.body.dataset.comment = "normal";
    }
  }
  let bookPageAccessKey = _GM_getValue("bookPageAccessKey", "h");
  let previousChapterAccessKey = _GM_getValue("previousChapterAccessKey", "b");
  let nextChapterAccessKey = _GM_getValue("nextChapterAccessKey", "n");
  function createAccessKeysFieldset() {
    const accessKeysFieldset = document.createElement("fieldset");
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
    const previousChapterAccessKey2 = accessKeysFieldset.querySelector(
      "#previousChapterAccessKey"
    );
    const bookPageAccessKey2 = accessKeysFieldset.querySelector("#bookPageAccessKey");
    const nextChapterAccessKey2 = accessKeysFieldset.querySelector("#nextChapterAccessKey");
    for (let i = 0; i < 10; i++) {
      const option = document.createElement("option");
      const charCode = 48 + i;
      option.value = String.fromCharCode(charCode);
      option.text = String.fromCharCode(charCode);
      previousChapterAccessKey2.appendChild(option);
      bookPageAccessKey2.appendChild(option.cloneNode(true));
      nextChapterAccessKey2.appendChild(option.cloneNode(true));
    }
    for (let i = 0; i < 26; i++) {
      const option = document.createElement("option");
      const charCode = 97 + i;
      option.value = String.fromCharCode(charCode);
      option.text = String.fromCharCode(charCode);
      previousChapterAccessKey2.appendChild(option);
      bookPageAccessKey2.appendChild(option.cloneNode(true));
      nextChapterAccessKey2.appendChild(option.cloneNode(true));
    }
    bookPageAccessKey2.value = _GM_getValue("bookPageAccessKey", "h");
    previousChapterAccessKey2.value = _GM_getValue("previousChapterAccessKey", "b");
    nextChapterAccessKey2.value = _GM_getValue("nextChapterAccessKey", "n");
    previousChapterAccessKey2.onchange = () => {
      if (previousChapterAccessKey2.selectedOptions.length > 0) {
        _GM_setValue("previousChapterAccessKey", previousChapterAccessKey2.value);
      }
    };
    bookPageAccessKey2.onchange = () => {
      if (bookPageAccessKey2.selectedOptions.length > 0) {
        _GM_setValue("bookPageAccessKey", bookPageAccessKey2.value);
      }
    };
    nextChapterAccessKey2.onchange = () => {
      if (nextChapterAccessKey2.selectedOptions.length > 0) {
        _GM_setValue("nextChapterAccessKey", nextChapterAccessKey2.value);
      }
    };
    return accessKeysFieldset;
  }
  let inlineLengthMax = _GM_getValue("inlineLengthMax", 40);
  function createDisguiseCodeFieldset() {
    setupExtendLanguageSupport();
    const disguiseFieldset = document.createElement("fieldset");
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
    disguiseFieldset.appendChild(codeThemeLabel);
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
      }
    };
    const codeLangLabel = document.createElement("label");
    codeLangLabel.innerText = "代码语言：";
    codeLangLabel.style.marginLeft = "0.5rem";
    codeLangLabel.appendChild(codeLangInput);
    disguiseFieldset.appendChild(codeLangLabel);
    const codeItalicInput = document.createElement("input");
    codeItalicInput.type = "checkbox";
    codeItalicInput.name = "font-italic";
    codeItalicInput.checked = codeParagraphItalic;
    codeItalicInput.onchange = () => {
      const checked = codeItalicInput.checked;
      _GM_setValue("code-italic", checked);
      if (checked) {
        document.body.dataset.comment = void 0;
      } else {
        document.body.dataset.comment = "normal";
      }
    };
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
    disguiseFieldset.appendChild(codeInlineLengthLabel);
    const codeItalicLabel = document.createElement("label");
    codeItalicLabel.style.marginLeft = "0.5rem";
    codeItalicLabel.appendChild(codeItalicInput);
    codeItalicLabel.append(" 小说斜体");
    disguiseFieldset.appendChild(codeItalicLabel);
    const demoCodeTitle = document.createElement("h3");
    demoCodeTitle.innerText = "主题效果：";
    disguiseFieldset.appendChild(demoCodeTitle);
    const preDemo = document.createElement("pre");
    preDemo.innerHTML = `<code class="language-javascript"><span class="token comment">/*
	让我们说中文
 */</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">bar</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 短的注释</span>
	<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">,</span>
		b <span class="token operator">=</span> <span class="token string">'Prism'</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> a <span class="token operator">+</span> <span class="token function">bar</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code>`;
    preDemo.className = "language-javascript";
    disguiseFieldset.appendChild(preDemo);
    setupEditableList();
    setTimeout(() => {
      editableList = document.createElement("editable-list");
      disguiseFieldset.appendChild(editableList);
      editableList.updateCodeSnippets(fakeCodeSnippet.split("====\n"));
      const onItemChange = () => {
        _GM_setValue("fake-codes", editableList?.codeSnippets.join("====\n"));
      };
      editableList.addEventListener("add-item", onItemChange);
      editableList.addEventListener("remove-item", onItemChange);
    }, 500);
    return disguiseFieldset;
  }
  let containerWidth = _GM_getValue("container-width", "1200px");
  function createContainerStyleFieldset() {
    const containerStyleFieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.innerText = "正文式样";
    containerStyleFieldset.appendChild(legend);
    const widthInput = document.createElement("input");
    widthInput.value = containerWidth;
    widthInput.style.width = "4rem";
    widthInput.onchange = () => {
      containerWidth = widthInput.value;
      document.body.style.setProperty("--container-width", containerWidth);
      _GM_setValue("container-width", widthInput.value);
    };
    const widthLabel = document.createElement("label");
    widthLabel.innerText = "正文宽度：";
    widthLabel.title = "单位可以是 rem, px, %, svw, vw";
    widthLabel.appendChild(widthInput);
    containerStyleFieldset.appendChild(widthLabel);
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
        case "code":
          disguiseCodeFieldset.style.display = "block";
          break;
      }
    };
    updateFieldSetsState(disguiseMode);
    const radioDiv = document.createElement("div");
    radioDiv.style.display = "flex";
    radioDiv.innerHTML = `<p>伪装模式：</p>`;
    [
      ["none", "无"],
      ["code", "代码"]
    ].forEach(([label, placeholder]) => {
      const disguiseInput = document.createElement("input");
      disguiseInput.name = "disguise-radio";
      disguiseInput.type = "radio";
      disguiseInput.value = label;
      disguiseInput.checked = disguiseMode == label;
      disguiseInput.style.marginLeft = "0.5rem";
      disguiseInput.style.marginRight = "0.5rem";
      disguiseInput.onchange = () => {
        const disguiseEnabled = disguiseInput.checked;
        if (disguiseEnabled) {
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
    return form;
  }
  const isInIframe = window.self !== window.top;
  _GM_registerMenuCommand("脚本设置", function() {
    open("/pifu/");
  });
  function handleBookPage() {
    let finished = false;
    const itemtxt = document.querySelector(".itemtxt");
    const spans = Array.from(itemtxt.querySelectorAll("p > span"));
    spans.forEach((span) => {
      if (span.textContent?.trim() == "已完结") {
        finished = true;
      }
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
      current.innerText = `当前时间：${(/* @__PURE__ */ new Date()).toTimeString()}`;
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
  function handleSettingPage() {
    const settingForm = createSettingForm();
    const container = document.querySelector("div.container");
    container.appendChild(settingForm);
  }
  function disguiseParagraphs(container) {
    switch (disguiseMode) {
      case "code":
      default:
        disguiseToCode(container);
        break;
    }
  }
  function handleChaperPage() {
    const container = document.querySelector("div.container");
    if (location.pathname.includes("-") && container && isInIframe) {
      const con = container.querySelector("div.con");
      let nextHref = "";
      let nextChapter = "";
      const prenexts2 = document.querySelectorAll("div.prenext a");
      for (const element of prenexts2) {
        if (element instanceof HTMLAnchorElement) {
          if (element.textContent == "下一页") {
            nextHref = element.href;
            break;
          }
          if (element.textContent == "下一章") {
            nextChapter = element.href;
            break;
          }
        }
      }
      window.parent.postMessage({
        con: con.innerHTML,
        next: nextHref,
        nextChapter,
        href: location.href
      });
      return;
    }
    if (_GM_getValue("disguiseDebug", false)) {
      disguiseParagraphs(document.querySelector("div.container .con"));
      return;
    }
    const prenexts = container.querySelectorAll("div.prenext a");
    window.addEventListener("message", (e) => {
      if (e.data.con) {
        const next = document.createElement("div");
        next.className = "con";
        next.innerHTML = e.data.con;
        const container2 = document.querySelector("div.container .con");
        next.querySelectorAll("p").forEach((p) => container2.appendChild(p));
      }
      if (e.data.next) {
        const iframe = document.querySelector("iframe");
        if (iframe) {
          iframe.contentWindow.location.replace(e.data.next);
        }
      } else {
        console.debug("no next");
        if (!isInIframe && disguiseMode != "none") {
          const container2 = document.querySelector("div.container .con");
          disguiseParagraphs(container2);
        }
        const iframe = document.querySelector("iframe");
        if (iframe) {
          iframe.remove();
        }
        const nextChapter = e.data.nextChapter;
        if (nextChapter) {
          for (const element of prenexts) {
            if (element instanceof HTMLAnchorElement) {
              if (element.textContent == "下一页") {
                element.href = nextChapter;
                if (nextChapter.endsWith(".html")) {
                  element.innerText = "下一章";
                  element.accessKey = nextChapterAccessKey;
                  element.ariaKeyShortcuts = `Alt+${nextChapterAccessKey}`;
                } else {
                  element.innerText = "返回目录";
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
        if (element.textContent == "下一页") {
          const next = document.createElement("iframe");
          next.src = element.href;
          next.style.display = "none";
          container && container.appendChild(next);
        } else if (element.textContent == "上一章") {
          element.accessKey = previousChapterAccessKey;
          element.ariaKeyShortcuts = `Alt+${previousChapterAccessKey}`;
        } else if (element.textContent == "目录") {
          element.accessKey = bookPageAccessKey;
          element.ariaKeyShortcuts = `Alt+${bookPageAccessKey}`;
        } else if (element.textContent == "下一章") {
          element.accessKey = nextChapterAccessKey;
          element.ariaKeyShortcuts = `Alt+${nextChapterAccessKey}`;
          if (!isInIframe && disguiseMode != "none") {
            const container2 = document.querySelector("div.container .con");
            disguiseParagraphs(container2);
          }
        }
      }
    }
  }
  function handleRoute() {
    if (location.pathname === "/pifu/") {
      setupCodeTheme();
      setupExtendLanguageSupport();
      handleSettingPage();
      setTimeout(() => {
        document.body.style.backgroundColor = getComputedStyle(
          document.querySelector("pre")
        ).backgroundColor;
      }, 1e3);
    } else if (location.pathname.endsWith(".html")) {
      if (!isInIframe) {
        switch (disguiseMode) {
          case "code":
            setupCodeTheme();
            setupExtendLanguageSupport();
            break;
        }
      }
      handleChaperPage();
    } else {
      handleBookPage();
    }
  }
  document.body.style.setProperty("--container-width", containerWidth);
  handleRoute();
  releaseCopy();

})();