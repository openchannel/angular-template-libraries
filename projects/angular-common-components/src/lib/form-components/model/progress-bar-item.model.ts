export interface FormProgressbarStep {
    title: string;
    state: 'pristine' | 'finished' | 'invalid';
    defaultDivider: boolean;
}
