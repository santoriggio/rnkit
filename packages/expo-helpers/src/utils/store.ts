import { MMKV } from "react-native-mmkv";

class Store {
  mmkv_store: MMKV;

  constructor(id: string) {
    this.mmkv_store = new MMKV({
      id,
    });
  }

  set(key: string, value: any) {
    if (typeof value === "undefined") {
      this.remove(key);
    } else {
      this.mmkv_store.set(key.toString(), JSON.stringify(value));
    }
  }

  get(key: string) {
    if (typeof key !== "undefined") {
      const toReturn = this.mmkv_store.getString(key.toString());

      if (typeof toReturn !== "undefined") return JSON.parse(toReturn);

      return null;
    }
  }

  remove(key: string) {
    if (typeof key !== "undefined") {
      this.mmkv_store.delete(key.toString());
    }
  }

  getStore(): MMKV {
    return this.mmkv_store;
  }

  clear() {
    this.mmkv_store.clearAll();
  }
}
const storage = new Store("default");
export { storage };
export default Store;
