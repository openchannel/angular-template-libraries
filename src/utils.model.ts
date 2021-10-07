import { Provider } from '@angular/core';
import {
    AbstractErrorMessageConfiguration,
    DefaultErrorMessageConfiguration,
} from '@openchannel/angular-common-components/src/lib/common-components';

// --- providers ---
export const ERROR_MESSAGES_STORY_PROVIDER: Provider = {
    provide: AbstractErrorMessageConfiguration,
    useValue: new DefaultErrorMessageConfiguration(),
};
