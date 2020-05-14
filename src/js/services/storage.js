function setItemMethod(key, value) {
  return localStorage.setItem(key, value);
}

function getItemMethod(key) {
  return localStorage.getItem(key);
}

function removeItemMethod(key) {
  return localStorage.removeItem(key);
}

function clearAllItemsMethod() {
  return localStorage.clear();
}

export default {
  setItem: setItemMethod,
  getItem: getItemMethod,
  removeItem: removeItemMethod,
  clearAllItems: clearAllItemsMethod
};
