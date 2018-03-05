import { Injectable, Inject, InjectionToken } from '@angular/core';
import { DOCUMENT as commonDOCUMENT } from '@angular/common';
import { EventManager, EVENT_MANAGER_PLUGINS, ɵd as EventManagerPlugin } from '@angular/platform-browser';

const DOCUMENT = commonDOCUMENT;

/**
 * Support Multi Event
 */
@Injectable()
export class MultiEventPlugin extends EventManagerPlugin {
  manager: EventManager;

  constructor(@Inject(DOCUMENT) doc: any) { super(doc); }

  getMultiEventArray(eventName: string): string[] {
    return eventName.toLocaleLowerCase().split(',').filter(item => !!item); // click,mouseover => [click,mouseover]
  }

  supports(eventName: string): boolean {
    return this.getMultiEventArray(eventName).length > 1;
  }

  addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
    const zone = this.manager.getZone();
    const eventsArray = this.getMultiEventArray(eventName);

    // Entering back into angular to trigger changeDetection
    const outsideHandler = (event: any) => {
      zone.runGuarded(() => handler(event));
    };

    return this.manager.getZone().runOutsideAngular(() => {
      const off: Function[] = eventsArray.map(eName => this.manager.addEventListener(element, eName, outsideHandler));

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
};
