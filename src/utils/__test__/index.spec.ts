import { expect, it, describe } from 'vitest'
import { jsonp, fetch, HTTPClient } from '../ajax.ts'
import { remove, removeAt } from '../array.ts'
import { bool } from '../convert.ts'
import { sleep } from '../builtin.ts'

interface Todo {
	userId:number
	id:number
	title:string
	completed:boolean
}

const api = 'https://jsonplaceholder.typicode.com/todos/1'

describe('ajax module', ()=>{
	it('fetch function test', async ()=>{
		const res = await fetch<Todo>(api)

		expect(res.status).toBe(200)
		expect(res.data.id).toEqual(1)

	})

})

describe('array module', ()=>{
	it('array builtin method test', ()=>{
		const usernames = ['Jim', 'Rose', 'Jack']

		expect(0 in [undefined, undefined]).toBeTruthy()
		expect(0 in Array(2)).toBeFalsy()
		expect(Array(2).length).toBe(2)
		expect(Array.isArray(usernames)).toBeTruthy()

		expect(usernames.push('Rich')).toBe(4)
		expect(usernames.pop()).toBe('Rich')

		removeAt(usernames, 1)

		expect(usernames).toEqual(['Jim', 'Jack'])


	})

})

describe('convert module', ()=>{
	it('bool function test', ()=>{
		expect(bool([])).toBeTruthy()

	})
})

