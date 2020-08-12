import { storiesOf } from '@storybook/angular';
import { withA11y } from '@storybook/addon-a11y';
import { OcCommonLibModule, OcMenuGridComponent, OcSellerAgreementComponent } from 'projects/oc-ng-common-component/src/public-api';


const modules = {
    imports: [OcCommonLibModule]
};

// let application = new Applications();


storiesOf('sellerAgreement', module)
    .addDecorator(withA11y)
    .add('agreement', () => ({
        component: OcSellerAgreementComponent,
       
        props: {
            title: 'Seller Agreement',
            type: 'secondary',
            closeButtonText: 'Close',
            //confirmButtonText: 'Confirm',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse convallis turpis maximus, efficitur mi non, convallis lectus. Vestibulum aliquam pellentesque tempor. Sed molestie ligula diam, a rhoncus ipsum sollicitudin feugiat. Sed tempor vulputate arcu a eleifend. Maecenas hendrerit sit amet tellus sed blandit. Nunc vestibulum risus leo, vel mollis massa fringilla eu. Aliquam porttitor urna dignissim sapien facilisis sollicitudin. Cras euismod orci arcu, et varius elit interdum et. Mauris aliquam mi ligula, ac egestas nisi faucibus et. Phasellus ultrices accumsan elit eget viverra. Vestibulum hendrerit lorem eu nunc lacinia, eget iaculis augue cursus. Praesent aliquet facilisis mollis. Duis ullamcorper felis eget tempus sagittis. Praesent ac tellus rutrum, lobortis urna sit amet, finibus augue. Maecenas vel augue Phasellus et enim tristique, ornare turpis nec, consectetur sapien. Donec libero nisl, scelerisque id aliquam nec, bibendum non magna. Maecenas vitae tincidunt libero. Pellentesque eget nisi eu ex tempus hendrerit et eu est. Quisque elementum mattis ligula sed blandit. Morbi quam lorem, tincidunt id massa non, tristique vehicula mauris. Phasellus lacinia accumsan velit, eu pellentesque tortor mollis a. Integer consequat gravida eros, vitae suscipit quam convallis sit amet. Maecenas feugiat eu mi sit amet consequat. Nullam sit amet diam finibus, sagittis tortor et, pellentesque nulla. Donec nec dictum leo. Sed vitae ipsum ultricies, molestie risus eu, iaculis orci. Aliquam et magna venenatis, commodo diam quis, ultricies dolor. Maecenas commodo at velit vitae ultrices.Curabitur a augue erat. Nunc egestas viverra dolor, vel faucibus nisl ultricies dapibus. Nulla facilisi. Donec sed sapien non libero vestibulum pharetra sed non nisi. Cras at nibh sed nulla tempor ultricies. Nam vestibulum suscipit vulputate. Nullam sed magna ac lectus consequat scelerisque. Pellentesque commodo est augue, in rhoncus nibh rhoncus sollicitudin. Vivamus tincidunt ex at arcu vehicula, non fermentum ex molestie. Aliquam fermentum, eros sit amet finibus facilisis, magna felis finibus mi, at lacinia sem odio sed elit. Nulla facilisi. Vivamus in varius nunc. Nam mattis mi sed tristique tristique. Nam eu elit ornare, vulputate odio at, ultrices leo. Quisque eu elit sit amet nibh vehicula molestie quis id arcu. Nunc blandit, magna sed placerat malesuada, elit ante commodo augue, ac lobortis arcu nunc eu purus. Mauris gravida egestas est vel dapibus. Nunc hendrerit, nisl sit amet vulputate lacinia, justo quam commodo ligula, ut tempor leo ante eget lectus. Nulla ullamcorper diam augue. Etiam et lectus id ex ultrices ullamcorper vitae dapibus velit. Praesent ultricies nibh in sollicitudin consequat. Donec rutrum accumsan lacus ornare rhoncus.',
            //informationalText:'You can keep the changes as draft',
            textVariable: ''
          },
          
    }));





    // .add('Default', () => (
    //     <Modal {...props.default()}>
    //       <p className="wfp--modal-content__text">
    //         Please see ModalWrapper for more examples and demo of the functionality.
    //       </p>
    //     </Modal>
    //   ))