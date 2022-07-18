import { Pipe, PipeTransform } from '@angular/core';
import { BookDetails } from '../models/book-details';

@Pipe({
  name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {

  transform(value: BookDetails[], filterText: string): BookDetails[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText? value.filter((bookDetails: BookDetails) =>
            bookDetails.bookName.toLocaleLowerCase().indexOf(filterText) !== -1): value;
  }

}
