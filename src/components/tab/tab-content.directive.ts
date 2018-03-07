import { Directive, OnInit, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[tabContent]'
})
export class TabContentDirective implements OnInit {

  private _display: string;

  @Input('tabContent') tabContentId: string;

  constructor(private ref: ElementRef) { }

  ngOnInit() {
    this._display = this.ref.nativeElement.style.display;
    this.hide();
  }

  show() {
    this.ref.nativeElement.style.display = this._display;
  }

  hide() {
    this.ref.nativeElement.style.display = 'none';
  }

}
