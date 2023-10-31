export const headerUser = [
  {
    title: "Full Name",
    key: "name",
    render: (val) => val.firstname + val.lastname,
  },
  { title: "Username", key: "username" },
  {
    title: "Email",
    key: "email",
  },
  { title: "Phone Number", key: "phone" },
  {
    title: "Address",
    key: "address",
    render: (val) => val.street + val.number,
  },
  { title: "City", key: "address", child: "city" },
];

export const listEntries = [5, 10, 15, 20, 25];
