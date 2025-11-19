import { defineConfig } from 'vite-plus';
import { loadEnv } from 'vite-plus';
import monkey from 'vite-plugin-monkey';
import type { MonkeyOption } from 'vite-plugin-monkey';

const monkeyOption: MonkeyOption = {
	entry: 'src/main.ts',
	userscript: {
		name: 'Deqi Prefech',
		namespace: 'https://greasyfork.org/zh-CN/users/14997-lrh3321',
		homepageURL: 'https://greasyfork.org/zh-CN/scripts/537588-deqi-prefech',
		updateURL: 'https://update.greasyfork.org/scripts/537588/Deqi%20Prefech.user.js',
		downloadURL: 'https://update.greasyfork.org/scripts/537588/Deqi%20Prefech.user.js',
		source: 'https://github.com/lrh3321/deqi-prefetch',
		supportURL: 'https://github.com/lrh3321/deqi-prefetch/issues',
		version: '2026-10-040',
		description:
			'得奇小说网, biqu33.cc, ddxiaoshuo.cc, cuoceng.com 看单个章节免翻页，把小说伪装成代码',
		author: 'LRH3321',
		license: 'MIT',
		tag: ['novels'],
		icon: 'https://www.suduguu.com/favicon.ico',
		require: [
			'https://cdn.jsdelivr.net/npm/prismjs@1.30.0/prism.min.js',
			'https://cdn.jsdelivr.net/npm/prismjs@1.30.0/plugins/match-braces/prism-match-braces.min.js',
			'https://cdn.jsdelivr.net/npm/prismjs@1.30.0/plugins/line-numbers/prism-line-numbers.min.js'
		],
		match: [
			'*://*.deqixs.org/*',
			'*://*.shudugu.org/*',
			'*://*.sudugu.cc/*',
			'*://*.suduguu.com/*',
			'*://*.sudugu.org/*',
			'*://*.sudugu.org/i/pifu.aspx',
			'*://*.deqixs.com/pifu/',
			'*://*.deqixs.com/xiaoshuo/*/*.html',
			'*://*.deqixs.com/xiaoshuo/*/',
			'*://*.kudushu.org/*',
			'*://*.boluomao1.com/book/*',
			'*://*.boluomao1.com/read/*',
			'*://*.yxshufang.com/book/*',
			'*://*.biqu33.cc/*',
			'*://*.beqg.cc/*',
			'*://*.ddxiaoshuo.cc/*',
			'*://*.cuoceng.com/*',
			'*://*.dmxs2.com/book/*',
			'*://*.81ksw.com/index/*',
			'*://*.81ksw.com/read/*'
		],
		connect: ['self'],
		grant: [
			'GM_addElement',
			'GM_addStyle',
			'GM_getResourceURL',
			'GM_getValue',
			'GM_openInTab',
			'GM_registerMenuCommand',
			'GM_setValue',
			'GM_xmlhttpRequest'
		],
		'run-at': 'document-end'
	}
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	if (command === 'build' && env.LITE === 'ON') {
		monkeyOption.build = {
			fileName: 'deqi-prefetch-lite.user.js'
		};
		if (monkeyOption.userscript) {
			monkeyOption.userscript.name = 'Deqi Prefech Lite';
			monkeyOption.userscript.require = undefined;
		}
	}
	return {
		define: {
			__LITE__: env.LITE === 'ON'
		},
		lint: { options: { typeAware: true, typeCheck: true }, ignorePatterns: ['dist/**'] },
		fmt: {
			useTabs: true,
			singleQuote: true,
			trailingComma: 'none',
			printWidth: 100,
			sortPackageJson: false,
			ignorePatterns: ['*.user.js']
		},
		build: {
			emptyOutDir: false
		},
		plugins: [monkey(monkeyOption)]
	};
});
