import { Downloader } from 'ytdl-mp3';

export const downloadAudioFromYoutube = async (url: string) => {
  const downloader = new Downloader({
    getTags: false,
    outputDir: './public/files',
  });

  const result = await downloader.downloadSong(url);

  const filenameArr = result.split('/')
  const filename = filenameArr[filenameArr.length - 1]

  return filename
}
