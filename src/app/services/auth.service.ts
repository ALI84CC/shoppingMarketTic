import http from '../../http-common';

export interface SaveLoginUser {
  accessToken: string;
  user: { email: string; username: string; id: number };
}

const AuthService = {
  async autenticate(formData: {
    email: string;
    password: string;
  }): Promise<SaveLoginUser> {
    const response = await http.get(
      `/users?email=${formData.email}&password=${formData.password}`,
    );

    if (response.data && response.data.length > 0) {
      const dbUser = response.data[0];
      return {
        accessToken: 'mock-jwt-token',
        user: {
          email: dbUser.email,
          username: dbUser.username || dbUser.name,
          id: dbUser.id,
        },
      };
    }
    throw new Error('Usuário ou senha inválidos');
  },

  // CORRIGIDO: Agora o register já devolve no formato da sessão
  async register(data: {
    email: string;
    password: string;
    username: string;
  }): Promise<SaveLoginUser> {
    const response = await http.post('/users', data);
    const dbUser = response.data;

    return {
      accessToken: 'mock-jwt-token',
      user: {
        email: dbUser.email,
        username: dbUser.username || dbUser.name,
        id: dbUser.id,
      },
    };
  },

  setLoggedUser(data: SaveLoginUser) {
    localStorage.setItem('user', JSON.stringify(data));
  },

  getLoggedUser(): SaveLoginUser | null {
    const data = localStorage.getItem('user');
    if (!data || data === 'undefined' || data === 'null') return null;
    try {
      const parsed = JSON.parse(data);
      // CORRIGIDO: Verifica parsed.user.email em vez de parsed.email
      return parsed && parsed.user && parsed.user.email ? parsed : null;
    } catch {
      return null;
    }
  },
  cleanLoggedUser() {
    localStorage.removeItem('user');
  },
};

export default AuthService;
