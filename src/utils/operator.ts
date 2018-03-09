/** 精确加法运算 */
export const add = (num1: number, num2: number) => {
  let r1, r2, m;

  try {
    r1 = num1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }

  m = Math.pow(10, Math.max(r1, r2));
  return Math.round(num1 * m + num2 * m) / m;
};

/** 精确减法运算 */
export const sub = (num1: number, num2: number) => {
  let r1, r2, m, n;
  try {
    r1 = num1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }

  m = Math.pow(10, Math.max(r1, r2));
  n = (r1 >= r2) ? r1 : r2;

  return Number((Math.round(num1 * m - num2 * m) / m).toFixed(n));
};

/** 精确乘法运算 */
export const mul = (num1: number, num2: number) => {
  let m = 0, s1, s2;

  try {
    s1 = num1.toString();
  } catch (e) {
    s1 = '';
  }

  try {
    s2 = num2.toString();
  } catch (e) {
    s2 = '';
  }

  try { m += s1.split('.')[1].length; } catch (e) { }
  try { m += s2.split('.')[1].length; } catch (e) { }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
};

export const div = (num1: number, num2: number) => {
  let t1 = 0, t2 = 0, r1, r2;
  try {
    t1 = num1.toString().split('.')[1].length;
  } catch (e) {
    t1 = 0;
  }
  try {
    t2 = num2.toString().split('.')[1].length;
  } catch (e) {
    t2 = 0;
  }
  try {
    r1 = Number(num1.toString().replace('.', ''));
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = Number(num2.toString().replace('.', ''));
  } catch (e) {
    r2 = 0;
  }
  return mul((r1 / r2), Math.pow(10, t2 - t1));
};

export const operator = {
  add, sub, mul, div
};
