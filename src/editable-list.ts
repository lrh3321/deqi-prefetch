import { createPreformattedCode, highlightElement } from './code';

export class EditableList extends HTMLElement {
	private itemList: HTMLUListElement | null = null;
	private textInput: HTMLTextAreaElement | null = null;
	private codeSnippetsStore: Map<string, string>;
	private counter: number;
	constructor() {
		super();

		// binding methods
		this.addListItem = this.addListItem.bind(this);
		this.handleRemoveItemListeners = this.handleRemoveItemListeners.bind(this);
		this.removeListItem = this.removeListItem.bind(this);
		this.counter = 0;
		this.codeSnippetsStore = new Map();
	}

	public lazyInit() {
		this.innerHTML = `<h3>伪装代码段</h3>
<div>
    <label>输入代码片段：</label>
    <textarea rows="20" class="add-new-list-item-input"></textarea>
    <button class="editable-list-add-item icon">&oplus;</button>
</div>
<ul class="item-list"></ul>`;

		this.itemList = this.querySelector('ul.item-list')!!;
		this.textInput = this.querySelector('.add-new-list-item-input')!!;
	}
	// fires after the element has been attached to the DOM
	connectedCallback() {
		this.lazyInit();

		const addElementButton = this.querySelector('.editable-list-add-item');
		addElementButton?.addEventListener('click', this.addListItem, false);
	}

	// add items to the list
	addListItem() {
		const textInput = this.textInput;
		let snippet = textInput?.value;
		if (snippet) {
			this.counter++;
			const idx = this.counter.toString();
			this.codeSnippetsStore.set(idx, snippet);
			snippet = this.trimSnippet(snippet);
			this.addCodeSnippet(idx, snippet);
			textInput!!.value = '';

			this.dispatchEvent(new CustomEvent('add-item'));
		}
	}

	private trimSnippet(s: string): string {
		const lines = s.split(/[\r\n]+/).filter((l) => l.trim());
		return lines.join('\n');
	}

	public updateCodeSnippets(snippets: string[]) {
		this.codeSnippetsStore.clear();
		snippets.forEach((snippet) => {
			this.counter++;
			snippet = this.trimSnippet(snippet);
			this.codeSnippetsStore.set(this.counter.toString(), snippet);
		});
		this.render();
	}

	public get codeSnippets(): string[] {
		return Array.from(this.codeSnippetsStore.values());
	}

	public render() {
		if (!this.itemList) {
			this.lazyInit();
		}
		this.itemList!!.innerHTML = ``;
		this.codeSnippetsStore.forEach((snippet, idx) => {
			this.addCodeSnippet(idx, snippet);
		});
	}

	private addCodeSnippet(idx: string, snippet: string) {
		const li = document.createElement('li');
		li.dataset.snippetId = idx;
		const button = document.createElement('button');
		const pre = createPreformattedCode(snippet);

		button.classList.add('editable-list-remove-item', 'icon');
		button.innerHTML = '&ominus;';
		li.appendChild(pre);
		li.appendChild(button);

		this.itemList?.appendChild(li);
		this.handleRemoveItemListeners([button]);
		highlightElement(pre, false);
	}

	handleRemoveItemListeners(arrayOfElements: Element[]) {
		arrayOfElements.forEach((element) => {
			element.addEventListener('click', this.removeListItem, false);
		});
	}

	removeListItem(e: Event) {
		const parent = (e.target as Node)?.parentNode as HTMLElement;
		if (parent) {
			parent.remove();
			this.codeSnippetsStore.delete(parent.dataset.snippetId || '');
			this.dispatchEvent(new CustomEvent('remove-item'));
		}
	}
}

export function setupEditableList() {
	customElements.define('editable-list', EditableList);
}
