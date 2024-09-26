import { Endpoint, Handler } from '../../../types'
import { playerDb } from '../../../../storage/db'
import { downloadAudio } from '../../../../utilities/audio/download'
import { createAudioSchema } from '../../../../schemas/audio'
import { httpValidate } from '../../../../utilities/validation/json-schema-validator'

const handler: Handler = async (req, res) => {
  httpValidate(createAudioSchema, req.body)

  const filename = await downloadAudio(req.body.url)

  const audio = {
    filename,
    type: 'audio/mpeg',
    extension: 'mp3',
  }

  const created = await playerDb.table('audio').create(audio)

  return {
    status: 201,
    data: created,
  }
}

export const createAudioEndpoint: Endpoint = {
  handler,
  method: 'POST',
  path: '/audio'
}
