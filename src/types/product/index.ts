export interface Variant {
  sku: string;
  stock: number;
  id: string;
}

export interface Product {
  variants: Variant[];
}

export interface Variants {

}