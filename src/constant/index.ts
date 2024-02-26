import type { InjectionKey } from 'vue'
import type { GlobalConfig } from '../types/index.ts'

export const injectKeyOfGlobalConfig:InjectionKey<GlobalConfig> = Symbol()
export const injectKeyOfStore: InjectionKey<unknown> = Symbol()


