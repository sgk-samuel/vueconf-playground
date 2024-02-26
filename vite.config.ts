import { resolve } from 'node:path'
import { URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import externalGlobals from 'rollup-plugin-external-globals'

const { url, env } = import.meta

export default defineConfig(({command, mode})=>{
	const isDev = command === 'serve'

	return {
		plugins:[
			vue(),
			vueJsx(),
			externalGlobals({

			})
		],
		server:{
			open:true,
			hmr:true,
			
		},
		resolve:{
			extensions:['.ts', '.js', '.vue', '.tsx', '.jsx'],
			alias:[
			
			],

		},
		css:{

		},
		define:{
			__dirname:JSON.stringify(''),
			__filename:JSON.stringify('')
		}
	}
})
