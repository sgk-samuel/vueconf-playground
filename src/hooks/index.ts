import { 
	ref,
	reactive, 
	shallowRef,
	onMounted, 
	onBeforeUnmount,
	toRefs,
	watch,
	computed,
	getCurrentInstance,
	unref,
	effectScope,
	onScopeDispose,
} from 'vue'
import type { MaybeRef } from '../types/index.ts'

export function useMousePosition() {
	const position = reactive({
		x: 0,
		y: 0
	})

	function onMousemove(ev:MouseEvent) {
		position.x = ev.pageX
		position.y = ev.pageY
	}

	onMounted(()=>window.addEventListener('mousemove', onMousemove))
	onBeforeUnmount(()=>window.removeEventListener('mousemove', onMousemove))

	return toRefs(position)
}

export function useBoolean(initialValue:boolean) {}

export function useTitle(newTitle?:MaybeRef<string>) {
	const title = ref(newTitle || document.title)

	watch(title, ()=>{

	}, {immediate:true})

	return title
}

export function useFetch() {}

/**
 * [useEventListener description]
 * @param {EventTarget}                        target   [description]
 * @param {string}                             type     [description]
 * @param {EventListenerOrEventListenerObject} callback [description]
 */
export function useEventListener(target:EventTarget, type:string, callback:EventListenerOrEventListenerObject) {
	target.addEventListener(type, callback)

	function cleanup() {
		target.removeEventListener(type, callback)
	}

	onBeforeUnmount(cleanup)

	return cleanup
}

export function useVModel<P extends object, T extends keyof P>(props:P, name:T) {
	const emit = getCurrentInstance()?.emit

	return computed({
		get() {
			return props[name]
		},
		set(newVal:P[T]) {
			emit && emit(`update:${name as string}`, newVal)
		}
	})
}

export function onKeyChange() {
	const effect = effectScope()

	effect.run(()=>{


	})

	effect.stop()

}


