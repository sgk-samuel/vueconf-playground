import { HTTPServer, Application } from './http'

const server = new HTTPServer('https', '2.0')
const app = new Application()

app.run()

