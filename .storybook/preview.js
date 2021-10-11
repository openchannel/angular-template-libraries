import '!style-loader!css-loader!sass-loader!../projects/angular-common-components/assets/styles/styles.scss';
import '!style-loader!css-loader!sass-loader!../.storybook/font-family.scss';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import '@angular/localize/init';

import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

export const parameters = {
  viewport: {
    viewports: MINIMAL_VIEWPORTS,
  },
  controls: { expanded: true },
};
