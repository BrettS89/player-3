import { Endpoint, Handler } from '../../types'
import { httpValidate } from '../../../utilities/validation/json-schema-validator'
import { player } from '../../../player'

const handler: Handler = async (req, res) => {
  httpValidate({}, req.body)

  player.pause()

  return {
    status: 200,
    data: player.getStatus(),
  }
}

export const controlPauseEndpoint: Endpoint = {
  handler,
  method: 'POST',
  path: '/control/pause'
}
