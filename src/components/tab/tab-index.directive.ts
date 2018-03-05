import { Directive, Input, Output, EventEmitter, HostListener, ElementRef, OnDestroy } from '@angular/core';

@Directive({
  selector: '[nkTabIndex]'
})
export class TabIndexDirective implements OnDestroy {

  @Output() choose = new EventEmitter();

  @Input('nkTabIndex') tabId: string;

  @HostListener('click') clickEvent() {
    this.choose.emit(this.tabId);
  }

  constructor(private ref: ElementRef) { }

  ngOnDestroy() {
    this.choose.unsubscribe();
  }

  addClass(v: string) {
    this.ref.nativeElement.classList.add(v);
  }

  removeClass(v: string) {
    this.ref.nativeElement.classList.remove(v);
  }

}
