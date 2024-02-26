/**
 * @author sgk <3228891558@qq.com>
 * @description http client and jsonp module 
 * @since 2024/2/26 
 */
import random from './random.ts'

type HTTPClientMethod = 'GET'|'POST'|'PUT'|'PATCH'|'DELETE'

interface HTTPClientRequestOptions {
	responseType?:'text'|'json'
	timeout?:number
	body?:object
	headers?:{
		'Content-Type':'application/json'|'application/x-www-form-urlencoded'

	}
	query?:object
}

interface HTTPClientResponse<T extends object=any> {
	status:number
	data:T
	headers:object
}

interface FetchOptions {
	responseType?:'text'|'json'
}

interface JSONPOptions {
	query:object
	cb:string
}

function getRuntimeEnv() {
	return Object.prototype.toString.call(globalThis) === '[object global]' 
		? 'node' : 'browser'
}

export async function fetch<T>(url:string, options?:FetchOptions):Promise<HTTPClientResponse<T>> {
	const { responseType='json' } = options || {}

	if(getRuntimeEnv() === 'browser') {
		const data = await window.fetch(url).then(res=>res[responseType]())
		return {
			status:200,
			data,
			headers:{}
		}
	}

	return new Promise((resolve, reject)=>{
		let data = ''
		require('node:https').request(url, {}, res=>{
			res.on('data', chunk=>data+=chunk.toString())
			res.on('end', ()=>resolve({
				status:res.statusCode,
				data:responseType === 'text' ? data : JSON.parse(data),
				headers:{}
			}))
		}).end()
	})
}

export class HTTPClient {	
	static request(url:string, method:HTTPClientMethod, options?:HTTPClientRequestOptions):Promise<HTTPClientResponse> {
		const xhr = new XMLHttpRequest()
		const { 
			responseType = 'json',
			timeout = 0,
			query = {},
			headers = {},
			body = {}
		} = options || {}

		return new Promise((resolve, reject)=>{
			xhr.open(method, url, true)

			xhr.responseType = responseType
			xhr.timeout = timeout

			Object.keys(headers).forEach(name=>{
				const value = headers[name]
				xhr.setRequestHeader(name, value)
			})
			
			xhr.onreadystatechange = ()=>{
				if(xhr.readyState === 4) {
					if(/^2\d{2}$/.test(xhr.status.toString())) {
						const headersText = xhr.getAllResponseHeaders()

						resolve({
							data: xhr.response,
							headers:{}
						})
					}
				}
			}

			xhr.ontimeout = ()=>reject(new Error('ajax timeout!'))
			xhr.onerror = ()=>reject(new Error('ajax error!'))

			xhr.send(JSON.stringify(body))
		})
	}

	static get(url:string, query?:object) {
		return HTTPClient.request(url, 'GET')
	}
	
	static post(url:string, body?:object) {
		return HTTPClient.request(url, 'POST')
	}
	
	static put() {}

	static patch() {}
	
	static delete() {}
}

export function jsonp<T extends object>(url:string, options?:JSONPOptions):Promise<HTTPClientResponse<T>> {
	const { cb='' } = options || {}

	const tag = document.createElement('script')

	tag.src = `${url}?jsonp_callback=${cb}${random.uuid()}`

	document.body.appendChild(tag)

	return new Promise((resolve, reject)=>{
		globalThis[cb] = (data:HTTPClientResponse<T>)=>{
			resolve(data)
		}

		tag.onload = ()=>{
			tag.remove()
			globalThis[cb] = null
		}
	})
}
