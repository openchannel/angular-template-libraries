import {moduleMetadata} from '@storybook/angular';
import {OcCommonLibModule} from 'oc-ng-common-component/src/lib/common-components';
import {OcSocialLinksComponent} from 'oc-ng-common-component';

const modules = {
    imports: [OcCommonLibModule]
};

export default {
    title: 'App Social Links [BEM]',
    component: OcSocialLinksComponent,
    decorators: [
        moduleMetadata(modules),
    ],
};

const SocialLinksComponent = (args: OcSocialLinksComponent) => ({
    component: OcSocialLinksComponent,
    moduleMetadata: modules,
    props: args
});

export const componentLinks = SocialLinksComponent.bind({});

componentLinks.args = {
    socialLinks: [
        {
            link: 'https://facebook.com',
            iconSrc: './assets/img/edit_icon.svg',
            iconAlt: 'facebook'
        },
        {
            link: 'https://twitter.com',
            iconSrc: './assets/img/close-icon.svg',
        }
    ]
}
