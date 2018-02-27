import { NgModule } from "@angular/core";

import { BreadCrumbModule, BreadCrumbComponent } from './components/breadcrumb';
import { SwitcherModule, SwitcherComponent } from './components/switcher';
import { TabModule, TabComponent, TabIndexDirective, TabContentDirective } from './components/tab';
import { PagerModule, Pager, PagerComponent } from './components/pager';

import { AutoHeightModule, AutoheightDirective } from './directives/autoheight';
import { DragModule, DragDirective } from './directives/drag';
import { TrimModule, TrimDirective } from './directives/trim';

import { FactoryPipe } from './pipes/factory.pipe';
import { NumToChinesePipe } from './pipes/numberToChinese.pipe';
import { FileSizePipe } from './pipes/fileSize.pipe';

export {
  BreadCrumbModule, BreadCrumbComponent,
  SwitcherModule, SwitcherComponent,
  TabModule, TabComponent, TabIndexDirective, TabContentDirective,
  PagerModule, Pager, PagerComponent,

  AutoHeightModule, AutoheightDirective,
  DragModule, DragDirective,
  TrimModule, TrimDirective,

  FactoryPipe, NumToChinesePipe, FileSizePipe
}

const MODULES = [
  BreadCrumbModule, SwitcherModule, DragModule,
  AutoHeightModule, TrimModule, TabModule,
  PagerModule
];

const PIPES = [
  FactoryPipe, NumToChinesePipe, FileSizePipe
]

@NgModule({
  imports: MODULES,
  exports: [...MODULES, ...PIPES],
  declarations: PIPES
})
export class NgxKitModule { }