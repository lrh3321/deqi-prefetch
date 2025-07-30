/// <reference types="vite/client" />
/// <reference types="vite-plugin-monkey/client" />
//// <reference types="vite-plugin-monkey/global" />
type DisguiseMode = 'none' | 'code';

declare class Prism {
	static highlightAll(async?: boolean, callback?: (element: Element) => void): void;
	static highlightElement(
		element: Element,
		async?: boolean,
		callback?: (element: Element) => void
	): void;

	static languages: {
		[name: string]: any | undefined;
	};
}
