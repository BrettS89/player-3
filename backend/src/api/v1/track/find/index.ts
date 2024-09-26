import { Endpoint, Handler } from '../../../types'
import { playerDb } from '../../../../storage/db'

const handler: Handler = async (req, res) => {
  const tracks = await playerDb.table('track').find()

  return {
    status: 200,
    data: tracks,
  }
}

export const findTrackEndpoint: Endpoint = {
  handler,
  method: 'GET',
  path: '/track'
}
