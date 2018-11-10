const assert = require('assert');
const { promisify } = require('util');

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

// applyTo(target, ...methods)
function applyTo() {
  const target = arguments[0];
  assert(target, 'target is required');

  const methods = Array.prototype.slice.call(arguments, 1);

  for (const name of methods) {
    const asyncName = name + 'Async';
    const safeName = name + 'Safe';

    target[asyncName] = promisify(target[name].bind(target));
    target[safeName] = safeFunction(target[asyncName]);
  }

  return target;
}

exports.safePromise = safePromise;
exports.safeFunction = safeFunction;
exports.applyTo = applyTo;
