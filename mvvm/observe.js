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
  observe(val);
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get: function () {
      return val;
    },
    set: function (newVal) {
      console.log(`get new value: ${newVal}`);
      val = newVal;
    },
  });
}
