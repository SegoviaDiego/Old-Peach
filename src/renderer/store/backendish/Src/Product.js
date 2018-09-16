import { products as db } from "../datastore";

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
    db.update({ _id }, { $inc: { stock: parseFloat(amount) } }, {}, err => {
      resolve();
    });
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
    db.update({ _id }, { $inc: { stock: -amount } }, {}, err => {
      resolve();
    });
  });
}

// export function SYNC_TO_SYSTEL(callback) {
//   const Product = con().import("../Models/Product");
//   let product;

//   getProductList().then(async p => {
//     for (let index in p) {
//       product = await Product.findById(p[index].id);
//       if (!product) await Product.create({ ...p[index], stock: 0 });
//       else await product.update({ ...p[index] });
//     }
//     callback({
//       payload: {
//         success: true
//       }
//     });
//   });
// }
