import http from "../../http-common";

interface Login {
  email: string,
  password:string,
}

export interface ReturnDataLogin {
  result: {accessToken: string},
  user:{email:string, username:string, id:number}
}

export interface SaveLoginUser{
  accessToken:string,
  user:{email:string, username:string, id:number}
}


const AuthService = {
  // 🔐 CORRIGIDO: Alterado de '/login' para '/users/login'
  async autenticate(formData: any): Promise<SaveLoginUser> {

  const response = await http.get(`/users?email=${formData.email}&password=${formData.password}`);

  // O json-server retorna uma lista ([]). Se encontrar alguém, o tamanho será maior que 0
  if (response.data && response.data.length > 0) {
    // CORREÇÃO CRÍTICA: Pegamos o primeiro usuário dentro da lista retornada
    const dbUser = response.data[0];

    const sessionData: SaveLoginUser = {
      accessToken: "mock-jwt-token-kenzie",
      user: {
        email: dbUser.email,
        // Garante compatibilidade caso o campo no seu db.json se chame 'username' ou 'name'
        username: dbUser.username || dbUser.name,
        id: dbUser.id
      }
    };

    return sessionData;
  }

  // Se a lista vier vazia ([]), força a queda no bloco catch do Login.tsx
  throw new Error("Usuário ou senha inválidos");
},

  // 📝 SEU CADASTRO QUE JÁ ESTÁ FUNCIONANDO PERFEITAMENTE:
  async register(data: { email: string; password: string; username: string }) {
    const response = await http.post<ReturnDataLogin>('/users', data);
    return response.data;
  },

  // Grava os dados da sessão
  setLoggedUser(data: SaveLoginUser) {
    const parsedData = JSON.stringify(data);
    localStorage.setItem("user", parsedData);
  },

  // Recupera os dados
  getLoggedUser(): null {
    const data = localStorage.getItem("user");
    if (!data) return null;
    try {
       return JSON.parse(data); // Retorna o objeto completo { accessToken, user }
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  cleanLoggedUser() {
    localStorage.clear();
  }
};

export default AuthService;
