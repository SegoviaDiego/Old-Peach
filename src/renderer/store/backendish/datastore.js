import Datastore from "nedb";
import path from "path";
import { remote } from "electron";

export const products = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath("userData"), "/products.db")
});

export const settings = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath("userData"), "/settings.db")
});

// import { init, sync } from "./Server/Sequelize";
// import { listenForChanges, identifyChange } from "./Server/Firebird";
// import { SYNC_TO_SYSTEL } from "./Src/Product";

// export default function startBackend() {
//   init(initError => {
//     if (initError) throw initError;
//     sync(syncError => {
//       if (syncError) throw syncError;
//       console.log("Postgres database running");

//       // Listen for Firebird changes
//       // listenForChanges();
//       // SYNC_TO_SYSTEL(() => {
//       //   console.log("Products synced");
//       //   identifyChange();
//       // });

//     });
//   });
// }
