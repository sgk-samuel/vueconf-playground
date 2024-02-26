import { FunctionalComponent, createVNode, inject } from 'vue'
import { injectKeyOfGlobalConfig } from '../constant/index.ts'

const Button: FunctionalComponent = (props, ctx)=>{
	const globalConfig = inject(injectKeyOfGlobalConfig)!

	return <button></button>
}

export default Button
