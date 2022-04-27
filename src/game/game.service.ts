import { Injectable } from '@nestjs/common';
import { Game } from './game';
import * as fs from 'fs';
import { S3FileService } from '../s3-file/s3-file.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const yt = require('yt-converter');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

@Injectable()
export class GameService {
  constructor(private s3Service: S3FileService) {}

  async createGame(): Promise<Game> {
    return null;
  }

  async makeMp3(linkUrl: string): Promise<string> {
    const infos = await yt.getInfo(linkUrl);

    infos.formatsAudio.map((audio) => {
      console.log(audio.audioQuality, audio.itag);
    });

    const filtered = infos.formatsAudio
      .filter((format) => format.audioQuality === 'AUDIO_QUALITY_LOW')
      .pop();

    console.log(filtered);
    const fileName = __dirname + `/${infos.title}.mp3`;
    console.log(__dirname + `/${infos.title}.mp3`);

    const pathname = path.resolve(process.cwd(), 'temp', `${infos.title}.mp3`);
    try {
      fs.mkdirSync('temp');
    } catch {}

    await yt.convertAudio(
      {
        url: linkUrl,
        itag: filtered.itag,
        directoryDownload: 'temp',
      },
      () => {
        console.log('data ...');
      },
      () => {
        console.log(pathname);
        if (fs.existsSync(pathname)) {
          console.log('file is exists');
        }
        const files = fs.readdirSync(path.resolve(process.cwd(), 'temp'));
        console.log(files);
        const fi = path.resolve(process.cwd(), 'temp', files[0]);
        if (fs.existsSync(fi)) {
          this.s3Service.uploadAsync(1, infos.title, fi);
        }
      },
    );

    return 'test';
  }
}
