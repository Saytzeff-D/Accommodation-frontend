import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'visitFilter'
})
export class VisitFilterPipe implements PipeTransform {

  transform(value: any[], visitDate: any) {
    if(!visitDate) return value;
    let filteredDate = value.filter(each=> each.checkIn.includes(visitDate) || each.checkOut.includes(visitDate))
    return filteredDate
  }

}
