import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule } from 'projects/oc-ng-common-component/src/lib/oc-ng-common-component.module';
import { OcVideoUrlComponent } from 'projects/oc-ng-common-component/src/lib/oc-video-url/oc-video-url.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {FileDetails, FileUploadDownloadService} from 'oc-ng-common-service';

class StubFileUploadDownloadService {
  constructor() {}
  uploadToOpenchannel(file: FormData, isPrivate?: boolean): Observable<any> {
    return new Observable();
  }
  prepareUploadReq(token: any, file: any, isPrivate: any): Observable<any> {
    return new Observable();
  }
  getToken(): Observable<any> {
    return new Observable();
  }
  downloadFileDetails(fileId: any): Observable<FileDetails> {
    return new Observable();
  }
  downloadFileFromUrl(fileUrl: any): Observable<any> {
    return new Observable();
  }
  getVideoData(videoUrl: any): Observable<any> {
    return of({
      url: 'https://youtu.be/DGQwd1_dpuc',
      meta: {
        author_url: 'https://www.youtube.com/channel/UCjzHeG1KWoonmf9d5KBvSiw',
        canonical: 'https://www.youtube.com/watch?v=DGQwd1_dpuc',
        site: 'YouTube',
        media: 'player',
        views: '9224837',
        dislikes: '2056',
        likes: '58760',
        duration: 10913,
        description: 'Relaxing music with beautiful nature videos for ultimate relaxation. Peaceful piano & guitar music ("Happy Times ★152") with ocean waves that can be used as study music, sleep music, music during work or as background music during the day. Instrumental music composed by Peder B. Helland for Soothing Relaxation. Listen to more ► https://www.youtube.com/watch?v=9Q634rbsypE&index=1&list=PLQ_PIlf6OzqIbDAB-ErHx6LYIsseKs8Eg\nDownload on Bandcamp: https://soothingrelaxation.bandcamp.com/track/happy-times-152-short\n\n------------------------------------------------------------------------------\n~Recommended playlists from Soothing Relaxation~\nPiano Music ► https://www.youtube.com/watch?v=lCOF9LN_Zxs&index=1&list=PLQ_PIlf6OzqIbDAB-ErHx6LYIsseKs8Eg\nSleep Music ► https://www.youtube.com/watch?v=MN_JP4gyBNI&index=2&list=PLQ_PIlf6OzqIeQygYMd8DccQ3XnJlSGcG\nCeltic Music ► https://www.youtube.com/watch?v=BiqlZZddZEo&list=PLQ_PIlf6OzqLhEYzczrT-qGZy2lhx_Gga&index=1\nRomantic Music ► https://www.youtube.com/watch?v=aXYtJB7Qslk&list=PLQ_PIlf6OzqI5e0fYBXTN8cSjgEBD-Seh&index=1\nHarp Music ► https://www.youtube.com/watch?v=7TO_oHxuk6c&list=PLQ_PIlf6OzqIhLKzweFz88-N8zntaZm-K&index=1\n\n------------------------------------------------------------------------------\n~My social links~\nInstagram ► https://www.instagram.com/PederBHelland/\nFacebook ► https://www.facebook.com/PederBHelland\nTwitter ► https://twitter.com/PederBHelland\nSnapchat ► @PederBHelland\nSoothing Relaxation on Facebook ► https://www.facebook.com/SoothingRelaxation\n\n------------------------------------------------------------------------------\nMusic by Peder B. Helland. \nStock media provided by Pond5.\n\n------------------------------------------------------------------------------\nI am a composer from Norway and I started this channel with a simple vision: to create a place that you can visit whenever you want to sit down and relax. I compose music that can be labeled as for example: sleep music, calm music, yoga music, study music, peaceful music, beautiful music and relaxing music. I love to compose music and I put a lot of work into it. \n\nThank you very much for listening and for leaving feedback. All your warm support really inspires me to work even harder on my music. If you enjoy my work, I would be very happy if you decided to subscribe and join our community. Have a wonderful day or evening!\n\n~Peder B. Helland\n\n------------------------------------------------------------------------------\n~Places to download my music~\nItunes ► https://itunes.apple.com/us/artist/peder-b.-helland/id670633352\nBandcamp ► http://soothingrelaxation.bandcamp.com\nAmazon ► http://www.amazon.com/s/ref=ntt_srch_drd_B00FGLK06C?ie=UTF8&field-keywords=Peder%20B.%20Helland&index=digital-music&search-type=ss\nGoogle Play ►https://play.google.com/store/music/artist/Peder_B_Helland?id=Aknsdtud7aeouew6ny2zv5d3xhq\nSoothing Relaxation ►https://soothingrelaxation.com/\n\n------------------------------------------------------------------------------\n~My other channels~\nPeder B. Helland ► https://www.youtube.com/user/MusicLoverOriginals\nSoothing Lullabies ► https://www.youtube.com/channel/UC5bksAOJAJtF0IWMXTokvIA\nSoothing Tutorials ►https://www.youtube.com/channel/UCMKyhgW30pNIBu9NMeiGf9Q\n\n\n#relax\n#relaxingmusic\n#guitar\n#piano',
        author: 'Soothing Relaxation',
        date: '2018-10-10T15:45:02.000Z',
        title: 'Relaxing Music with Beautiful Nature - Peaceful Piano & Guitar Music by Soothing Relaxation'
      },
      html: '<div><div style="left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;"><iframe src="https://cdn.iframe.ly/api/iframe?url=https%3A%2F%2Fyoutu.be%2FDGQwd1_dpuc&amp;key=37e96b37fac1aa5b67e77eb5142641c6" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen scrolling="no" allow="encrypted-media *; accelerometer; gyroscope; picture-in-picture"></iframe></div></div>',
    });
  }
}

const modules = {
  imports: [OcCommonLibModule, HttpClientModule],
  providers: [
    {provide: FileUploadDownloadService, useClass: StubFileUploadDownloadService},
    HttpClient
  ],
};

export default {
  title: 'Video Url component',
  component: OcVideoUrlComponent,
  decorators: [
    moduleMetadata(modules),
  ],
};

const VideoUrlComponent = (args: OcVideoUrlComponent) => ({
  component: OcVideoUrlComponent,
  moduleMetadata: modules,
  props: args
});

export const DefaultVideoUrl = VideoUrlComponent.bind({});

DefaultVideoUrl.args = {};
