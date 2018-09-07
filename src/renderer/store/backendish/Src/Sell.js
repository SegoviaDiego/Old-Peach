import Sequelize from "../Server/Sequelize";
import Product from "./Product";

export function identifySell(pgTotal, fbTotal) {
  return new Promise(resolve => {
    let sell = {
      ...fbTotal,
      amount: fbTotal.amount - parseFloat(pgTotal.amount),
      money: fbTotal.money - parseFloat(pgTotal.money)
    };
    Sell.CREATE_SELL(sell, () => {
      Product.DECREMENT_STOCK(sell.ProductId, sell.amount).then(() =>
        resolve()
      );
    });
  });
}

export function LOAD_SELLS(callback) {
  const Sell = Sequelize.con().import("../Models/Sell");
  Sell.findAll()
    .then(sell => {
      if (!sell || sell.length <= 0)
        response({
          payload: {
            sells: []
          }
        });
      else
        callback({
          payload: {
            sells: {
              ...sell,
              money: parseFloat(sell.money),
              amount: parseFloat(sell.amount)
            }
          }
        });
    })
    .catch(error => {
      callback({
        error: {
          error: error,
          code: 2,
          message: "Ha ocurrido un error inesperado."
        }
      });
    });
}

export function CREATE_SELL(sell, callback) {
  const Sell = Sequelize.con().import("../Models/Sell");
  const Product = Sequelize.con().import("../Models/Product");
  Product.findById(sell.ProductId).then(p => {
    if (!p) {
      callback();
    } else {
      Sell.create({ ...sell, date: new Date().toString() })
        .then(s => {
          if (!s) {
            callback({
              error: {
                code: 0,
                message: "No se ha podido crear el producto."
              }
            });
          } else {
            callback({
              payload: {
                sell: s
              }
            });
          }
        })
        .catch(error => {
          callback({
            error: {
              error: error,
              code: 2,
              message: "Ha ocurrido un error inesperado."
            }
          });
        });
    }
  });
}
