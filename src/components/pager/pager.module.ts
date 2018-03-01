import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagerComponent } from './pager.component';

import { PAGER_CONFIG_TOKEN, PagerConfig } from './pager.config';

@NgModule({
  imports: [CommonModule],
  declarations: [PagerComponent],
  exports: [PagerComponent]
})
export class PagerModule {
  static forRoot(config?: PagerConfig): ModuleWithProviders {
    return {
      ngModule: PagerModule,
      providers: [
        {
          provide: PAGER_CONFIG_TOKEN,
          useValue: Object.assign({}, config)
        }
      ]
    };
  }
}