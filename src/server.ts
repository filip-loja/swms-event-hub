
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import buildDate from './build-date'
import config from './config'

const app = express()
const jsonParser = bodyParser.json()
const httpPort = 3000
const wsPort = 3001
app.use(cors())

const httpServer = require('http').createServer()
httpServer.listen(wsPort, () => {
	console.log(`Ws server is listening on port   ${wsPort}`)
})
const io = require('socket.io')(httpServer, {
	cors: { origin: '*' }
})
io.use((socket, next: any) => {
	const token = socket.handshake.auth.token
	if (!token || token !== config.WS_KEY) {
		console.log('Failed WS auth!')
		return next(new Error('403'))
	}
	next()
})

const checkHttpCredentials = (req, res, next) => {
	if (req.originalUrl === '/') {
		return next()
	}
	if (!req.headers.authorization || req.headers.authorization !== config.HTTP_KEY) {
		console.log('Failed HTTP auth!')
		return res.status(403).send()
	}
	return next()
}
app.use(checkHttpCredentials)

app.get('/', (req, res) => {
	res.send('SVMS Event Hub<br>Created by: Filip Loja<br>Build: ' + buildDate)
})

app.post('/alert', jsonParser, (req, res) => {
	console.log('Messages for "alert".')
	const message = req.body
	io.emit('alert', message)
	res.send()
})

app.post('/telemetry', jsonParser, (req, res) => {
	console.log('Messages for "telemetry".')
	const message = req.body
	io.emit('telemetry', message)
	res.send()
})

app.listen(httpPort, () => console.log(`Http server is listening on port ${httpPort}`))
io.on('connection', () => console.log('WS client connected'))
