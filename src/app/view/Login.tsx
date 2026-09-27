import { useState, useEffect, type ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/auth.service';
import Input from '../components/Input';
import Container from '../components/Container';
import Button from '../components/Button';
import { FiArrowLeft } from 'react-icons/fi';

// CORRIGIDO: Nome do componente alterado estritamente para Login
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate(); // Adicionado para permitir navegação após logar

  // Proteção: Se o usuário já estiver logado, não deixa ele ver a tela de login
  useEffect(() => {
    const session = AuthService.getLoggedUser();
    if (session) {
      navigate("/");
    }
  }, [navigate]);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null); // Limpa o erro ao digitar
  };

  // CORRIGIDO: Implementada a lógica real de envio e autenticação no Back-end
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    // Validação básica de campos em branco no front-end
    if (!formData.email.trim() || !formData.password.trim()) {
      setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      // Dispara a requisição para o seu http-common (localhost:3001/login)
      const res = await AuthService.autenticate(formData) as any;

      if (res) {
        AuthService.setLoggedUser(res); // Salva a sessão no localStorage
        navigate("/"); // Envia o usuário de volta para a Loja
        window.location.reload(); // Atualiza o cabeçalho para exibir o nome logado
      }

    } catch (error) {
      console.error(error);
      setErrorMessage("E-mail ou senha incorretos. Tente novamente.");
    }
  };

  return (
    <div className="w-full pt-24 min-h-screen bg-gray-200 flex justify-center items-center">
      <Container>
        <div className="mx-auto max-w-sm w-full bg-white p-8 rounded-2xl shadow-md flex flex-col gap-6 text-center">

          <div className="flex items-center justify-start">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-500 transition-colors group"
            >
              <FiArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
              <span>Voltar para a Loja</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-gray-800">Login</h1>

          {errorMessage && (
            <div className="rounded-md bg-red-50 p-3 text-xs font-medium text-red-600 border border-red-200">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Email"
              value={formData.email}
              name="email"
              id="login-email"
              autoComplete="email"
              onChange={handleChange}
            />

            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              name="password"
              id="login-password"
              autoComplete="current-password"
              onChange={handleChange}
            />

            <Button type="submit" className="mt-2 w-full bg-blue-500 text-white font-medium py-2.5 rounded-lg hover:bg-blue-600 transition-colors">
              Entrar
            </Button>
          </form>

          <div className="text-xs text-gray-500 mt-2">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-blue-500 font-semibold hover:underline">
              Cadastre-se aqui
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

// CORRIGIDO: Exportação ajustada para o nome do arquivo
export default Login;
