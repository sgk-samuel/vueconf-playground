<script setup lang="ts">
import { 
	ref, 
	reactive,
	computed, 
	unref, 
	isRef, 
	provide,
	watch,
} from 'vue'
import { useMousePosition } from './hooks'
import { createText, createElement, createComment } from './utils'
import Button from './components/Button.tsx'
import Card from './components/Card.tsx'
import Form from './components/Form.tsx'
import { injectKeyOfGlobalConfig } from './constant'

const count = ref(0)
const { x, y } = useMousePosition()

const rgb = reactive({ r:255, g:255, b:0 })
const backgroundColor = computed(()=>{
	const { r, g, b } = rgb
	return `rgb(${r}, ${g}, ${b})`
})

const data = reactive({count})

provide(injectKeyOfGlobalConfig, {

})

const props = defineProps<{}>()
const { modelValue } = defineModel<{ modelValue:string }>()

const stopWatch = watch(count, ()=>{})


</script>

<template>
	<h1>({{ x }}, {{ y }})</h1>

	<div class="block"></div>

	<Button></Button>

	<Card></Card>
 

</template>

<style scoped>
.block {
	width: 300px;
	height: 300px;
	background: v-bind(backgroundColor);
}	




</style>