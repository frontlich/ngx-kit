import { NgModule, ModuleWithProviders } from '@angular/core';

import { AutoheightDirective } from './autoheight.directive';

@NgModule({
  exports: [AutoheightDirective],
  declarations: [AutoheightDirective]
})
export class AutoHeightModule { }
