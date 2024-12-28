import React from "react";
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaClock, FaUserFriends, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../assets/styles/AdicionarVisita.css";

const AdicionarVisita = () => {
  return (
    <div className="add-visit-page">
      {/* Main Content */}
      <main className="add-visit-content">
        <h1>Adicionar Visitante</h1>
        <form className="add-visit-form">
          <div className="form-group">
            <label>Nome completo:</label>
            <input type="text" placeholder="Nome do professor" />
          </div>
          <div className="form-group">
            <label>CPF:</label>
            <input type="text" placeholder="CPF" />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" placeholder="Email" />
          </div>
          <button type="button" className="generate-password-button">Gerar senha</button>
          <button type="submit" className="save-button">Salvar</button>
        </form>
      </main>
    </div>
  );
};

export default AdicionarVisita;
