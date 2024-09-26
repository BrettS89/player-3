import { Endpoint, Handler } from '../../../types'
import { playerDb } from '../../../../storage/db'
import { httpValidate } from '../../../../utilities/validation/json-schema-validator'
import { createTrackSchema } from '../../../../schemas/track'

const handler: Handler = async (req, res) => {
  httpValidate(createTrackSchema, req.body)

  const createdTrack = await playerDb.table('track').create(req.body)

  return {
    status: 201,
    data: createdTrack,
  }
}

export const createTrackEndpoint: Endpoint = {
  handler,
  method: 'POST',
  path: '/track'
}
