import { NgModule, ModuleWithProviders } from '@angular/core';

import { EventStopDirective } from './eventStop.directive'

@NgModule({
  exports: [EventStopDirective],
  declarations: [EventStopDirective]
})
export class EventStopModule {}