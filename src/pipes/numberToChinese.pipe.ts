import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nkNumToChinese'
})
export class NumToChinesePipe implements PipeTransform {

  CHINESE_NUM_LOW: string[] = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  CHINESE_NUM_UP: string[] = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾'];
  CHINESE_NUM_ARR: string[];

  UNIT_LOW: string[] = ['千', '百', '十', ''];
  UNIT_UP: string[] = ['仟', '佰', '拾', ''];
  UNIT_ARR: string[];
  expression: string;

  /**转换整数*/
  transformInt(num: string): string {

    if (num.length > 16) { return '数字过大' };

    let zero = this.expression === '一' ? '〇' : '零';

    //获取四位数的中文字符
    let getStr = (n: string) => {
      let _arr = n.split('');

      while (_arr.length < 4) {//凑四位数，不然导致单位错误
        _arr.unshift('0');
      }

      let newArr = new Array();
      let noZero = true;

      for (let i = 0; i < _arr.length; i++) {
        if (_arr[i] !== '0') {
          newArr.push(this.transformFloat(_arr[i]) + this.UNIT_ARR[i]);
          noZero = true;
        } else {
          if (_arr[i] === '0' && noZero) {
            newArr.push(this.transformFloat(_arr[i]));
            noZero = false;
          }
        }
      }

      //去掉末尾零
      let four_str = newArr.join('');
      while (four_str.slice(-1) === zero) {
        four_str = four_str.slice(0, -1);
      }

      return four_str;//返回四位数字中文字符
    };

    let numArr = [num.slice(-16, -12), num.slice(-12, -8), num.slice(-8, -4), num.slice(-4)],
      unitArr = ['兆', '亿', '万', ''];

    let chinese_num_up = '';
    numArr.forEach((v, i) => {
      if (v.length !== 0) {
        chinese_num_up += getStr(v) + unitArr[i];
      }
    });

    //去掉首位零
    while (chinese_num_up.charAt(0) === zero) {
      chinese_num_up = chinese_num_up.slice(1);
    }

    return !chinese_num_up ? zero : chinese_num_up;
  }

  /**转换小数*/
  transformFloat(num: string): string {
    return num.split('').map(i => this.CHINESE_NUM_ARR[Number(i)]).join('');
  }

  transform(value: number | string, expression: string = '一'): string {
    let num = Number(value);

    if (isNaN(num)) { return 'NaN' }

    this.expression = expression;
    this.CHINESE_NUM_ARR = expression === '壹' ? this.CHINESE_NUM_UP : this.CHINESE_NUM_LOW;
    this.UNIT_ARR = expression === '壹' ? this.UNIT_UP : this.UNIT_LOW;

    let [_int = '0', _float = ''] = Math.abs(num).toString().split('.');

    return (num < 0 ? '负' : '') + this.transformInt(_int) + (!_float ? '' : '点') + this.transformFloat(_float);
  }
}
