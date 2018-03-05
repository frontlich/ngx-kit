import { NgModule, ModuleWithProviders } from '@angular/core';

import { TrimDirective } from './trim.directive';

@NgModule({
  exports: [TrimDirective],
  declarations: [TrimDirective]
})
export class TrimModule { }
