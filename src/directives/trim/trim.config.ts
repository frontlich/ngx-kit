import { Injectable } from '@angular/core';

@Injectable()
export class TrimConfig {
  flag: string = 'all';//默认全局匹配空白符
}