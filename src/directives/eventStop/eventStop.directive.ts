import { Directive, Renderer2, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

/**
 * 阻止指定元素上的某事件的冒泡
 */
@Directive({
  selector: '[nkEventStop]'
})
export class EventStopDirective implements OnInit, OnDestroy {

  @Input('nkEventStop') eventNames: string | string[] = 'click';
  private removeListen: () => void = () => {};
  private removeListenList: Array<() => void> = [() => {}];

  constructor(
    private eleRef: ElementRef,
    private render: Renderer2
  ) { }

  /** 监听事件并取消冒泡  */
  listenEvent(ev: string) {
    return this.render.listen(this.eleRef.nativeElement, ev, (e: Event) => {
      e.stopPropagation();
    });
  }

  ngOnInit() {
    if(typeof this.eventNames === 'string') {
      this.removeListen = this.listenEvent(this.eventNames);
    } else {
      this.removeListenList = this.eventNames.map(event => this.listenEvent(event));
    }
  }

  ngOnDestroy() {
    this.removeListen();
    this.removeListenList.forEach(item => {
      item();
    })
  }

}