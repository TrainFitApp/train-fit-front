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

    if (MEASURE_FILTER_TYPES.cieng === measureType) {
      const customProduct = value as CustomProduct;
      calculatedValue = customProduct[node];
    } else if (MEASURE_FILTER_TYPES.auto === measureType) {
      const product = value as IProduct;
      if (product.servingQuantity) {
        calculatedValue = (product.servingQuantity * value[node]) / 100;
      } else {
        calculatedValue = value[node];
      }
    } else {
      const product = value as IProduct;
      if (MEASURE_FILTER_TYPES.total === measureType) {
        if (!product.productQuantity) return '-';
        calculatedValue = (product.productQuantity * value[node]) / 100;
      } else {
        if (!product.servingQuantity) return '-';
        calculatedValue = (product.servingQuantity * value[node]) / 100;
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
}
