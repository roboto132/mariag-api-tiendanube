import { NextFunction, Request, Response } from "express";
import { StatusCode } from "@utils";
import { ProductService } from "@features/product";
import { stockHelper } from '../../helpers';

class ProductController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const data = await ProductService.create(+req.params.user_id);
      return res.status(StatusCode.CREATED).json(data);
    } catch (e) {
      next(e);
    }
  }

  async getTotal(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const data = await ProductService.findAllCount(+req.params.user_id);
      return res.status(StatusCode.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const data = await ProductService.findAll(+req.params.user_id);
      return res.status(StatusCode.OK).json(data);
    } catch (e) {
      next(e);
    }
  }

  async validateStockProductBySku(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const userId = +req.params.user_id;
      const sku = req.params.sku;
      const product = await ProductService.findBySku(userId, sku);

      const isAvailable = stockHelper.productIsAvailable(product, sku);

      return res.status(StatusCode.OK).json({
        status: 200,
        isAvailable,
      });
    } catch (e) {
      next(e);
    }
  }

  async modifyStockProductBySku(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const userId = +req.params.user_id;
      const sku = req.params.sku;
      const product = await ProductService.findBySku(userId,  sku);
      
      const modifiedVariant = stockHelper.decreaseStock(product, sku);

      if(!modifiedVariant) {
        throw new Error(`Variant not found for sku: ${sku}`)
      }
      await ProductService.updateProduct(userId, +product.id, +modifiedVariant.id, {
        stock: modifiedVariant.stock
      });
      return res.status(StatusCode.OK).json({
        status: 200,
        sku,
        message: 'stock modified'
      });
    } catch (e) {
      next(e);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const data = await ProductService.delete(
        +req.params.user_id,
        req.params.id as string
      );
      return res.status(StatusCode.OK).json(data);
    } catch (e) {
      next(e);
    }
  }
}

export default new ProductController();
