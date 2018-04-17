import { Component, Input, TemplateRef, Output, EventEmitter, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { CheckboxService } from './checkbox.service';

@Component({
  selector: 'nk-checkbox',
  // templateUrl: './checkbox.component.html',
  // styleUrls: ['./checkbox.component.scss'],
  template:
    `
  <div class="checkbox" (click)="toggle()">
    <ng-template #default let-state="state" let-disabled="disabled">
      <div class="checkbox-item {{state}} {{disabled?'disabled':''}}">
        <i class="checked">√</i>
        <i class="indeterminate">-</i>
      </div>
    </ng-template>
    <ng-template [ngTemplateOutlet]="checkboxTemplate || default"
    [ngTemplateOutletContext]="{state: state, disabled: disabled}"></ng-template>
  </div>
  `,
  styles: [
    `
    .checkbox {
      display: inline-block;
      vertical-align: middle; }
    .checkbox .checkbox-item {
      width: 20px;
      height: 20px;
      border: 1px solid #e1e3eb;
      cursor: pointer; }
    .checkbox .checkbox-item:hover {
      border-color: #57b9f8; }
    .checkbox .checkbox-item > i {
      display: none;
      user-select: none; }
    .checkbox .checkbox-item.disabled {
      background: #f5f7fa;
      cursor: not-allowed; }
    .checkbox .checkbox-item.disabled:hover {
      border-color: #e1e3eb; }
    .checkbox .checkbox-item.disabled.checked, .checkbox .checkbox-item.disabled.indeterminate {
      background: #d2d8e0;
      border-color: #d2d8e0; }
    .checkbox .checkbox-item.checked {
      background: #57b9f8;
      border-color: #57b9f8; }
      .checkbox .checkbox-item.checked > i.checked {
        display: block;
        text-align: center;
        width: 18px;
        line-height: 18px;
        color: #fff;
        font-style: normal;
        font-weight: bold; }
    .checkbox .checkbox-item.indeterminate {
      background: #57b9f8;
      border-color: #57b9f8; }
    .checkbox .checkbox-item.indeterminate > i.indeterminate {
      display: block;
      text-align: center;
      width: 18px;
      line-height: 18px;
      color: #fff;
      font-style: normal;
      font-weight: bold; }
    .checkbox .checkbox-item.indeterminate > i.indeterminate {
      font-size: 21px;
      line-height: 15px; }
  `],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckBoxComponent),
    multi: true
  }]
})
export class CheckBoxComponent implements OnInit, ControlValueAccessor, OnDestroy {

  state: string;

  private onChange: Function = Function.prototype;
  private onTouched: Function = Function.prototype;

  private _checked: boolean;
  /** @property boolean 选中状态 */
  set checked(v: boolean) {
    this._checked = v;
    this.state = v ? 'checked' : 'unchecked';
    this.onChange(v ? this.checkedValue : this.uncheckedValue);
  }
  get checked() {
    return this._checked;
  }

  // checkbox模板
  @Input() checkboxTemplate: TemplateRef<any>;

  // 选中时绑定的值
  @Input() checkedValue: any = true;
  // 未选中时绑定的值
  @Input() uncheckedValue: any = false;
  // 是否禁用
  private _disabled: boolean;
  @Input()
  set disabled(v: boolean) {
    this._disabled = !!v;
    if (v) {
      this.unregisterCheckbox();
    } else {
      this.registerCheckbox();
    }
  }
  get disabled() {
    return this._disabled;
  }

  // 半选状态
  private _indeterminate: boolean;
  @Input()
  set indeterminate(v: boolean) {
    this._indeterminate = v;
    if (v) {
      this.state = 'indeterminate';
    }
  }
  get indeterminate() {
    return this._indeterminate;
  }

  @Input() parentId: string;
  @Input() childId: string;

  @Output() checkChange = new EventEmitter<boolean>();
  @Output() indeterminateChange = new EventEmitter<boolean>();
  @Output() countChange = new EventEmitter<number>();

  constructor(private checkService: CheckboxService) { }

  ngOnInit() {
    this.registerCheckbox();
  }

  registerCheckbox() {
    if (this.parentId) {
      this.checkService.registerParentCheckbox(this.parentId, this);
    }
    if (this.childId) {
      this.checkService.registerChildCheckbox(this.childId, this);
    }
  }

  unregisterCheckbox() {
    if (this.parentId) {
      this.checkService.unregisterParent(this.parentId, this);
    }
    if (this.childId) {
      this.checkService.unregisterChild(this.childId, this);
    }
  }

  writeValue(value: any) {
    if (!this.indeterminate && value !== undefined && value !== null) {
      this.checked = this.checkedValue === value;
      this.checkChange.emit(this.checked);
    }
  }

  registerOnChange(fn: (_: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: (_: any) => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  toggle() {
    if (this.disabled) { return; }
    this.checked = !this.checked;
    this.checkChange.emit(this.checked);
  }

  ngOnDestroy() {
    this.unregisterCheckbox();
    this.checkChange.complete();
    this.indeterminateChange.complete();
  }
}
