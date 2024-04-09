import { generateProductMock } from "@features/product/__mock__/product.mock";
import { tiendanubeApiClient } from "@config";
import { IProductRequest, IProductResponse } from "@features/product";

class ProductService {
  async create(user_id: number): Promise<IProductResponse> {
    const randomProduct: IProductRequest = generateProductMock();
    const data: IProductResponse = await tiendanubeApiClient.post(
      `${user_id}/products`,
      randomProduct
    );

    return {
      id: data.id,
      ...randomProduct,
    } as IProductResponse;
  }

  async delete(user_id: number, productId: string): Promise<any> {
    return await tiendanubeApiClient.delete(`${user_id}/products/${productId}`);
  }

  async findAll(user_id: number): Promise<IProductResponse[]> {
    return this.findAllFromApi(user_id);
  }

  async findAllCount(user_id: number): Promise<{ total: number }> {
    return {
      total: (await this.findAllFromApi(user_id)).length,
    };
  }

// TODO agregar un nuevo metodo para hacer un PUT de los productos.
  async findBySku(user_id: number, sku: string): Promise<any> {
    console.log('entrando a findBySku')
    return await tiendanubeApiClient.get(`${user_id}/products/sku/${sku}`);
  }

  async updateProduct(user_id: number, product_id: number, variant_id: number, newVariantData: any): Promise<any> {
    console.log('update product');
    console.log('user_id', user_id);
    console.log('product_id', product_id);
    console.log('newVariantData', newVariantData);
    return await tiendanubeApiClient.put(
      `${user_id}/products/${product_id}/variants/${variant_id}`,
      newVariantData,
    );
  }

  private async findAllFromApi(user_id: number): Promise<IProductResponse[]> {
    return (await tiendanubeApiClient.get(
      `${user_id}/products`
    )) as IProductResponse[];
  }
}

export default new ProductService();
