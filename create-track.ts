//@ts-nocheck
const url = ''

const track = {
  artist: '',
  title: '',
  url: '',
}

const tracks = [
  {
    artist: 'Pantera',
    title: 'Becoming',
    url: 'https://www.youtube.com/watch?v=XbLS6PZ24fk',
  },
  {
    artist: 'Ozzy Osbourne',
    title: 'Shot in the Dark',
    url: 'https://www.youtube.com/watch?v=Mzyz2egx_0c',
  },
  {
    artist: 'Ozzy Osbourne',
    title: 'Breaking the Rules',
    url: 'https://www.youtube.com/watch?v=ngBQwEtePMY',
  },
  
  // {
  //   artist: 'Ozzy Osbourne',
  //   title: 'Crazy Train Live',
  //   url: 'https://www.youtube.com/watch?v=WsABCrGZN_Q',
  // },
  
]

const fn = async (track: any) => {
  const createAudioResponse = await fetch('http://localhost:4000/audio', {
    method: 'POST',
    body: JSON.stringify({ url: track.url })
  })

  const createdAudio = await createAudioResponse.json()
  console.log(createdAudio)

  const createTrackResponse = await fetch('http://localhost:4000/track', {
    method: 'POST',
    body: JSON.stringify({ artist: track.artist, title: track.title, audioId: createdAudio.id })
  })

  const createdTrack = await createTrackResponse.json()

}

const main = async () => {
  try {
    for (let t of tracks) {
      await fn(t)
    }
  } catch(e) {
    console.log(e)
  }
}

main()