import { NgModule, ModuleWithProviders } from '@angular/core';

import { DragDirective } from './drag.directive';

import { DragConfig } from './drag.config';

@NgModule({
  exports: [DragDirective],
  declarations: [DragDirective]
})
export class DragModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: DragModule, providers: [DragConfig] };
  }
}