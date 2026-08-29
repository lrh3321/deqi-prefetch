import './style.css';

import { GM_registerMenuCommand } from '$';
import { setDefaultStyle } from './config';
import { releaseCopy, VM_log } from './utils';
import { handleDeqiRoute } from './deqixs';
import { handleBiqu33Route } from './biqu33';
import { handleDDxiaoshuoRoute } from './ddxiaoshuo';
import { handleCuoCengRoute } from './cuoceng';
import { handleKudushuRoute } from './kudushu';

(document.defaultView as any).Prism = (globalThis as any).Prism;

VM_log('init');

/**
 * 根据当前页面路径处理不同类型的页面
 *
 * 该函数会根据 location.pathname 的值来判断当前所处的页面类型，并执行相应的处理逻辑：
 * 1. 当路径为 '/pifu/' 时，处理设置页面
 * 2. 当路径以 '.html' 结尾时，处理章节页面
 * 3. 其他情况则处理书籍主页
 */
function handleRoute() {
	if (
		location.host.endsWith('deqixs.com') ||
		location.host.endsWith('sudugu.org') ||
		location.host.endsWith('shudugu.org') ||
		location.host.endsWith('deqixs.org')
	) {
		// 得奇小说处理逻辑
		handleDeqiRoute();

		GM_registerMenuCommand('脚本设置', function () {
			if (location.host.endsWith('deqixs.com')) {
				open('/pifu/#script-setting');
			} else {
				open('/i/pifu.aspx#script-setting');
			}
		});
	} else if (location.hostname == 'www.ddxiaoshuo.cc') {
		// 顶点小说处理逻辑
		handleDDxiaoshuoRoute();
		GM_registerMenuCommand('脚本设置', function () {
			open('/history.html#script-setting');
		});
	} else if (location.hostname == 'www.cuoceng.com' || location.hostname == 'cuoceng.com') {
		// 错层小说处理逻辑
		handleCuoCengRoute();
	} else if (location.hostname.endsWith('kudushu.org') ) {
		// 苦读书处理逻辑
		handleKudushuRoute();
	} else if (location.hostname == 'www.biqu33.cc' || location.pathname.startsWith('/book/')) {
		// biqu33处理逻辑
		handleBiqu33Route();
		GM_registerMenuCommand('脚本设置', function () {
			open('/#script-setting');
		});
	}
}

setDefaultStyle();
handleRoute();
releaseCopy();
