// ==UserScript==
// @name         Deqi Prefech Lite
// @namespace    https://greasyfork.org/zh-CN/users/14997-lrh3321
// @version      2026-10-040
// @author       LRH3321
// @description  得奇小说网, biqu33.cc, ddxiaoshuo.cc, cuoceng.com 看单个章节免翻页，把小说伪装成代码
// @license      MIT
// @icon         https://www.suduguu.com/favicon.ico
// @homepageURL  https://greasyfork.org/zh-CN/scripts/537588-deqi-prefech
// @source       https://github.com/lrh3321/deqi-prefetch
// @supportURL   https://github.com/lrh3321/deqi-prefetch/issues
// @downloadURL  https://update.greasyfork.org/scripts/537588/Deqi%20Prefech.user.js
// @updateURL    https://update.greasyfork.org/scripts/537588/Deqi%20Prefech.user.js
// @match        *://*.deqixs.org/*
// @match        *://*.shudugu.org/*
// @match        *://*.sudugu.cc/*
// @match        *://*.suduguu.com/*
// @match        *://*.sudugu.org/*
// @match        *://*.sudugu.org/i/pifu.aspx
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
// @match        *://*.81ksw.com/index/*
// @match        *://*.81ksw.com/read/*
// @tag          novels
// @connect      self
// @grant        GM_addElement
// @grant        GM_addStyle
// @grant        GM_getResourceURL
// @grant        GM_getValue
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
	_css("[data-comment=normal] span.token.comment{font-style:normal}img[alt],.menu,.header p,h2 a,div.footer,div.container>ul.list{display:none!important}h2.op a{display:block}body>div.container,body>div.header,#article_main,#ss-reader-main{width:min(calc(100svw - 1em), var(--container-width,\"1200px\"))}span.token.comment{font-family:var(--novel-font-family)!important}body{--primary-color:black;--primary-bg-color:#f5f2f0;--secondary-color:gray;background:var(--primary-bg-color)}img{visibility:hidden}details#script-setting>summary,form{color:var(--primary-color)}details#script-setting>summary{font-size:x-large;font-weight:700}form fieldset{margin-inline:2px;border:2px groove gray;border-image:initial;min-inline-size:min-content;margin-top:1rem;margin-bottom:1rem;padding-block:.35em .625em;padding-inline:.75em;display:block}form fieldset>div{flex-wrap:wrap;gap:.5rem;display:flex}fieldset label{white-space:nowrap;gap:.4rem;width:fit-content;display:flex}@media (orientation:portrait){fieldset label{white-space:nowrap;flex-wrap:wrap;gap:.4rem;width:100%;display:flex}}label input{border:1px solid var(--lightningcss-light,#767676)var(--lightningcss-dark,#858585);max-width:75svw;padding-left:.5rem}editable-list li{align-items:baseline;width:fit-content;height:fit-content;display:flex}editable-list figure{margin:0}editable-list figcaption{-webkit-backdrop-filter:contrast(120%);backdrop-filter:contrast(120%);text-align:end}editable-list .icon{cursor:pointer;border:none;font-size:1.8rem}editable-list textarea{border-radius:.75rem;width:95%;padding-block:.25rem;padding-inline:.75rem}editable-list ul{flex-wrap:wrap;justify-content:flex-start;column-gap:1rem;max-width:80svw;display:flex}#header,#main .container-fluid,#article_main .row,body>[id][style]:not(#gmenu),body>[style*=display]:not(#gmenu),body>[style*=position\\:fixed]{display:none!important}#article_main{background:0 0}#article_main #page-links a,#article_main #page-links span{text-align:center;background:#1a73e8;width:28px;height:28px;margin-right:10px;padding:1px 10px;line-height:25px;display:inline-block;color:#fff!important;text-decoration:none!important}#article_main #page-links span{background:#ccc}#main a[role=button]{color:#555}#main a[role=button]:hover{color:#fa2080;text-decoration:none}#ss-reader-main,.info-title{border-width:0;background-color:#0000!important}#ss-reader-main .info-commend,#ss-reader-main .reader-hr,#ss-reader-main .readSet,#ss-reader-main .info-chapters-title,#ss-reader-main h1,body.read_style_1 .header,body.read_style_1 #showDetail,#readcontent .textbox.cf,body.read_style_1 .textinfo{display:none!important}@media screen and (width<=1200px){#list.dir{width:calc(100svw - 30px);margin:0}#list.dir ul li{float:left;width:33%}.container .itemtxt{float:unset;padding-right:unset;width:unset}}#captcha-form>div.ui-image>img#ui-captcha-image{visibility:visible!important;display:inline!important}.urn-float{display:none!important}body:has(.article-root){--primary-color:#2b2b2b;--primary-bg-color:#f3efe8;--secondary-color:#9b9184;--card-bg-color:#fffdf8;--accent-color:#a4774b;--separator-color:color-mix(in srgb, var(--secondary-color) 25%, transparent);--novel-line-height:1.9;--novel-para-spacing:.9em;min-height:100svh;color:var(--primary-color);background-color:color-mix(in srgb, var(--primary-bg-color) 82%, var(--secondary-color) 18%);margin:0}.article-root{width:min(100svw, var(--container-width,1200px));color:var(--primary-color);text-align:start;margin-inline:auto;padding-bottom:1.5rem}.article-root>header{opacity:.75;border-bottom:1px solid var(--separator-color);background-color:color-mix(in srgb, var(--primary-bg-color) 90%, var(--primary-color) 10%);margin-top:.5rem;padding-inline:1rem;line-height:2rem}.article-root>header:empty{display:none}.article-root .breadcrumb,.article-root .breadcrumb a{color:var(--secondary-color);background-color:#0000;flex-wrap:wrap;align-items:center;gap:1rem;margin:0;display:flex}.article-root .breadcrumb{flex-wrap:wrap;gap:.4rem 1rem;margin-inline:auto;padding-inline:1rem;list-style:none}.article-root .breadcrumb li{text-wrap:nowrap;text-overflow:ellipsis;list-style-type:none;overflow-x:hidden}.article-root .breadcrumb li[aria-hidden]{opacity:.5}.article-root .breadcrumb a:hover{opacity:.6;text-decoration:underline}.article-root>main{min-height:0}.article-root article{background:var(--card-bg-color);border:1px solid var(--separator-color);border-radius:.9rem;margin-block:1rem;margin-inline:auto;padding:clamp(1rem,3.5vw,2rem) clamp(1rem,4vw,2.5rem) 2.5rem;box-shadow:0 1px 2px #0000000a,0 10px 30px #0000000f}.article-root .article-title{border-bottom:1px dashed var(--separator-color);white-space:nowrap;text-overflow:ellipsis;min-width:0;max-width:100%;margin-bottom:1rem;padding-bottom:.75rem;font-size:clamp(1.3rem,4.5vw,1.7rem);font-weight:700;line-height:1.4;display:block;overflow:hidden}.article-root .article-title code{background-color:#0000}.article-root section.img-container{flex-direction:column;display:flex}.article-root section.img-container img{visibility:initial;border-radius:.5rem;width:100%}.article-root section p{text-indent:2em;margin:0 0 var(--novel-para-spacing,.9em);line-height:var(--novel-line-height,1.9);letter-spacing:.015em;color:var(--primary-color);overflow-wrap:anywhere;word-break:break-word;font-size:1.0625rem}@media (orientation:landscape){.article-root section.img-container{align-items:center}.article-root section.img-container img{max-width:35rem}}.article-root pre{tab-size:4;text-indent:0;color:var(--primary-color);background:color-mix(in srgb, var(--primary-bg-color) 45%, var(--card-bg-color) 55%);border:1px solid var(--separator-color);border-radius:.6rem;margin-block:.5rem;padding:1rem 1.25rem;font-family:ui-monospace,SF Mono,Cascadia Code,JetBrains Mono,Menlo,Consolas,Courier New,monospace;font-size:.875rem;line-height:1.75;overflow-x:auto}.article-root pre code{text-indent:0;white-space:inherit;display:block}.article-root pre.line-numbers .line-numbers-rows{border-right-color:var(--separator-color)}.article-root>footer{opacity:.9;padding-block:.5rem;line-height:2rem}.article-root .article-nav{background-color:lch(from var(--primary-bg-color) l c h / .8);border:1px solid var(--separator-color);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);border-radius:999px;flex-wrap:wrap;justify-content:center;justify-self:center;gap:.4rem;width:fit-content;margin-inline:auto;padding:.35rem;display:flex}.article-root .article-nav a{color:var(--secondary-color);background-color:#0000;border-radius:999px;padding:.35rem 1rem;text-decoration:none;transition:background-color .15s,color .15s}.article-root .article-nav a:hover{background-color:var(--accent-color);color:#fff}.article-root hr{background:linear-gradient(90deg, transparent, var(--secondary-color) 20%, var(--secondary-color) 80%, transparent);opacity:.4;border:0;width:100%;height:1px;margin-block:0}body[hidden]{display:none!important}@media (prefers-color-scheme:dark){body:has(.article-root){--primary-color:#d7d3cb;--primary-bg-color:#1c1b19;--secondary-color:#8d8577;--card-bg-color:#262420;--accent-color:#c08d5e;background-color:color-mix(in srgb, var(--primary-bg-color) 82%, var(--secondary-color) 18%)}}body[data-theme=dark]:has(.article-root){--primary-color:#d7d3cb;--primary-bg-color:#1c1b19;--secondary-color:#8d8577;--card-bg-color:#262420;--accent-color:#c08d5e;background-color:color-mix(in srgb, var(--primary-bg-color) 82%, var(--secondary-color) 18%)}body[data-theme=light]:has(.article-root){--primary-color:#2b2b2b;--primary-bg-color:#f3efe8;--secondary-color:#9b9184;--card-bg-color:#fffdf8;--accent-color:#a4774b;background-color:color-mix(in srgb, var(--primary-bg-color) 82%, var(--secondary-color) 18%)}");
	_css(":root{--fab-accent:#a4774b;--fab-bg:#f3efe8}body[data-theme=dark]{--fab-accent:#c08d5e;--fab-bg:#262420}#deqi-fab{z-index:2147483000;align-items:flex-end;gap:.6rem;display:flex;position:fixed;bottom:1.75rem;right:1.25rem}#deqi-fab .fab-menu{opacity:0;pointer-events:none;flex-direction:column;align-items:flex-end;gap:.5rem;transition:opacity .18s,transform .18s;display:none;transform:translateY(.5rem)}#deqi-fab.open .fab-menu{opacity:1;pointer-events:auto;display:flex;transform:translateY(0)}#deqi-fab .fab-menu button{border:1px solid color-mix(in srgb, var(--fab-accent) 25%, transparent);background:color-mix(in srgb, var(--fab-bg) 88%, white);color:var(--primary-color,#2b2b2b);cursor:pointer;white-space:nowrap;border-radius:999px;align-items:center;gap:.4rem;padding:.45rem .9rem;font-size:.9rem;transition:background-color .15s,transform .1s;display:inline-flex;box-shadow:0 3px 10px #0000002e}#deqi-fab .fab-menu button:hover{background:var(--fab-accent);color:#fff}#deqi-fab .fab-menu button:active{transform:scale(.95)}#deqi-fab .fab-menu button .fab-icon{font-size:1rem;line-height:1}#deqi-fab .fab-toggle{cursor:pointer;color:#fff;background:linear-gradient(135deg, #b08968, var(--fab-accent));border:none;border-radius:50%;place-items:center;width:3.15rem;height:3.15rem;font-size:1.6rem;transition:transform .2s;display:grid;box-shadow:0 5px 16px #00000047}#deqi-fab .fab-toggle:hover{transform:scale(1.06)}#deqi-fab .fab-toggle:active{transform:scale(.94)}#deqi-settings-dialog{background:0 0;border:0;width:100vw;max-width:none;height:100dvh;max-height:none;margin:0;padding:0}#deqi-settings-dialog::backdrop{-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);background:#00000073}#deqi-settings-dialog .settings-panel{background:var(--card-bg-color,#fffdf8);width:min(90vw,40rem);max-height:88dvh;color:var(--primary-color,#2b2b2b);border:1px solid var(--separator-color,#9b918440);border-radius:.9rem;margin:5dvh auto auto;font-size:.95rem;overflow:auto;box-shadow:0 20px 60px #0000004d}#deqi-settings-dialog .settings-head{border-bottom:1px solid var(--separator-color,#9b918440);background:inherit;z-index:1;justify-content:space-between;align-items:center;padding:.9rem 1.2rem;font-size:1.05rem;font-weight:700;display:flex;position:sticky;top:0}#deqi-settings-dialog .settings-close{color:inherit;cursor:pointer;background:0 0;border:0;border-radius:.4rem;padding:.2rem .4rem;font-size:1.4rem;line-height:1}#deqi-settings-dialog .settings-close:hover{background:color-mix(in srgb, var(--primary-color) 12%, transparent)}#deqi-settings-dialog .settings-body{flex-direction:column;gap:.9rem;padding:1.1rem 1.2rem 1.4rem;display:flex}#deqi-settings-dialog .settings-row{align-items:center;gap:.6rem;display:flex}#deqi-settings-dialog .settings-row label{flex:none;min-width:4.5rem}#deqi-settings-dialog .settings-row input[type=text],#deqi-settings-dialog .settings-row input[type=number]{border:1px solid var(--separator-color,#9b918466);background:var(--primary-bg-color,#f3efe8);min-width:0;color:inherit;border-radius:.45rem;flex:auto;padding:.4rem .6rem}#deqi-settings-dialog .settings-row input[type=range]{min-width:0;accent-color:var(--fab-accent,#a4774b);flex:auto}#deqi-settings-dialog .settings-row select{border:1px solid var(--separator-color,#9b918466);background:var(--primary-bg-color,#f3efe8);min-width:0;color:inherit;border-radius:.45rem;flex:auto;padding:.4rem .6rem}#deqi-settings-dialog .settings-val{text-align:right;opacity:.7;font-variant-numeric:tabular-nums;flex:0 0 2.8rem}#deqi-settings-dialog .settings-hint{opacity:.65;font-size:.82rem}#deqi-settings-dialog .settings-font-quick{flex-wrap:wrap;gap:.45rem;display:flex}#deqi-settings-dialog .settings-font-quick button{border:1px solid var(--separator-color,#9b918466);background:var(--primary-bg-color,#f3efe8);color:inherit;cursor:pointer;border-radius:.45rem;padding:.3rem .75rem;font-size:.85rem;transition:background-color .15s,color .15s,border-color .15s}#deqi-settings-dialog .settings-font-quick button:hover{border-color:var(--fab-accent,#a4774b)}#deqi-settings-dialog .settings-font-quick button.active{background:var(--fab-accent,#a4774b);border-color:var(--fab-accent,#a4774b);color:#fff}");
	var _GM_getValue = (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
	var _GM_log = (() => typeof GM_log != "undefined" ? GM_log : void 0)();
	var _GM_openInTab = (() => typeof GM_openInTab != "undefined" ? GM_openInTab : void 0)();
	var _GM_registerMenuCommand = (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
	var _GM_setValue = (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
	var _GM_xmlhttpRequest = (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
	var VM_log = _GM_log;
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
					const f = callback(ensureDoc(response.response));
					VM_log(f);
					resolve(f);
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
		if (nav.prevAnchor) navBar.appendChild(nav.prevAnchor);
		if (nav.infoAnchor) navBar.appendChild(nav.infoAnchor);
		if (nav.nextAnchor) navBar.appendChild(nav.nextAnchor);
		navBar.insertAdjacentHTML("beforeend", "<a href=\"/\">小说列表</a>");
		footer.appendChild(navBar);
		setAccessKeys(nav);
		return footer;
	}
	function disguiseParagraphs(container) {
		return container;
	}
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
	fakeCodeSnippet = "";
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
	var themeMode = _GM_getValue("theme-mode", "auto");
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
			["auto", "跟随系统"],
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
	function handleBookPage$4() {
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
		if (!finished) return;
	}
	function handleSettingPage$2() {
		VM_log("handleSettingPage");
		const settingForm = createSettingForm();
		document.querySelector("div.container").appendChild(settingForm);
	}
	function parseFragmentPage$6(doc) {
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
		return {
			next: next?.href,
			nextChapter: nextChapter?.href,
			paragraphs
		};
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
					let next = await fetchChaperFragmentPage(element.href, parseFragmentPage$6);
					if (next.paragraphs.length === 0) con.append(...await fetchParagraphes(element.href));
					else con.append(...next.paragraphs);
					while (next.next && counter < 20) {
						counter++;
						const href = next.next;
						next = await fetchChaperFragmentPage(next.next, parseFragmentPage$6);
						if (next.paragraphs.length === 0) con.append(...await fetchParagraphes(href));
						else con.append(...next.paragraphs);
					}
					if (next.nextChapter) {
						element.textContent = "下一章";
						element.href = next.nextChapter;
					}
					rebuildChapterBody(getChapterPage$6());
				})();
				break;
			} else if (element.textContent == "下一章") {
				(() => {
					rebuildChapterBody(getChapterPage$6());
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
		if (location.pathname === "/pifu/") handleSettingPage$2();
		else if (location.pathname.endsWith(".html")) {
			if (!isInIframe);
			handleChaperPage();
		} else if (location.pathname.startsWith("/xiaoshuo/")) handleBookPage$4();
	}
	function handleSuduguRoute() {
		VM_log("handleSuduguRoute");
		if (location.pathname === "/i/pifu.aspx") handleSettingPage$2();
		else if (location.pathname.endsWith(".html")) {
			if (!isInIframe);
			handleChaperPage();
		} else if (location.pathname.match(/\/\d+\/(p-\d+\.html)?/)) handleBookPage$4();
	}
	function isSudugu() {
		const hostname = location.hostname;
		return hostname.endsWith("shudugu.org") || hostname.endsWith("sudugu.org") || hostname.endsWith("sudugu.cc") || hostname.endsWith("suduguu.com") || hostname.includes("sudugu");
	}
	function getChapterPage$6() {
		const con = document.querySelector("div.container .con");
		con.className = "";
		con.querySelectorAll("p").forEach((p) => {
			const s = p.textContent;
			if (s.includes("官方纸飞机") || s.includes("完整章节")) p.remove();
		});
		const mainSection = disguiseParagraphs(con);
		const prenexts = document.querySelectorAll("div.prenext a");
		const navigationBar = {};
		for (const element of prenexts) if (element instanceof HTMLAnchorElement) {
			if (element.textContent == "上一章") navigationBar.prevAnchor = element;
			else if (element.textContent == "目录" || element.textContent == "章节目录") navigationBar.infoAnchor = element;
			else if (element.textContent == "下一章") navigationBar.nextAnchor = element;
		}
		const breadcrumbBar = document.querySelector("div.container > div.submenu h1");
		return {
			breadcrumbBar,
			title: breadcrumbBar?.querySelector("a:last-child")?.nextSibling?.textContent?.replace(/(^ > |（\d+ \/ \d+）$)/g, ""),
			mainSection,
			navigationBar
		};
	}
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
				if (/[\d\w]+_\d+$/.test(lastSegment)) return;
				handleChapterPage$6();
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
	function getCanvasScript(doc) {
		const document = ensureDoc(doc);
		let scriptCopy = void 0;
		const scripts = Array.from(document.body.querySelectorAll("script:not([src])"));
		scripts.forEach((script) => {
			if (typeof scriptCopy != "undefined") return;
			if (script.innerHTML.includes(`if(!isMobile)`) && !script.innerHTML.includes(`qrcode`)) {
				console.log("有手机浏览器限制");
				scriptCopy = document.createElement("script");
				scriptCopy.innerHTML = script.innerHTML.split(";").join(";\r\n");
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
	function canvasToImage(canvas) {
		const image = new Image();
		image.src = canvas.toDataURL();
		image.style.visibility = "visible";
		return image;
	}
	var scriptCopyArray = [];
	var styleSet = new Set();
	function handleChapterPage$6() {
		VM_log("handleChapterPage");
		const con = document.getElementById("txtbody");
		const page = parseFragmentPageURL(document);
		let multiPage = false;
		if (isInIframe) return;
		if (page.next) {
			const href = page.next;
			multiPage = true;
			(async () => {
				let counter = 0;
				let next = await fetchChaperFragmentPage(href, parseFragmentPage$5);
				con.append(...next.paragraphs);
				while (next.next && counter < 20) {
					counter++;
					next = await fetchChaperFragmentPage(next.next, parseFragmentPage$5);
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
		const con = document.getElementById("txtbody");
		const merged = mergeCanvases(Array.from(con.querySelectorAll("table canvas")).filter((c) => {
			if (c instanceof HTMLCanvasElement) return c.width > 0 && c.height > 0;
			return false;
		}));
		if (merged) con.append(canvasToImage(merged));
		con.querySelectorAll("table").forEach((t) => t.remove());
	}
	function rebuild() {
		const con = document.getElementById("txtbody");
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
			const s = scriptCopyArray.shift();
			document.body.appendChild(s);
			VM_log(s.innerHTML);
			VM_log("wait loading");
			setTimeout(rebuild, 100);
			s.remove();
			return;
		}
		appendImage();
		rebuildChapterBody(getChapterPage$5());
	}
	function parseFragmentPageURL(doc) {
		let next;
		let nextChapter = doc.getElementById("u_next");
		const span = doc.querySelector("#pageseg > span");
		if (span) {
			const nextElementSibling = span.nextElementSibling;
			if (nextElementSibling && nextElementSibling instanceof HTMLAnchorElement) next = nextElementSibling;
		}
		return {
			next: next?.href,
			nextChapter: nextChapter?.href
		};
	}
	function parseFragmentPage$5(doc) {
		const nestedCon = doc.getElementById("txtbody");
		VM_log("content", nestedCon.outerHTML);
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
	function getChapterPage$5() {
		const con = document.getElementById("txtbody");
		con.className = "";
		const mainSection = disguiseParagraphs(con);
		const prenexts = Array.from(document.querySelectorAll(".rdpg > a"));
		const navigationBar = {};
		for (const element of prenexts) if (element instanceof HTMLAnchorElement) {
			element.className = "";
			const textContent = element.textContent;
			if (textContent.includes("上一章")) {
				element.innerHTML = "上一章";
				navigationBar.prevAnchor = element;
			} else if (textContent.includes("目") && textContent.includes("录")) {
				element.innerHTML = "目录";
				navigationBar.infoAnchor = element;
			} else if (textContent.includes("下一章")) {
				element.innerHTML = "下一章";
				navigationBar.nextAnchor = element;
			}
		}
		return {
			breadcrumbBar: document.querySelector(".crumb"),
			title: document.querySelector("h1.rd-ttl")?.textContent,
			mainSection,
			navigationBar
		};
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
				if (location.pathname == "/history.html") handleSettingPage$1();
				break;
			case 2:
				if (/[\d\w]+_\d+$/.test(lastSegment)) return;
				handleChapterPage$5();
		}
	}
	function handleChapterPage$5() {
		VM_log("handleChapterPage");
		const con = document.getElementById("article");
		let multiPage = false;
		if (isInIframe) return;
		const a = document.getElementById("next_url");
		if (a) {
			VM_log(a.textContent);
			if (a.textContent.includes("下一页")) {
				multiPage = true;
				(async () => {
					let counter = 0;
					let next = await fetchChaperFragmentPage(a.href, parseFragmentPage$4);
					con.append(...next.paragraphs);
					while (next.next && counter < 20) {
						counter++;
						next = await fetchChaperFragmentPage(next.next, parseFragmentPage$4);
						VM_log(`result: ${a.href} ${next.paragraphs.length}`);
						con.append(...next.paragraphs);
					}
					if (next.nextChapter) {
						a.textContent = "下一章";
						a.href = next.nextChapter;
					}
					rebuildChapterBody(getChapterPage$4());
				})();
			} else if (a.textContent.includes("下一章")) {
				(() => {
					rebuildChapterBody(getChapterPage$4());
				})();
				multiPage = true;
			}
		}
		if (!multiPage) rebuildChapterBody(getChapterPage$4());
		document.head.querySelectorAll("link[href][rel=\"stylesheet\"]").forEach((ln) => ln.remove());
	}
	function parseFragmentPage$4(doc) {
		const nestedCon = doc.getElementById("article");
		VM_log("content", nestedCon.outerHTML);
		const paragraphs = paragraphsFromElement(nestedCon);
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
			nextChapter: nextChapter?.href,
			paragraphs
		};
	}
	function getChapterPage$4() {
		let con = document.getElementById("article");
		con.className = "";
		if (con.tagName == "ARTICLE") {
			const d = document.createElement("div");
			d.innerHTML = con.innerHTML;
			con.replaceWith(d);
			con = d;
		}
		const mainSection = disguiseParagraphs(con);
		const prenexts = [
			document.getElementById("prev_url"),
			document.getElementById("info_url"),
			document.getElementById("next_url")
		];
		const navigationBar = {};
		for (const element of prenexts) if (element instanceof HTMLAnchorElement) {
			element.className = "";
			if (element.textContent.includes("上一章")) {
				element.innerHTML = "上一章";
				navigationBar.prevAnchor = element;
			} else if (element.textContent.includes("目录")) {
				element.innerHTML = "目录";
				navigationBar.infoAnchor = element;
			} else if (element.textContent.includes("下一章")) {
				element.innerHTML = "下一章";
				navigationBar.nextAnchor = element;
			}
		}
		return {
			breadcrumbBar: document.querySelector(".info-title"),
			title: document.title.split("-").shift(),
			mainSection,
			navigationBar
		};
	}
	function handleChapterPage$4() {
		const showReading = document.getElementById("showReading");
		const bookTitle = document.querySelector("#readcontent .book_title h1");
		const nextPageBox = document.querySelector(".nextPageBox");
		const navigationBar = {
			prevAnchor: nextPageBox.querySelector(".prev"),
			infoAnchor: nextPageBox.querySelector(".dir"),
			nextAnchor: nextPageBox.querySelector(".next")
		};
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
				handleSettingPage();
				break;
			case 3:
				if (location.pathname.startsWith("/book/chapter/")) {
					_GM_registerMenuCommand("脚本设置", function() {
						_GM_openInTab(location.pathname.replace("/book/chapter/", "/book/"));
					});
					return;
				}
				_GM_registerMenuCommand("脚本设置", function() {
					_GM_openInTab(location.pathname.replace(/\/[\d\w-]+\.html/, ".html"));
				});
				handleChapterPage$4();
		}
	}
	function handleKudushuRoute() {
		VM_log("handleKudushuRoute");
		if (/\/book\/[^/]+/.test(location.pathname) || /\/html\/[^/]+\/[^/]+\/index\.html/.test(location.pathname)) handleBookPage$3();
		else if (/\/html\/[^/]+\/[^/]+/.test(location.pathname) || /\/html\/[^/]+\/[^/]+\/[^/]+\.html/.test(location.pathname)) handleChapterPage$3();
	}
	function handleBookPage$3() {
		VM_log("handleBookPage");
	}
	function handleChapterPage$3() {
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
					let next = await fetchChaperFragmentPage(element.href, parseFragmentPage$3);
					con.append(...next.paragraphs);
					while (next.next && counter < 20) {
						counter++;
						next = await fetchChaperFragmentPage(next.next, parseFragmentPage$3);
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
					rebuildChapterBody(getChapterPage$3());
				})();
				break;
			} else if (element.textContent == "下—章") {
				(() => {
					rebuildChapterBody(getChapterPage$3());
				})();
				break;
			}
		}
	}
	function parseFragmentPage$3(doc) {
		const container = doc.getElementById("novelcontent");
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
		return {
			next: next?.href,
			nextChapter: nextChapter?.href,
			paragraphs
		};
	}
	function getChapterPage$3() {
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
		return {
			mainSection,
			title,
			navigationBar
		};
	}
	function handleBuoloumaoRoute() {
		VM_log("handleBuoloumaoRoute");
		if (/\/book\/[^/]+/.test(location.pathname)) {
			if (/-\d+\.html/.test(location.pathname)) handleChapterPage$2();
			else handleBookPage$2();
		} else if (/\/read\/[^/]+\/[^/]+/.test(location.pathname)) handleChapterPage$2();
	}
	function isBoluomaoLike() {
		const hostname = location.hostname;
		return hostname.endsWith("boluomao1.com") || hostname.endsWith("yxshufang.com");
	}
	function handleBookPage$2() {
		VM_log("handleBookPage");
	}
	function handleChapterPage$2() {
		VM_log("handleChapterPage");
		const con = document.querySelector(".content");
		const anchors = Array.from(document.querySelectorAll(".readPage a"));
		let multiPage = false;
		if (isInIframe) return;
		for (const a of anchors) {
			VM_log(a.textContent);
			if (a.textContent.includes("下一页")) {
				multiPage = true;
				(async () => {
					let counter = 0;
					let next = await fetchChaperFragmentPage(a.href, parseFragmentPage$2);
					con.append(...next.paragraphs);
					while (next.next && counter < 20) {
						counter++;
						next = await fetchChaperFragmentPage(next.next, parseFragmentPage$2);
						VM_log(`result: ${a.href} ${next.paragraphs.length}`);
						con.append(...next.paragraphs);
					}
					if (next.nextChapter) {
						a.textContent = "下一章";
						a.href = next.nextChapter;
					}
					rebuildChapterBody(getChapterPage$2());
				})();
			} else if (a.textContent.includes("下一章")) {
				(() => {
					rebuildChapterBody(getChapterPage$2());
				})();
				multiPage = true;
			}
		}
		if (!multiPage) rebuildChapterBody(getChapterPage$2());
		document.head.querySelectorAll("link[href][rel=\"stylesheet\"]").forEach((ln) => ln.remove());
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
	function parseFragmentPage$2(doc) {
		const nestedCon = doc.querySelector(".content");
		VM_log("content", nestedCon.outerHTML);
		nestedCon.querySelectorAll("p").forEach((p) => {
			if (p.dataset.obf) {
				if (!p.textContent.trim()) p.append(decode(p.dataset.obf));
			}
		});
		const paragraphs = paragraphsFromElement(nestedCon);
		const prenexts = Array.from(doc.querySelectorAll(".readPage a"));
		let next;
		let nextChapter;
		for (const element of prenexts) if (element instanceof HTMLAnchorElement) {
			if (element.textContent.includes("下一页")) {
				next = element;
				break;
			} else if (element.textContent.includes("下一章")) {
				nextChapter = element;
				break;
			}
		}
		return {
			next: next?.href,
			nextChapter: nextChapter?.href,
			paragraphs
		};
	}
	function getChapterPage$2() {
		const con = document.querySelector(".content");
		con.className = "";
		const mainSection = disguiseParagraphs(con);
		const prenexts = Array.from(document.querySelectorAll(".readPage a"));
		const navigationBar = {};
		for (const element of prenexts) if (element instanceof HTMLAnchorElement) {
			element.className = "";
			if (element.textContent.includes("上一章")) {
				element.innerHTML = "上一章";
				navigationBar.prevAnchor = element;
			} else if (element.textContent.includes("目录")) {
				element.innerHTML = "目录";
				navigationBar.infoAnchor = element;
			} else if (element.textContent.includes("下一章")) {
				element.innerHTML = "下一章";
				navigationBar.nextAnchor = element;
			}
		}
		return {
			breadcrumbBar: document.querySelector(".position"),
			title: document.querySelector("h1.title")?.textContent,
			mainSection,
			navigationBar
		};
	}
	function decode(s) {
		var raw = atob(s);
		var bytes = new Uint8Array(raw.length);
		for (var i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i) ^ i % 127 + 1;
		return new TextDecoder("utf-8").decode(bytes);
	}
	function handleDamiRoute() {
		VM_log("handleDamiRoute");
		if (/^\/book\/[^/]+\.html$/.test(location.pathname)) handleBookPage$1();
		else if (/^\/book\/[^/]+\/[^/]+\.html$/.test(location.pathname)) handleChapterPage$1();
	}
	function handleBookPage$1() {
		VM_log("handleBookPage");
	}
	function handleChapterPage$1() {
		VM_log("handleChapterPage");
		const con = document.getElementById("htmlContent");
		let multiPage = false;
		const linkNext = document.getElementById("linkNext");
		if (linkNext) {
			if (linkNext instanceof HTMLAnchorElement) {
				if (linkNext.textContent.includes("最后一章了")) rebuildChapterBody(getChapterPage$1());
				else {
					(() => {
						rebuildChapterBody(getChapterPage$1());
					})();
					multiPage = true;
				}
			} else if (linkNext instanceof HTMLSpanElement) {
				const varName = varnameFromDocument(document);
				VM_log(`varName = ${varName}`);
				linkNext.classList.remove("btn", "btn-default");
				if (varName) {
					let nextHref = document.defaultView[varName];
					if (nextHref) {
						multiPage = true;
						(async () => {
							let counter = 0;
							let next = await fetchChaperFragmentPage(nextHref, parseFragmentPage$1);
							con.append(...next.paragraphs);
							while (next.next && counter < 20) {
								counter++;
								next = await fetchChaperFragmentPage(next.next, parseFragmentPage$1);
								VM_log(`result: ${next.next} ${next.paragraphs.length}`);
								con.append(...next.paragraphs);
							}
							if (next.nextChapter) {
								const nextLink = document.createElement("a");
								nextLink.id = "linkNext";
								nextLink.href = next.nextChapter;
								nextLink.innerHTML = "下一章";
								linkNext.replaceWith(nextLink);
							}
							rebuildChapterBody(getChapterPage$1());
						})();
					}
				}
			}
		}
		if (!multiPage) rebuildChapterBody(getChapterPage$1());
		document.head.querySelectorAll("link[href][rel=\"stylesheet\"]").forEach((ln) => ln.remove());
	}
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
	function parseFragmentPage$1(doc) {
		const paragraphs = paragraphsFromElement(doc.getElementById("htmlContent"));
		const linkNext = doc.getElementById("linkNext");
		const page = { paragraphs };
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
	function getChapterPage$1() {
		const con = document.getElementById("htmlContent");
		con.className = "";
		con.querySelectorAll("p").forEach((p) => {
			const s = p.textContent.trim();
			if (s) {
				if (s.includes("退#出#阅#读#模#式") || s.includes("你推荐他的其他作品") || s.includes("米小说移动版") || s.includes("最新章节") || s.includes("完整章节") || p.classList.contains("pmore")) p.remove();
			} else p.remove();
		});
		const mainSection = disguiseParagraphs(con);
		const prenexts = Array.from(document.querySelectorAll(".readPager a"));
		const navigationBar = {};
		for (const element of prenexts) if (element instanceof HTMLAnchorElement) {
			element.className = "";
			switch (element.id) {
				case "linkPrev":
					element.innerHTML = "上一章";
					navigationBar.prevAnchor = element;
					break;
				case "linkIndex":
					element.innerHTML = "目录";
					navigationBar.infoAnchor = element;
					break;
				case "linkNext":
					element.innerHTML = "下一章";
					navigationBar.nextAnchor = element;
			}
		}
		return {
			breadcrumbBar: document.querySelector(".breadcrumb"),
			title: document.querySelector("h1.readTitle")?.textContent,
			mainSection,
			navigationBar
		};
	}
	function handle81kswRoute() {
		VM_log("handle81kswRoute");
		if (/\/index\/[^/]+/.test(location.pathname)) handleBookPage();
		else if (/\/read\/[^/]+\/[^/]+/.test(location.pathname)) handleChapterPage();
	}
	function is81kswLike() {
		return location.hostname.endsWith("81ksw.com");
	}
	function handleBookPage() {
		VM_log("handleBookPage");
	}
	function handleChapterPage() {
		VM_log("handleChapterPage");
		const con = document.getElementById("content");
		const anchors = [
			document.getElementById("prev_url"),
			document.getElementById("info_url"),
			document.getElementById("next_url")
		].filter((it) => it && it instanceof HTMLAnchorElement);
		let multiPage = false;
		if (isInIframe) return;
		for (const a of anchors) {
			VM_log(a.textContent);
			if (a.textContent.includes("下一页")) {
				multiPage = true;
				(async () => {
					let counter = 0;
					let next = await fetchChaperFragmentPage(a.href, parseFragmentPage);
					con.append(...next.paragraphs);
					while (next.next && counter < 20) {
						counter++;
						next = await fetchChaperFragmentPage(next.next, parseFragmentPage);
						VM_log(`result: ${a.href} ${next.paragraphs.length}`);
						con.append(...next.paragraphs);
					}
					if (next.nextChapter) {
						a.textContent = "下一章";
						a.href = next.nextChapter;
					}
					rebuildChapterBody(getChapterPage());
				})();
			} else if (a.textContent.includes("下一章")) {
				(() => {
					rebuildChapterBody(getChapterPage());
				})();
				multiPage = true;
			}
		}
		if (!multiPage) rebuildChapterBody(getChapterPage());
		document.head.querySelectorAll("link[href][rel=\"stylesheet\"]").forEach((ln) => ln.remove());
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
	function parseFragmentPage(doc) {
		const nestedCon = doc.getElementById("content");
		VM_log("content", nestedCon.outerHTML);
		const paragraphs = paragraphsFromElement(nestedCon);
		const prenexts = [doc.getElementById("next_url")].filter((it) => it && it instanceof HTMLAnchorElement);
		let next;
		let nextChapter;
		for (const element of prenexts) if (element instanceof HTMLAnchorElement) {
			if (element.textContent.includes("下一页")) {
				next = element;
				break;
			} else if (element.textContent.includes("下一章")) {
				nextChapter = element;
				break;
			}
		}
		return {
			next: next?.href,
			nextChapter: nextChapter?.href,
			paragraphs
		};
	}
	function getChapterPage() {
		const con = document.querySelector(".content");
		con.className = "";
		const mainSection = disguiseParagraphs(con);
		const prenexts = [
			document.getElementById("prev_url"),
			document.getElementById("info_url"),
			document.getElementById("next_url")
		].filter((it) => it && it instanceof HTMLAnchorElement);
		const navigationBar = {};
		for (const element of prenexts) if (element instanceof HTMLAnchorElement) {
			element.className = "";
			if (element.textContent.includes("上一章")) {
				element.innerHTML = "上一章";
				navigationBar.prevAnchor = element;
			} else if (element.textContent.includes("目录")) {
				element.innerHTML = "目录";
				navigationBar.infoAnchor = element;
			} else if (element.textContent.includes("下一章")) {
				element.innerHTML = "下一章";
				navigationBar.nextAnchor = element;
			}
		}
		const breadcrumbBar = document.querySelector("div.layout-tit");
		breadcrumbBar.querySelector(".reader-fun")?.remove();
		return {
			breadcrumbBar,
			title: document.querySelector("h1.title")?.textContent,
			mainSection,
			navigationBar
		};
	}
	VM_log("init");
	function handleRoute() {
		if (location.host.endsWith("deqixs.com") || location.host.endsWith("deqixs.org") || isSudugu()) {
			handleDeqiRoute();
			_GM_registerMenuCommand("脚本设置", function() {
				if (location.host.endsWith("deqixs.com")) _GM_openInTab(`${location.protocol}//${location.host}/pifu/#script-setting`);
				else _GM_openInTab(`${location.protocol}//${location.host}/i/pifu.aspx#script-setting`);
			});
		} else if (location.hostname == "www.ddxiaoshuo.cc") {
			handleDDxiaoshuoRoute();
			_GM_registerMenuCommand("脚本设置", function() {
				_GM_openInTab(`${location.protocol}//${location.host}/history.html#script-setting`);
			});
		} else if (location.hostname == "www.cuoceng.com" || location.hostname == "cuoceng.com") handleCuoCengRoute();
		else if (location.hostname.endsWith("kudushu.org")) handleKudushuRoute();
		else if (location.hostname.endsWith("dmxs2.com")) handleDamiRoute();
		else if (isBoluomaoLike()) handleBuoloumaoRoute();
		else if (is81kswLike()) handle81kswRoute();
		else if (location.hostname.endsWith("beqg.cc") || location.hostname.endsWith("biqu33.cc")) {
			handleBiqu33Route();
			_GM_registerMenuCommand("脚本设置", function() {
				_GM_openInTab(`${location.protocol}//${location.host}/#script-setting`);
			});
		}
		_GM_registerMenuCommand("脚本设置", showConfigDialog);
	}
	setDefaultStyle();
	handleRoute();
	releaseCopy();
})();
