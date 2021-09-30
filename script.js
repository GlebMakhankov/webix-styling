/*
 *Custom Button Component
 */

webix.protoUI(
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

const customBtnPart = {
  rows: [
    {
      view: "toolbar",
      value: "Btn1",
      margin: 10,
      padding: 10,
      elements: [
        {
          view: "label",
          label: "Sort list: ",
          align: "right",
        },
        {
          view: "myCustomButton",
          inputWidth: 150,
          states: { 0: "Off", 1: "Sort Asc", 2: "Sort Desc" },
          state: 0,
          on: {
            onStateChange: function (state, options) {
              this.setValue(options[state]);
              const moviesList = $$("moviesList");
              switch (state) {
                case 1:
                  moviesList.sort("#title#", "asc");
                  break;
                case 2:
                  moviesList.sort("#title#", "desc");
                  break;

                default:
                  moviesList.sort("#id#", "asc", "int");
                  break;
              }
            },
          },
        },
      ],
    },
    {
      view: "list",
      id: "moviesList",
      url: "./data.js",
      type: {
        height: 60,
      },
      template: (obj) =>
        `<strong>${+obj.id}. ${obj.title}</strong><div> Year:${
          obj.year
        }, rank:${obj.rank} </div>`,
    },
  ],
};

/*
 *Custom Form Component
 */

webix.protoUI(
  {
    name: "myCustomForm",
    defaults: {
      margin: 10,
    },
    $init: function (config) {
      config.elements = [
        ...config.fields.map((element) => ({
          view: "text",
          label: [element],
          name: [element],
        })),
        {
          margin: 10,
          cols: [
            {
              view: "button",
              value: "Cancel",
              click: () =>
                (
                  config.cancelAction ??
                  function () {
                    webix.message(
                      `No action was attached to the <strong>Cancel</strong> button`
                    );
                  }
                )(),
            },
            {
              view: "button",
              value: "Save",
              css: "webix_primary",
              click: () =>
                (
                  config.saveAction ??
                  function () {
                    webix.message(
                      `No action was attached to the <strong>Save</strong> button`
                    );
                  }
                )(),
            },
          ],
        },
      ];
    },
  },
  webix.ui.form
);

const customFormPart = {
  view: "myCustomForm",
  fields: ["one", "two", "three"],
  elements: [{ template: "Edit Films", type: "section" }],
  saveAction: () =>
    webix.message(`Attached action to the <strong>Save</strong> button`),
  cancelAction: () =>
    webix.message(`Attached action to the <strong>Cancel</strong> button`),
};
//---------------------------------

webix.ui({
  cols: [customBtnPart, customFormPart],
});
