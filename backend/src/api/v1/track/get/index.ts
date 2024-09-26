import { Endpoint, Handler } from '../../../types'

const handler: Handler = (req, res) => {
  const data = {
    message: 'we in',
  }

  return {
    status: 200,
    data,
  }
}

export const getTrackEndpoint: Endpoint = {
  handler,
  method: 'GET',
  path: '/track/:id'
}
