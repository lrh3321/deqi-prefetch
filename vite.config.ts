import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		monkey({
			entry: 'src/main.ts',
			userscript: {
				name: 'Deqi Prefech',
				namespace: 'https://greasyfork.org/zh-CN/users/14997-lrh3321',
				homepageURL: 'https://greasyfork.org/zh-CN/scripts/537588-deqi-prefech',
				updateURL: 'https://update.greasyfork.org/scripts/537588/Deqi%20Prefech.user.js',
				downloadURL: 'https://update.greasyfork.org/scripts/537588/Deqi%20Prefech.user.js',
				version: '2025-08-06',
				description: '得奇小说网，看单个章节免翻页，把小说伪装成代码',
				author: 'LRH3321',
				license: 'MIT',
				tag: ['novels'],
				icon: 'https://www.google.com/s2/favicons?sz=64&domain=deqixs.com',
				require: [
					'https://cdn.jsdelivr.net/npm/prismjs@1.30.0/prism.min.js',
					'https://cdn.jsdelivr.net/npm/prismjs@1.30.0/plugins/match-braces/prism-match-braces.min.js',
					'https://cdn.jsdelivr.net/npm/prismjs@1.30.0/plugins/line-numbers/prism-line-numbers.min.js'
				],
				match: [
					'https://www.deqixs.com/pifu/',
					'https://www.deqixs.com/xiaoshuo/*/*.html',
					'https://www.deqixs.com/xiaoshuo/*/'
				],
				grant: [
					'GM_addElement',
					'GM_addStyle',
					'GM_getResourceURL',
					'GM_getValue',
					'GM_registerMenuCommand',
					'GM_setValue',
					'unsafeWindow'
				],
				'run-at': 'document-end'
			}
		})
	]
});
