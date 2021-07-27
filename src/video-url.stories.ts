import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { OcVideoUrlComponent } from '@openchannel/angular-common-components/src/lib/form-components';
import { FormsModule } from '@angular/forms';

const modules = {
    imports: [OcCommonLibModule, HttpClientModule, FormsModule],
    providers: [HttpClient],
};

export default {
    title: 'Video Url component [BEM]',
    component: OcVideoUrlComponent,
    decorators: [moduleMetadata(modules)],
};

const VideoUrlComponent = (args: OcVideoUrlComponent) => ({
    component: OcVideoUrlComponent,
    moduleMetadata: modules,
    props: args,
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

EmptyField.args = {};
