import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

import Login from "../Login";
import { entrar } from "../../services/authService";

vi.mock("../../services/authService", () => ({
  entrar: vi.fn(),
}));

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("Tela de Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

 it("deve exibir o título Login", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: "Login" })
  ).toBeInTheDocument();
});

  it("deve possuir o campo de e-mail", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
  });

  it("deve possuir o campo de senha", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
  });

  it("deve possuir o botão de acesso", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", {
        name: "Acessar página Principal",
      })
    ).toBeInTheDocument();
  });

  it("deve mostrar mensagem de erro quando o login falhar", async () => {
    vi.mocked(entrar).mockRejectedValue({
      code: "auth/invalid-credential",
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const email = screen.getByLabelText("E-mail");
    const senha = screen.getByLabelText("Senha");
    const botao = screen.getByRole("button", {
      name: "Acessar página Principal",
    });

    fireEvent.change(email, {
      target: { value: "teste@email.com" },
    });

    fireEvent.change(senha, {
      target: { value: "123456" },
    });

    fireEvent.click(botao);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Usuário não está cadastrado ou os dados de acesso estão incorretos."
        )
      ).toBeInTheDocument();
    });
  });

  it("deve navegar para a página Principal quando o login funcionar", async () => {
    vi.mocked(entrar).mockResolvedValue({});

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const email = screen.getByLabelText("E-mail");
    const senha = screen.getByLabelText("Senha");
    const botao = screen.getByRole("button", {
      name: "Acessar página Principal",
    });

    fireEvent.change(email, {
      target: { value: "teste@email.com" },
    });

    fireEvent.change(senha, {
      target: { value: "123456" },
    });

    fireEvent.click(botao);

    await waitFor(() => {
      expect(entrar).toHaveBeenCalledWith(
        "teste@email.com",
        "123456"
      );

      expect(navigateMock).toHaveBeenCalledWith("/principal");
    });
  });
});