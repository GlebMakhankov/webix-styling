export default webix.protoUI(
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
