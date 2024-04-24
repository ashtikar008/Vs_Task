import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const dob = new Date(value);
    const ageDate = new Date(Date.now() - dob.getTime());
    return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
  }
}
