export default webix.protoUI(
  {
    name: "myCustomButton",
    $cssName: "myCustomButton",
    $init: function (config) {
      this.addCssClass();
      config.value = config.states[config.state];
      this.attachEvent("onItemClick", function () {
        this.stateChange();
      });
    },

    addCssClass() {
      const config = this.config;
      webix.html.addCss(
        this.getNode(),
        `myCustomButton_option_${config.state || 0}`
      );
    },

    stateChange() {
      const config = this.config;
      config.state !== Object.keys(config.states).length - 1
        ? config.state++
        : (config.state = 0);
      for (let key in config.states) {
        webix.html.removeCss(this.getNode(), `myCustomButton_option_${key}`);
      }
      this.addCssClass();
      this.callEvent("onStateChange", [config.state, config.states]);
    },
  },
  webix.ui.button
);
