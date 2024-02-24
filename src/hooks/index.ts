import { 
	reactive, 
	onMounted, 
	onBeforeUnmount,
	toRefs,

} from 'vue'

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



