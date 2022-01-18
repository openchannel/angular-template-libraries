import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OcButtonComponent, OcCommonLibModule } from '@openchannel/angular-common-components/src/lib/common-components';

const modules = {
    imports: [OcCommonLibModule, BrowserAnimationsModule],
};

export default {
    title: 'Buttons [BEM]',
    component: OcButtonComponent,
    decorators: [moduleMetadata(modules)],
};

const ButtonComponent = (args: OcButtonComponent) => ({
    component: OcButtonComponent,
    template: `
        <div>
            <oc-button [text]="text" [type]="typeButton" [process]="process || false"></oc-button>
        </div>`,
    props: args,
});

export const Primary = ButtonComponent.bind({});

Primary.args = {
    text: 'Submit',
    typeButton: 'primary',
};

export const Secondary = ButtonComponent.bind({});

Secondary.args = {
    text: 'Cancel',
    typeButton: 'secondary',
};

export const Warning = ButtonComponent.bind({});

Warning.args = {
    text: 'Warning',
    typeButton: 'warning',
};

export const Link = ButtonComponent.bind({});

Link.args = {
    text: 'Submit',
    typeButton: 'link',
};

export const Progress = ButtonComponent.bind({});

Progress.args = {
    text: 'Submit',
    typeButton: 'primary',
    process: true,
};

export const ProgressSecondary = ButtonComponent.bind({});

ProgressSecondary.args = {
    text: 'Submit',
    typeButton: 'secondary',
    process: true,
};
