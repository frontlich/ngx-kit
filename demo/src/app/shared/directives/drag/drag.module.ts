import { NgModule, ModuleWithProviders } from '@angular/core';

import { DragDirective } from './drag.directive';
import { DragConfig, DRAG_CONFIG_TOKEN } from "./drag.config";

@NgModule({
  exports: [DragDirective],
  declarations: [DragDirective]
})
export class DragModule {
  static forRoot(config?: DragConfig): ModuleWithProviders {
    return {
      ngModule: DragModule, providers: [
        {
          provide: DRAG_CONFIG_TOKEN,
          useValue: config ? config : {
            delay: 0,//默认延时0毫秒
            maxZIndex: 9999,//默认最大z-index为9999
            stopClickEvent: true//默认组件拖拽时元素上的点击事件
          }
        }
      ]
    };
  }
}