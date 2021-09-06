export default class StorageManager {
  static put = (storageKey, value) => {
    localStorage.setItem(storageKey, value);
  };

  static putJson = (storageKey, value) => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  };

  static get = (storageKey) => {
    return localStorage.getItem(storageKey);
  };

  static getJson = (storageKey, initial) => {
    const parsed = JSON.parse(localStorage.getItem(storageKey));
    return parsed? parsed: initial;
  };

  static clearStore = () => {
    localStorage.clear();
  };

  static removeItem = (storageKey) => {
    localStorage.removeItem(storageKey);
  };
}
