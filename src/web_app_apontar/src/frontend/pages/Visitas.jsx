import React, { useState } from "react";
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaClock, FaUserFriends, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../assets/styles/Visitas.css";

const Visitas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal

  //Criação da primeira linha da tabela de forma mockada, deletar depois
  const visits = [
    {
      id: "#73003",
      name: "Pedro José",
      visitDate: "12/11/2024",
      entryTime: "08:43:12",
      exitTime: "17:43:12",
      password: "1234",
    },
  ];

  return (
    <div className="attendance-page">
      {/* Main Content */}
      <main className="main-content">
        <div className="search-bar-container">
          <input type="text" className="search-bar" placeholder="Pesquisar" />
          <button
            className="new-visit-button"
            onClick={() => setIsModalOpen(true)} // Abrir modal
          >
            Criar nova visita
          </button>
        </div>
        <table className="visit-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Data da Visita</th>
              <th>Horário Entrada</th>
              <th>Horário Saída</th>
              <th>Senha</th>
            </tr>
          </thead>
          <tbody>
            {visits.map((visit, index) => (
              <tr key={index}>
                <td>{visit.id}</td>
                <td>{visit.name}</td>
                <td>{visit.visitDate}</td>
                <td>{visit.entryTime}</td>
                <td>{visit.exitTime}</td>
                <td>{visit.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
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
              <div className="form-buttons">
                <button type="button" className="generate-password-button">
                  Gerar senha
                </button>
                <button type="submit" className="save-button">
                  Salvar
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsModalOpen(false)} // Fechar modal
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visitas;
