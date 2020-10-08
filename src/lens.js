
export class Lens {
  constructor({ get, set }) {
    this.get = get;
    this.set = set;
    this.update = (s, f) => this.set(s, f(this.get(s)));
  }

  static array(i) {
    return new Lens({
      get: (a) => a[i],
      set: (a, new_e) => {
        return a.map((item, index) => {
          if (index !== i) {
            return item;
          }

          return new_e;
        });
      },
    });
  }

  array(i) {
    return this.compose(Lens.array(i));
  }

  static field(name) {
    return new Lens({
      get: (s) => s[name],
      set: (s, u) => ({ ...s, [name]: u }),
    });
  }

  field(name) {
    return this.compose(Lens.field(name));
  }

  static reducer(f) {
    return (l) => (state, ...args) => l.update(state, (s) => f(s, state, ...args));
  }

  reducer(f) {
    return Lens.reducer(f)(this);
  }

  props(state) {
    return { value: this.get(state), state: state, lens: this };
  }

  compose(other) {
    return new Lens({
      get: (x) => other.get(this.get(x)),
      set: (x, u) => this.set(x, other.set(this.get(x), u)),
    });
  }
}
