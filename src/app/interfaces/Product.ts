export interface ProductProps {
  id: string;
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
