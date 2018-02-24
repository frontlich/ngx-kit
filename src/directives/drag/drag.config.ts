import { InjectionToken } from '@angular/core';

export interface DragConfig {
  delay?: number;
  maxZIndex?: number;
  stopClickEvent?: boolean;
}

export const DRAG_CONFIG_TOKEN = new InjectionToken<DragConfig>('drag.config');
