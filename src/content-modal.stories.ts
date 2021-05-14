import { moduleMetadata } from '@storybook/angular';
import { OcCommonLibModule, OcContentModalComponent } from '@openchannel/angular-common-components/src/lib/common-components';
import { Component } from '@angular/core';

// @Component({
//     selector: 'content-modal-wrapper',
//     template: `
//         <div>
//             <oc-content-modal modalTitle="Test modal title"></oc-content-modal>
//             <ng-template #modalContent>
//                 <p>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu sollicitudin nulla. Donec ultrices ornare velit. Donec
//                     ac molestie eros, at aliquet ligula. Ut et nibh lorem. Vestibulum egestas ac sapien eu fermentum. Cras ac ex a nulla
//                     maximus porta id eget velit. Nulla et eros at arcu efficitur ullamcorper vel quis lacus. Morbi a posuere mauris. Fusce
//                     rhoncus, eros nec ullamcorper varius, neque turpis ornare est, ac lacinia massa libero vitae erat. Ut ullamcorper in
//                     metus et condimentum. Aliquam condimentum, dolor in gravida ullamcorper, tortor dui ultrices ante, a tincidunt ante nisl
//                     id sapien. Duis semper aliquam eleifend. Nullam eget commodo magna, in luctus nulla. Sed sit amet feugiat magna.
//                     Phasellus vitae aliquam nulla. Suspendisse placerat dui tortor, at molestie ipsum egestas ut. Nullam eget mollis lectus.
//                     Sed augue sem, egestas sed lobortis quis, ultricies vel lorem. In vel ex nec mi gravida ornare dapibus nec neque. Mauris
//                     laoreet cursus augue, id sagittis quam varius non. Donec nec ipsum nec quam condimentum euismod eu quis lacus. Ut ut
//                     faucibus mi.
//                 </p>
//             </ng-template>
//         </div>
//     `,
// })
// export class ContentModalWrapperComponent {
//     constructor() {}
// }

const modules = {
    imports: [OcCommonLibModule],
};

export default {
    title: 'Content modal [BEM]',
    component: OcContentModalComponent,
    decorators: [moduleMetadata(modules)],
};

const ContentModal = (args: OcContentModalComponent) => ({
    component: OcContentModalComponent,
    moduleMetadata: modules,
    props: args,
    template: `
        <div style="margin-top: 100px;">
            <oc-content-modal modalTitle="Test modal title" 
                              [customContentTemplate]="modalContent" [closeButton]="true"></oc-content-modal>
            <ng-template #modalContent>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu sollicitudin nulla. Donec ultrices ornare velit. Donec
                    ac molestie eros, at aliquet ligula. Ut et nibh lorem. Vestibulum egestas ac sapien eu fermentum. Cras ac ex a nulla
                    maximus porta id eget velit. Nulla et eros at arcu efficitur ullamcorper vel quis lacus. Morbi a posuere mauris. Fusce
                    rhoncus, eros nec ullamcorper varius, neque turpis ornare est, ac lacinia massa libero vitae erat. Ut ullamcorper in
                    metus et condimentum. Aliquam condimentum, dolor in gravida ullamcorper, tortor dui ultrices ante, a tincidunt ante nisl
                    id sapien. Duis semper aliquam eleifend. Nullam eget commodo magna, in luctus nulla. Sed sit amet feugiat magna.
                    Phasellus vitae aliquam nulla. Suspendisse placerat dui tortor, at molestie ipsum egestas ut. Nullam eget mollis lectus.
                    Sed augue sem, egestas sed lobortis quis, ultricies vel lorem. In vel ex nec mi gravida ornare dapibus nec neque. Mauris
                    laoreet cursus augue, id sagittis quam varius non. Donec nec ipsum nec quam condimentum euismod eu quis lacus. Ut ut
                    faucibus mi.
                </p>
                     <ul> <strong> List Example:</strong>
                     <li>Ut et mollis ex. Sed eu dolor erat. In purus leo, dapibus eget turpis sit amet, ultrices efficitur ligula. Donec nec velit neque.
                      Morbi porta tellus id sem consectetur, quis pretium augue rutrum.</li>
                     <li>Aenean ut purus non dui porttitor mattis. 
                      Morbi hendrerit lacus ante, sit amet feugiat lectus hendrerit sed.</li>
                     <li>Etiam bibendum ullamcorper ligula, 
                      eu ullamcorper quam tincidunt non. Aliquam varius tellus non lacinia sodales. </li>
                     <li>Suspendisse neque tortor,
                       sodales eget ultrices varius, efficitur eu elit. Vestibulum ut erat augue. Suspendisse non scelerisque massa,
                        vel gravida erat. In tortor lectus, congue tempus augue quis, vestibulum varius nisi. Nam quis molestie libero.
                        </li>
                     </ul> 
                 <p> 
                     Aliquam risus est, condimentum sodales lobortis quis, ullamcorper id justo. Vestibulum feugiat 
                     lacus ante, vel dictum felis euismod a. Vestibulum ante ipsum primis in faucibus orci luctus et
                      ultrices posuere cubilia curae; Nam venenatis ante a augue rutrum congue. Nam nec porta risus. 
                      Integer sed dui eget velit dapibus dapibus. Praesent sed tincidunt massa. Maecenas nec mi 
                      tincidunt neque consequat pellentesque. Phasellus egestas tempor nibh non pulvinar. 
                      Donec pretium velit consectetur ullamcorper congue. Vivamus vitae ante purus. 
                      Nam tellus nisi, lobortis vel viverra sit amet, mollis ut felis. Phasellus tincidunt metus odio,
                       sed elementum nunc congue sit amet. Nulla ut tellus et ligula mattis lobortis. 
                       Morbi scelerisque iaculis nunc eget pharetra. 
                </p>
            </ng-template>
        </div>
    `,
});

export const modal = ContentModal.bind({});

modal.args = {};
