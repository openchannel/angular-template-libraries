import '!style-loader!css-loader!sass-loader!../projects/oc-ng-common-component/assets/styles/styles.scss';

import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);
