import { Pipe, PipeTransform } from '@angular/core';
import { Writer } from '../models/writer';

@Pipe({
  name: 'writerFilter'
})
export class WriterFilterPipe implements PipeTransform {

  transform(value: Writer[], filterText: string): Writer[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText? value.filter((writer: Writer) =>
            writer.writerName.toLocaleLowerCase().indexOf(filterText) !== -1): value;
  }

}
