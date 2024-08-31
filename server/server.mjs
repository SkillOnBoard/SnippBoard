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

let dataFilePath = process.argv[2] || path.join(__dirname, '../snipp_board_data.json')

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

https.createServer(sslOptions, app).listen(3000, () => {
  console.log('Secure server listening on port 3000')
  console.log(`Data stored at: ${dataFilePath}`)
})
