export const createTrackSchema = {
  type: 'object',
  properties: {
    audioId: { type: 'string' },
    artist: { type: 'string' },
    title: { type: 'string' },
  },
  additionalProperties: false,
  required: [
    'audioId',
    'artist',
    'title',
  ],
}

export const patchTrackSchema = {
  type: 'object',
  properties: {
    artist: { type: 'string' },
    title: { type: 'string' },
  },
  additionalProperties: false,
}

export interface Track {
  id: string
  audioId: string
  artist: string
  title: string
}
