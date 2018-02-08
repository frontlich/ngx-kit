import { NgModule } from '@angular/core';

import { TabComponent } from './tab.component';
import { TabIndexDirective } from './tab-index.directive';
import { TabContentDirective } from './tab-content.directive';

@NgModule({
  exports: [TabComponent, TabIndexDirective, TabContentDirective],
  declarations: [TabComponent, TabIndexDirective, TabContentDirective]
})
export class TabModule { }