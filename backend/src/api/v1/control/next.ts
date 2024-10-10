import { Endpoint, Handler } from '../../types'
import { httpValidate } from '../../../utilities/validation/json-schema-validator'
import { player } from '../../../player'

const handler: Handler = async (req, res) => {
  httpValidate({}, req.body)

  await player.next()

  return {
    status: 200,
    data: player.getStatus(),
  }
}

export const controlNextEndpoint: Endpoint = {
  handler,
  method: 'POST',
  path: '/control/next'
}
