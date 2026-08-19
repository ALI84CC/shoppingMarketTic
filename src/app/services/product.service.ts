import http from '../../http-common';
import type { ProductProps } from '../interfaces/Product.ts';

const findAll = async () => {
  const response = await http.get<ProductProps[]>('products');
  return response.data;
};

export default findAll;
