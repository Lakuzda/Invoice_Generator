import { AbstractControl, ValidatorFn } from '@angular/forms';

export function integerValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    return Number.isInteger(value) ? null : { notInteger: true };
  };
}
