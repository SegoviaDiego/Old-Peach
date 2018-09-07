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

export function createProduct(product) {
  return new Promise((resolve, reject) => {
    db.insert(product, err => {
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

export function deleteProduct(_id) {
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

export async function addStock(products) {
  return new Promise(async resolve => {
    for (let { id, amount } in products) {
      await add(id, amount);
    }
    resolve();
  });
}

function add(_id, amount) {
  return new Promise(resolve => {
    db.update({ _id }, { $inc: { stock: amount } }, {}, err => {
      resolve();
    });
  });
}

export async function removeStock(products) {
  return new Promise(async resolve => {
    for (let { id, amount } in products) {
      await remove(id, amount);
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
