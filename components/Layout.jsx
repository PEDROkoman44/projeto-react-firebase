import { Link } from "react-router-dom";

export default function Layout({ title, children }) {
  return (
    <main className="page">
      <section className="card">
        <h1>{title}</h1>
        {children}
        <nav className="nav-links">
          <Link to="/cadastro">Cadastro</Link>
          <Link to="/login">Login</Link>
        </nav>
      </section>
    </main>
  );
}