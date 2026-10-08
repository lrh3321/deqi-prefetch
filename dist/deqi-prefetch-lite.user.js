// ==UserScript==
// @name         Deqi Prefech Lite
// @namespace    https://greasyfork.org/zh-CN/users/14997-lrh3321
// @version      2026-10-120
// @author       LRH3321
// @description  得奇小说网, biqu33.cc, ddxiaoshuo.cc, cuoceng.com 看单个章节免翻页，把小说伪装成代码
// @license      MIT
// @icon         https://www.suduguu.com/favicon.ico
// @homepageURL  https://greasyfork.org/zh-CN/scripts/537588-deqi-prefech
// @source       https://github.com/lrh3321/deqi-prefetch
// @supportURL   https://github.com/lrh3321/deqi-prefetch/issues
// @downloadURL  https://update.greasyfork.org/scripts/537588/Deqi%20Prefech.user.js
// @updateURL    https://update.greasyfork.org/scripts/537588/Deqi%20Prefech.user.js
// @match        *://*.shudugu.org/*
// @match        *://*.sudugu.cc/*
// @match        *://*.suduguu.com/*
// @match        *://*.sudugu.org/*
// @match        *://*.deqixs.org/*
// @match        *://*.deqixs.com/pifu/
// @match        *://*.deqixs.com/xiaoshuo/*/*.html
// @match        *://*.deqixs.com/xiaoshuo/*/
// @match        *://*.kudushu.org/*
// @match        *://*.boluomao1.com/book/*
// @match        *://*.boluomao1.com/read/*
// @match        *://*.yxshufang.com/book/*
// @match        *://*.biqu33.cc/*
// @match        *://*.beqg.cc/*
// @match        *://*.ddxiaoshuo.cc/*
// @match        *://*.cuoceng.com/*
// @match        *://*.dmxs2.com/book/*
// @match        *://*.wanbenshenzhan.com/*
// @match        *://*.81ksw.com/index/*
// @match        *://*.81ksw.com/read/*
// @match        *://*.bishuxsw.com/book/*
// @match        *://*.piaohuaxs.com/book/*
// @match        *://*.96cbtxt.com/book/*
// @match        *://*.202book.com/book/*
// @tag          novels
// @connect      self
// @grant        GM_addElement
// @grant        GM_addStyle
// @grant        GM_getResourceURL
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_log
// @grant        GM_openInTab
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
	_css("[data-comment=normal] span.token.comment{font-style:normal}img[alt],.menu,.header p,h2:not(.bookname) a,div.footer,div.container>ul.list{display:none!important}h2.op a{display:block}body>div.container,body>div.header,#article_main,#ss-reader-main{width:min(calc(100svw - 1em), var(--container-width,\"1200px\"))}span.token.comment{font-family:var(--novel-font-family)!important}body{--primary-color:black;--primary-bg-color:#f5f2f0;--secondary-color:gray;background:var(--primary-bg-color)}img{visibility:hidden}details#script-setting>summary,form{color:var(--primary-color)}details#script-setting>summary{font-size:x-large;font-weight:700}form fieldset{margin-inline:2px;border:2px groove gray;border-image:initial;min-inline-size:min-content;margin-top:1rem;margin-bottom:1rem;padding-block:.35em .625em;padding-inline:.75em;display:block}form fieldset>div{flex-wrap:wrap;gap:.5rem;display:flex}fieldset label{white-space:nowrap;gap:.4rem;width:fit-content;display:flex}@media (orientation:portrait){fieldset label{white-space:nowrap;flex-wrap:wrap;gap:.4rem;width:100%;display:flex}}label input{border:1px solid var(--lightningcss-light,#767676)var(--lightningcss-dark,#858585);max-width:75svw;padding-left:.5rem}editable-list li{align-items:baseline;width:fit-content;height:fit-content;display:flex}editable-list figure{margin:0}editable-list figcaption{-webkit-backdrop-filter:contrast(120%);backdrop-filter:contrast(120%);text-align:end}editable-list .icon{cursor:pointer;border:none;font-size:1.8rem}editable-list textarea{border-radius:.75rem;width:95%;padding-block:.25rem;padding-inline:.75rem}editable-list ul{flex-wrap:wrap;justify-content:flex-start;column-gap:1rem;max-width:80svw;display:flex}#header,#main .container-fluid,#article_main .row,body>[id][style]:not(#gmenu),body>[style*=display]:not(#gmenu),body>[style*=position\\:fixed]{display:none!important}#article_main{background:0 0}#article_main #page-links a,#article_main #page-links span{text-align:center;background:#1a73e8;width:28px;height:28px;margin-right:10px;padding:1px 10px;line-height:25px;display:inline-block;color:#fff!important;text-decoration:none!important}#article_main #page-links span{background:#ccc}#main a[role=button]{color:#555}#main a[role=button]:hover{color:#fa2080;text-decoration:none}#ss-reader-main,.info-title{border-width:0;background-color:#0000!important}#ss-reader-main .info-commend,#ss-reader-main .reader-hr,#ss-reader-main .readSet,#ss-reader-main .info-chapters-title,#ss-reader-main h1,body.read_style_1 .header,body.read_style_1 #showDetail,#readcontent .textbox.cf,body.read_style_1 .textinfo{display:none!important}@media screen and (width<=1200px){#list.dir{width:calc(100svw - 30px);margin:0}#list.dir ul li{float:left;width:33%}.container .itemtxt{float:unset;padding-right:unset;width:unset}}#captcha-form>div.ui-image>img#ui-captcha-image{visibility:visible!important;display:inline!important}.urn-float{display:none!important}body:has(.article-root){--primary-color:#2b2b2b;--primary-bg-color:#f3efe8;--secondary-color:#9b9184;--card-bg-color:#fffdf8;--accent-color:#a4774b;--separator-color:color-mix(in srgb, var(--secondary-color) 25%, transparent);--novel-line-height:1.9;--novel-para-spacing:.9em;min-height:100svh;color:var(--primary-color);background-color:color-mix(in srgb, var(--primary-bg-color) 82%, var(--secondary-color) 18%);margin:0}.article-root{width:min(100svw, var(--container-width,1200px));color:var(--primary-color);text-align:start;margin-inline:auto;padding-bottom:1.5rem}.article-root>header{opacity:.75;border-bottom:1px solid var(--separator-color);background-color:color-mix(in srgb, var(--primary-bg-color) 90%, var(--primary-color) 10%);margin-top:.5rem;padding-inline:1rem;line-height:2rem}.article-root>header:empty{display:none}.article-root .breadcrumb,.article-root .breadcrumb a{color:var(--secondary-color);background-color:#0000;flex-wrap:wrap;align-items:center;gap:1rem;margin:0;display:flex}.article-root .breadcrumb{flex-wrap:wrap;gap:.4rem 1rem;margin-inline:auto;padding-inline:1rem;list-style:none}.article-root .breadcrumb li{text-wrap:nowrap;text-overflow:ellipsis;list-style-type:none;overflow-x:hidden}.article-root .breadcrumb li[aria-hidden]{opacity:.5}.article-root .breadcrumb a:hover{opacity:.6;text-decoration:underline}.article-root>main{min-height:0}.article-root article{background:var(--card-bg-color);border:1px solid var(--separator-color);border-radius:.9rem;margin-block:1rem;margin-inline:auto;padding:clamp(1rem,3.5vw,2rem) clamp(1rem,4vw,2.5rem) 2.5rem;box-shadow:0 1px 2px #0000000a,0 10px 30px #0000000f}.article-root .article-title{border-bottom:1px dashed var(--separator-color);white-space:nowrap;text-overflow:ellipsis;min-width:0;max-width:100%;margin-bottom:1rem;padding-bottom:.75rem;font-size:clamp(1.3rem,4.5vw,1.7rem);font-weight:700;line-height:1.4;display:block;overflow:hidden}.article-root .article-title code{background-color:#0000}.article-root section.img-container{flex-direction:column;display:flex}.article-root section.img-container img{visibility:initial;border-radius:.5rem;width:100%}body[data-theme=dark] .article-root section.img-container img{filter:invert(90%)}.article-root section p{text-indent:2em;margin:0 0 var(--novel-para-spacing,.9em);line-height:var(--novel-line-height,1.9);letter-spacing:.015em;color:var(--primary-color);overflow-wrap:anywhere;word-break:break-word;font-size:1.0625rem}@media (orientation:landscape){.article-root section.img-container{align-items:center}.article-root section.img-container img{max-width:35rem}}.article-root pre{tab-size:4;text-indent:0;color:var(--primary-color);background:color-mix(in srgb, var(--primary-bg-color) 45%, var(--card-bg-color) 55%);border:1px solid var(--separator-color);border-radius:.6rem;margin-block:.5rem;padding:1rem 1.25rem;font-family:ui-monospace,SF Mono,Cascadia Code,JetBrains Mono,Menlo,Consolas,Courier New,monospace;font-size:.875rem;line-height:1.75;overflow-x:auto}.article-root pre code{text-indent:0;white-space:inherit;display:block}.article-root pre.line-numbers .line-numbers-rows{border-right-color:var(--separator-color)}.article-root>footer{opacity:.9;padding-block:.5rem;line-height:2rem}.article-root .article-nav{background-color:lch(from var(--primary-bg-color) l c h / .8);border:1px solid var(--separator-color);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);border-radius:999px;flex-wrap:wrap;justify-content:center;justify-self:center;gap:.4rem;width:fit-content;margin-inline:auto;padding:.35rem;display:flex}.article-root .article-nav a{color:var(--secondary-color);background-color:#0000;border-radius:999px;padding:.35rem 1rem;text-decoration:none;transition:background-color .15s,color .15s}.article-root .article-nav a:hover{background-color:var(--accent-color);color:#fff}.article-root hr{background:linear-gradient(90deg, transparent, var(--secondary-color) 20%, var(--secondary-color) 80%, transparent);opacity:.4;border:0;width:100%;height:1px;margin-block:0}body[hidden]{display:none!important}@media (prefers-color-scheme:dark){body:has(.article-root){--primary-color:#d7d3cb;--primary-bg-color:#1c1b19;--secondary-color:#8d8577;--card-bg-color:#262420;--accent-color:#c08d5e;background-color:color-mix(in srgb, var(--primary-bg-color) 82%, var(--secondary-color) 18%)}.article-root section.img-container img{filter:invert(90%)}}body[data-theme=dark]:has(.article-root){--primary-color:#d7d3cb;--primary-bg-color:#1c1b19;--secondary-color:#8d8577;--card-bg-color:#262420;--accent-color:#c08d5e;background-color:color-mix(in srgb, var(--primary-bg-color) 82%, var(--secondary-color) 18%)}body[data-theme=light]:has(.article-root){--primary-color:#2b2b2b;--primary-bg-color:#f3efe8;--secondary-color:#9b9184;--card-bg-color:#fffdf8;--accent-color:#a4774b;background-color:color-mix(in srgb, var(--primary-bg-color) 82%, var(--secondary-color) 18%)}");
	_css(":root{--fab-accent:#a4774b;--fab-bg:#f3efe8}body[data-theme=dark]{--fab-accent:#c08d5e;--fab-bg:#262420}#deqi-fab{z-index:2147483000;align-items:flex-end;gap:.6rem;display:flex;position:fixed;bottom:1.75rem;right:1.25rem}#deqi-fab .fab-menu{opacity:0;pointer-events:none;flex-direction:column;align-items:flex-end;gap:.5rem;transition:opacity .18s,transform .18s;display:none;transform:translateY(.5rem)}#deqi-fab.open .fab-menu{opacity:1;pointer-events:auto;display:flex;transform:translateY(0)}#deqi-fab .fab-menu button{border:1px solid color-mix(in srgb, var(--fab-accent) 25%, transparent);background:color-mix(in srgb, var(--fab-bg) 88%, white);color:var(--primary-color,#2b2b2b);cursor:pointer;white-space:nowrap;border-radius:999px;align-items:center;gap:.4rem;padding:.45rem .9rem;font-size:.9rem;transition:background-color .15s,transform .1s;display:inline-flex;box-shadow:0 3px 10px #0000002e}#deqi-fab .fab-menu button:hover{background:var(--fab-accent);color:#fff}#deqi-fab .fab-menu button:active{transform:scale(.95)}#deqi-fab .fab-menu button .fab-icon{font-size:1rem;line-height:1}#deqi-fab .fab-toggle{cursor:pointer;color:#fff;background:linear-gradient(135deg, #b08968, var(--fab-accent));border:none;border-radius:50%;place-items:center;width:3.15rem;height:3.15rem;font-size:1.6rem;transition:transform .2s;display:grid;box-shadow:0 5px 16px #00000047}#deqi-fab .fab-toggle:hover{transform:scale(1.06)}#deqi-fab .fab-toggle:active{transform:scale(.94)}#deqi-settings-dialog{background:0 0;border:0;width:100vw;max-width:none;height:100dvh;max-height:none;margin:0;padding:0}#deqi-settings-dialog::backdrop{-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:#00000073}#deqi-settings-dialog .settings-panel{background:var(--card-bg-color,#fffdf8);width:min(90vw,40rem);max-height:88dvh;color:var(--primary-color,#2b2b2b);border:1px solid var(--separator-color,#9b918440);border-radius:.9rem;margin:5dvh auto auto;font-size:.95rem;overflow:auto;box-shadow:0 20px 60px #0000004d}#deqi-settings-dialog .settings-head{border-bottom:1px solid var(--separator-color,#9b918440);background:inherit;z-index:1;justify-content:space-between;align-items:center;padding:.9rem 1.2rem;font-size:1.05rem;font-weight:700;display:flex;position:sticky;top:0}#deqi-settings-dialog .settings-close{color:inherit;cursor:pointer;background:0 0;border:0;border-radius:.4rem;padding:.2rem .4rem;font-size:1.4rem;line-height:1}#deqi-settings-dialog .settings-close:hover{background:color-mix(in srgb, var(--primary-color) 12%, transparent)}#deqi-settings-dialog .settings-body{flex-direction:column;gap:.9rem;padding:1.1rem 1.2rem 1.4rem;display:flex}#deqi-settings-dialog .settings-row{align-items:center;gap:.6rem;display:flex}#deqi-settings-dialog .settings-row label{flex:none;min-width:4.5rem}#deqi-settings-dialog .settings-row input[type=text],#deqi-settings-dialog .settings-row input[type=number]{border:1px solid var(--separator-color,#9b918466);background:var(--primary-bg-color,#f3efe8);min-width:0;color:inherit;border-radius:.45rem;flex:auto;padding:.4rem .6rem}#deqi-settings-dialog .settings-row input[type=range]{min-width:0;accent-color:var(--fab-accent,#a4774b);flex:auto}#deqi-settings-dialog .settings-row select{border:1px solid var(--separator-color,#9b918466);background:var(--primary-bg-color,#f3efe8);min-width:0;color:inherit;border-radius:.45rem;flex:auto;padding:.4rem .6rem}#deqi-settings-dialog .settings-val{text-align:right;opacity:.7;font-variant-numeric:tabular-nums;flex:0 0 2.8rem}#deqi-settings-dialog .settings-hint{opacity:.65;font-size:.82rem}#deqi-settings-dialog .settings-font-quick{flex-wrap:wrap;gap:.45rem;display:flex}#deqi-settings-dialog .settings-font-quick button{border:1px solid var(--separator-color,#9b918466);background:var(--primary-bg-color,#f3efe8);color:inherit;cursor:pointer;border-radius:.45rem;padding:.3rem .75rem;font-size:.85rem;transition:background-color .15s,color .15s,border-color .15s}#deqi-settings-dialog .settings-font-quick button:hover{border-color:var(--fab-accent,#a4774b)}#deqi-settings-dialog .settings-font-quick button.active{background:var(--fab-accent,#a4774b);border-color:var(--fab-accent,#a4774b);color:#fff}");
	var _GM_getValue = (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
	var _GM_info = (() => typeof GM_info != "undefined" ? GM_info : void 0)();
	var _GM_log = (() => typeof GM_log != "undefined" ? GM_log : void 0)();
	var _GM_openInTab = (() => typeof GM_openInTab != "undefined" ? GM_openInTab : void 0)();
	var _GM_registerMenuCommand = (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
	var _GM_setValue = (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
	var _GM_xmlhttpRequest = (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
	_GM_getValue("disguiseDebug", false);
	var novelFontSize = _GM_getValue("novel-font-size", "16px");
	var novelFontFamily = _GM_getValue("novel-font-family", `system-ui, -apple-system, '微软雅黑', 'PingFang SC', 'Lantinghei SC', BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`);
	_GM_getValue("novel-line-height", "1.9");
	_GM_getValue("novel-para-spacing", "0.9em");
	_GM_getValue("disguise-mode", "none");
	_GM_getValue("code-lang", "javascript");
	_GM_getValue("code-theme", "prism");
	_GM_getValue("code-italic", true);
	_GM_getValue("line-numbers", false);
	_GM_getValue("refreshInterval", -1);
	var themeMode = _GM_getValue("theme-mode", "");
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
	_GM_getValue("inlineLengthMax", 40);
	var containerWidth = _GM_getValue("container-width", "1200px");
	function createSettingForm() {
		const form = document.createElement("form");
		form.appendChild(createAccessKeysFieldset());
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
	var FAB_ID = "deqi-fab";
	var DIALOG_ID = "deqi-settings-dialog";
	var applyTheme = (mode) => {
		if (!mode) mode = themeMode;
		if (mode === "dark" || mode === "light") document.body.setAttribute("data-theme", mode);
		else document.body.removeAttribute("data-theme");
		if (themeMode != mode) {
			themeMode = mode;
			_GM_setValue("theme-mode", mode);
		}
	};
	function buildSettingsDialog() {
		const dialog = document.createElement("dialog");
		dialog.id = DIALOG_ID;
		const panel = document.createElement("div");
		panel.className = "settings-panel";
		const head = document.createElement("div");
		head.className = "settings-head";
		const title = document.createElement("span");
		title.textContent = "页面设置";
		const close = document.createElement("button");
		close.className = "settings-close";
		close.type = "button";
		close.setAttribute("aria-label", "关闭");
		close.textContent = "✕";
		close.addEventListener("click", () => dialog.close());
		head.append(title, close);
		const body = document.createElement("div");
		body.className = "settings-body";
		const mkRow = (labelText) => {
			const row = document.createElement("div");
			row.className = "settings-row";
			const label = document.createElement("label");
			label.textContent = labelText;
			const input = document.createElement("input");
			row.append(label, input);
			return {
				row,
				input
			};
		};
		const mkRangeRow = (labelText, min, max, step, unit, varName, storeKey, fallback) => {
			const row = document.createElement("div");
			row.className = "settings-row";
			const label = document.createElement("label");
			label.textContent = labelText;
			const input = document.createElement("input");
			input.type = "range";
			input.min = String(min);
			input.max = String(max);
			input.step = String(step);
			input.value = String(_GM_getValue(varName, fallback) || min);
			const valText = document.createElement("span");
			valText.className = "settings-val";
			const apply = () => {
				document.body.style.setProperty(varName, unit ? `${input.value}${unit}` : input.value);
				valText.textContent = `${input.value}${unit ?? ""}`;
				try {
					_GM_setValue(storeKey, input.value);
				} catch {}
			};
			input.addEventListener("input", apply);
			row.append(label, input, valText);
			return {
				row,
				input,
				apply
			};
		};
		const themeRow = document.createElement("div");
		themeRow.className = "settings-row";
		const themeLabel = document.createElement("label");
		themeLabel.textContent = "夜间模式";
		const themeSelect = document.createElement("select");
		[
			["", "跟随系统"],
			["dark", "夜间"],
			["light", "日间"]
		].forEach(([v, text]) => {
			const o = document.createElement("option");
			o.value = v;
			o.textContent = text;
			themeSelect.appendChild(o);
		});
		themeSelect.value = themeMode;
		themeSelect.addEventListener("change", () => {
			applyTheme(themeSelect.value);
		});
		themeRow.append(themeLabel, themeSelect);
		const widthRow = mkRow("宽度");
		widthRow.input.type = "text";
		widthRow.input.value = containerWidth;
		widthRow.input.addEventListener("change", () => {
			const v = widthRow.input.value.trim() || "1200px";
			document.body.style.setProperty("--container-width", v);
			try {
				_GM_setValue("container-width", v);
			} catch {}
		});
		const fontSizeRow = mkRow("字体大小");
		fontSizeRow.input.type = "text";
		fontSizeRow.input.value = novelFontSize;
		fontSizeRow.input.addEventListener("change", () => {
			const v = fontSizeRow.input.value.trim() || "16px";
			document.body.style.setProperty("--novel-font-size", v);
			try {
				_GM_setValue("novel-font-size", v);
			} catch {}
		});
		const fontFamilyRow = mkRow("字体");
		fontFamilyRow.input.type = "text";
		fontFamilyRow.input.value = novelFontFamily;
		fontFamilyRow.input.placeholder = "系统默认";
		const DEFAULT_FAMILY = `system-ui, -apple-system, '微软雅黑', 'PingFang SC', 'Segoe UI', Roboto, sans-serif`;
		fontFamilyRow.input.addEventListener("change", () => {
			const family = fontFamilyRow.input.value.trim();
			document.body.style.setProperty("--novel-font-family", family || DEFAULT_FAMILY);
			try {
				_GM_setValue("novel-font-family", family);
			} catch {}
		});
		const fontQuickRow = document.createElement("div");
		fontQuickRow.className = "settings-font-quick";
		const fontPresets = [
			["系统默认", DEFAULT_FAMILY],
			["宋体", `SimSun, '宋体', serif`],
			["黑体", `SimHei, '黑体', sans-serif`],
			["楷体", `KaiTi, '楷体', serif`],
			["微软雅黑", `'Microsoft YaHei', '微软雅黑', sans-serif`],
			["苹方", `'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif`],
			["宋体-简", `'Songti SC', 'STSong', 'SimSun', serif`],
			["楷体-简", `'Kaiti SC', 'STKaiti', 'KaiTi', serif`],
			["华文黑体", `'STHeiti', 'Heiti SC', 'PingFang SC', sans-serif`],
			["华文宋体", `'STSong', 'Songti SC', 'SimSun', serif`],
			["思源黑体", `'Noto Sans CJK SC', 'Source Han Sans SC', 'HarmonyOS Sans SC', sans-serif`],
			["思源宋体", `'Noto Serif CJK SC', 'Source Han Serif SC', 'SimSun', serif`],
			["鸿蒙", `'HarmonyOS Sans SC', 'HarmonyOS Sans', 'Noto Sans CJK SC', sans-serif`],
			["霞鹜文楷", `'LXGW WenKai', 'Kaiti SC', 'KaiTi', serif`]
		];
		const syncFontQuick = () => {
			const current = novelFontFamily;
			fontQuickRow.querySelectorAll("button").forEach((b) => {
				b.classList.toggle("active", b.dataset.family?.trim() === current);
			});
		};
		fontPresets.forEach(([label, family]) => {
			const b = document.createElement("button");
			b.type = "button";
			b.textContent = label;
			b.dataset.family = family;
			b.addEventListener("click", () => {
				document.body.style.setProperty("--novel-font-family", family);
				fontFamilyRow.input.value = family;
				try {
					_GM_setValue("novel-font-family", family);
				} catch {}
				syncFontQuick();
			});
			fontQuickRow.appendChild(b);
		});
		fontFamilyRow.input.addEventListener("change", syncFontQuick);
		const lineHeightRow = mkRangeRow("行间距", 1, 3, .05, "", "--novel-line-height", "novel-line-height", "1.9");
		const paraSpacingRow = mkRangeRow("段间距", 0, 3, .1, "em", "--novel-para-spacing", "novel-para-spacing", "0.9em");
		body.append(themeRow, widthRow.row, fontSizeRow.row, fontFamilyRow.row, fontQuickRow, lineHeightRow.row, paraSpacingRow.row);
		syncFontQuick();
		const hint = document.createElement("div");
		hint.className = "settings-hint";
		hint.textContent = "宽度单位可为 rem、px、%、svw、vw；修改后即时生效。";
		body.appendChild(hint);
		panel.append(head, body);
		dialog.appendChild(panel);
		document.body.appendChild(dialog);
		return dialog;
	}
	function showConfigDialog() {
		const dialog = document.getElementById(DIALOG_ID);
		if (dialog && typeof dialog.showModal === "function") dialog.showModal();
	}
	function buildFab() {
		const wrap = document.createElement("div");
		wrap.id = FAB_ID;
		const menu = document.createElement("div");
		menu.className = "fab-menu";
		const mkSub = (icon, label, onClick) => {
			const b = document.createElement("button");
			b.type = "button";
			b.innerHTML = `<span class="fab-icon">${icon}</span><span>${label}</span>`;
			b.addEventListener("click", onClick);
			menu.appendChild(b);
			return b;
		};
		mkSub("⬆", "滚动到顶部", () => window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth"
		}));
		mkSub("⬇", "滚动到底部", () => window.scrollTo({
			top: document.documentElement.scrollHeight,
			left: 0,
			behavior: "smooth"
		}));
		mkSub("⚙", "页面设置", showConfigDialog);
		const toggle = document.createElement("button");
		toggle.className = "fab-toggle";
		toggle.type = "button";
		toggle.setAttribute("aria-label", "展开操作");
		toggle.textContent = "+";
		toggle.addEventListener("click", () => wrap.classList.toggle("open"));
		document.addEventListener("click", (e) => {
			if (e.target instanceof Node) {
				if (wrap.classList.contains("open") && !wrap.contains(e.target)) wrap.classList.remove("open");
			}
		});
		menu.addEventListener("click", () => wrap.classList.remove("open"));
		wrap.append(menu, toggle);
		document.body.appendChild(wrap);
	}
	function setupConfigButton() {
		if (document.getElementById(FAB_ID)) return;
		buildSettingsDialog();
		buildFab();
	}
	var defaultCodeSnippet = "";
	var fakeCodeSnippet = _GM_getValue("fake-codes", defaultCodeSnippet);
	if (fakeCodeSnippet.trim() == "") fakeCodeSnippet = defaultCodeSnippet;
	fakeCodeSnippet = "";
	var isViaBrowser = _GM_info.scriptHandler === "Via";
	var VM_log = _GM_log;
	function disguiseParagraphs(container) {
		return container;
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
		unregisterServiceWorkers();
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
		page.title = page.title?.trim();
		const header = buildNovelHeader(page);
		const main = buildNovelMain(page);
		const footer = buildNovelFooter(page.navigationBar);
		root.append(header, document.createElement("hr"), main, document.createElement("hr"), footer);
		newBody.append(root);
		document.body.querySelectorAll("pre.debug").forEach((pre) => root.append(pre));
		document.body.replaceWith(newBody);
		Array.from(document.head.querySelectorAll("script")).forEach((it) => it.remove());
		setupConfigButton();
		boilerplate();
		return {
			root,
			header,
			main,
			footer
		};
	}
	function boilerplate() {
		ensureMeta("viewport", "width=device-width");
		ensureMeta("text-scale", "scale");
	}
	function ensureMeta(name, content) {
		const docHeader = document.head;
		const meta = docHeader.querySelector(`meta[name="${name}"]`);
		if (meta) meta.content = content;
		else {
			const meta = document.createElement("meta");
			meta.name = name;
			meta.content = content;
			docHeader.appendChild(meta);
		}
	}
	function paragraphsFromElement(el) {
		const paragraphs = [];
		if (!el) return paragraphs;
		let paragraph = el.ownerDocument.createElement("p");
		const appendParagraph = () => {
			if (paragraph.textContent?.trim() || paragraph.children.length > 0) {
				if (paragraph.querySelector("p")) Array.from(paragraph.children).forEach((it) => {
					if (it instanceof HTMLParagraphElement) paragraphs.push(it);
					else if (it.textContent?.trim() || it instanceof HTMLImageElement) {
						const p = el.ownerDocument.createElement("p");
						paragraphs.push(p);
					}
				});
				else paragraphs.push(paragraph);
			}
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
		const demo = paragraphs.filter((p) => p.querySelector("p"));
		if (demo.length > 0) _GM_log("nest", demo);
		return paragraphs;
	}
	async function fetchChaperFragmentPage(href, callback) {
		VM_log(`fetchChaperFragmentPage: ${href}`);
		return new Promise((resolve, reject) => {
			_GM_xmlhttpRequest({
				method: "GET",
				url: href,
				responseType: "document",
				onload: (response) => {
					if (isViaBrowser) {
						if (response.finalUrl != href && response.finalUrl.includes("login")) {
							fetch(href).then((res) => {
								res.text().then((text) => {
									const doc = ensureDoc(text);
									doc.documentElement.dataset.src = href;
									resolve(callback(doc));
								}).catch(reject);
							}).catch(reject);
							return;
						}
					}
					const doc = ensureDoc(response.response);
					doc.documentElement.dataset.src = href;
					resolve(callback(doc));
				},
				onerror: (response) => {
					VM_log("fetchChaperFragmentPage error", response);
					reject(response);
				},
				ontimeout: () => {
					VM_log("fetchChaperFragmentPage timeout");
					reject("timeout");
				}
			});
		});
	}
	function buildNovelHeader(page) {
		const { breadcrumbBar, title } = page;
		const header = document.createElement("header");
		if (breadcrumbBar) {
			const breadcrumb = document.createElement("ol");
			breadcrumb.className = "breadcrumb";
			breadcrumbBar.querySelectorAll("a").forEach((a) => {
				if (!a.textContent.trim()) return;
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
		if (mainSection.querySelector("img")) {
			const imgSection = document.createElement("section");
			imgSection.classList.add("img-container");
			mainSection.querySelectorAll("img").forEach((img) => imgSection.appendChild(img));
			article.appendChild(imgSection);
		}
		main.appendChild(article);
		return main;
	}
	function buildNovelFooter(nav) {
		const footer = document.createElement("footer");
		const navBar = document.createElement("nav");
		navBar.className = "article-nav";
		if (nav.prevAnchor) {
			nav.prevAnchor.innerHTML = "上一章";
			navBar.appendChild(nav.prevAnchor);
		}
		if (nav.infoAnchor) {
			nav.infoAnchor.innerHTML = "目录";
			navBar.appendChild(nav.infoAnchor);
		}
		if (nav.nextAnchor) {
			nav.nextAnchor.innerHTML = "下一章";
			navBar.appendChild(nav.nextAnchor);
		}
		navBar.insertAdjacentHTML("beforeend", "<a href=\"/\">小说列表</a>");
		footer.appendChild(navBar);
		setAccessKeys(nav);
		return footer;
	}
	function tidyStyle() {
		document.head.querySelectorAll("link[href][rel=\"stylesheet\"]").forEach((ln) => ln.remove());
	}
	async function unregisterServiceWorkers() {
		if ("serviceWorker" in navigator) {
			const registrations = await navigator.serviceWorker.getRegistrations();
			for (let registration of registrations) await registration.unregister();
		}
	}
	var PageType = function(PageType) {
		PageType[PageType["Unknown"] = 0] = "Unknown";
		PageType[PageType["Home"] = 1] = "Home";
		PageType[PageType["Setting"] = 2] = "Setting";
		PageType[PageType["Book"] = 3] = "Book";
		PageType[PageType["Index"] = 4] = "Index";
		PageType[PageType["Chapter"] = 5] = "Chapter";
		PageType[PageType["ChapterNext"] = 6] = "ChapterNext";
		return PageType;
	}({});
	var AbstractRebuilder = class {
		constructor() {}
		getNavLinks() {
			return {};
		}
		async handleChapterPage() {
			rebuildChapterBody(this.getChapterPage());
		}
		async handleBookPage() {}
		async handleSettingPage() {}
		async afterRebuilt() {}
		async rebuild() {
			const pt = this.getPageType();
			VM_log("PageType:", pt);
			if (pt == 5) {
				await this.handleChapterPage();
				await this.afterRebuilt();
			} else if (pt == 3) await this.handleBookPage();
			else if (pt == 2) await this.handleSettingPage();
		}
	};
	var AbstractPartedRebuilder = class extends AbstractRebuilder {
		async handleChapterPage() {
			let nextURL = this.parseFragmentPageURL(document);
			while (nextURL.next && true) nextURL = await fetchChaperFragmentPage(nextURL.next, async (doc) => {
				const p = await this.parseFragmentPage(doc);
				VM_log("FragmentPage:", p);
				this.handleNextPage(doc, p);
				return p;
			});
			if (nextURL.nextChapter) this.rewriteNextChapterLink(nextURL.nextChapter);
			rebuildChapterBody(this.getChapterPage());
		}
		rewriteNextChapterLink(_href) {}
	};
	function nextAnchor(doc, selector) {
		const anchors = doc.querySelectorAll(selector);
		for (const el of anchors) if (el instanceof HTMLAnchorElement) {
			if (el.textContent.includes("下一")) return el;
		}
	}
	function pageURLFromSelector(doc, selector) {
		const el = nextAnchor(doc, selector);
		if (el) {
			if (el.textContent.includes("下一页")) return { next: el.href };
			else return { nextChapter: el.href };
		}
		return {};
	}
	function navLinksFromSelector(selector) {
		const anchors = document.querySelectorAll(selector);
		const nav = {};
		for (const el of anchors) if (el instanceof HTMLAnchorElement) {
			if (el.textContent.includes("上一")) nav.prevAnchor = el;
			else if (el.textContent.includes("目录")) nav.infoAnchor = el;
			else if (el.textContent.includes("下一")) nav.nextAnchor = el;
		}
		return nav;
	}
	var Boluomao = class extends AbstractPartedRebuilder {
		canHandle() {
			const hostname = location.hostname;
			return hostname.endsWith("boluomao1.com") || hostname.endsWith("yxshufang.com");
		}
		getPageType() {
			const pathname = location.pathname;
			if (/\/book\/[^/]+/.test(pathname)) {
				if (/-\d+\.html/.test(pathname)) {
					if (location.search.includes("p=")) return PageType.ChapterNext;
					return PageType.Chapter;
				}
				return PageType.Book;
			} else if (/\/read\/[^/]+\/[^/]+/.test(pathname)) {
				if (location.search.includes("p=")) return PageType.ChapterNext;
				return PageType.Chapter;
			}
			return PageType.Unknown;
		}
		parseFragmentPageURL(doc) {
			return pageURLFromSelector(doc, ".readPage a");
		}
		async parseFragmentPage(doc) {
			const con = doc.querySelector(".content");
			con?.querySelectorAll("p").forEach((p) => {
				if (p.dataset.obf) {
					if (!p.textContent.trim()) p.append(this.decode(p.dataset.obf));
				}
			});
			const paragraphs = paragraphsFromElement(con || document.createElement("div"));
			return {
				...this.parseFragmentPageURL(doc),
				paragraphs
			};
		}
		handleNextPage(_doc, page) {
			document.querySelector(".content")?.append(...page.paragraphs);
		}
		getChapterPage() {
			const con = document.querySelector(".content");
			con.className = "";
			const mainSection = disguiseParagraphs(con);
			const anchors = Array.from(document.querySelectorAll(".readPage a"));
			const navigationBar = {};
			for (const el of anchors) if (el instanceof HTMLAnchorElement) {
				el.className = "";
				if (el.textContent.includes("上一")) navigationBar.prevAnchor = el;
				else if (el.textContent.includes("目录")) navigationBar.infoAnchor = el;
				else if (el.textContent.includes("下一")) navigationBar.nextAnchor = el;
			}
			const breadcrumbBar = document.querySelector(".position");
			const titleEL = document.querySelector("h1.title");
			titleEL?.querySelector(".pageLabel")?.remove();
			return {
				breadcrumbBar,
				title: titleEL?.textContent,
				mainSection,
				navigationBar
			};
		}
		rewriteNextChapterLink(href) {
			const a = nextAnchor(document, ".readPage a");
			if (a && a.textContent.includes("下一页")) {
				a.textContent = "下一章";
				a.href = href;
			}
		}
		async afterRebuilt() {
			tidyStyle();
			new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					if (mutation.type == "childList") mutation.addedNodes.forEach((it) => {
						if (it instanceof HTMLDivElement) {
							if (it.classList.length === 0) it.remove();
						}
					});
				});
			}).observe(document.body, { childList: true });
		}
		decode(s) {
			var raw = atob(s);
			var bytes = new Uint8Array(raw.length);
			for (var i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i) ^ i % 127 + 1;
			return new TextDecoder("utf-8").decode(bytes);
		}
	};
	var RRSSK = class extends AbstractPartedRebuilder {
		parseFragmentPageURL(doc) {
			return pageURLFromSelector(doc, ".readPage a, a.btnBlack");
		}
		async parseFragmentPage(doc) {
			let paragraphs = paragraphsFromElement(doc.querySelector(".content"));
			return {
				...this.parseFragmentPageURL(doc),
				paragraphs
			};
		}
		rewriteNextChapterLink(href) {
			const a = nextAnchor(document, ".readPage a, a.btnBlack");
			if (a && a.textContent.includes("下一页")) {
				a.textContent = "下一章";
				a.href = href;
			}
		}
		handleNextPage(_doc, page) {
			document.querySelector(".content")?.append(...page.paragraphs);
		}
		canHandle() {
			const { hostname } = location;
			return hostname.endsWith("96cbtxt.com") || hostname.endsWith("202book.com") || hostname.endsWith("bishuxsw.com") || hostname.endsWith("piaohuaxs.com");
		}
		getPageType() {
			const { pathname } = location;
			switch (pathname.split("-").length) {
				case 1: return PageType.Book;
				case 2: return PageType.Chapter;
				case 3: return PageType.ChapterNext;
			}
			return PageType.Unknown;
		}
		getChapterPage() {
			const con = document.querySelector(".content");
			con.className = "";
			const mainSection = disguiseParagraphs(con);
			const navigationBar = navLinksFromSelector(".readPage a, a.btnBlack");
			const page = {
				breadcrumbBar: document.querySelector(".position, .top > .conL"),
				title: document.querySelector("h1.title")?.textContent,
				mainSection,
				navigationBar
			};
			tidyStyle();
			return page;
		}
	};
	function handleSettingPage() {
		const settingForm = createSettingForm();
		const articleMain = document.createElement("div");
		articleMain.id = "article_main";
		articleMain.classList = "container";
		const container = document.querySelector(".wrap_bg");
		articleMain.appendChild(settingForm);
		container.appendChild(articleMain);
	}
	var Cuoceng = class extends AbstractRebuilder {
		canHandle() {
			return location.hostname.endsWith("cuoceng.com");
		}
		getPageType() {
			switch (location.pathname.split("/").filter(Boolean).length) {
				case 0:
					document.body.style.flexDirection = "column";
					break;
				case 2:
					handleSettingPage();
					return PageType.Book;
				case 3:
					if (location.pathname.startsWith("/book/chapter/")) {
						_GM_registerMenuCommand("脚本设置", function() {
							_GM_openInTab(location.pathname.replace("/book/chapter/", "/book/"));
						});
						return PageType.Index;
					}
					_GM_registerMenuCommand("脚本设置", function() {
						_GM_openInTab(location.pathname.replace(/\/[\d\w-]+\.html/, ".html"));
					});
					return PageType.Chapter;
			}
			return PageType.Unknown;
		}
		parseFragmentPageURL(doc) {
			return { nextChapter: doc.getElementById("linkNext")?.href };
		}
		getChapterPage() {
			const con = document.getElementById("content");
			con.className = "";
			const mainSection = disguiseParagraphs(con);
			const navigationBar = {
				prevAnchor: document.getElementById("linkPrev"),
				infoAnchor: document.getElementById("linkIndex"),
				nextAnchor: document.getElementById("linkNext")
			};
			const page = {
				breadcrumbBar: document.querySelector(".breadcrumb"),
				title: document.querySelector("body > div.container > div > div > h1")?.textContent,
				mainSection,
				navigationBar
			};
			tidyStyle();
			return page;
		}
	};
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
	var DDxs = class extends AbstractPartedRebuilder {
		canHandle() {
			return location.hostname.endsWith("ddxiaoshuo.cc");
		}
		getPageType() {
			document.body.style.display = "flex";
			document.body.style.justifyContent = "center";
			const segments = location.pathname.split("/").filter(Boolean);
			const lastSegment = segments[segments.length - 1];
			switch (segments.length) {
				case 0:
					document.body.style.flexDirection = "column";
					break;
				case 1:
					if (location.pathname == "/history.html") return PageType.Setting;
					return PageType.Book;
				case 2:
					if (/[\d\w]+_\d+$/.test(lastSegment)) return PageType.ChapterNext;
					return PageType.Chapter;
			}
			return PageType.Unknown;
		}
		parseFragmentPageURL(doc) {
			let next;
			let nextChapter;
			const element = doc.getElementById("next_url");
			if (element) {
				if (element instanceof HTMLAnchorElement) {
					if (element.textContent.includes("下一页")) next = element;
					else if (element.textContent.includes("下一章")) nextChapter = element;
				}
			}
			return {
				next: next?.href,
				nextChapter: nextChapter?.href
			};
		}
		async parseFragmentPage(doc) {
			const paragraphs = paragraphsFromElement(doc.getElementById("article"));
			return {
				...this.parseFragmentPageURL(doc),
				paragraphs
			};
		}
		handleNextPage(_doc, page) {
			document.getElementById("article").append(...page.paragraphs);
		}
		getChapterPage() {
			let con = document.getElementById("article");
			con.className = "";
			if (con.tagName == "ARTICLE") {
				const d = document.createElement("div");
				d.innerHTML = con.innerHTML;
				con.replaceWith(d);
				con = d;
			}
			const mainSection = disguiseParagraphs(con);
			const navigationBar = {
				prevAnchor: document.getElementById("prev_url"),
				infoAnchor: document.getElementById("info_url"),
				nextAnchor: document.getElementById("next_url")
			};
			const page = {
				breadcrumbBar: document.querySelector(".info-title"),
				title: document.title.split("-").shift(),
				mainSection,
				navigationBar
			};
			tidyStyle();
			return page;
		}
		rewriteNextChapterLink(href) {
			const a = document.getElementById("next_url");
			a.textContent = "下一章";
			a.href = href;
		}
		async handleBookPage() {
			cleanBookPage();
		}
		async handleSettingPage() {
			const articleMain = document.getElementById("ss-reader-main");
			const settingForm = createSettingForm();
			articleMain.appendChild(settingForm);
		}
	};
	async function fetchParagraphes(href) {
		const segments = new URL(href, location.href).pathname.split(/[/\-.]/).filter((s) => s.length > 0 && s !== "html");
		const req = {
			method: "GET",
			url: new URL(`/i/a.aspx?id=${segments[1]}&p=${segments[2]}&bid=${segments[0]}`, location.href).toString()
		};
		return new Promise((resolve, reject) => {
			_GM_xmlhttpRequest({
				...req,
				onload: (response) => {
					const parser = new DOMParser();
					const s = response.responseText.replace("document.write(\"", "").replace("\");", "");
					resolve(paragraphsFromElement(parser.parseFromString(s, "text/html").body));
				},
				onerror: (response) => {
					VM_log(["fetchChaperFragmentPage error", response]);
					reject(response);
				},
				ontimeout: () => {
					VM_log("fetchChaperFragmentPage timeout");
					reject("timeout");
				}
			});
		});
	}
	var Deqi = class extends AbstractPartedRebuilder {
		canHandle() {
			const hostname = location.hostname;
			return hostname.endsWith("shudugu.org") || hostname.includes("sudugu") || hostname.includes("deqixs");
		}
		getPageType() {
			_GM_registerMenuCommand("脚本设置", function() {
				_GM_openInTab(`${location.protocol}//${location.host}/history.html#script-setting`);
			});
			if (location.pathname == "/history.html") return PageType.Setting;
			else if (location.pathname.endsWith(".html")) return PageType.Chapter;
			else if (location.pathname.startsWith("/xiaoshuo/")) return PageType.Book;
			else if (location.pathname.endsWith(".aspx")) return PageType.Setting;
			return PageType.Unknown;
		}
		parseFragmentPageURL(doc) {
			const prenexts = doc.querySelector("div.container").querySelectorAll("div.prenext a");
			let next;
			let nextChapter;
			for (const el of prenexts) if (el instanceof HTMLAnchorElement) {
				if (el.textContent == "下一页") {
					next = el;
					break;
				} else if (el.textContent == "下一章") {
					nextChapter = el;
					break;
				}
			}
			return {
				next: next?.href,
				nextChapter: nextChapter?.href
			};
		}
		async parseFragmentPage(doc) {
			let paragraphs = paragraphsFromElement(doc.querySelector("div.container").querySelector(".con"));
			if (paragraphs.length == 0) paragraphs = await fetchParagraphes(doc.documentElement.dataset.src);
			return {
				...this.parseFragmentPageURL(doc),
				paragraphs
			};
		}
		handleNextPage(_doc, page) {
			if (page.paragraphs.length > 0) document.querySelector("div.container .con").append(...page.paragraphs);
		}
		getChapterPage() {
			const con = document.querySelector("div.container .con");
			con.className = "";
			con.querySelectorAll("p").forEach((p) => {
				const s = p.textContent;
				if (s.includes("官方纸飞机") || s.includes("完整章节")) p.remove();
			});
			const mainSection = disguiseParagraphs(con);
			const prenexts = document.querySelectorAll("div.prenext a");
			const navigationBar = {};
			for (const el of prenexts) if (el instanceof HTMLAnchorElement) {
				if (el.textContent == "上一章") navigationBar.prevAnchor = el;
				else if (el.textContent == "目录" || el.textContent == "章节目录") navigationBar.infoAnchor = el;
				else if (el.textContent == "下一章") navigationBar.nextAnchor = el;
			}
			const breadcrumbBar = document.querySelector("div.container > div.submenu h1");
			return {
				breadcrumbBar,
				title: breadcrumbBar?.querySelector("a:last-child")?.nextSibling?.textContent?.replace(/(^ > |（\d+ \/ \d+）$)/g, ""),
				mainSection,
				navigationBar
			};
		}
		rewriteNextChapterLink(href) {
			const prenexts = document.querySelectorAll("div.prenext a");
			for (const el of prenexts) if (el instanceof HTMLAnchorElement) {
				if (el.textContent == "下一页") {
					el.textContent = "下一章";
					el.href = href;
					return;
				}
			}
		}
		async handleBookPage() {
			VM_log("handleBookPage");
			const itemtxt = document.querySelector(".itemtxt");
			Array.from(itemtxt.querySelectorAll("p > span")).forEach((span) => {
				if (span.textContent?.trim() == "已完结");
			});
		}
		async handleSettingPage() {
			VM_log("handleSettingPage");
			const settingForm = createSettingForm();
			document.querySelector("div.container").appendChild(settingForm);
		}
	};
	function _scriptFromDocument(doc) {
		const linkNext = doc.getElementById("linkNext");
		const cls = Array.from(linkNext.classList).filter((it) => !it.startsWith("btn")).join().trim();
		VM_log(`CLS = ${cls}`);
		if (cls) {
			const scripts = Array.from(doc.querySelectorAll("body > div.container.body-content.read-container > script[type]")).filter((it) => it.innerHTML.includes(cls));
			if (scripts && scripts.length > 0) {
				VM_log(`scripts ${scripts.length}`);
				const s = scripts.pop();
				const m = /var (__.*) = '';/.exec(s?.innerHTML || "");
				if (m && m?.length > 1) return s;
			} else VM_log("No scripts");
		}
	}
	function varnameFromDocument(doc) {
		const s = _scriptFromDocument(doc);
		if (s) {
			const m = /var (__.*) = '';/.exec(s?.innerHTML || "");
			if (m && m?.length > 1) {
				VM_log(`varName = ${m[1]}`);
				return m[1];
			}
		}
		return "";
	}
	function varScriptsFromDocument(doc) {
		const s = _scriptFromDocument(doc);
		if (s) return s.innerHTML.split(/[\r\n]+/).slice(0, 4) || [];
		return [];
	}
	var Dmxs = class extends AbstractPartedRebuilder {
		canHandle() {
			return location.hostname.endsWith("dmxs2.com");
		}
		getPageType() {
			_GM_registerMenuCommand("脚本设置", function() {
				_GM_openInTab(`${location.protocol}//${location.host}/history.html#script-setting`);
			});
			if (/^\/book\/[^/]+\.html$/.test(location.pathname)) return PageType.Book;
			else if (/^\/book\/[^/]+\/[^/]+\.html$/.test(location.pathname)) return PageType.Chapter;
			return PageType.Unknown;
		}
		parseFragmentPageURL(doc) {
			const linkNext = doc.getElementById("linkNext");
			const page = {};
			if (linkNext instanceof HTMLAnchorElement) {
				page.nextChapter = linkNext.href;
				VM_log(`nextChapter: ${page.nextChapter}`);
			} else {
				const varName = varnameFromDocument(doc);
				if (doc.defaultView) page.next = doc.defaultView[varName];
				else {
					const lines = [doc.querySelector("body > script")?.innerHTML || "", ...varScriptsFromDocument(doc)];
					VM_log(`fn = ${lines.join("\r\n")}`);
					const script = document.createElement("script");
					script.innerHTML = lines.join("\r\n");
					document.body.append(script);
					script.remove();
					page.next = document.defaultView[varName];
				}
				VM_log(`next: ${page.next}`);
			}
			return page;
		}
		async parseFragmentPage(doc) {
			const paragraphs = paragraphsFromElement(doc.getElementById("htmlContent"));
			return {
				...this.parseFragmentPageURL(doc),
				paragraphs
			};
		}
		handleNextPage(_doc, page) {
			document.getElementById("htmlContent").append(...page.paragraphs);
		}
		getChapterPage() {
			const con = document.getElementById("htmlContent");
			con.className = "";
			con.querySelectorAll("p").forEach((p) => {
				const s = p.textContent.trim();
				if (s) {
					if (s.includes("退#出#阅#读#模#式") || s.includes("你推荐他的其他作品") || s.includes("米小说移动版") || s.includes("本书精彩情节") || s.includes("最新章节") || s.includes("完整章节") || p.classList.contains("pmore")) p.remove();
				} else p.remove();
			});
			const mainSection = disguiseParagraphs(con);
			const navigationBar = {
				prevAnchor: document.getElementById("linkPrev"),
				infoAnchor: document.getElementById("linkIndex"),
				nextAnchor: document.getElementById("linkNext")
			};
			const page = {
				breadcrumbBar: document.querySelector(".breadcrumb"),
				title: document.querySelector("h1.readTitle")?.textContent,
				mainSection,
				navigationBar
			};
			tidyStyle();
			return page;
		}
		rewriteNextChapterLink(href) {
			const linkNext = document.getElementById("linkNext");
			const nextLink = document.createElement("a");
			nextLink.id = "linkNext";
			nextLink.href = href;
			nextLink.innerHTML = "下一章";
			linkNext?.replaceWith(nextLink);
		}
	};
	var KSW81 = class extends AbstractPartedRebuilder {
		canHandle() {
			return location.hostname.endsWith("81ksw.com");
		}
		getPageType() {
			if (/\/index\/[^/]+/.test(location.pathname)) return PageType.Book;
			else if (/\/read\/[^/]+\/[^/]+/.test(location.pathname)) return PageType.Chapter;
			return PageType.Unknown;
		}
		parseFragmentPageURL(doc) {
			return pageURLFromSelector(doc, "#next_url");
		}
		async parseFragmentPage(doc) {
			const paragraphs = paragraphsFromElement(doc.getElementById("content"));
			return {
				...this.parseFragmentPageURL(doc),
				paragraphs
			};
		}
		handleNextPage(_doc, page) {
			document.getElementById("content").append(...page.paragraphs);
		}
		getChapterPage() {
			const con = document.querySelector(".content");
			con.className = "";
			const mainSection = disguiseParagraphs(con);
			const navigationBar = {
				prevAnchor: document.getElementById("prev_url"),
				infoAnchor: document.getElementById("info_url"),
				nextAnchor: document.getElementById("next_url")
			};
			const breadcrumbBar = document.querySelector("div.layout-tit");
			breadcrumbBar.querySelector(".reader-fun")?.remove();
			return {
				breadcrumbBar,
				title: document.querySelector("h1.title")?.textContent,
				mainSection,
				navigationBar
			};
		}
		async afterRebuilt() {
			tidyStyle();
			new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					if (mutation.type == "childList") mutation.addedNodes.forEach((it) => {
						if (it instanceof HTMLDivElement) {
							if (it.classList.length === 0) it.remove();
						}
					});
				});
			}).observe(document.body, { childList: true });
		}
		rewriteNextChapterLink(href) {
			const a = document.getElementById("next_url");
			a.textContent = "下一章";
			a.href = href;
		}
	};
	var Kudushu = class extends AbstractPartedRebuilder {
		canHandle() {
			return location.hostname.endsWith("kudushu.org");
		}
		getPageType() {
			if (/\/book\/[^/]+/.test(location.pathname) || /\/html\/[^/]+\/[^/]+\/index\.html/.test(location.pathname)) return PageType.Book;
			else if (/\/html\/[^/]+\/[^/]+/.test(location.pathname) || /\/html\/[^/]+\/[^/]+\/[^/]+\.html/.test(location.pathname)) return PageType.Chapter;
			return PageType.Unknown;
		}
		parseFragmentPageURL(doc) {
			const prenexts = doc.getElementById("novelcontent").querySelector("ul").querySelectorAll("ul li a");
			let next;
			let nextChapter;
			for (const el of prenexts) if (el instanceof HTMLAnchorElement) {
				if (el.textContent == "下—页") {
					next = el;
					break;
				} else if (el.textContent == "下—章") {
					nextChapter = el;
					nextChapter.textContent = "下一章";
					break;
				}
			}
			return {
				next: next?.href,
				nextChapter: nextChapter?.href
			};
		}
		async parseFragmentPage(doc) {
			const paragraphs = paragraphsFromElement(doc.getElementById("novelcontent"));
			return {
				...this.parseFragmentPageURL(doc),
				paragraphs
			};
		}
		handleNextPage(_doc, page) {
			document.getElementById("novelcontent").append(...page.paragraphs);
		}
		getChapterPage() {
			const con = document.getElementById("novelcontent");
			con.className = "";
			con.id = "";
			con.querySelectorAll("p").forEach((p) => {
				if (p.textContent.trim().length == 0 || p.textContent.includes("本章未完")) p.remove();
			});
			con.querySelectorAll("img,.novelbutton,div[id]").forEach((it) => it.remove());
			const mainSection = disguiseParagraphs(con);
			let content_tip = document.getElementById("content_tip");
			while (content_tip) {
				content_tip.remove();
				content_tip = document.getElementById("content_tip");
			}
			const title = document.getElementById("chaptertitle")?.textContent;
			const prenexts = Array.from(document.querySelectorAll("#novelbody ul li p a")).map((a) => a.cloneNode(true));
			const navigationBar = {};
			for (const el of prenexts) if (el.textContent == "上一章" || el.textContent.includes("上")) {
				el.textContent = "上—章";
				navigationBar.prevAnchor = el;
			} else if (el.textContent.includes("录")) {
				el.textContent = "目录";
				navigationBar.infoAnchor = el;
			} else if (el.textContent == "下一章") navigationBar.nextAnchor = el;
			else VM_log(el.outerHTML);
			return {
				mainSection,
				title,
				navigationBar
			};
		}
		rewriteNextChapterLink(href) {
			const anchors = Array.from(document.querySelectorAll("#novelbody ul li p a"));
			for (const a of anchors) if (a instanceof HTMLAnchorElement && a.textContent.includes("下")) {
				a.textContent = "下一章";
				a.href = href;
				break;
			}
		}
	};
	var WanbenRebuilder = class extends AbstractRebuilder {
		canHandle() {
			return location.hostname.endsWith("wanbenshenzhan.com");
		}
		getPageType() {
			const { pathname } = location;
			if (pathname.endsWith(".html")) return PageType.Chapter;
			return PageType.Unknown;
		}
		getChapterPage() {
			const con = document.querySelector(".chapter-content");
			con.className = "";
			const mainSection = disguiseParagraphs(con);
			const navigationBar = {
				prevAnchor: document.querySelector(".chapter-nav .nav-prev > a"),
				infoAnchor: document.querySelector(".chapter-nav .nav-center > a"),
				nextAnchor: document.querySelector(".chapter-nav .nav-next > a")
			};
			const page = {
				breadcrumbBar: document.querySelector(".breadcrumb"),
				title: document.querySelector("h1.chapter-title")?.textContent,
				mainSection,
				navigationBar
			};
			tidyStyle();
			return page;
		}
	};
	function handleBiqu33Route() {
		if (document.documentElement.lang == "zh-TW") document.documentElement.lang = "zh-CN";
		const segments = location.pathname.split("/").filter(Boolean);
		const lastSegment = segments[segments.length - 1];
		switch (segments.length) {
			case 0:
			case 1:
			case 2:
				if (segments.length == 2 && (segments[0] == "book" || segments[0] == "xs"));
				break;
			case 3:
				if (/[\d\w]+[_~]\d+$/.test(lastSegment)) return;
				handleChapterPage();
		}
	}
	function mergeCanvases(canvases) {
		VM_log("canvases", canvases.length);
		canvases = canvases.filter((c) => c.width > 0 && c.height > 0);
		VM_log("canvases trimed", canvases.length);
		if (canvases.length == 0) return;
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
	function cloneScript(script) {
		const scriptCopy = document.createElement("script");
		scriptCopy.innerHTML = script.innerHTML.split(";").join(";\r\n");
		return scriptCopy;
	}
	function getCanvasScript(doc) {
		const document = ensureDoc(doc);
		const scripts = Array.from(document.body.querySelectorAll("script:not([src])"));
		for (const script of scripts) if (script.innerHTML.includes(`if(!isMobile)`) && !script.innerHTML.includes(`qrcode`)) {
			VM_log("有手机浏览器限制");
			return cloneScript(script);
		}
		for (const script of scripts) if (script.innerHTML.includes(`display_img_line`)) return cloneScript(script);
	}
	function canvasToImage(canvas) {
		const image = new Image();
		image.src = canvas.toDataURL();
		image.style.visibility = "visible";
		return image;
	}
	var scriptCopyArray = [];
	var scriptFirstInject = true;
	var styleSet = new Set();
	function handleChapterPage() {
		VM_log("handleChapterPage");
		const con = document.getElementById("txtbody") || document.getElementById("chaptercontent");
		const page = parseFragmentPageURL(document);
		let multiPage = false;
		if (isInIframe) return;
		if (page.next) {
			const href = page.next;
			multiPage = true;
			(async () => {
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
		if (!multiPage) rebuild();
	}
	function appendImage() {
		const con = document.getElementById("txtbody") || document.getElementById("chaptercontent");
		const merged = mergeCanvases(Array.from(con.querySelectorAll("table canvas")).filter((c) => {
			if (c instanceof HTMLCanvasElement) return c.width > 0 && c.height > 0;
			return false;
		}));
		if (merged) con.append(canvasToImage(merged));
		con.querySelectorAll("table").forEach((t) => t.remove());
	}
	function rebuild() {
		const con = document.getElementById("txtbody") || document.getElementById("chaptercontent");
		const loading = con.querySelector("[id^=\"loading_peu_p_\"]");
		if (loading) {
			VM_log("loading");
			const ob = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					if (mutation.type == "childList") {
						if (mutation.removedNodes.length > 0) {
							if (!con.querySelector("[id^=\"loading_peu_p_\"]")) {
								ob.disconnect();
								setTimeout(rebuild, 20);
							}
						}
					}
				});
			});
			ob.observe(loading.parentElement, { childList: true });
			return;
		}
		if (scriptCopyArray.length > 0) {
			appendImage();
			const thisWin = document.defaultView;
			thisWin.isMobile = true;
			thisWin.ASM_CONSTS[1729] = () => 1;
			thisWin.ASM_CONSTS[1901] = (a) => {
				document.getElementById("box_" + a)?.setAttribute("class", "img-box");
			};
			CanvasRenderingContext2D.prototype.fillText = () => {};
			const s = scriptCopyArray.shift();
			if (!scriptFirstInject) {
				s.innerHTML = s.innerHTML.split("\r\n").filter((line) => !/^(function|var) /.test(line)).join("\r\n");
				scriptFirstInject = false;
			}
			document.body.appendChild(s);
			VM_log(s.innerHTML);
			VM_log("wait loading");
			setTimeout(rebuild, 100);
			s.remove();
			return;
		}
		appendImage();
		rebuildChapterBody(getChapterPage());
	}
	function parseFragmentPageURL(doc) {
		let next;
		let nextChapter = doc.getElementById("u_next") || doc.getElementById("next_url");
		const span = doc.querySelector("#pageseg > span, #sub-pages > span");
		if (span) {
			const nextElementSibling = span.nextElementSibling;
			if (nextElementSibling && nextElementSibling instanceof HTMLAnchorElement) next = nextElementSibling;
		}
		return {
			next: next?.href,
			nextChapter: nextChapter?.href
		};
	}
	async function parseFragmentPage(doc) {
		const nestedCon = doc.getElementById("txtbody") || doc.getElementById("chaptercontent");
		const paragraphs = paragraphsFromElement(nestedCon);
		if (!nestedCon.firstElementChild) {
			VM_log("image page");
			let scriptCopy = getCanvasScript(doc);
			if (scriptCopy) scriptCopyArray.push(scriptCopy);
		} else {
			VM_log("text page");
			doc.body.querySelectorAll("style").forEach((s) => {
				if (styleSet.has(s.innerHTML)) return;
				document.head.append(s);
				styleSet.add(s.innerHTML);
			});
		}
		return {
			...parseFragmentPageURL(doc),
			paragraphs
		};
	}
	function getChapterPage() {
		const con = document.getElementById("txtbody") || document.getElementById("chaptercontent");
		con.className = "";
		const mainSection = disguiseParagraphs(con);
		const navigationBar = {
			prevAnchor: document.getElementById("prev_url"),
			infoAnchor: document.getElementById("info_url"),
			nextAnchor: document.getElementById("next_url")
		};
		if (!navigationBar.infoAnchor) {
			const prenexts = Array.from(document.querySelectorAll(".rdpg > a"));
			for (const el of prenexts) if (el instanceof HTMLAnchorElement) {
				el.className = "";
				const textContent = el.textContent;
				if (textContent.includes("上一章")) navigationBar.prevAnchor = el;
				else if (textContent.includes("目") && textContent.includes("录")) navigationBar.infoAnchor = el;
				else if (textContent.includes("下一章")) navigationBar.nextAnchor = el;
			}
		}
		return {
			breadcrumbBar: document.querySelector(".crumb, .breadcrumb"),
			title: document.querySelector("h1.rd-ttl,h1.readTitle")?.textContent,
			mainSection,
			navigationBar
		};
	}
	var rebuilders = [
		new Boluomao(),
		new Cuoceng(),
		new DDxs(),
		new Deqi(),
		new Dmxs(),
		new KSW81(),
		new Kudushu(),
		new WanbenRebuilder(),
		new RRSSK()
	];
	VM_log("init");
	function handleRoute() {
		if (location.hostname.endsWith("beqg.cc") || location.hostname.endsWith("biqu33.cc")) {
			handleBiqu33Route();
			_GM_registerMenuCommand("脚本设置", function() {
				_GM_openInTab(`${location.protocol}//${location.host}/#script-setting`);
			});
		}
		_GM_registerMenuCommand("脚本设置", showConfigDialog);
		for (const rb of rebuilders) if (rb.canHandle()) {
			rb.rebuild();
			break;
		}
	}
	setDefaultStyle();
	handleRoute();
	releaseCopy();
})();
