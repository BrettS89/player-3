import { downloadAudioFromYoutube } from './youtube'

export const downloadAudio = async (url: string): Promise<any> => {
  return downloadAudioFromYoutube(url)
}
