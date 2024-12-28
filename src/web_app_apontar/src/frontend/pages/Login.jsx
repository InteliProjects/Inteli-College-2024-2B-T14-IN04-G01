import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login realizado!");
    navigate("/home");
  };

  return (
    <div className="container">
      <div className="form-container">
        <img
          src="/assets/images/instituto-apontar.png"
          alt="Logo Instituto Apontar"
          className="logo"
        />
        <p>Preencha os dados do login para acessar</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <div className="input-with-icon">
              <input type="email" placeholder="Digite seu email" required />
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
            </div>
          </div>
          <div className="input-group">
            <label>Senha</label>
            <input type="password" placeholder="Digite sua senha" required />
          </div>
          <button className="btn" type="submit">
            Entrar
          </button>
        </form>
      </div>

      <div className="image-container">
        <img src="/assets/images/cadastro.png" alt="Ilustração" />
      </div>
    </div>
  );
}
