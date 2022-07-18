import { Pipe, PipeTransform } from '@angular/core';
import { PublishingHouse } from '../models/publishing-house';

@Pipe({
  name: 'publishingHouseFilter'
})
export class PublishingHouseFilterPipe implements PipeTransform {

  transform(value: PublishingHouse[], filterText: string): PublishingHouse[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (publishingHouse: PublishingHouse) =>
          publishingHouse.publishingHouseName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }

}
