import "./myCustomBtn";

export const List = {
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
      url: "http://localhost:3000/src/data/data.js",
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
