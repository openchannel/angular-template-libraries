import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule } from 'projects/oc-ng-common-component/src/lib/oc-ng-common-component.module';
import { OcVideoUrlComponent } from 'projects/oc-ng-common-component/src/lib/oc-video-url/oc-video-url.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';

const modules = {
  imports: [OcCommonLibModule, HttpClientModule],
  providers: [
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

DefaultVideoUrl.args = {
  value: 'https://www.youtube.com/watch?v=DGQwd1_dpuc',
};

export const UrlWithoutPreview = VideoUrlComponent.bind({});

UrlWithoutPreview.args = {
  value: 'https://coub.com/view/1po8m3',
};

export const EmptyField = VideoUrlComponent.bind({});

EmptyField.args = {
};
