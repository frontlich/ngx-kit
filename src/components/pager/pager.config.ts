import { InjectionToken } from '@angular/core';

export interface PagerConfig {
  /** @property 分页符长度 */
  paginationLength: number;
  /** @property 极简模式  */
  simpleModel: boolean;
}

export const PAGER_CONFIG_TOKEN = new InjectionToken<PagerConfig>('pager.config');
