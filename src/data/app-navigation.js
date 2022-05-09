const menuItems = [
  {
    text: "About",
    route: "/"
  },

  {
    text: "Page-one",

    items: [
      {
        text: "subpage-one",
        route: "/about"
      },
      {
        text: "subpage-two",
        route: "/about"
      },
      {
        text: "subpage-three",
        route: "/about"
      },
      {
        text: "subpage-four",
        route: "/about"
      }
    ]
  },

  {
    text: "Page-three",
    expanded: true,
    items: [
      {
        text: "Video Players"
      },
      {
        text: "Projectors"
      }
    ]
  },

  {
    text: "Page-two",
    expanded: true,
    items: [
      {
        text: "Video Players"
      },
      {
        text: "Projectors"
      }
    ]
  }
];

export default {
  getMenuItems() {
    return menuItems;
  }
};
