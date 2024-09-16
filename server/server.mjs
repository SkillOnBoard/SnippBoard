/* eslint-disable @typescript-eslint/explicit-function-return-type */

import https from 'https'
import fs from 'fs'
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
app.use(bodyParser.json())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PORT = process.env.PORT || 3000

let dataFilePath = process.argv[2] || path.join(__dirname, '../resources/data.json')

app.post('/api/data', (req, res) => {
  const newData = req.body
  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'))
  data.push(newData)
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
  res.status(201).send(newData)
})

app.get('/api/data', (req, res) => {
  console.log(req.url)
  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'))
  res.status(200).send(data)
})

app.put('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const updatedData = req.body
  let data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'))
  data = data.map((item) => (item.id === id ? updatedData : item))
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
  res.status(200).send(updatedData)
})

app.delete('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id)
  let data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'))
  data = data.filter((item) => item.id !== id)
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2))
  res.status(200).send({ message: 'Deleted successfully' })
})

// Handle incoming messages from the main process
process.on('message', (message) => {
  if (message.type === 'data-path-chosen') {
    dataFilePath = message.path
    console.log(`Data path updated to: ${dataFilePath}`)
  }
})

const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, '../private.key')),
  cert: fs.readFileSync(path.join(__dirname, '../certificate.crt'))
}

const server = https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Secure server listening on port ${PORT}`)
  console.log(`Data stored at: ${dataFilePath}`)
})

server.close(() => {
  server.listen(PORT, () => {
    console.log(`Server restarted on port ${PORT}`)
  })
})

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please use a different port.`)

    // Optionally, you could try to use another port
    console.error('Error:', error)
    const newPort = PORT + 1

    server.listen(newPort, () => {
      console.log(`Server is now running on port ${newPort}`)
    })
  } else {
    console.error('Server error:', error)
  }
})
