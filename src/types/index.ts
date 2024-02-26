import type { Ref, PropType, ComponentInstance, VNode } from 'vue'

export type MaybeRef<T> = Ref<T> | T 
export type MaybeArray<T> = Array<T> | T

export interface GlobalConfig {
	lang:'zh-CN'|'en'
	theme:'light'|'dark'|'default'

}
