export default webix.protoUI(
  {
    name: "myCustomButton",
    $cssName: "myCustomButton",
    $init: function (config) {
      function addCssClass(that) {
        webix.html.addCss(
          that.getNode(),
          `myCustomButton_option_${config.state}`
        );
      }
      addCssClass(this);
      config.value = config.states[config.state];
      this.attachEvent("onItemClick", function () {
        config.state !== Object.keys(config.states).length - 1
          ? config.state++
          : (config.state = 0);
        for (let key in config.states) {
          webix.html.removeCss(this.getNode(), `myCustomButton_option_${key}`);
        }
        addCssClass(this);
        this.callEvent("onStateChange", [config.state, config.states]);
      });
    },
  },
  webix.ui.button
);
