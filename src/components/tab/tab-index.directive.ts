import { Directive, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[tabIndex]'
})
export class TabIndexDirective {

  @Output() onChoose = new EventEmitter();

  @Input('tabIndex') tabId: string;

  @HostListener('click') clickEvent() {
    this.onChoose.emit(this.tabId);
  }

  constructor(private ref: ElementRef) { }

  ngOnDestory() {
    this.onChoose.unsubscribe();
  }

  addClass(v: string) {
    this.ref.nativeElement.classList.add(v);
  }

  removeClass(v: string) {
    this.ref.nativeElement.classList.remove(v);
  }

}