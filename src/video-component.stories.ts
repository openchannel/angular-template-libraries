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

export const WistiaVideo = VideoComponent.bind({});

WistiaVideo.args = {
    videoUrl: 'https://softkit.wistia.com/medias/ou1sr5h6jt',
};

export const VidyardVideo = VideoComponent.bind({});

VidyardVideo.args = {
    videoUrl: 'https://share.vidyard.com/watch/nmczXbtJDXrHm9LpLTkrEB',
};

export const BrightcoveVideo = VideoComponent.bind({});

BrightcoveVideo.args = {
    videoUrl: 'https://players.brightcove.net/6259025838001/default_default/index.html?videoId=6259291147001',
};
