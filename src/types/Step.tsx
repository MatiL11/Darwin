export enum Step {
    WELCOME = 'welcome',
    FORM = 'form',
    WORKER = 'worker',
    SCHEDULE = 'schedule',
    CONTACT = 'contact'
}

export type StepKey = keyof typeof Step;

export type StepValue = typeof Step[StepKey];