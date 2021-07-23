module.exports = {
  mongoUrl: "mongodb://localhost:27017/",
  appPort: 80,
  isSelfRegistryAllowed: true,
  mailAuth: require("./emailCredentials"),
  defaultAdmin: {
    email: "default.admin@statista.com",
    password: "awerawerawert",
  },
  defaultBookingLimit: 10,
};
