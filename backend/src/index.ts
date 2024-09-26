import http from 'node:http'
import { playerDb } from './storage/db'
import { tables } from './config/db'
import { router } from './app' 

const start = async () => {
  await playerDb.connect()
  await playerDb.addTables(tables)

  const server = http.createServer((req, res) => {
    router.execute(req, res)
  })
  
  server.listen(4000, '127.0.0.1', () => {
    console.log('server listening')
  })
}

start()
