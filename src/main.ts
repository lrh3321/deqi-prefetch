import './style.css';
import './config-dialog.css';

import { GM_registerMenuCommand, GM_openInTab } from '$';
import { setDefaultStyle, showConfigDialog } from './config';
import { releaseCopy, VM_log } from './utils';
import { handleDeqiRoute, isSudugu } from './deqixs';
import { handleBiqu33Route } from './biqu33';
import { handleDDxiaoshuoRoute } from './ddxiaoshuo';
import { handleCuoCengRoute } from './cuoceng';
import { handleKudushuRoute } from './kudushu';
import { handleBuoloumaoRoute, isBoluomaoLike } from './boluomao';
import { handleDamiRoute } from './dmxs';
import { handle81kswRoute, is81kswLike } from './81ksw';

if (!__LITE__) {
	(document.defaultView as any).Prism = (globalThis as any).Prism;
}

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
	if (location.host.endsWith('deqixs.com') || location.host.endsWith('deqixs.org') || isSudugu()) {
		// 得奇小说处理逻辑
		handleDeqiRoute();

		GM_registerMenuCommand('脚本设置', function () {
			if (location.host.endsWith('deqixs.com')) {
				GM_openInTab(`${location.protocol}//${location.host}/pifu/#script-setting`);
			} else {
				GM_openInTab(`${location.protocol}//${location.host}/i/pifu.aspx#script-setting`);
			}
		});
	} else if (location.hostname == 'www.ddxiaoshuo.cc') {
		// 顶点小说处理逻辑
		handleDDxiaoshuoRoute();
		GM_registerMenuCommand('脚本设置', function () {
			GM_openInTab(`${location.protocol}//${location.host}/history.html#script-setting`);
		});
	} else if (location.hostname == 'www.cuoceng.com' || location.hostname == 'cuoceng.com') {
		// 错层小说处理逻辑
		handleCuoCengRoute();
	} else if (location.hostname.endsWith('kudushu.org')) {
		// 苦读书处理逻辑
		handleKudushuRoute();
	} else if (location.hostname.endsWith('dmxs2.com')) {
		// 大米小说处理逻辑
		handleDamiRoute();
	} else if (isBoluomaoLike()) {
		// 菠萝猫处理逻辑
		handleBuoloumaoRoute();
	} else if (is81kswLike()) {
		// 八一中文网处理逻辑
		handle81kswRoute();
	} else if (location.hostname.endsWith('beqg.cc') || location.hostname.endsWith('biqu33.cc')) {
		// biqu33处理逻辑
		handleBiqu33Route();
		GM_registerMenuCommand('脚本设置', function () {
			GM_openInTab(`${location.protocol}//${location.host}/#script-setting`);
		});
	}

	GM_registerMenuCommand('脚本设置', showConfigDialog);
}

setDefaultStyle();
handleRoute();
releaseCopy();
