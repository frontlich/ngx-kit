/**
 * 深度assign
 * @param objArr (obj1, obj2...) 任意数量的对象
 */
export const deepAssign = (...objArr: Object[]) => {
  const firstObj = objArr[0];

  const assign = (obj1: {[key: string]: any}, obj2: {[key: string]: any}) => {
    const tempObj: {[key: string]: any} = new Object();

    Object.keys(obj2).forEach(key => {
      const v1 = obj1[key], v2 = obj2[key];
      if (typeof v1 === 'object' && typeof v2 === 'object') {
        tempObj[key] = assign(v1, v2);
      } else {
        tempObj[key] = typeof v2 === 'undefined' ? v1 : v2;
      }
    });

    return Object.assign(obj1, tempObj);
  };

  for (let i = 1; i < objArr.length; i++) {
    assign(firstObj, objArr[i]);
  }

  return firstObj;
};
