import React from 'react'
import { Controls, Track as TrackType } from '../../types'
import { styles } from './styles'
import { lightGray } from '../../styles/colors'

interface Props {
  track: TrackType
  idx: number
  playFromTrack: (trackId: string) => Promise<void>
  controls: Controls
}

export const TrackRow: React.FC<Props> = ({ track, idx, playFromTrack, controls }) => {
  const backgroundColor = idx % 2 === 0 ? '#fff' : lightGray

  return (
    <div onClick={() => playFromTrack(track.id)}  style={{ ...styles.trackRow, backgroundColor }}>
      {track.artist} - {track.title}
    </div>
  )
}
