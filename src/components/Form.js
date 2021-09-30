import "./myCustomForm";

export const Form = {
  view: "myCustomForm",
  fields: ["one", "two", "three"],
  elements: [{ template: "Edit Films", type: "section" }],
  saveAction: () =>
    webix.message(`Attached action to the <strong>Save</strong> button`),
  cancelAction: () =>
    webix.message(`Attached action to the <strong>Cancel</strong> button`),
};
