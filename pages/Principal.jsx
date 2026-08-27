import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Layout from "../components/Layout";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { sair } from "../services/authService";

export default function Principal() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUsuario(null);
        setCarregando(false);
        return;
      }

      try {
        const snapshot = await getDoc(doc(db, "usuarios", user.uid));
        if (snapshot.exists()) {
          setUsuario(snapshot.data());
        } else {
          setErro("Os dados do usuário não foram encontrados.");
        }
      } catch {
        setErro("Não foi possível carregar os dados do usuário.");
      } finally {
        setCarregando(false);
      }
    });

    return unsubscribe;
  }, []);

  async function sairDaConta() {
    await sair();
    navigate("/login");
  }

  if (carregando) {
    return (
      <Layout title="Página Principal">
        <p>Carregando dados...</p>
      </Layout>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout title="Página Principal">
      <div className="profile">
        <div><strong>Nome:</strong> {usuario.nome}</div>
        <div><strong>Sobrenome:</strong> {usuario.sobrenome}</div>
        <div><strong>Data de nascimento:</strong> {usuario.dataNascimento}</div>
      </div>

      {erro && <p className="error">{erro}</p>}

      <button onClick={sairDaConta} className="secondary">
        Sair
      </button>
    </Layout>
  );
}