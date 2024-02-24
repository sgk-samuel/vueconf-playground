import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins:[
		vue()

	],
	server:{
		open:true
	},
	resolve:{
		extensions:['.ts', '.js', '.vue', '.tsx', '.jsx'],
		alias:[
		
		]
	}

})
