import http from 'node:http'
import { playerDb } from './storage/db'
import { tables } from './config/db'
import { router } from './app' 

const start = async () => {
  await playerDb.connect()
  await playerDb.addTables(tables)

  const server = http.createServer((req, res) => {
    if (req.method === 'OPTIONS') {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
        res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
        res.writeHead(200)
        res.end()
        console.log('inn')
    } else {
      router.execute(req, res)
    }
  })
  
  server.listen(4000, '127.0.0.1', () => {
    console.log('server listening')
  })
}

start()
