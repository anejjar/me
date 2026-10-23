// Fade elements in as they scroll into view. Styles live in app.css (.reveal).
export function reveal(node: HTMLElement, delay = 0) {
	node.classList.add('reveal');
	node.style.transitionDelay = `${delay}ms`;

	if (typeof IntersectionObserver === 'undefined') {
		node.classList.add('revealed');
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('revealed');
					observer.unobserve(node);
				}
			}
		},
		{ threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
