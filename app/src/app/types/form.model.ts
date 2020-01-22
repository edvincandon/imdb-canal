import { ValidatorFn } from '@angular/forms';

declare global {
  interface SearchFields {
    title: string;
    year: string;
  }

  interface FormControlData {
    label: string;
    key: string;
    type: 'text' | 'hidden';
    readonly?: boolean;
    validators?: ValidatorFn[];
  }
}
