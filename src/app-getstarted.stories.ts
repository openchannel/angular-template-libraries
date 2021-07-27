import { moduleMetadata } from '@storybook/angular';
import { OcAppGetStartedComponent } from '@openchannel/angular-common-components/src/lib/market-components';
import { OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';

/** List of module dependencies and component declarations. Stored as separate var because they are shared among all stories */
const modules = {
    imports: [OcCommonLibModule],
};

export default {
    title: 'Get Started [BEM]',
    component: OcAppGetStartedComponent,
    decorators: [moduleMetadata(modules)],
    argsTypes: { getStarted: { action: 'Get Started Button Pressed' } },
};

const GetStartedComponent = (args: OcAppGetStartedComponent) => ({
    component: OcAppGetStartedComponent,
    moduleMetadata: modules,
    props: args,
});

export const DefaultHomePage = GetStartedComponent.bind({});

DefaultHomePage.args = {
    getStartedHeader: 'List Your App in our App Store',
    getStartedDescription: 'Register as an app developer and submit your app easily with our App Store Developer Portal',
    getStartedButtonText: 'Get Started As An App Developer',
    getStartedType: 'home',
};

export const SearchPage = GetStartedComponent.bind({});

SearchPage.args = {
    getStartedType: 'search',
    getStartedButtonText: 'More Apps For You',
    getStartedHeader: 'Discover new apps',
};
