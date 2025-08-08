/**
 * 获取代码主题的CSS文件URL
 *
 * 根据主题名称判断是官方主题还是第三方主题，并返回对应的CDN链接。
 * 官方主题使用PrismJS官方CDN，第三方主题使用cdnjs提供的链接。
 *
 * @param theme - 主题名称
 * @returns 对应主题CSS文件的完整URL地址
 */
export function getCodeThemeURL(theme: string): string {
	const officialThemes = new Set([
		'prism',
		'prism-dark',
		'prism-funky',
		'prism-okaidia',
		'prism-twilight',
		'prism-coy',
		'prism-solarizedlight',
		'prism-tomorrow'
	]);
	// 判断是否为官方主题
	if (officialThemes.has(theme)) {
		return `https://dev.prismjs.com/themes/${theme}.min.css`;
	}
	// 第三方主题使用cdnjs链接
	return `https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/${theme}.min.css`;
}

/**
 * 释放文档的复制相关事件绑定
 *
 * 该函数会解除jQuery绑定在document上的contextmenu、copy和cut事件，
 * 恢复浏览器默认的右键菜单、复制和剪切功能。
 *
 * 主要用于解除页面对复制粘贴和右键菜单的限制。
 */
export function releaseCopy() {
	const $ = (globalThis as any).$;
	if ($) {
		const doc = $(document);
		doc.off('contextmenu');
		doc.off('copy');
		doc.off('cut');
	}

	document.onclick = null;
	document.oncontextmenu = null;
	document.oncopy = null;
	document.oncut = null;
}

export const isInIframe = window.self !== window.top;
