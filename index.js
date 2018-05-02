function safePromise(promise) {
  return promise.then(result => [undefined, result]).catch(error => [error, undefined]);
}

function safeFunction(fn) {
  return function(...args) {
    let error = undefined;
    let result = undefined;

    try {
      result = fn.apply(this, args);
    } catch (e) {
      error = e;
    }

    return safePromise(error ? Promise.reject(error) : Promise.resolve(result));
  };
}

Object.assign(exports, {
  safePromise,
  safeFunction,
});
