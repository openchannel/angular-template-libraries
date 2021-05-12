import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule, OcVideoComponent } from '@openchannel/angular-common-components/src/lib/common-components';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EmbedVideoService } from 'ngx-embed-video';
import { OcVideoUrlComponent } from '@openchannel/angular-common-components/src/lib/form-components';

const modules = {
    imports: [OcCommonLibModule, HttpClientModule],
    providers: [EmbedVideoService, HttpClient],
};

export default {
    title: 'Video component [BEM]',
    component: OcVideoComponent,
    decorators: [moduleMetadata(modules)],
};

const VideoComponent = (args: OcVideoUrlComponent) => ({
    component: OcVideoComponent,
    moduleMetadata: modules,
    props: args,
});

export const DefaultVideo = VideoComponent.bind({});

DefaultVideo.args = {
    videoUrl: 'https://www.youtube.com/watch?v=DGQwd1_dpuc',
};
