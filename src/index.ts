import { NgModule } from "@angular/core";

import { BreadCrumbModule, BreadCrumbComponent } from './components/breadcrumb';
import { SwitcherModule, SwitcherComponent } from './components/switcher';
import { TabModule, TabComponent, TabIndexDirective, TabContentDirective } from './components/tab';
import { PagerModule, Pager, PagerComponent } from './components/pager';

import { AutoHeightModule, AutoheightDirective } from './directives/autoheight';
import { DragModule, DragDirective } from './directives/drag';
import { TrimModule, TrimDirective } from './directives/trim';

export {
  BreadCrumbModule, BreadCrumbComponent,
  SwitcherModule, SwitcherComponent,
  TabModule, TabComponent, TabIndexDirective, TabContentDirective,
  PagerModule, Pager, PagerComponent,
  AutoHeightModule, AutoheightDirective,
  DragModule, DragDirective,
  TrimModule, TrimDirective
}

const MODULES = [
  BreadCrumbModule, SwitcherModule, DragModule,
  AutoHeightModule, TrimModule, TabModule,
  PagerModule
]

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class NgxKitModule { }