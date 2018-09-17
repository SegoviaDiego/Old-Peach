import { products as db } from "../datastore";
import { getProductList } from "../Server/Firebird";

export function loadProducts() {
  return new Promise((resolve, reject) => {
    db.find({})
      .sort({ _id: 1 })
      .exec((err, docs) => {
        if (err) {
          reject([]);
          throw err;
        }
        resolve(docs);
      });
  });
}

export function productExists(_id) {
  return new Promise((resolve, reject) => {
    db.find(
      {
        _id
      },
      (err, docs) => {
        if (err) throw err;
        if (docs.length > 0) resolve(true);
        else resolve(false);
      }
    );
  });
}

export function createProduct(p) {
  return new Promise((resolve, reject) => {
    db.insert(
      {
        ...p,
        price: parseFloat(parseFloat(p.price).toFixed(2))
      },
      err => {
        if (err) {
          reject({
            error: err,
            code: 2,
            message: "Ha ocurrido un error inesperado."
          });
          throw err;
        }
        resolve(true);
      }
    );
  });
}

export function modifyProduct(_id, modifiedProduct) {
  return new Promise((resolve, reject) => {
    db.update({ _id }, modifiedProduct, {}, err => {
      if (err) {
        reject({
          error: err,
          code: 2,
          message: "Ha ocurrido un error inesperado."
        });
        throw err;
      }
      resolve();
    });
  });
}

export function deleteItems(selected) {
  return new Promise(async resolve => {
    let keys = Object.keys(selected);
    for (let id of keys) {
      if (selected[id]) await deleteProduct(id);
    }
    resolve();
  });
}

function deleteProduct(_id) {
  return new Promise((resolve, reject) => {
    db.remove({ _id }, {}, err => {
      if (err) {
        reject({
          error: err,
          code: 2,
          message: "Ha ocurrido un error inesperado."
        });
        throw err;
      }
      resolve();
    });
  });
}

export async function inStock(amount) {
  return new Promise(async resolve => {
    let keys = Object.keys(amount);
    for (let id of keys) {
      await add(id, amount[id]);
    }
    resolve();
  });
}

function add(_id, amount) {
  return new Promise(resolve => {
    db.update(
      { _id: parseInt(_id) },
      { $inc: { stock: parseFloat(amount) } },
      {},
      err => {
        resolve();
      }
    );
  });
}

export async function outStock(amount) {
  return new Promise(async resolve => {
    let keys = Object.keys(amount);
    for (let id of keys) {
      await remove(id, amount[id]);
    }
    resolve();
  });
}

function remove(_id, amount) {
  return new Promise(resolve => {
    db.update({ _id: parseInt(_id) }, { $inc: { stock: - parseFloat(amount) } }, {}, err => {
      resolve();
    });
  });
}

export function syncToSystel() {
  return new Promise(resolve => {
    getProductList().then(async list => {
      let sysList = await getProductList();
      let dbList = await loadProducts();
      let item;
      for (let index in list) {
        item = sysList[index];

        if (!dbList[index]) await createProduct({ ...item, stock: 0 });
        else
          await modifyProduct(item._id, {
            ...item,
            stock: dbList[index].stock
          });
      }
      resolve();
    });
  });
}
