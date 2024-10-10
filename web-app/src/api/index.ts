import axios from 'axios'
const url = process.env.REACT_APP_API_URL

export const apiGetTracks = async () => {
  const { data } = await axios({
    url: `${url}/track`,
    method: 'GET',
  })

  return data
}

export const apiGetControls = async () => {
  const { data } = await axios({
    url: `${url}/control/info`,
    method: 'GET',
  })

  return data
}

export const apiPlay = async () => {
  const { data } = await axios({
    url: `${url}/control/play`,
    method: 'POST',
  })

  return data
}

export const apiPlayWithTrack = async (trackId: string) => {
  const { data } = await axios({
    url: `${url}/control/play`,
    method: 'POST',
    data: {
      trackId,
    }
  })

  return data
}

export const apiPause = async () => {
  const { data } = await axios({
    url: `${url}/control/pause`,
    method: 'POST',
  })

  return data
}

export const apiNext = async () => {
  const { data } = await axios({
    url: `${url}/control/next`,
    method: 'POST',
  })

  return data
}

export const apiPrev = async () => {
  const { data } = await axios({
    url: `${url}/control/prev`,
    method: 'POST',
  })

  return data
}

export const apiPitchUp = async () => {
  const { data } = await axios({
    url: `${url}/control/pitch-up`,
    method: 'POST',
  })

  return data
}

export const apiPitchDown = async () => {
  const { data } = await axios({
    url: `${url}/control/pitch-down`,
    method: 'POST',
  })

  return data
}
