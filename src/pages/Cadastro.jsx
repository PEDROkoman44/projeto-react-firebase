import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { cadastrarUsuario } from "../services/authService";

export default function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    senha: "",
    nome: "",
    sobrenome: "",
    dataNascimento: ""
  });
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function alterar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function enviar(e) {
    e.preventDefault();
    setMensagem("");
    setErro("");

    if (form.senha.length < 6) {
      setErro("A senha deve possuir pelo menos 6 caracteres.");
      return;
    }

    try {
      setCarregando(true);
      await cadastrarUsuario(form);
      setMensagem("Cadastro realizado com sucesso! Redirecionando para o login...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      const mensagens = {
        "auth/email-already-in-use": "Este e-mail já está cadastrado.",
        "auth/invalid-email": "Informe um e-mail válido.",
        "auth/weak-password": "A senha informada é muito fraca."
      };
      setErro(mensagens[error.code] || "Não foi possível realizar o cadastro.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <Layout title="Cadastro de usuário">
      <form onSubmit={enviar}>
        <label>E-mail</label>
        <input name="email" type="email" value={form.email} onChange={alterar} required />

        <label>Senha</label>
        <input name="senha" type="password" value={form.senha} onChange={alterar} required />

        <label>Nome</label>
        <input name="nome" type="text" value={form.nome} onChange={alterar} required />

        <label>Sobrenome</label>
        <input name="sobrenome" type="text" value={form.sobrenome} onChange={alterar} required />

        <label>Data de nascimento</label>
        <input name="dataNascimento" type="date" value={form.dataNascimento} onChange={alterar} required />

        <button disabled={carregando}>
          {carregando ? "Cadastrando..." : "Cadastrar usuário"}
        </button>
      </form>

      {mensagem && <p className="success">{mensagem}</p>}
      {erro && <p className="error">{erro}</p>}

      <p className="small">
        Já possui cadastro? <Link to="/login">Faça login</Link>.
      </p>
    </Layout>
  );
}