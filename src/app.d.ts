// See https://kit.svelte.dev/docs/types#app
declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

export {};
