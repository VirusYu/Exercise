function Compile(el) {
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);
  if (this.$el) {
    this.$fragment = this.node2Fragment(this.$el);
    this.init();
    this.$el.appendChild(this.$fragment);
  }
}

Compile.prototype = {
  init: function () {
    this.compileElement(this.$fragment);
  },
  node2Fragment: function (el) {
    let fragment = document.createDocumentFragment(),
      child;
    while ((child = el.firstChild)) {
      fragment.appendChild(child);
    }
    return fragment;
  },
};
