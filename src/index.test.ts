import { safePromise } from './index';

describe('safePromise', () => {
  test('returns error from promise', async () => {
    const errorToReturn = new Error('safep');

    const [error, result] = await safePromise(Promise.reject(errorToReturn));

    expect(error).toBe(errorToReturn);
    expect(result).toBeUndefined();
  });

  test('returns result from promise', async () => {
    const [error, result] = await safePromise(Promise.resolve('satoshi'));

    expect(error).toBeUndefined();
    expect(result).toBe('satoshi');
  });

  test('returns result from promise with type guard', async () => {
    const [error, result] = await safePromise(Promise.resolve({ name: 'satoshi' }));
    expect(error).toBe(undefined);

    if (error !== undefined) {
      throw new Error('Type guard');
    }

    if (result === undefined) {
      throw new Error('Type guard');
    }

    expect(result).toEqual({ name: 'satoshi' });
  });
});
