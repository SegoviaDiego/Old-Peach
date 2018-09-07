const Seq = require('sequelize');

let db = null;
const options = {
  host: "127.0.0.1",
  dialect: "postgres",
  logging: false,
  timezone: "-03:00",
  define: {
    timestamps: false,
    charset: "utf8",
    collate: "utf8_general_ci"
  },
  operatorsAliases: { ...Seq.Op }
};

export function init(callback) {
  db = new Seq("oxyrest", "postgres", "1234", options);
  db
    .authenticate()
    .then(() => {
      if (callback) callback();
    })
    .catch(err => {
      if (callback) callback(err);
    });
}

export function sync(callback) {
  db.import("./Firebird.js")
  // con().import('Logs', require('../Models/Log'));
  // con().import("../Models/Account");
  // const Product = con().import("../Models/Product");
  // const Sell = con().import("../Models/Sell");
  // const TotalSell = con().import("../Models/TotalSell");

  // Product.hasOne(TotalSell);
  // Product.hasMany(Sell);

  // con()
  //   .sync({ force: true })
  //   .then(() => {
  //     if (callback) callback();
  //   })
  //   .catch(err => {
  //     if (callback) callback(err);
  //   });
}

export function con() {
  return db;
}
