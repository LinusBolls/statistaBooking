module.exports = {
  mongoUrl: "mongodb://localhost:27017/",
  appPort: 80,
  isSelfRegistryAllowed: true,
  mailAuth: {
    host: "SMTP",
    service: "Gmail",
    auth: {
      user: "emailAdressHere",
      pass: "passwordHere",
    },
  },
  defaultAdmin: {
    email: "default.admin@statista.com",
    password: "awerawerawert",
  },
  defaultBookingLimit: 10,
};
