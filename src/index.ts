import { NgModule } from "@angular/core";

import { BreadCrumbModule, BreadCrumbComponent } from './components/breadcrumb';
import { SwitcherModule, SwitcherComponent } from './components/switcher';
import { TabModule, TabComponent, TabIndexDirective, TabContentDirective } from './components/tab';

import { AutoHeightModule, AutoheightDirective } from './directives/autoheight';
import { DragModule, DragDirective } from './directives/drag';
import { TrimModule, TrimDirective } from './directives/trim';

export {
  BreadCrumbModule, BreadCrumbComponent,
  SwitcherModule, SwitcherComponent,
  TabModule, TabComponent, TabIndexDirective, TabContentDirective,
  AutoHeightModule, AutoheightDirective,
  DragModule, DragDirective,
  TrimModule, TrimDirective
}

@NgModule({
  imports: [
    BreadCrumbModule, SwitcherModule, DragModule, 
    AutoHeightModule, TrimModule, TabModule
  ],
  exports: [
    BreadCrumbModule, SwitcherModule, DragModule, 
    AutoHeightModule, TrimModule, TabModule
  ]
})
export class NgxKitModule { }