export class _GenericStore<T> {
  public key: string;

  constructor(key: string, defaults?: T) {
    const proto = { ..._GenericStore.prototype };
    if (defaults) Object.assign(proto, Object.getPrototypeOf(defaults));
    Object.setPrototypeOf(this, proto);
    Object.assign(this, defaults);

    this.key = key;

    if (defaults && typeof defaults === "object") {
      this.set(Object.assign({}, defaults, this.get()));
    } else if (typeof defaults !== "undefined") {
      this.set(this.get() || defaults);
    }
  }

  get = () => {
    const data = window.localStorage.getItem(this.key);
    return data ? JSON.parse(data) : null;
  };

  set = (value: T | Partial<T>) => {
    Object.assign(this, value);
    return window.localStorage.setItem(
      this.key,
      JSON.stringify(
        typeof value === "object" ? Object.assign({}, this.get(), value) : value
      )
    );
  };
}

type GenericStore<T> = _GenericStore<T> & T;

export const Store: new <T>(key: string, data?: T) => GenericStore<T> =
  _GenericStore as any;
