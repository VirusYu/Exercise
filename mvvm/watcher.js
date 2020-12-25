function Watcher(vm, expOrFn, cb) {
  this.cb = cb;
  this.vm = vm;
  this.expOrFn = expOrFn;
  this.depIds = {};

  if (typeof expOrfn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = this.parseGetter(expOrFn.trim());
  }

  this.value = this.get();
}
