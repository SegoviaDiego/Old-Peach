import { logger as dbLog } from "../datastore";
import { totalSells as dbTotal } from "../datastore";
import { systel as types } from "../../vuexTypes.js";

export function saveLog(type) {
  return new Promise(async resolve => {
    switch (type) {
      case types.stockCleared:
        await saveTotals();
        break;
    }
    resolve();
  });
}

export function saveTotals() {
  return new Promise(resolve => {
    dbTotal.find({}, (err, docs) => {
      if (err) throw err;
      dbLog.insert(
        {
          date: new Date(),
          totals: docs
        },
        err => {
          if (err) throw err;
          resolve();
        }
      );
    });
  });
}
  