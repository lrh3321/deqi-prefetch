import { VM_log } from './utils';

export function handleBuoloumaoRoute() {
	VM_log('handleBuoloumaoRoute');

	if (/\/book\/[^/]+/.test(location.pathname)) {
		handleBookPage();
	} else if (/\/read\/[^/]+\/[^/]+/.test(location.pathname)) {
		handleChapterPage();
	}
}

function handleBookPage() {
	VM_log('handleBookPage');
}

function handleChapterPage() {
	VM_log('handleChapterPage');

	const anchors = Array.from<HTMLAnchorElement>(document.querySelectorAll('.readPage a'));
	anchors.forEach((a) => {
		if (a.textContent.includes('下一页')) {
		} else if (a.textContent.includes('下一章')) {
		}
	});

	const content = document.querySelectorAll('.content');
}

// <div class="readPage font16">
// <a class="btnGreen" href="/read/77976/2935214.html">&lt; 上一章</a>

// <span class="btnPageInfo">1/2页</span>
// <a class="btnBlue" href="/book/77976.html">
// <svg class="icon-svg icon-list-ul" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"></path></svg> 目录
// </a>

// <a class="btnGreen" href="/read/77976/2937862.html?p=2">下一页 &gt;</a>
// </div>
