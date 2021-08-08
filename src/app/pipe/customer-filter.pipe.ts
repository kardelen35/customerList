import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';
import { CustomerModel } from '../model/customer-dash board.model';

@Pipe({
  name: 'customerFilter',
})
export class CustomerFilterPipe implements PipeTransform {
  transform(value: CustomerModel[], filterText: string): CustomerModel[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';

    return filterText
      ? value.filter(
          (c: CustomerModel) =>
            c.firstName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
