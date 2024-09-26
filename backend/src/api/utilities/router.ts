import { IncomingMessage, ServerResponse } from 'node:http'
import { Endpoint, Methods, Request } from '../types'
import { PathTree } from './path-tree'
import { BadRequestError, CustomError, NotFoundError } from '../errors'

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

export class Router {
  routes = {
    'GET': new PathTree(),
    'POST': new PathTree(),
    'PATCH': new PathTree(),
    'PUT': new PathTree(),
    'DELETE': new PathTree(),
  }

  register(endpoint: Endpoint) {
    const tree = this.routes[endpoint.method]
    tree.add(endpoint)
  }

  resolveEndpoint(method: string | undefined, url: string | undefined) {
    if (!url) {
      throw new BadRequestError('Invalid path')
    }

    if (!method || !methods.includes(method)) {
      throw new BadRequestError('Invalid method')
    }

    const tree = this.routes[method as Methods]

    return tree.resolve(url)
  }

  execute(req: IncomingMessage, res: ServerResponse) {
    let jsonBody = ''
  
    req.on('data', (d) => {
      jsonBody += d.toString('utf-8')
    })
  
    req.on('end', async () => {
      try {
        const endpoint = this.resolveEndpoint(req.method, req.url)
        
        if (!endpoint) {
          throw new NotFoundError('Unable to resolve route')
        }

        const request = {
          ...req,
          body: jsonBody ? JSON.parse(jsonBody) : undefined,
          params: endpoint.params,
        } as Request

        const { status, data } = await endpoint.endpoint.handler(request, res)

        res.writeHead(status, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(data))

      } catch(e) {
        console.log(e)
        if (e instanceof CustomError) {
          res.writeHead(e.statusCode, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: e.message }))
        } else {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ message: 'An unexpected error occurred.' }))
        }
      }
    })

  }
}

export const router = new Router()
