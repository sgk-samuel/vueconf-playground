export function make(constructor:Function, ...args:unknown[]) {
	const instance = {}

	Object.setPrototypeOf(instance, constructor.prototype)

	const result = constructor.call(instance, ...args)

	return typeof result === 'object' 
		? result 
		: instance
}

export function Vue() {
	// @ts-ignore
	if(new.target !== Vue) return new Vue()

}

