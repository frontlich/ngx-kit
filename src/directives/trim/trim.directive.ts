import { Directive, Input, HostListener, Optional } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

import { TrimConfig } from './trim.config';

@Directive({
  selector: 'input[nk-trim],textarea[nk-trim]'
})
export class TrimDirective {

  @Input('trim') flag: 'all' | 'default' = 'all';//默认全局匹配

  @HostListener('input', ['$event.target', '$event.target.value']) inputEvent(ele: HTMLInputElement|HTMLTextAreaElement, v: string) {

    let trimmedStr = this.flag === 'all' ? v.replace(/\s/g, '') : v.trim();

    ele.value = trimmedStr;

    if (this.ngM) {
      this.ngM.reset(trimmedStr);
    }
    if (this.fcName) {
      this.fcName.reset(trimmedStr);
    }
  }

  constructor(
    private config: TrimConfig,
    @Optional() private ngM: NgModel,
    @Optional() private fcName: FormControlName
  ) {
    Object.assign(this, config);
  }
}