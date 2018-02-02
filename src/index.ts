import { NgModule } from '@angular/core';
import { DragModule } from './directives/drag/drag.module';

export {
  DragModule
}

@NgModule({
  imports: [DragModule],
  exports: [DragModule]
})
export class NgxKitModule {}