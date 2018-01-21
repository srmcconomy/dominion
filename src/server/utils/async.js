class ChainablePromise {
  constructor(value) {
    this.promise = Promise.resolve(value);
  }

  then(res) {
    res(this.promise);
  }
}

const _async = {
  async forEach(arr, func) {
    for (let i = 0; i < arr.length; i++) {
      await func(arr[i], i, arr);
    }
  },

  async find(arr, func) {
    for (let i = 0; i < arr.length; i++) {
      if (await func(arr[i], i, arr)) {
        return arr[i];
      }
    }
    return null;
  },

  async some(arr, func) {
    for (let i = 0; i < arr.length; i++) {
      if (await func(arr[i], i, arr)) {
        return true;
      }
    }
    return false;
  },

  async filter(arr, func) {
    const newArray = [];
    for (let i = 0; i < arr.length; i++) {
      if (await func(arr[i], i, arr)) {
        newArray.push(arr[i]);
      }
    }
    return newArray;
  },

  async map(arr, func) {
    const newArray = new Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
      newArray[i] = await func(arr[i], i, arr);
    }
    return newArray;
  },
};

Object.keys(_async).forEach(method => {
  ChainablePromise.prototype[method] = function wrapper(...args) {
    this.promise = this.promise.then(val => _async[method](val, ...args));
    return this;
  };
});

const async = arr => new ChainablePromise(arr);
Object.keys(_async).forEach(method => {
  async[method] = (...args) => new ChainablePromise(_async[method](...args));
});

export default async;
