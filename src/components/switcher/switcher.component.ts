import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * 开关组件
 * 默认checked-value为true，unchecked-value为false
 */
@Component({
  selector: 'nk-switcher',
  template: `
    <div class="switcher" [class.switcher-on]="isOpen" (click)="toggle()">
      <div class="switcher-ball"></div>
    </div>
  `,
  styles: [`
    .switcher{
      position: relative;
      width: 40px;
      height: 20px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 20px;
      cursor: pointer;
      box-sizing: border-box;
    }

    .switcher>.switcher-ball{
      position: absolute;
      left: 0;
      top: 0;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #ccc;
      transition: all .5s;
    }

    .switcher-on>.switcher-ball{
      left: 20px;
      background: #57b9f8;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitcherComponent),
      multi: true
    }
  ]
})
export class SwitcherComponent implements ControlValueAccessor {

  isOpen: boolean;

  private onChange: Function;
  private onTouched: Function;

  @Input('checked-value') checked: any = true;
  @Input('unchecked-value') unchecked: any = false;

  toggle() {
    this.isOpen = !this.isOpen;
    this.onChange(this.isOpen ? this.checked : this.unchecked);
  }

  writeValue(v: any) {
    this.isOpen = v === this.checked;
  }

  registerOnChange(fn: (_: any) => {}) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this.onTouched = fn;
  }
}
