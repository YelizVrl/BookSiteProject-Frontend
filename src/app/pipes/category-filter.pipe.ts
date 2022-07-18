import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/category';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(value: Category[], filterText: string): Category[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText? value.filter((category: Category) =>
            category.categoryName.toLocaleLowerCase().indexOf(filterText) !== -1): value;
  }
}
