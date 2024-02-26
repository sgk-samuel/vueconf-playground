export function isArray(obj:unknown) {
	if(Array.isArray) return Array.isArray(obj)
	return Object.prototype.toString.call(obj) === '[object Array]'
}

export function remove<T>(arr:T[], elem:T) {
	removeAt(arr, arr.indexOf(elem))
}

export function removeAt<T>(arr:T[], index:number) {
	arr.splice(index, 1)
}
