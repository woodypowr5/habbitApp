import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: "adjustedDate"
})
export class AdjustedDatePipe implements PipeTransform {
  transform(value: any, date: moment.Moment, index: any) {
    console.log(arguments)
    console.log(index)
    if (!date) {
      return '';
    }
    date = moment(date).add(index - 2, 'days');
    return date.format("DD MMM");
  }
}