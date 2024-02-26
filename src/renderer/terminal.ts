import { createRenderer } from 'vue'

const { render, createApp } = createRenderer({
	insert(child, parent, anchor) {},
	createElement() { return {} },
	createText() { return {} },
	createComment() { return {}},
	patchProp(el, key, prevValue, nextValue) {},
	remove(el) {},
	setElementText() {},
	setText() {},
	parentNode() { return null },
	nextSibling() { return null }
})


export {
	render,
	createApp
}
