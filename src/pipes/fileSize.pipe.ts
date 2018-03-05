import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nkFileSize'
})
export class FileSizePipe implements PipeTransform {
  transform(value: number|string): string {
    value = Number(value);

    if (isNaN(value)) {
      return 'NaN';
    }

    const arr = ['b', 'Kb', 'Mb', 'Gb', 'Tb'];
    let num: number;
    let i = -1;

    do {
      i++;
      num = value;
      value = value / 1024;
    } while (value >= 1 && i < 4);

    return num.toFixed(2) + arr[i];
  }
}
