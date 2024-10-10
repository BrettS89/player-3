import { Track } from '../schemas/track'

export const sortTracks = (a: Track, b: Track) => {
  if (a.artist === b.artist) {
    return a.title.localeCompare(b.artist)
  }

  return a.artist.localeCompare(b.artist)
}
