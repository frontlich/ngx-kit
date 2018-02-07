import { Directive, Input, HostListener, Optional } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

/**
 * trim指令：去除文本框或文本域输入内容的空格
 */
@Directive({
  selector: 'input[type=text][nk-trim],textarea[nk-trim]'
})
export class TrimDirective {

  @HostListener('input', ['$event.target', '$event.target.value']) inputEvent(ele: HTMLInputElement | HTMLTextAreaElement, v: string) {

    const trimmedStr = v.replace(/\s/g, '');

    ele.value = trimmedStr;

    if (this.ngM) {
      this.ngM.reset(trimmedStr);
    }
    if (this.fcName) {
      this.fcName.reset(trimmedStr);
    }
  }

  constructor(
    @Optional() private ngM: NgModel,
    @Optional() private fcName: FormControlName
  ) { }
}