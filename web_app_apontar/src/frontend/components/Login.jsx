import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import "./Login.css"; // Importa o arquivo de estilos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate(); // Inicializa o hook para redirecionar
  const [passwordVisible, setPasswordVisible] = useState(false); // Estado para alternar visibilidade da senha

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    console.log("Conta criada com sucesso!");
    navigate("/home"); // Redireciona para a página Home
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>INSTITUTO APONTAR</h1>
        <p>Preencha os dados do login para acessar</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <div className="input-with-icon">
              <input type="email" placeholder="Digite seu email" />
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
            </div>
          </div>
          <div className="input-group">
            <label>Senha</label>
            <div className="input-with-icon">
              <input
                type={passwordVisible ? "text" : "password"} // Alterna o tipo do input
                placeholder="Digite sua senha"
              />
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye} // Alterna o ícone
                className="icon password-icon"
                onClick={togglePasswordVisibility} // Adiciona evento de clique
              />
            </div>
          </div>
          <div className="link">
            <Link to="/RecuperarSenha" className="link">Esqueci minha conta</Link>
          </div>
          <button className="btn" type="submit">
            Entrar
          </button>
        </form>
      </div>

      <div className="image-container">
        <div className="image-background"></div> {/* Retângulo cinza */}
        <img src="/login.jpg" alt="Alunos" />
      </div>
    </div>
  );
}

export default Login;
