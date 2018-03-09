/**
 * 获取连续数字的数组
 * @param start 开始
 * @param end 结束
 */
export const sequArr = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }).map((v, i) => i + start);
};

/**
 * 获取等差数列
 * @param start 开始
 * @param count 数量
 * @param step 间隔
 */
export const arithSequ = (start: number, count: number, step: number = 1) => {
  return Array.from({ length: count }).map((v, i) => i * step + start);
};

/**
 * 获取等比数列
 * @param start 开始
 * @param count 数量
 * @param rate 倍率
 */
export const geoSequ = (start: number, count: number, rate: number = 1) => {
  return Array.from({ length: count }).map((v, i) => Math.pow(rate, i) - 1 + start);
};

/**
 * 获取斐波那契数列
 * @param count 数量
 */
export const fiboSequ = (count: number) => {
  if (count < 2) { return [1]; }

  const sum = [1, 1];

  for (let i = 2; i < count; i++) {
    sum[i] = sum[i - 1] + sum[i - 2];
  }

  return sum;
};
