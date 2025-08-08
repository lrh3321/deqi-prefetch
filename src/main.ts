import './style.css';
import { GM_registerMenuCommand } from '$';
import { setDefaultStyle } from './config';
import { releaseCopy } from './utils';
import { handleDeqiRoute } from './deqixs';
import { handleBiqu33Route } from './biqu33';

(document.defaultView as any).Prism = (globalThis as any).Prism;

/**
 * 根据当前页面路径处理不同类型的页面
 *
 * 该函数会根据 location.pathname 的值来判断当前所处的页面类型，并执行相应的处理逻辑：
 * 1. 当路径为 '/pifu/' 时，处理设置页面
 * 2. 当路径以 '.html' 结尾时，处理章节页面
 * 3. 其他情况则处理书籍主页
 */
function handleRoute() {
	if (location.host.endsWith('deqixs.com')) {
		// 得奇小说处理逻辑
		handleDeqiRoute();

		GM_registerMenuCommand('脚本设置', function () {
			open('/pifu/');
		});
	} else if (location.hostname == 'www.biqu33.cc' || location.pathname.startsWith('/book/')) {
		// biqu33处理逻辑
		handleBiqu33Route();
		GM_registerMenuCommand('脚本设置', function () {
			open('/');
		});
	}
}

setDefaultStyle();
handleRoute();
releaseCopy();
