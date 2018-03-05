import { Pipe, PipeTransform } from '@angular/core';

/**
 * @description 工厂管道
 *
 * pattern key1: value1, key2: value2, ... ; default: defaultValue
 *
 * 示例：{{ XXX | nkFactory:"true: 男, false: 女; default: 未知"}}
 *
 */
@Pipe({
  name: 'nkFactory'
})
export class FactoryPipe implements PipeTransform {
  transform(value: string, expression: string): string {

    if (value === null || value === undefined) {
      return '';
    }

    value = value.toString();

    if (!expression) {
      return '';
    }

    expression = expression.replace(/\s/g, ''); // 去除空格

    const [pattern, defaultValue] = expression.split(';default:'), // 获取验证规则和默认值

      validators = pattern.split(',').map(item => item.split(':')), // 获取验证器数组

      matchedValue = validators.filter(item => value === item[0])[0]; // 过滤出符合条件的验证器

    return matchedValue ? matchedValue[1] : defaultValue;

  }
}
