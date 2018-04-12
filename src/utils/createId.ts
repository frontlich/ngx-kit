const createFn = () => {
  let tempDiffer: string;
  const fn: { [prop: string]: Function } = {};
  return (differ?: string) => {
    let i: number = 0;
    if (tempDiffer !== differ && !fn[differ]) {
      tempDiffer = differ;
      return fn[differ] = () => i++;
    } else {
      return fn[differ] || (() => i++);
    }
  };
};

/**
 * 通过不同条件返回不同的创建 id 的 function
 * @return {Function} 只要条件相同就返回同一个 function
 * @param {string} differ 条件
 */
export const createIdByDiffer = createFn();

/** 创建不重复的id */
export const createId = createIdByDiffer();
