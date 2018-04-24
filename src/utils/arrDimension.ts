/**
 * 数组降维
 * @param arr 数组
 */
export const decreaseDimension = (arr: Array<any>) => {
  const tempArr: any[] = [];
  arr.forEach(item => {
    if (item instanceof Array) {
      tempArr.push(...item);
    } else {
      tempArr.push(item);
    }
  });
  return tempArr;
};

/**
 * 数组升维
 * @param arr 数组
 * @param step 步长
 */
export const increaseDimension = (arr: Array<any>, step: number = 1) => {
  return Array.from({ length: Math.ceil(arr.length / step) }).map((v, i) => arr.slice(i * step, (i + 1) * step));
};
