import { NgModule } from "@angular/core";

import { SwitcherModule, SwitcherComponent } from './components/switcher';

import { DragModule, DragDirective } from './directives/drag';
import { TrimModule, TrimDirective } from './directives/trim';

export {
  SwitcherModule, SwitcherComponent,
  DragModule, DragDirective,
  TrimModule, TrimDirective
}

@NgModule({
  imports: [SwitcherModule, DragModule, TrimModule],
  exports: [SwitcherModule, DragModule, TrimModule]
})
export class NgxKitModule { }