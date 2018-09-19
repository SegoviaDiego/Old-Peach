import { totalSells as db } from "../datastore";
import { identifySell } from "./Sell";

export function identifySells(systelSells) {
  db.find({}, async (err, docs) => {
    if (err) throw err;
    let totals = toMap(docs);
    systelSells = toMap(systelSells);

    await systelSells.forEach(async (newTotal, id) => {
      let oldTotal = totals.get(id);
      if (oldTotal == null) {
        await createTotalSell(newTotal);
        await identifySell(
          {
            money: 0,
            amount: 0
          },
          newTotal
        );
      } else if (!isEqual(oldTotal, newTotal)) {
        await identifySell(oldTotal, newTotal);
        await updateTotal(newTotal);
      }
    });
  });
}

export function isEqual(a, b) {
  if (
    a._id == b._id &&
    parseFloat(a.amount) == parseFloat(b.amount) &&
    parseFloat(a.money) == parseFloat(b.money)
  ) {
    return true;
  }
  return false;
}

export function updateTotal(fbTotal) {
  return new Promise(async resolve => {
    db.update({ _id: fbTotal._id }, fbTotal, err => {
      if (err) throw err;
      resolve();
    });
  });
}

export function toMap(data) {
  const res = new Map();
  for (let index in data) {
    res.set(data[index]._id, data[index]);
  }
  return res;
}

export function createTotalSell(total) {
  return new Promise(resolve => {
    db.insert(total, (err, docs) => {
      if (err) throw err;
      resolve(docs);
    });
  });
}

export function clearTotals() {
  return new Promise(resolve => {
    db.remove(
      {},
      {
        multi: true
      },
      err => {
        if (err) throw err;
        console.log(1);
        resolve();
      }
    );
  });
}

export function isCleared() {
  return new Promise(resolve => {
    db.count({}, (err, docs) => {
      if (err) throw err;
      resolve(docs > 0);
    });
  });
}
