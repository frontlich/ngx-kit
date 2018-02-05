import { NgModule, ModuleWithProviders } from '@angular/core';

import { TrimDirective } from './trim.directive';

import { TrimConfig } from './trim.config';


@NgModule({
  exports: [TrimDirective],
  declarations: [TrimDirective]
})
export class TrimModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: TrimModule, providers: [TrimConfig] };
  }
}