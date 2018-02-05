import { NgModule } from '@angular/core';

import { DragModule, DragDirective } from './directives/drag';
import { TrimModule, TrimDirective } from './directives/trim';

export {
  DragModule, DragDirective,
  TrimModule, TrimDirective
}

@NgModule({
  imports: [DragModule,TrimModule],
  exports: [DragModule,TrimModule]
})
export class NgxKitModule { }