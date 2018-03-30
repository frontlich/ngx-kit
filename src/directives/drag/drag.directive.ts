import { Directive, Inject, Optional, OnInit, Input, Output, HostListener, ElementRef, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';

import { DRAG_CONFIG_TOKEN, DragConfig } from './drag.config';


/**
 * 拖拽指令，选择器三选一;
 * drag : 任意拖拽，
 * dragX: 沿X轴拖拽
 * dragY：沿Y轴拖拽
 */
@Directive({
  selector: '[nkDrag],[nkDragX],[nkDragY]'
})
export class DragDirective implements OnInit {
  private ele: any;
  private dragSub: Subscription = new Subscription();
  private _canDrag: boolean = false;
  private startX: number; // 起始位置x
  private startY: number; // 起始位置y
  private _zIndex: number;
  private _transition: string;

  /** 是否能拖拽 */
  @Input() canDrag: boolean = true;
  /** 拖拽之前的延时毫秒数，默认为0毫秒 */
  @Input() delay: number = 0;
  /** 在组件中最大的z-index值，为了使元素在拖拽时不被遮挡 */
  @Input() maxZIndex: number = 9999;
  /** 拖拽时是否阻止元素上的点击事件，默认阻止 */
  @Input() stopClickEvent: boolean = true;
  @Input() private nkDrag: boolean = true;
  @Input() private nkDragX: boolean = true;
  @Input() private nkDragY: boolean = true;

  @Output() dragStart = new EventEmitter<{ dom: HTMLElement, left: number, top: number }>();
  @Output() dragMove = new EventEmitter<{ dom: HTMLElement, left: number, top: number }>();
  @Output() dragEnd = new EventEmitter<{ dom: HTMLElement, left: number, top: number }>();

  @HostListener('click', ['$event'])
  onClick(e: MouseEvent) {
    if (this.canDrag && this.stopClickEvent) {
      return false;
    }
  }

  @HostListener('mousedown', ['$event'])
  moveStart(e: MouseEvent) {
    if (!this.canDrag) { return; }
    e.preventDefault();
    this.dragSub = Observable.timer(this.delay).subscribe(() => {
      this._canDrag = true;
      if (!this.nkDrag || !this.nkDragY) {
        this.startY = e.clientY - this.ele.offsetTop;
      }
      if (!this.nkDrag || !this.nkDragX) {
        this.startX = e.clientX - this.ele.offsetLeft;
      }
      this.ele.style.zIndex = this.maxZIndex;
      this.ele.style.transition = 'none';
      this.dragStart.emit({ dom: this.ele, left: this.ele.offsetLeft, top: this.ele.offsetTop });
    });
  }

  @HostListener('document:mousemove', ['$event'])
  moving(e: MouseEvent) {
    if (!this._canDrag) {
      return false;
    }

    let top = e.clientY - this.startY,
      left = e.clientX - this.startX;

    if (top < 0) {
      top = 0;
    }
    if (top > this.ele.offsetParent.offsetHeight - this.ele.offsetHeight) {
      top = this.ele.offsetParent.offsetHeight - this.ele.offsetHeight;
    }
    if (left < 0) {
      left = 0;
    }
    if (left > this.ele.offsetParent.offsetWidth - this.ele.offsetWidth) {
      left = this.ele.offsetParent.offsetWidth - this.ele.offsetWidth;
    }

    if (!this.nkDrag || !this.nkDragX) {
      this.ele.style.left = left + 'px';
    }
    if (!this.nkDrag || !this.nkDragY) {
      this.ele.style.top = top + 'px';
    }
    this.dragMove.emit({ dom: this.ele, left: left, top: top });
    return false;
  }

  @HostListener('document:mouseup')
  moveEnd() {
    this.reset();
  }

  reset() {
    this.dragSub.unsubscribe();
    if (this._canDrag) {
      this.ele.style.zIndex = this._zIndex;
      this.ele.style.transition = this._transition;
      this.dragEnd.emit({ dom: this.ele, left: this.ele.offsetLeft, top: this.ele.offsetTop });
    }
    this._canDrag = false;
  }

  constructor(private el: ElementRef, @Optional() @Inject(DRAG_CONFIG_TOKEN) _config: DragConfig) {
    Object.assign(this, _config || {});
    this.ele = this.el.nativeElement;
  }

  ngOnInit() {
    this._zIndex = this.ele.style.zIndex;
    this._transition = this.ele.style.transition;
    if (!this.ele.style.position) {
      this.canDrag = false;
      throw new Error('drag指令：样式中必须要有定位属性');
    }
  }
}
