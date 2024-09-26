import { IncomingMessage, ServerResponse } from 'node:http'

export type Methods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface CustomRequestFields {
  params: Record<string, any>
  body: any
}

export type Request = IncomingMessage & CustomRequestFields

type HandlerResponse = { status: number; data: any[] | Record<string, any> }

export type Handler = (req: Request, res: ServerResponse) => HandlerResponse | Promise<HandlerResponse>

export interface Endpoint {
  handler: Handler
  path: string,
  method: Methods
}
