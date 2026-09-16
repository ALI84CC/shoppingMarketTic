import axios from 'axios';
import type { ProductProps } from '../interfaces/Product.ts';


export  const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const findAll = async (type: string) => {
  if (type) {
    const response = await api.get<ProductProps[]>('products/?_sort=preco');
    return type === 'desc' ? response.data.reverse() : response.data;
  }
  const response = await api.get<ProductProps[]>('products');
  return response.data;
};

const searchName = async (name: string) => {
  const response = await api.get<ProductProps[]>(`products?nome_like=${name}`);
  return response.data;
};

const ProductService = {
  findAll,
  searchName,
};
export default ProductService;
