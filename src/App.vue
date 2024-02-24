<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useMousePosition } from './hooks'
import { createText } from './utils'

const count = ref(0)
const { x, y } = useMousePosition()

const rgb = reactive({ r:0, g:0, b:0 })
const backgroundColor = computed(()=>{
	const { r, g, b } = rgb
	return `rgb(${r}, ${g}, ${b})`
})



</script>

<template>
	<h1>{{ x }}, {{ y }}</h1>

	<div class="block"></div>

</template>

<style scoped>
.block {
	width: 300px;
	height: 300px;
	background: v-bind(backgroundColor);
}	




</style>