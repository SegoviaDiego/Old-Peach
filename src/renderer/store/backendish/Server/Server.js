import { products as pTypes } from "../../vuexTypes";
import { listenForChanges } from "./Firebird.js";
import { isCurrentEmpty } from "../Src/Total";

export default function(dispatch) {
  dispatch(pTypes.syncToSystel).then(() => {
    listenForChanges();
  });
}
