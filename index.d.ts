// Type definitions for localgeneric v1.1.0
// Project: localgeneric
// Definitions by: Ryan Barr <https://github.com/ryanbarr>
declare class _GenericStore<T> {
  public key: string;

  constructor(key: string, defaults?: T);

  public get(): T;
  public set(v: T | Partial<T>): void;
}

type GenericStore<T> = _GenericStore<T> & T;

export declare const Store: new <T>(key: string, data?: T) => GenericStore<T>;
