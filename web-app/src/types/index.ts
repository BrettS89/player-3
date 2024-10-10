export interface Track {
  id: string
  audioId: string
  artist: string
  title: string
}

export interface Controls {
  isPlaying: boolean
  pitch: number
  track?: Track
}
