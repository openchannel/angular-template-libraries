import {moduleMetadata} from '@storybook/angular';
import {OcCommonLibModule} from 'oc-ng-common-component';
import {OcVideoUrlComponent} from 'oc-ng-common-component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {EmbedVideoService} from 'ngx-embed-video';
import {OcVideoComponent} from 'oc-ng-common-component';

const modules = {
  imports: [OcCommonLibModule, HttpClientModule],
  providers: [
    EmbedVideoService,
    HttpClient
  ],
};

export default {
  title: 'Video component [BEM]',
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
