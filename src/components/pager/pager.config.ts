import { InjectionToken } from '@angular/core';

export interface PagerConfig {
}

export const PAGER_CONFIG_TOKEN = new InjectionToken<PagerConfig>('pager.config');