import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';
import { OcConsentComponent } from '@openchannel/angular-common-components';
import { action } from '@storybook/addon-actions';

const modules = {
    imports: [OcCommonLibModule],
};

export default {
    title: 'Consent checkbox [BEM]',
    component: OcConsentComponent,
    decorators: [moduleMetadata(modules)],
    argTypes: { checkedChange: action('Checkbox value') },
};

const ConsentComponent = (args: OcConsentComponent) => ({
    component: OcConsentComponent,
    moduleMetadata: modules,
    props: args,
});

export const DefaultTermsAndConsent = ConsentComponent.bind({});
DefaultTermsAndConsent.args = {
    termsUrl: 'https://support.openchannel.io/documentation/api/',
    policyUrl: 'https://support.openchannel.io/documentation/api/',
    value: false,
};

export const DisabledTermsAndConsent = ConsentComponent.bind({});
DisabledTermsAndConsent.args = {
    termsUrl: 'https://support.openchannel.io/documentation/api/',
    policyUrl: 'https://support.openchannel.io/documentation/api/',
    value: true,
    disabled: true,
};
