import './style/style.css';
import './style/config-dialog.css';

import { GM_registerMenuCommand, GM_openInTab } from '$';
import { releaseCopy, VM_log, setDefaultStyle, showConfigDialog } from './common';
import { rebuilders, handleBiqu33Route } from './rebuilder';

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
	if (location.hostname.endsWith('beqg.cc') || location.hostname.endsWith('biqu33.cc')) {
		// biqu33处理逻辑
		handleBiqu33Route();
		GM_registerMenuCommand('脚本设置', function () {
			GM_openInTab(`${location.protocol}//${location.host}/#script-setting`);
		});
	}

	GM_registerMenuCommand('脚本设置', showConfigDialog);

	for (const rb of rebuilders) {
		if (rb.canHandle()) {
			void rb.rebuild();
			break;
		}
	}
}

setDefaultStyle();
handleRoute();
releaseCopy();
