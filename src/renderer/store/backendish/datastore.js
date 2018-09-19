import Datastore from "nedb";
import Logger from "nedb-logger";
import path from "path";
import { remote } from "electron";

const dbFolder = remote.app.getPath("userData");

export const products = new Datastore({
  autoload: true,
  filename: path.join(dbFolder, "/db/products.db")
});

export const totalSells = new Datastore({
  autoload: true,
  filename: path.join(dbFolder, "/db/totalSells.db")
});

export const sells = new Datastore({
  autoload: true,
  filename: path.join(dbFolder, "/db/sells.db")
});

export const settings = new Datastore({
  autoload: true,
  filename: path.join(dbFolder, "/db/settings.db")
});

export const log = new Datastore({
  autoload: false,
  filename: path.join(dbFolder, "/db/log.db")
});

export const logger = new Logger({
  filename: path.join(dbFolder, "/db/log.db")
});
