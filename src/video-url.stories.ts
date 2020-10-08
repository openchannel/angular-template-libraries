import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule } from 'projects/oc-ng-common-component/src/lib/oc-ng-common-component.module';
import { OcVideoUrlComponent } from 'projects/oc-ng-common-component/src/lib/oc-video-url/oc-video-url.component';

const modules = {
  imports: [OcCommonLibModule]
};

export default {
  title: 'Video Url component',
  component: OcVideoUrlComponent,
  decorators: [
    moduleMetadata(modules),
  ],
};

const TagComponent = (args: OcVideoUrlComponent) => ({
  component: OcVideoUrlComponent,
  moduleMetadata: modules,
  props: args
});

export const DefaultVideoUrl = TagComponent.bind({});

DefaultVideoUrl.args = {
  title: 'MyTag',
  width: '15%',
  closeMarker: true
};
