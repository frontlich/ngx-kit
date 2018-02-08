import { NgModule } from "@angular/core";

import { SwitcherModule, SwitcherComponent } from './components/switcher';
import { TabModule, TabComponent, TabIndexDirective, TabContentDirective } from './components/tab';

import { DragModule, DragDirective } from './directives/drag';
import { TrimModule, TrimDirective } from './directives/trim';

export {
  SwitcherModule, SwitcherComponent,
  TabModule, TabComponent, TabIndexDirective, TabContentDirective,
  DragModule, DragDirective,
  TrimModule, TrimDirective
}

@NgModule({
  imports: [SwitcherModule, DragModule, TrimModule, TabModule],
  exports: [SwitcherModule, DragModule, TrimModule, TabModule]
})
export class NgxKitModule { }