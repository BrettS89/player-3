export const createAudioSchema = {
  type: 'object',
  properties: {
    url: { type: 'string' },
  },
  additionalProperties: false,
  required: [
    'url',
  ],
}

export interface Audio {
  id: string
  filename: string
  type: string
  extension: string
}
