import axios, { type AxiosInstance } from 'axios';

const httpClient:AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  headers:{
    "Content-type": "application/json",
  }
})

export default httpClient
/*export default axios.create({
  // Adicionada a barra "/" no final para garantir caminhos limpos nas rotas
  baseURL: 'http://localhost:3001/',

  // Aumentado de 1000 para 10000 (10 segundos) para dar tempo de o banco salvar os dados
  timeout: 10000,

  headers: {
    'Content-Type': 'application/json'
  },
});*/
