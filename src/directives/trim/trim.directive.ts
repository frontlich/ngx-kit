import { Directive, Input, HostListener, Optional } from '@angular/core';
import { NgModel, FormControl } from '@angular/forms';

/**
 * trim指令：去除文本框或文本域输入内容的空格
 */
@Directive({
  selector: 'input[type=text][nkTrim],textarea[nkTrim]'
})
export class TrimDirective {

  @HostListener('input', ['$event.target', '$event.target.value']) inputEvent(ele: HTMLInputElement | HTMLTextAreaElement, v: string) {

    const trimmedStr = v.replace(/\s/g, '');

    ele.value = trimmedStr;

    if (this.ngModel) {
      this.ngModel.update.emit(trimmedStr);
    }
    if (this.formControl) {
      this.formControl.setValue(trimmedStr);
    }
  }

  constructor(
    @Optional() private ngModel: NgModel,
    @Optional() private formControl: FormControl
  ) { }
}
