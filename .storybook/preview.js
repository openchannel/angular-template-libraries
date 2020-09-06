import '!style-loader!css-loader!sass-loader!../projects/oc-ng-common-component/assets/styles/styles.scss';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

export const parameters = {
  viewport: {
    viewports: MINIMAL_VIEWPORTS,
  },
  controls: { expanded: true },

};
