import { InjectionToken } from '@angular/core';

export interface PagerConfig {
  /** @property 分页符长度 */
  paginationLength: number;
  /** @property 极简模式  */
  simpleModel: boolean;
  /** @property 是否能自定义pageSize大小 */
  customPageSize: boolean;
}

export const PAGER_CONFIG_TOKEN = new InjectionToken<PagerConfig>('pager.config');
