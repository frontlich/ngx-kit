import { ElementRef, HostListener, Directive } from '@angular/core';

@Directive({
  selector: 'textarea[nk-autoheight]'
})
export class AutoheightDirective {
  private ele: HTMLTextAreaElement;
  private _height: number;
  private _val: string;

  constructor(private element: ElementRef){
    this.ele = this.element.nativeElement;
    this.ele.style.overflow = 'hidden';
    this.ele.style.height = 'auto';
    this._height = this.ele.scrollHeight;
  }

  ngAfterViewChecked() {
    if(this._val !== this.ele.value || this._height !== this.ele.scrollHeight) {
      this._val = this.ele.value;
      this.adjust();
    }
  }

  adjust() {
    if(!this.ele){return};
    
    this.ele.style.height = '0';//重置height, scrollHeight

    let tHeight = this.ele.scrollHeight;
    this._height = tHeight;
    this.ele.style.height = tHeight + "px";
  }
}
