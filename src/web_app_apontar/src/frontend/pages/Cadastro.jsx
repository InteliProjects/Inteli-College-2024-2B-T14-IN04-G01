import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Cadastro.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

export default function Cadastro() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Conta criada com sucesso!");
    navigate("/home");
  };

  return (
    <div className="container">
      {/* Formulário */}
      <div className="form-container">
        <h1>INSTITUTO APONTAR</h1>
        <p>Crie a sua conta</p>
        <form onSubmit={handleSubmit}>
    <div class="input-group">
      <label>Nome</label>
      <div class="input-with-icon">
        <input type="text" placeholder="Digite seu nome" required />
        <FontAwesomeIcon icon={faUser} className="icon" />
      </div>
    </div>

    <div class="input-group">
      <label>Email</label>
      <div class="input-with-icon">
        <input type="email" placeholder="Digite seu email" required />
        <FontAwesomeIcon icon={faEnvelope} className="icon" />
      </div>
    </div>

    <div class="input-group">
      <label>Senha</label>
      <div class="input-with-icon">
        <input type="password" placeholder="Digite sua senha" required />
        <FontAwesomeIcon icon={faLock} className="icon" />
      </div>
    </div>

    <div class="input-group">
      <label>Confirmar <br/> Senha</label>
      <div class="input-with-icon">
        <input type="password" placeholder="Confirme sua senha" required />
        <FontAwesomeIcon icon={faLock} className="icon" />
      </div>
    </div>

          <button className="btn" type="submit">
            Entrar
          </button>
        </form>
      </div>

      {/* Imagem */}
      <div className="image-container">
        <img src="../../src/assets/images/cadastro.png" alt="Sala" />
      </div>
    </div>
  );
}
