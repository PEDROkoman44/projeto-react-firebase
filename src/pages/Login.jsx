import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { entrar } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function enviar(e) {
    e.preventDefault();
    setErro("");

    try {
      setCarregando(true);
      await entrar(email, senha);
      navigate("/principal");
    } catch (error) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password"
      ) {
        setErro("Usuário não está cadastrado ou os dados de acesso estão incorretos.");
      } else {
        setErro("Não foi possível realizar o login.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Layout title="Login">
      <form onSubmit={enviar}>
      <label htmlFor="email">E-mail</label>
<input
  id="email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>

<label htmlFor="senha">Senha</label>
<input
  id="senha"
  type="password"
  value={senha}
  onChange={(e) => setSenha(e.target.value)}
  required
/>

        <button disabled={carregando}>
          {carregando ? "Entrando..." : "Acessar página Principal"}
        </button>
      </form>

      {erro && <p className="error">{erro}</p>}

      <p className="small">
        Ainda não possui cadastro? <Link to="/cadastro">Cadastre-se</Link>.
      </p>
    </Layout>
  );
}