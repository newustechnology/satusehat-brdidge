export const endpoints = [
  {
    name: "Patient",
    path: "/Patient",
    method: "GET",
    query: ["identifier", "name", "birthdate", "gender"],
  },
  {
    name: "Patient",
    path: "/Patient",
    method: "GET",
    query: [],
  },
] as const;

export type EndpointName = (typeof endpoints)[number]["name"];
