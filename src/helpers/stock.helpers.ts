import { Product, Variant } from '../types/product/index';

// Helper para manipular el stock
export const stockHelper = {
  productIsAvailable(product: Product, skuToFind: string): boolean | null {
      const variant = product.variants.find(variant => variant.sku === skuToFind);
      if (variant) {
          return variant.stock > 0;
      }
      return null; // Si no se encuentra el SKU, devuelve null o puedes manejar el caso de error de otra manera
  },
  decreaseStock(productData: Product, skuToFind: string): Variant | null {
    const product: Product = { ...productData };
    const variantToUpdateIndex = product.variants.findIndex(variant => variant.sku === skuToFind);

    if (variantToUpdateIndex !== -1) {
        product.variants[variantToUpdateIndex].stock -= 1;
        return product.variants[variantToUpdateIndex];
    }
    return null;
  }
};