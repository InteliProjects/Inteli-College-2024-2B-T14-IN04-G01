import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Modal from "../components/ModalAlunos.jsx";
import "../../assets/styles/Alunos.css";

const Alunos = () => {
  const [filter, setFilter] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editAluno, setEditAluno] = useState(null);

  const loadAlunos = () => {
    const data = [
      { id: "#20462", nome: "Zé da Manga", responsavel: "Maria", contato: "123456789" },
      { id: "#18933", nome: "Blessed", responsavel: "João", contato: "987654321" },
      { id: "#145169", nome: "Menino da Porteira", responsavel: "Pedro", contato: "567890123" },
      { id: "#34304", nome: "Daniel Augusto", responsavel: "Ana", contato: "789012345" },
      { id: "#17188", nome: "Gustavo Desenhos", responsavel: "Lucas", contato: "345678901" },
      { id: "#73003", nome: "Sophia Senne", responsavel: "Clara", contato: "901234567" },
    ];
    setAlunos(data);
  };

  useEffect(() => {
    loadAlunos();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este aluno?")) {
      setAlunos(alunos.filter((aluno) => aluno.id !== id));
    }
  };

  const handleEdit = (aluno) => {
    setEditAluno(aluno);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditAluno(null);
    setShowModal(false);
  };

  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="main-content-aluno">
      <header className="header-container">
        <div className="filter-container">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-md px-4 py-2 bg-neutral-50 text-neutral-700"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <button className="add-aluno-button" onClick={() => setShowModal(true)}>
          Adicionar Aluno
        </button>
      </header>

      <div className="bg-white shadow rounded-lg p-4 table-container">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-neutral-100">
              <th>ID</th>
              <th>Nome</th>
              <th>Responsável</th>
              <th>Contato</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunosFiltrados.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.responsavel}</td>
                <td>{aluno.contato}</td>
                <td>
                  <IconButton color="primary" onClick={() => handleEdit(aluno)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(aluno.id)}>
                    <Delete />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal aluno={editAluno} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Alunos;
