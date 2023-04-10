import { Store } from "../index";

describe("string stores", () => {
  const store = new Store<string>("stringStores", "J. Doe");

  test("can retrieve default strings", () => {
    expect(store.get()).toBe("J. Doe");
  });

  test("can set string values", () => {
    store.set("B. Ross");
    expect(store.get()).toBe("B. Ross");
  });

  test("can concatenate strings", () => {
    store.set(store.get() + " (Painter)");
    expect(store.get()).toBe("B. Ross (Painter)");
  });
});

describe("number stores", () => {
  const store = new Store<number>("numberStores", 1);

  test("can retrieve default numbers", () => {
    expect(store.get()).toBe(1);
  });

  test("can set number values", () => {
    store.set(2);
    expect(store.get()).toBe(2);
  });

  test("can do arithmetic on stored number values", () => {
    store.set(store.get() + 2);
    expect(store.get()).toBe(4);
  });
});

describe("object stores", () => {
  type StoreType = { foo: string; bar: string; baz?: string };
  const defaults: StoreType = { foo: "bar", bar: "baz" };
  const store = new Store<StoreType>("objectStores", defaults);

  test("can retrieve objects", () => {
    expect(store.get()).toEqual(defaults);
  });

  test("does not store references", () => {
    expect(store.get()).not.toBe(defaults);
  });

  test("can override required properties", () => {
    store.set({ bar: "doe" });
    expect(store.get()).toEqual({ foo: "bar", bar: "doe" });
  });

  test("can override optional properties", () => {
    store.set({ baz: "foo" });
    expect(store.get()).toEqual({ foo: "bar", bar: "doe", baz: "foo" });
  });
});

describe("type safety", () => {
  test("treats zero as a number", () => {
    const store = new Store<number>("respectZero", 0);
    expect(store.get()).toBe(0);
  });
});

describe("property access", () => {
  const store = new Store<{ foo: string }>("propertyAccess", { foo: "bar" });

  test("can retrieve via dot notation", () => {
    expect(store.get().foo).toBe("bar");
  });

  test("can retrieve via property inheritance", () => {
    expect(store.foo).toBe("bar");
  });

  test("can retrieve via dot notation after update", () => {
    store.set({ foo: "baz" });
    expect(store.get().foo).toBe("baz");
  });

  test("can retrieve via property inheritance after update", () => {
    expect(store.foo).toBe("baz");
  });
});
