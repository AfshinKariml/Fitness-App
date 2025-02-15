import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
  name: 'persianDate',
  pure: true
})
export class PersianDatePipe implements PipeTransform {
  transform(value: any): string {
    if (!value) {
      return '';
    }

    try {
      
      if (typeof value === 'number') {
        value = new Date(value);
      }

      
      if (typeof value === 'string') {
        
        if (!isNaN(Number(value))) {
          value = new Date(Number(value));
        } else {
          value = new Date(value);
        }
      }

      
      return moment(value).locale('fa').format('YYYY/MM/DD');
    } catch (error) {
      console.error('Error in PersianDatePipe:', error);
      return '';
    }
  }
}