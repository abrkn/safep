function safePromise(promise) {
  return promise.then(
    function(result) {
      return [undefined, result];
    },
    function(error) {
      return [error, undefined];
    }
  );
}

function safeFunction(fn) {
  return function() {
    var error = undefined;
    var result = undefined;

    try {
      result = fn.apply(this, arguments);
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
