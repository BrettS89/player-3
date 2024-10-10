import React from 'react'
import { Controls, Track } from '../../types'
import { apiGetControls, apiGetTracks, apiPlay, apiPlayWithTrack, apiPause, apiNext, apiPrev, apiPitchUp, apiPitchDown } from '../../api'
import { styles } from './styles'
import { TrackRow } from './track'
import { Player } from '../../components/player'

export const Library = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [tracks, setTracks] = React.useState<Track[]>([])
  const [controls, setControls] = React.useState<Controls>({
    isPlaying: false,
    pitch: 1,
    track: undefined,
  })

  const fetchControls = async () => {
    const controlInfo = await apiGetControls()
    setControls(controlInfo)
  }

  const fetchTracks = async () => {
    try {
      const tracks = await apiGetTracks()
      setTracks(tracks)
      fetchControls()
      setIsLoading(false)
    } catch {}
  }

  const play = async () => {
    const latestControls = await apiPlay()
    setControls(latestControls)
  }

  const playFromTrack = async  (trackId: string) => {
    const latestControls = await apiPlayWithTrack(trackId)
    setControls(latestControls)
  }

  const pause = async () => {
    const latestControls = await apiPause()
    setControls(latestControls)
  }

  const next = async () => {
    const latestControls = await apiNext()
    setControls(latestControls)
  }

  const prev = async () => {
    const latestControls = await apiPrev()
    setControls(latestControls)
  }

  const pitchUp = async () => {
    const latestControls = await apiPitchUp()
    setControls(latestControls)
  }

  const pitchDown = async () => {
    const latestControls = await apiPitchDown()
    setControls(latestControls)
  }

  const renderTracks = () => {
    return tracks.map((track, i) => {
      return (
        <TrackRow
          key={track.id}
          track={track}
          playFromTrack={playFromTrack}
          controls={controls}
          idx={i}
        />
      )
    })
  }

  React.useEffect(() => {
    fetchTracks()
  }, [])

  if (isLoading) return <div>Loading...</div>

  return (
    <div style={styles.page}>
      <div style={styles.tracks}>
        {renderTracks()}
      </div>
      <Player
        controls={controls}
        play={play}
        pause={pause}
        next={next}
        prev={prev}
        pitchUp={pitchUp}
        pitchDown={pitchDown}
      />
    </div>
  )
}

