/*
 * PubSub
 * 发布订阅
 */

function PubSub() {
  this.handlers = {};
}

PubSub.prototype.on = function (type, handler) {
  if (!this.handlers[type]) {
    this.handlers[type] = [];
  }
  this.handlers[type].push(handler);
};

PubSub.prototype.emit = function () {
  const type = Array.prototype.shift.call(arguments);
  if (!this.handlers[type]) {
    return false;
  }
  this.handlers[type].forEach((item) => {
    item.apply(this, arguments);
  });
};

PubSub.prototype.off = function (type, handle) {
  const handles = this.handlers[type];
  if (handles) {
    if (!handle) {
      handles.length = 0;
    } else {
      handles.forEach((item, index) => {
        if (item.name === handle) {
          handles.splice(index, 1);
        }
      });
    }
  }
};

const hand1 = new PubSub();
hand1.on("sub", function (text) {
  console.log(text, "~~~~~~~");
});

hand1.on("sub1", function (text) {
  console.log(text, "~~~~~~~");
});

hand1.on("sub1", echoText);

function echoText(text) {
  console.log(text, "echo~~~~");
}

hand1.emit("sub", "测试");
hand1.emit("sub1", "测试11111");
console.log("######################");
hand1.off("sub1", "echoText");
hand1.emit("sub1", "测试222222");
console.log("######################");
hand1.off("sub1");
hand1.emit("sub1", "测试3333");
