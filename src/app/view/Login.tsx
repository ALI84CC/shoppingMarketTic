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
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null); // Limpa o erro ao digitar
  };

  // CORRIGIDO: Implementada a lógica real de envio e autenticação no Back-end
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    // Validação básica de campos em branco no front-end
    if (!formData.email.trim() || !formData.password.trim()) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      // Dispara a requisição para o seu http-common (localhost:3001/login)
      const res = (await AuthService.autenticate(formData)) as any;

      if (res) {
        AuthService.setLoggedUser(res); // Salva a sessão no localStorage
        navigate('/'); // Envia o usuário de volta para a Loja
        window.location.href = '/'; // Atualiza o cabeçalho para exibir o nome logado
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('E-mail ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-200 pt-24">
      <Container>
        <div className="mx-auto flex w-full max-w-sm flex-col gap-6 rounded-2xl bg-white p-8 text-center shadow-md">
          <div className="flex items-center justify-start">
            <Link
              to="/"
              className="group flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-blue-500"
            >
              <FiArrowLeft className="h-4 w-4 transform transition-transform group-hover:-translate-x-1" />
              <span>Voltar para a Loja</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-gray-800">Login</h1>

          {errorMessage && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600">
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

            <Button
              type="submit"
              className="mt-2 w-full rounded-lg bg-blue-500 py-2.5 font-medium text-white transition-colors hover:bg-blue-600"
            >
              Entrar
            </Button>
          </form>

          <div className="mt-2 text-xs text-gray-500">
            Não tem uma conta?{' '}
            <Link
              to="/register"
              className="font-semibold text-blue-500 hover:underline"
            >
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
