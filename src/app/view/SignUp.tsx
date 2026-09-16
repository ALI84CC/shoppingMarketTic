import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Garanta o Link aqui
import AuthService from "../services/auth.service";
import Input from "../components/Input";
import Button from "../components/Button";
import Container from "../components/Container";

const SignUp = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // CORRIGIDO: Proteção segura e limpa para o cadastro
  useEffect(() => {
    const user = AuthService.getLoggedUser();
    if (user) {
      // SE já estiver logado, não faz sentido se cadastrar, vai para a Home
      navigate("/");
    }
    // SE NÃO estiver logado, o useEffect não faz nada e deixa a tela carregar livremente!
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
      setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const res = await AuthService.register(formData);
      if (res) {
        AuthService.setLoggedUser(res);
        alert("Cadastro realizado com sucesso!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro ao cadastrar. E-mail já existente ou falha no servidor.");
    }
  };

  return (
    <div className="w-full pt-20 min-h-screen flex items-center justify-center bg-gray-200">
      <Container>
        <div className="mx-auto max-w-sm w-full bg-white p-8 rounded-2xl shadow-md flex flex-col gap-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Criar Conta</h1>

          {errorMessage && (
            <div className="rounded-md bg-red-50 p-3 text-xs font-medium text-red-600 border border-red-200">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input type="text" placeholder="Nome de Usuário" value={formData.username} name="username" onChange={handleChange} />
            <Input type="text" placeholder="Email" value={formData.email} name="email" onChange={handleChange} />
            <Input type="password" placeholder="Password" value={formData.password} name="password" onChange={handleChange} />
            <Button type="submit" className="mt-2 w-full bg-blue-500 py-2.5 rounded-lg text-white font-medium hover:bg-blue-600">
              Cadastrar
            </Button>
          </form>

          <div className="text-xs text-gray-500 mt-2">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-blue-500 font-semibold hover:underline">
              Faça login aqui
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
