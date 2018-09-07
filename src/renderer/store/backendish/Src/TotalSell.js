import Sequelize from "../Controllers/Sequelize";
import Sell from "./Sell";

export function identifyTotals(fbSells) {
  new Promise(resolve => {
    TotalSell.LOAD_TOTALS(resolve);
  }).then(async res => {
    if (res.payload) {
      let totals = TotalSell.toMap(res.payload.totals);
      fbSells = TotalSell.toMap(fbSells);
      await fbSells.forEach(async (fbTotal, id) => {
        let pgTotal = totals.get(id);
        if (pgTotal == null) {
          pgTotal = await new Promise(resolve => {
            TotalSell.CREATE_TOTAL(fbTotal, resolve);
          });
          if (pgTotal.error) {
            console.log(pgTotal.error.error);
          } else {
            await Sell.identifySell(
              {
                money: 0,
                amount: 0
              },
              fbTotal
            );
          }
        } else if (!TotalSell.isEqual(pgTotal, fbTotal)) {
          await Sell.identifySell(pgTotal, fbTotal);
          await TotalSell.UPDATE_TOTAL(pgTotal, fbTotal);
        }
      });
    }
  });
}

export function isEqual(a, b) {
  if (
    a.ProductId == b.ProductId &&
    parseFloat(a.amount) == parseFloat(b.amount) &&
    parseFloat(a.money) == parseFloat(b.money)
  ) {
    return true;
  }
  return false;
}

export function UPDATE_TOTAL(pgTotal, fbTotal) {
  return new Promise(async resolve => {
    await pgTotal.update({
      money: fbTotal.money,
      amount: fbTotal.amount
    });
    resolve();
  });
}

export function toMap(data) {
  const res = new Map();
  for (let index in data) {
    res.set(data[index].ProductId, data[index]);
  }
  return res;
}

export function LOAD_TOTALS(callback) {
  const TotalSell = Sequelize.con().import("../Models/TotalSell");
  TotalSell.findAll()
    .then(totals => {
      if (!totals || totals.length <= 0)
        callback({
          payload: {
            totals: []
          }
        });
      else
        callback({
          payload: {
            totals
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

export function CREATE_TOTAL(total, response) {
  const TotalSell = Sequelize.con().import("../Models/TotalSell");
  const Product = Sequelize.con().import("../Models/Product");
  Product.findById(total.ProductId).then(p => {
    if (!p) {
      response();
    } else {
      TotalSell.create(total)
        .then(t => {
          if (!t) {
            response({
              error: {
                code: 0,
                message: "No se ha podido crear el producto."
              }
            });
          } else {
            response({
              payload: {
                total: t
              }
            });
          }
        })
        .catch(error => {
          response({
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
