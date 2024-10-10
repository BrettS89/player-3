import { Endpoint, Handler } from '../../types'
import { player } from '../../../player'

const handler: Handler = async (req, res) => {
  return {
    status: 200,
    data: player.getStatus(),
  }
}

export const controlInfoEndpoint: Endpoint = {
  handler,
  method: 'GET',
  path: '/control/info'
}
