export interface ProductProps {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  categoria: string;
  imagem: string;
}

export interface Product {
  item: ProductProps;
}
