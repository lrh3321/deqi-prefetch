import { fetchChaperFragmentPage, rebuildChapterBody, VM_log } from '../common';

/**
 * 页面类型
 */
export enum PageType {
	Unknown,
	Home,
	Setting,
	/**
	 * 书本详情/章节列表页
	 */
	Book,
	/**
	 * 专门的索引页
	 */
	Index,
	/**
	 * 章节页
	 */
	Chapter,
	/**
	 * 章节页（非章节首页）
	 */
	ChapterNext
}

export abstract class AbstractRebuilder {
	constructor() {}

	/**
	 * 是否能处理当前页面
	 */
	public abstract canHandle(): boolean;

	/**
	 * 页面类型
	 */
	public abstract getPageType(): PageType;

	abstract getChapterPage(): Page;

	protected getNavLinks(): NavLinks {
		return {};
	}

	protected async handleChapterPage() {
		const page = this.getChapterPage();
		rebuildChapterBody(page);
	}

	protected async handleBookPage() {}
	protected async handleSettingPage() {}
	protected async afterRebuilt() {}

	/**
	 * rebuild 重构页面
	 */
	public async rebuild() {
		const pt = this.getPageType();
		VM_log('PageType:', pt);
		if (pt == PageType.Chapter) {
			await this.handleChapterPage();
			await this.afterRebuilt();
		} else if (pt == PageType.Book) {
			await this.handleBookPage();
		} else if (pt == PageType.Setting) {
			await this.handleSettingPage();
		}
	}
}

/**
 * 处理章节可能被分页的站点
 */
export abstract class AbstractPartedRebuilder extends AbstractRebuilder {
	protected override async handleChapterPage() {
		let nextURL = this.parseFragmentPageURL(document);
		let counter = 0;
		while (nextURL.next && counter < 20) {
			let nextPage = await fetchChaperFragmentPage(nextURL.next, async (doc) => {
				const p = await this.parseFragmentPage(doc);
				VM_log('FragmentPage:', p);
				this.handleNextPage(doc, p);
				return p;
			});
			nextURL = nextPage;
		}
		if (nextURL.nextChapter) {
			this.rewriteNextChapterLink(nextURL.nextChapter);
		}
		const page = this.getChapterPage();
		rebuildChapterBody(page);
	}

	protected abstract parseFragmentPageURL(doc: Document): PageURL;
	protected abstract parseFragmentPage(doc: Document): Promise<FragmentPage>;

	/**
	 * handleNextPage 处理下一页信息
	 * @param doc
	 * @param page
	 */
	abstract handleNextPage(doc: Document, page: FragmentPage): void;
	/**
	 * 更新下一章的链接
	 * @param href 下一章的 URL
	 */
	protected rewriteNextChapterLink(_href: string) {}
}

export function nextAnchor(doc: Document, selector: string): HTMLAnchorElement | undefined {
	const anchors = doc.querySelectorAll(selector);
	for (const el of anchors) {
		if (el instanceof HTMLAnchorElement) {
			if (el.textContent.includes('下一')) {
				return el;
			}
		}
	}
	return;
}

export function pageURLFromSelector(doc: Document, selector: string): PageURL {
	const el = nextAnchor(doc, selector);
	if (el) {
		if (el.textContent.includes('下一页')) {
			return { next: el.href };
		} else {
			return { nextChapter: el.href };
		}
	}
	return {};
}

export function navLinksFromSelector(selector: string): NavLinks {
	const anchors = document.querySelectorAll(selector);
	const nav: NavLinks = {};
	for (const el of anchors) {
		if (el instanceof HTMLAnchorElement) {
			if (el.textContent.includes('上一')) {
				nav.prevAnchor = el;
			} else if (el.textContent.includes('目录')) {
				nav.infoAnchor = el;
			} else if (el.textContent.includes('下一')) {
				nav.nextAnchor = el;
			}
		}
	}
	return nav;
}
