import React from 'react'
import { styles } from './styles'
import { FaCirclePlay, FaCirclePlus, FaCircleMinus, FaCirclePause } from 'react-icons/fa6'
import { IoPlayForward, IoPlayBack } from 'react-icons/io5'
import { blue } from '../../styles/colors'
import { Controls } from '../../types'

interface Props {
  controls: Controls
  play: () => Promise<void>
  pause: () => Promise<void>
  next: () => Promise<void>
  prev: () => Promise<void>
  pitchUp: () => Promise<void>
  pitchDown: () => Promise<void>
}

export const Player: React.FC<Props> = ({ controls, play, pause, next, prev, pitchUp, pitchDown }) => {
  console.log(controls)

  const renderPlayButton = () => {
    if (!controls.isPlaying) {
      return <div><FaCirclePlay onClick={play} style={{ fontSize: 50, color: blue, margin: '0 15px' }} /></div>
    }

    return (
      <div><FaCirclePause onClick={pause} style={{ fontSize: 50, color: blue, margin: '0 15px' }} /></div>
    )
  }

  return (
    <div style={styles.player}>
      <div><FaCircleMinus onClick={pitchDown} style={{ fontSize: 25, color: blue, marginRight: 15 }} /></div>
      <div><IoPlayBack onClick={prev} style={{ fontSize: 35, color: blue }}/></div>
      {renderPlayButton()}
      <div><IoPlayForward onClick={next} style={{ fontSize: 35, color: blue }}/></div>
      <div><FaCirclePlus onClick={pitchUp} style={{ fontSize: 25, color: blue, marginLeft: 15 }} /></div>
    </div>
  )
}
