import { Pipe, PipeTransform } from '@angular/core';
import {
  CUSTOM_PRODUCT_KEYS,
  CustomProduct,
} from 'src/app/core/models/customProduct';
import { IProduct } from 'src/app/core/models/product';
import { MEASURE_FILTER_TYPES } from '../constants/measureFilter';

@Pipe({
  name: 'measure',
})
export class MeasurePipe implements PipeTransform {
  public transform(
    value: CustomProduct | IProduct,
    measureType: MEASURE_FILTER_TYPES,
    node: string
  ) {
    let calculatedValue: number;
    const resolvedValue = this.resolveNutritionValue(value, node);
    const productQuantity = this.getProductQuantity(value);
    const servingQuantity = this.getServingQuantity(value);

    if (MEASURE_FILTER_TYPES.cieng === measureType) {
      calculatedValue = resolvedValue;
    } else if (MEASURE_FILTER_TYPES.auto === measureType) {
      if (servingQuantity) {
        calculatedValue = (servingQuantity * resolvedValue) / 100;
      } else {
        calculatedValue = resolvedValue;
      }
    } else {
      if (MEASURE_FILTER_TYPES.total === measureType) {
        if (!productQuantity) return '-';
        calculatedValue = (productQuantity * resolvedValue) / 100;
      } else {
        if (!servingQuantity) return '-';
        calculatedValue = (servingQuantity * resolvedValue) / 100;
      }
    }

    if (isNaN(calculatedValue)) return '-';

    if (node === CUSTOM_PRODUCT_KEYS.energy) {
      calculatedValue = Math.floor(calculatedValue);
    } else {
      calculatedValue = Number(calculatedValue.toFixed(2));
    }

    return calculatedValue;
  }

  private resolveNutritionValue(
    value: CustomProduct | IProduct,
    node: string
  ): number {
    const customProduct = value as CustomProduct;

    if (customProduct?.product !== undefined) {
      const customValue = (customProduct as any)?.[node];
      if (customValue !== undefined && customValue !== null) {
        return customValue;
      }

      const baseValue = (customProduct.product as any)?.[node];
      if (baseValue !== undefined && baseValue !== null) {
        return baseValue;
      }
    }

    return ((value as any)?.[node] ?? 0) as number;
  }

  private getServingQuantity(value: CustomProduct | IProduct): number | null {
    const customProduct = value as CustomProduct;
    const servingQuantity =
      customProduct?.product !== undefined
        ? (customProduct.product as any)?.servingQuantity
        : (value as IProduct)?.servingQuantity;

    return typeof servingQuantity === 'number' ? servingQuantity : null;
  }

  private getProductQuantity(value: CustomProduct | IProduct): number | null {
    const customProduct = value as CustomProduct;
    if (
      customProduct?.product !== undefined &&
      typeof customProduct.quantity === 'number'
    ) {
      return customProduct.quantity;
    }

    const productQuantity =
      customProduct?.product !== undefined
        ? (customProduct.product as any)?.productQuantity
        : (value as IProduct)?.productQuantity;

    return typeof productQuantity === 'number' ? productQuantity : null;
  }
}
