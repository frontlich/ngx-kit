import { Injectable, Inject } from '@angular/core';
import { EventManager, DOCUMENT, EVENT_MANAGER_PLUGINS, ɵd as EventManagerPlugin } from '@angular/platform-browser';

/**
 * Support Multi Event
 */
@Injectable()
export class MultiEventPlugin extends EventManagerPlugin {
  manager: EventManager;

  constructor(@Inject(DOCUMENT) doc: any) { super(doc); }

  getMultiEventArray(eventName: string): string[] {
    return eventName.split(",")   // click,mouseover => [click,mouseover]
      .filter((item, index): boolean => { return item && item != '' })
  }

  supports(eventName: string): boolean {
    return this.getMultiEventArray(eventName).length > 1;
  }

  addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
    let zone = this.manager.getZone();
    let eventsArray = this.getMultiEventArray(eventName);

    // Entering back into angular to trigger changeDetection
    let outsideHandler = (event: any) => {
      zone.runGuarded(() => handler(event));
    };

    return this.manager.getZone().runOutsideAngular(() => {
      let off: Function[] = eventsArray.map(eventName => this.manager.addEventListener(element, eventName, outsideHandler));

      return () => {
        off.forEach(evt => evt());
      };
    });
  }
}

export const MultiEventPluginProvider = {
  provide: EVENT_MANAGER_PLUGINS,
  useClass: MultiEventPlugin,
  multi: true
}