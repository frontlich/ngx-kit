import { Injectable } from '@angular/core';

@Injectable()
export class DragConfig {
  delay: number = 0;//默认延时0毫秒
  maxZIndex: number = 9999;//默认最大z-index为9999
  stopClickEvent: boolean = true;//默认组件拖拽时元素上的点击事件
}