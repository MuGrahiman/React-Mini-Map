
export const options = [
    {
      name: "PG Map ", // Name it whatever you prefer
      subName: "Play Ground Map", // Name it whatever you prefer
      description: "Map for studying through the playing process ",
      property: "PG-dem-v1",
      stops: [],
    },
    {
      name: "3D Map", // Name it whatever you prefer
      subName: "terrain Map", // Name it whatever you prefer
      description: "terrain 3d Map ",
      property: "terrain-dem-v1",
      stops: [],
    },
    {
      name: "Heat Map", // Name it whatever you prefer
      subName: "Heat Map", // Name it whatever you prefer
      description: "Heat Map ",
      property: "Heat-v12",
      stops: [],
    },
    {
      name: "Street", // Name it whatever you prefer
      subName: "Normal", // Name it whatever you prefer
      description: "Street Map ",
      property: "streets-v12",
      stops: [],
    },
    {
      name: "Out Door", // Name it whatever you prefer
      subName: "Normal", // Name it whatever you prefer
      description: "Out Door Map ",
      property: "outdoors-v12",
      stops: [],
    },
    {
      name: "Dark", // Name it whatever you prefer
      subName: "Normal", // Name it whatever you prefer
      description: "Dark Theme Map ",
      property: "dark-v11",
      stops: [],
    },
    {
      name: "Light", // Name it whatever you prefer
      subName: "Normal", // Name it whatever you prefer
      description: "Light Theme Map ",
      property: "light-v11",
      stops: [],
    },
    {
      name: "Satelight", // Name it whatever you prefer
      subName: "Normal", // Name it whatever you prefer
      description: "Satelight Theme Map ",
      property: "satellite-streets-v12",
      stops: [],
    },
    {
      name: "Population",
      subName: "colored", // Name it whatever you prefer
      description: "Estimated total population",
      property: "pop_est",
      stops: [
        [0, "#f8d5cc"],
        [1000000, "#f4bfb6"],
        [5000000, "#f1a8a5"],
        [10000000, "#ee8f9a"],
        [50000000, "#ec739b"],
        [100000000, "#dd5ca8"],
        [250000000, "#c44cc0"],
        [500000000, "#9f43d7"],
        [1000000000, "#6e40e6"],
      ],
    },
    {
      name: "GDP",
      subName: "colored", // Name it whatever you prefer
      description: "Estimate total GDP in millions of dollars",
      property: "gdp_md_est",
      stops: [
        [0, "#f8d5cc"],
        [1000, "#f4bfb6"],
        [5000, "#f1a8a5"],
        [10000, "#ee8f9a"],
        [50000, "#ec739b"],
        [100000, "#dd5ca8"],
        [250000, "#c44cc0"],
        [5000000, "#9f43d7"],
        [10000000, "#6e40e6"],
      ],
    },
  ];