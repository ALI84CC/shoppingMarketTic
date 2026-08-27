import http from '../../http-common';
import type { ProductProps } from '../interfaces/Product.ts';

const findAll = async () => {
  const response = await http.get<ProductProps[]>('products');
  return response.data;
};

const searchName = async (name: string) => {
  const response = await http.get<ProductProps[]>(`products?q=${name}`);
  return response.data;
};

const ProductService = {
  findAll,
  searchName,
};
export default ProductService;
