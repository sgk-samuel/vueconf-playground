import http from 'node:http'
import https from 'node:https'
import http2 from 'node:http2'
import fs from 'node:fs'
import path from 'node:path'
import { URL } from 'node:url'
import { promisify } from 'node:util'
import Koa from 'koa'


const host = 'localhost'
const port = 5173

const key = fs.readFileSync('./server/private.key', 'utf8')
const cert = fs.readFileSync('./server/localhost.crt', 'utf8')

const options:https.ServerOptions = {
	key,
	cert
}

const html = `
<script>
	if(window.chrome && typeof chrome.loadTimes === 'function') {
    var loadTimes = window.chrome.loadTimes()
    var spdy = loadTimes.wasFetchedViaSpdy
    var info = loadTimes.npnNegotiatedProtocol || loadTimes.connectionInfo
    if(spdy && /^h2/i.test(info)) {
      console.log('http/2.0')
    } else {
    	console.log('http/1.1')
    }
  }
</script>
`

const requestListener:http.RequestListener = (req, res)=>{
	const { httpVersion } = req

	res.writeHead(200, {
		'Content-Type':'text/html; charset=utf-8'
	})
	
	res.end(html)
}

const requestHandler = (req:http2.Http2ServerRequest, res:http2.Http2ServerResponse)=>{
	// req.push()

	res.end(html)
}

function createHTTPServer(protocol:'http'|'https', httpVersion:'1.1'|'2.0') {
	if(protocol === 'http') {
		return httpVersion === '1.1' 
			? http.createServer(requestListener)
			: http2.createServer(requestHandler)
	} else if(protocol === 'https') {
		return httpVersion === '1.1' 
			? https.createServer(options, requestListener)
			: http2.createSecureServer(options, requestHandler)
	}
}

export class HTTPServer {
	app:http.Server|https.Server|http2.Http2Server|http2.Http2SecureServer|null = null

	constructor(protocol:'http'|'https'='http', httpVersion:'1.1'|'2.0'='1.1') {
		this.app = createHTTPServer(protocol, httpVersion)!
	}

	listenAndServe() {
		this.app!.listen(port, host, ()=>{
			console.log(`[${new Date().toLocaleString()}] http server is ready on http://${host}:${port}/`)
		})
	}
}

export class Application {
	app = new Koa()

	constructor() {
		this.app.use(async (ctx)=>{
			ctx.body = 'hello,world'
		})
	}

	run() {
		this.app.listen(9527, ()=>{
			console.log(`[${new Date().toLocaleString()}] server is running ...`)
		})
	}
}

