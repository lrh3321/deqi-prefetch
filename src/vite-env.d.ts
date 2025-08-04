/// <reference types="vite/client" />
/// <reference types="vite-plugin-monkey/client" />
//// <reference types="vite-plugin-monkey/global" />
/// <reference types="@types/prismjs/index" />
type DisguiseMode = 'none' | 'code';

declare namespace Prism {
	/**
	 * A function which will be invoked after an element was successfully highlighted.
	 *
	 * @param element The element successfully highlighted.
	 */
	type HighlightCallback = (element: Element) => void;

	/**
	 * This is the most high-level function in Prism’s API.
	 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
	 * each one of them.
	 *
	 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
	 *
	 * @param [async=false] Same as in {@link Prism.highlightAllUnder}.
	 * @param [callback] Same as in {@link Prism.highlightAllUnder}.
	 */
	function highlightAll(async?: boolean, callback?: HighlightCallback): void;

	/**
	 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
	 * {@link Prism.highlightElement} on each one of them.
	 *
	 * The following hooks will be run:
	 * 1. `before-highlightall`
	 * 2. All hooks of {@link Prism.highlightElement} for each element.
	 *
	 * @param container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
	 * @param [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
	 * @param [callback] An optional callback to be invoked on each element after its highlighting is done.
	 */
	function highlightAllUnder(
		container: ParentNode,
		async?: boolean,
		callback?: HighlightCallback
	): void;

	/**
	 * Highlights the code inside a single element.
	 *
	 * The following hooks will be run:
	 * 1. `before-sanity-check`
	 * 2. `before-highlight`
	 * 3. All hooks of {@link Prism.highlightElement}. These hooks will only be run by the current worker if `async` is `true`.
	 * 4. `before-insert`
	 * 5. `after-highlight`
	 * 6. `complete`
	 *
	 * @param element The element containing the code.
	 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
	 * @param [async=false] Whether the element is to be highlighted asynchronously using Web Workers
	 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
	 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
	 *
	 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
	 * asynchronous highlighting to work. You can build your own bundle on the
	 * [Download page](https://prismjs.com/download.html).
	 * @param [callback] An optional callback to be invoked after the highlighting is done.
	 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
	 */
	function highlightElement(element: Element, async?: boolean, callback?: HighlightCallback): void;

	/**
	 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
	 * and the language definitions to use, and returns a string with the HTML produced.
	 *
	 * The following hooks will be run:
	 * 1. `before-tokenize`
	 * 2. `after-tokenize`
	 * 3. `wrap`: On each {@link Prism.Token}.
	 *
	 * @param text A string with the code to be highlighted.
	 * @param grammar An object containing the tokens to use.
	 *
	 * Usually a language definition like `Prism.languages.markup`.
	 * @param language The name of the language definition passed to `grammar`.
	 * @returns The highlighted HTML.
	 *
	 * @example
	 * Prism.highlight('var foo = true;', Prism.languages.js, 'js');
	 */
	function highlight(text: string, grammar: Grammar, language: string): string;

	/**
	 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
	 * and the language definitions to use, and returns an array with the tokenized code.
	 *
	 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
	 *
	 * This method could be useful in other contexts as well, as a very crude parser.
	 *
	 * @param text A string with the code to be highlighted.
	 * @param grammar An object containing the tokens to use.
	 *
	 * Usually a language definition like `Prism.languages.markup`.
	 * @returns An array of strings, tokens and other arrays.
	 */
	function tokenize(text: string, grammar: Grammar): Array<string | Token>;

	interface Environment extends Record<string, any> {
		selector?: string | undefined;
		element?: Element | undefined;
		language?: string | undefined;
		grammar?: Grammar | undefined;
		code?: string | undefined;
		highlightedCode?: string | undefined;
		type?: string | undefined;
		content?: string | undefined;
		tag?: string | undefined;
		classes?: string[] | undefined;
		attributes?: Record<string, string> | undefined;
		parent?: Array<string | Token> | undefined;
	}

	namespace hooks {
		/**
		 * @param env The environment variables of the hook.
		 */
		type HookCallback = (env: Environment) => void;
		type HookTypes = keyof HookEnvironmentMap;

		interface HookEnvironmentMap {
			'before-highlightall': RequiredEnvironment<'selector'>;

			'before-sanity-check': ElementEnvironment;
			'before-highlight': ElementEnvironment;

			'before-insert': ElementHighlightedEnvironment;
			'after-highlight': ElementHighlightedEnvironment;
			complete: ElementHighlightedEnvironment;

			'before-tokenize': TokenizeEnvironment;
			'after-tokenize': TokenizeEnvironment;

			wrap: RequiredEnvironment<'type' | 'content' | 'tag' | 'classes' | 'attributes' | 'language'>;
		}

		type RequiredEnvironment<T extends keyof Environment, U extends Environment = Environment> = U &
			Required<Pick<U, T>>;
		type ElementEnvironment = RequiredEnvironment<'element' | 'language' | 'grammar' | 'code'>;
		type ElementHighlightedEnvironment = RequiredEnvironment<'highlightedCode', ElementEnvironment>;
		type TokenizeEnvironment = RequiredEnvironment<'code' | 'grammar' | 'language'>;

		interface RegisteredHooks {
			[hook: string]: HookCallback[];
		}

		const all: RegisteredHooks;

		/**
		 * Adds the given callback to the list of callbacks for the given hook.
		 *
		 * The callback will be invoked when the hook it is registered for is run.
		 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
		 *
		 * One callback function can be registered to multiple hooks and the same hook multiple times.
		 *
		 * @param name The name of the hook.
		 * @param callback The callback function which is given environment variables.
		 */
		function add<K extends keyof HookEnvironmentMap>(
			name: K,
			callback: (env: HookEnvironmentMap[K]) => void
		): void;
		function add(name: string, callback: HookCallback): void;

		/**
		 * Runs a hook invoking all registered callbacks with the given environment variables.
		 *
		 * Callbacks will be invoked synchronously and in the order in which they were registered.
		 *
		 * @param name The name of the hook.
		 * @param env The environment variables of the hook passed to all callbacks registered.
		 */
		function run<K extends keyof HookEnvironmentMap>(name: K, env: HookEnvironmentMap[K]): void;
		function run(name: string, env: Environment): void;
	}
	const core: Record<string, any>;
	const languages: Record<string, any>;
	const plugins: Record<string, any>;
	const themes: Record<string, any>;
}
