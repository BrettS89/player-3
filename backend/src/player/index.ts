import { ChildProcess, exec } from 'node:child_process'
import { NotFoundError } from '../api/errors'
import { playerDb } from '../storage/db'
import { Track } from '../schemas/track'
import { Audio } from '../schemas/audio'

class Player {
  child?: ChildProcess
  isPlaying: boolean = false
  pitch: number = 1
  track?: Track

  getStatus() {
    return {
      isPlaying: this.isPlaying,
      pitch: this.pitch,
      track: this.track,
    }
  }

  async play(trackId?: string) {
    if (trackId) {
      const track = await playerDb.table('track').getById<Track>(trackId)

      if (!track) {
        throw new NotFoundError('No audio found with this id.')
      }

      const audio = await playerDb.table('audio').getById<Audio>(track.audioId)

      if (!audio) {
        throw new NotFoundError('No audio found with this id.')
      }

      this.killProcess()

      this.child = exec(`mplayer -af scaletempo=scale=1.0:speed=pitch -speed ${this.pitch} ` + process.env.PWD + '/public/files/' + audio.filename)

      this.isPlaying = true
      this.track = track
    } else {
      if (!this.isPlaying) {
        this.child?.stdin?.write('play')
        this.isPlaying = true
      }
    }
  }

  pause() {
    this.child?.stdin?.write('p')

    this.isPlaying = false
  }

  async next() {
    const tracks = await playerDb.table('track').find()

    if (!this.track) {
      return
    }

    const idx = tracks.map(track => track.id).indexOf(this.track.id)

    const nextTrack = tracks[idx +  1] ?? tracks[0]

    await this.playFromTrack(nextTrack)
  }

  async prev() {
    const tracks = await playerDb.table('track').find()

    if (!this.track) {
      return
    }

    const idx = tracks.map(track => track.id).indexOf(this.track.id)

    const nextTrack = tracks[idx -  1] ?? tracks[tracks.length - 1]

    await this.playFromTrack(nextTrack)
  }

  pitchUp() {
    this.child?.stdin?.write(`]`)
    this.pitch += .05
  }

  pitchDown() {
    this.child?.stdin?.write(`[`)
    this.pitch -= .05
  }

  private killProcess() {
    this.pause()

    if (this.child) {
      this.child?.kill('SIGINT')
    }
  }

  private async playFromTrack(track: Track) {
    this.killProcess()

    const audio = await playerDb.table('audio').getById<Audio>(track.audioId)

    if (!audio) {
      throw new NotFoundError('No audio found with this id.')
    }

    this.child = exec(`mplayer -af scaletempo=scale=1.0:speed=pitch -speed ${this.pitch} ` + process.env.PWD + '/public/files/' + audio.filename)

    this.isPlaying = true
    this.track = track
  }
  
}

export const player = new Player()
