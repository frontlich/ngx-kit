import { NgModule } from '@angular/core';

import { BreadCrumbModule, BreadCrumbComponent } from './components/breadcrumb';
import { CheckBoxModule, CheckBoxComponent } from './components/checkbox';
import { SwitcherModule, SwitcherComponent } from './components/switcher';
import { TabModule, TabComponent, TabIndexDirective, TabContentDirective } from './components/tab';
import { PagerModule, Pager, PagerComponent } from './components/pager';
import { DatepickerModule, DatepickerComponent } from './components/datapicker';

import { AutoHeightModule, AutoheightDirective } from './directives/autoheight';
import { DragModule, DragDirective } from './directives/drag';
import { TrimModule, TrimDirective } from './directives/trim';

import { FactoryPipe } from './pipes/factory.pipe';
import { NumToChinesePipe } from './pipes/numberToChinese.pipe';
import { FileSizePipe } from './pipes/fileSize.pipe';

export { MultiEventPlugin, MultiEventPluginProvider } from './plugins/multi-event.plugin';
export { ControlEventPlugin, ControlEventPluginProvider } from './plugins/control-event.plugin';

export * from './utils';

export {
  BreadCrumbModule, BreadCrumbComponent,
  CheckBoxModule, CheckBoxComponent,
  SwitcherModule, SwitcherComponent,
  TabModule, TabComponent, TabIndexDirective, TabContentDirective,
  PagerModule, Pager, PagerComponent,
  DatepickerModule, DatepickerComponent,

  AutoHeightModule, AutoheightDirective,
  DragModule, DragDirective,
  TrimModule, TrimDirective,

  FactoryPipe, NumToChinesePipe, FileSizePipe
};

const MODULES = [
  BreadCrumbModule, CheckBoxModule, SwitcherModule, TabModule, PagerModule, DatepickerModule,
  AutoHeightModule, DragModule, TrimModule
];

const PIPES = [
  FactoryPipe, NumToChinesePipe, FileSizePipe
];

@NgModule({
  imports: MODULES,
  exports: [...MODULES, ...PIPES],
  declarations: PIPES
})
export class NgxKitModule { }
