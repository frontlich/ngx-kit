import { NgModule } from "@angular/core";

import { BreadCrumbModule, BreadCrumbComponent } from './components/breadcrumb';
import { SwitcherModule, SwitcherComponent } from './components/switcher';
import { TabModule, TabComponent, TabIndexDirective, TabContentDirective } from './components/tab';
import { PagerModule, Pager, PagerComponent } from './components/pager';

import { AutoHeightModule, AutoheightDirective } from './directives/autoheight';
import { DragModule, DragDirective } from './directives/drag';
import { TrimModule, TrimDirective } from './directives/trim';
import { EventStopModule, EventStopDirective } from './directives/eventStop';

import { FactoryPipe } from './pipes/factory.pipe';
import { NumToChinesePipe } from './pipes/numberToChinese.pipe';
import { FileSizePipe } from './pipes/fileSize.pipe';

export { MultiEventPlugin, MultiEventPluginProvider } from './plugins/multi-event.plugin';

export {
  BreadCrumbModule, BreadCrumbComponent,
  SwitcherModule, SwitcherComponent,
  TabModule, TabComponent, TabIndexDirective, TabContentDirective,
  PagerModule, Pager, PagerComponent,

  AutoHeightModule, AutoheightDirective,
  DragModule, DragDirective,
  TrimModule, TrimDirective,
  EventStopModule, EventStopDirective,

  FactoryPipe, NumToChinesePipe, FileSizePipe
}

const MODULES = [
  BreadCrumbModule, SwitcherModule, TabModule, PagerModule,
  AutoHeightModule,  DragModule, TrimModule, EventStopModule
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