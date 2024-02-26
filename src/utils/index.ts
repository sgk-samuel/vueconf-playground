export function createElement(tag:keyof HTMLElementTagNameMap) {
	return document.createElement(tag)
}

export function createText(content:string) {
	return document.createTextNode(content)
}

export function createComment(content:string) {
	return document.createComment(content)
}



