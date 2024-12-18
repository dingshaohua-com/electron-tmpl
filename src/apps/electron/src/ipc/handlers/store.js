export const setStore = (key, val) => {
    return global.app.store.set(key, val);
  };
  
  export const getStore = (key) => {
    return global.app.store.get(key);
  };
  
  export const rmStore = (key) => {
    return global.app.store.delete(key);
  };
  
  export const clearStore = () => {
    return global.app.store.clear();
  };