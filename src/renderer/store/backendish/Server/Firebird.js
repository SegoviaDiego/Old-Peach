const fb = require("node-firebird");
const fs = require("fs");
// const SocketManager from './SocketManager'
// const TotalSell from '../Sockets/TotalSell'
// const Log from '../Sockets/Log'

let changesToIgnore = 0;
const options = {
  host: "127.0.0.1",
  port: 3050,
  database: 'C:/projects/qendra.fdb',
  // database: "C:/Users/YoPC/Desktop/Nueva carpeta/qendra.fdb",
  // database: 'C:/Users/Silvina/AppData/Local/VirtualStore/Program Files (x86)/SYSTEL/qendra.fdb',
  user: "SYSDBA",
  password: "masterkey"
};

export function listenForChanges() {
  console.log("Listening for Firebird changes");
  fs.watch(options.database, () => {
    if (changesToIgnore == 0) {
      identifyChange();
    } else {
      changesToIgnore--;
    }
  });
}

export function identifyChange() {
  changesToIgnore++;
  const totals = [];
  fb.attach(options, (err, db) => {
    if (err) throw err;

    db.query(
      "SELECT ID_PLU, PE, CA FROM TOTALES WHERE ID_PLU!=99998 AND ID_PLU!=99999 AND (CA>0 OR PE>0)",
      [],
      (err, res) => {
        db.detach();
        if (err) throw err;

        if (res.length > 0) {
          res.forEach(item => {
            totals.push({
              ProductId: item.ID_PLU,
              money: parseFloat(item.PE.toFixed(2)),
              amount: parseFloat(item.CA.toFixed(3))
            });
          });
          TotalSell.identifyTotals(totals);
        } else {
          Log.SAVE(0);
        }
      }
    );
  });
}

export function getProductList() {
  changesToIgnore++;
  return new Promise(resolve => {
    fb.attach(options, (err, db) => {
      if (err) throw err;

      const p = [];
      db.query(
        "SELECT ID, DESCRIPCION, TIPO_VENTA, PRECIO FROM PLU WHERE ID!=99998 AND ID!=99999",
        [],
        (err, res) => {
          db.detach();
          if (err) throw err;
          res.forEach(item => {
            p.push({
              id: item.ID,
              name: item.DESCRIPCION,
              price: item.PRECIO,
              type: item.TIPO_VENTA.toString("utf8") == "Unidad" ? 0 : 1
            });
          });
          resolve(p);
        }
      );
    });
  });
}
