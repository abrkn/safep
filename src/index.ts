import assert = require('assert');
import { promisify } from 'util';

type SafeError = [Error, undefined];
type SafeResult<T> = [undefined, T];
type SafeErrorOrResult<R> = SafeError | SafeResult<R>;

function isSafeError<R>(tuple: SafeErrorOrResult<R>): tuple is SafeError {
  const [error, result] = tuple;

  return error instanceof Error && result === undefined;
}

function isSafeResult<R>(tuple: SafeErrorOrResult<R>): tuple is SafeResult<R> {
  const [error] = tuple;

  return error === undefined;
}

export async function safePromise<R>(promise: PromiseLike<R>): Promise<SafeErrorOrResult<R>> {
  return promise.then((result: R) => [undefined, result], (error: Error) => [error, undefined]);
}

// export function safeFunction(fn: ) {
//   return function() {
//     var error = undefined;
//     var result = undefined;

//     try {
//       result = fn.apply(this, arguments);
//     } catch (e) {
//       error = e;
//     }

//     return safePromise(error ? Promise.reject(error) : Promise.resolve(result));
//   };
// }

// // applyTo(target, ...methods)
// function applyTo() {
//   const target = arguments[0];
//   assert(target, 'target is required');

//   const methods = Array.prototype.slice.call(arguments, 1);

//   for (const name of methods) {
//     const asyncName = name + 'Async';
//     const safeName = name + 'Safe';

//     target[asyncName] = promisify(target[name].bind(target));
//     target[safeName] = safeFunction(target[asyncName]);
//   }

//   return target;
// }

// exports.safePromise = safePromise;
// exports.safeFunction = safeFunction;
// exports.applyTo = applyTo;
