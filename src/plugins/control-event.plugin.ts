import { Injectable, Inject, InjectionToken } from '@angular/core';
import { DOCUMENT as commonDOCUMENT } from '@angular/common';
import { EventManager, EVENT_MANAGER_PLUGINS, ɵd as EventManagerPlugin } from '@angular/platform-browser';

const DOCUMENT = commonDOCUMENT;

const BEHAVS = ['stop', 'stoppropagation', 'prev', 'preventdefault'];

/**
 * Support Event Behavior
 * stopPropagation and preventDefault
 */
@Injectable()
export class ControlEventPlugin extends EventManagerPlugin {
  manager: EventManager;

  constructor(@Inject(DOCUMENT) doc: any) { super(doc); }

  static parseEventName(eventName: string): { [key: string]: string } | null {
    const parts: string[] = eventName.toLocaleLowerCase().split('.');
    if (parts.length === 1) {
      return null;
    }
    const domEventName = parts.shift(), behav = parts.pop();
    const result: { [k: string]: string } = {};
    result['domEventName'] = domEventName;
    result['behav'] = behav;
    return result;
  }

  supports(eventName: string): boolean {
    const result = ControlEventPlugin.parseEventName(eventName);
    return result !== null && BEHAVS.some(b => b === result['behav']);
  }

  addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
    const zone = this.manager.getZone();
    const result = ControlEventPlugin.parseEventName(eventName);

    // Entering back into angular to trigger changeDetection
    const outsideHandler = (event: Event) => {
      switch (result['behav']) {
        case 'stop':
          event.stopPropagation();
          break;

        case 'stoppropagation':
          event.stopPropagation();
          break;

        case 'prev':
          event.preventDefault();
          break;

        case 'preventdefault':
          event.preventDefault();
          break;

        default:
          break;
      }
      zone.runGuarded(() => handler(event));
    };

    return this.manager.getZone().runOutsideAngular(() => {
      return this.manager.addEventListener(element, result['domEventName'], outsideHandler);
    });
  }
}

export const ControlEventPluginProvider = {
  provide: EVENT_MANAGER_PLUGINS,
  useClass: ControlEventPlugin,
  multi: true
};
