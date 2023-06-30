import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookingsFilter'
})
export class BookingsFilterPipe implements PipeTransform {

  transform(value: any[], user: any) {
    if(!user)return value;
    let filteredUser = value.filter(each=>each.firstName.toLowerCase().includes(user.toLowerCase()) || each.lastName.toLowerCase().includes(user.toLowerCase()))
    return filteredUser
  }

}
