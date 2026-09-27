### 🛒 Shopping Market - E-Commerce

Este é um projeto de e-commerce completo com controle de carrinho de compras e sistema de autenticação simulado. A aplicação foi originalmente iniciada durante uma trilha de aprendizado, recebendo posteriormente uma refatoração completa com foco em performance, tipagem estrita e arquitetura de código. 

🎓 **Origem do Projeto:** Base desenvolvido originalmente no curso de React.js ofertado pela [TIC emtrilhas](https://ticemtrilhas.org.br/trail/f92095044ca8c9afd38f3ca75c9f25f468a2577ef41be86f4ba02662).
🚀 **Evolução Pessoal:** Por iniciativa própria e para aprimorar a prática técnica, o projeto foi totalmente reestruturado. Atualizei as formas de conexão com APIs, adotei tipagem estrita com TypeScript, otimizei os fluxos de estado e reescrevi componentes para refletir os padrões atuais dos frameworks. 

### 🛠️ Tecnologias e Frameworks Atualizados

* **React.js (v19+) & Vite:** Configuração moderna de ambiente com Hot Module Replacement (HMR).
* **TypeScript:** Implementação de interfaces estritas para contratos de API e tipagem de componentes.
* **Tailwind CSS:** Estruturação visual responsiva adaptada para resoluções desktop (ex: 1440px).
* **Axios:** Centralização de requisições através de instâncias personalizadas (http-common.ts).
* **TanStack Query (React Query):** Gerenciamento de estado assíncrono e cache para buscas otimizadas com debounce.
* **React Router Dom:** Gerenciamento de rotas e proteção de fluxos de autenticação.
* **JSON Server:** Mock API REST simulando o armazenamento persistente em banco de dados.

### 🏗️ Diferenciais de Engenharia Implementados

* **Tratamento Dinâmico de APIs:** Ajuste adaptativo para APIs Mock que retornam coleções em estruturas de array.
* **Segurança de Variáveis de Ambiente:** Isolamento completo de endpoints locais (.env.local) e de produção (.env.production), garantindo transições suaves entre desenvolvimento e deploy.
* **UX Fluida:** Inclusão de navegações de retorno (Link / FiArrowLeft), prevenindo bloqueios em formulários de login e cadastro.

### 🚀 Como Executar o Projeto Localmente

O repositório está estruturado como um Monorepo, contendo tanto o cliente (frontend) quanto a API mockada (backend). 

### 1. Clonar o Repositório

bash

git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

Use o código com cuidado.

### 2. Configurar e Iniciar o Servidor (Backend)

bash

cd json-server-base
npm install
npm run start

Use o código com cuidado.

*O servidor mock iniciará na porta 3001.* 

### 3. Configurar e Iniciar a Aplicação (Frontend)

Abra um novo terminal na raiz do projeto: 

bash

npm install
npm run dev

Use o código com cuidado.

*A aplicação estará disponível em http://localhost:5173.* 

### 🌐 Deploys Ativos

* **Front-end (Interface):** [Acesse na Vercel](https://seu-link-da-vercel.vercel.app)
* **Back-end (Mock API):** [Acesse no Render](https://seu-link-do-render.onrender.com)
