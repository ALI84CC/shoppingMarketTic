import { useState } from "react";
import { useNavigate } from "react-router-dom"; // CORRIGIDO: Importação adicionada
import Input from "../components/Input";
import AuthService from "../services/auth.service";
import Button from "../components/Button";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Executa a autenticação e aguarda a resposta do serviço
      const res = await AuthService.autenticate(formData);
      AuthService.setLoggedUser(res);

      // CORRIGIDO: Removido o 'return' da frente do navigate. Apenas chamamos a função.
      navigate("/");

    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    // Sugestão: Uma div centralizadora usando Tailwind para dar um visual limpo
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Login</h1>

        {/* Passamos a função diretamente para o onSubmit de forma limpa */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Email"
            value={formData.email}
            name="email"
            onChange={handleChange} // Simplificado: não precisa de arrow function redundante
          />

          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />

          {/* CORRIGIDO: O botão foi movido para DENTRO do formulário para o 'type=submit' funcionar */}
          <Button type="submit" className="mt-2 w-full">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
