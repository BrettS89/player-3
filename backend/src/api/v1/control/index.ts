import { controlPlayEndpoint } from './play'
import { controlPauseEndpoint } from './pause'
import { controlNextEndpoint } from './next'
import { controlPrevEndpoint } from './prev'
import { controlPitchDownEndpoint } from './pitch-down'
import { controlPitchUpEndpoint } from './pitch-up'
import { controlInfoEndpoint } from './info'
import { Endpoint } from '../../types'

export const controlEndpoints: Endpoint[] = [
  controlPlayEndpoint,
  controlPauseEndpoint,
  controlNextEndpoint,
  controlPrevEndpoint,
  controlPitchDownEndpoint,
  controlPitchUpEndpoint,
  controlInfoEndpoint,
]
