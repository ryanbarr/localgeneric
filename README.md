# localgeneric

`localgeneric` is a type-safe wrapper for `localStorage` which provides support for [TypeScript generics](https://www.typescriptlang.org/docs/handbook/2/generics.html).

## Installation

```cli
npm install localgeneric
```

## Examples

This example shows getting and setting a string value in localStorage under the key `stringStore`. TypeScript will error if an attempt to set a non-string value is made.

```typescript
import { Store } from "localgeneric";

const myStore = new Store<string>("stringStore", "J. Doe");
console.log(myStore.get()); // output: "J. Doe"

myStore.set("B. Ross");
console.log(myStore.get()); // output: "B. Ross"
```

Objects can be stored with their types enforced, with direct access to an object's properties on the store itself:

```typescript
import { Store } from "localgeneric";

interface StoreProps {
  foo: string;
  bar: number;
  baz?: boolean;
}

const myStore = new Store<StoreProps>({ foo: "bar", bar: 1 });

console.log(myStore.foo); // Output: "bar"
console.log(myStore.bar); // Output: 1
console.log(myStore.baz); // Output: undefined
```
