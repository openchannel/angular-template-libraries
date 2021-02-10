import {moduleMetadata} from '@storybook/angular';
import {OcCommonLibModule} from 'projects/oc-ng-common-component/src/lib/oc-ng-common-component.module';
import {OcVideoUrlComponent} from 'projects/oc-ng-common-component/src/lib/oc-video-url/oc-video-url.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {EmbedVideoService} from 'ngx-embed-video';
import {OcVideoComponent} from '../projects/oc-ng-common-component/src/lib/oc-video/oc-video.component';

const modules = {
  imports: [OcCommonLibModule, HttpClientModule],
  providers: [
    EmbedVideoService,
    HttpClient
  ],
};

export default {
  title: 'Video component',
  component: OcVideoComponent,
  decorators: [
    moduleMetadata(modules),
  ],
};

const VideoComponent = (args: OcVideoUrlComponent) => ({
  component: OcVideoComponent,
  moduleMetadata: modules,
  props: args
});

export const DefaultVideo = VideoComponent.bind({});

DefaultVideo.args = {
  videoUrl: 'https://www.youtube.com/watch?v=DGQwd1_dpuc',
};
