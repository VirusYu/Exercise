const data = {
  name: "test",
};

observe(data);

data.name = "ergou";

function observe(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  Object.keys(data).forEach((key) => {
    defineReactive(data, key, data[key]);
  });
}

function defineReactive(data, key, val) {
  const dep = new Dep();
  // 监听子属性
  observe(val);
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get: function () {
      return val;
    },
    set: function (newVal) {
      if (val === newVal) return false;
      console.log(`get new value: ${newVal}`);
      val = newVal;
      dep.notify();
    },
  });
}

function Dep() {
  this.subs = [];
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },
  notify: function () {
    this.subs.forEach((sub) => {
      sub.update();
    });
  },
};
