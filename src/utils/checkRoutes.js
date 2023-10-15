export const storePath = '/';
export const cartPath = '/cart';
export const addProductsPath = '/add-products';
export const isStoreSelected = (currentPath) => currentPath === storePath;
export const isCartSelected = (currentPath) => currentPath === cartPath;
export const isAddProductsSelected = (currentPath) =>
  currentPath === addProductsPath;
