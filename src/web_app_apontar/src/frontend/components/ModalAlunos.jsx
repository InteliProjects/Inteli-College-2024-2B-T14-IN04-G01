import React, { useState } from "react";

const Modal = ({ aluno, onClose }) => {
  const [formData, setFormData] = useState({
    nome: aluno?.nome || "",
    responsavel: aluno?.responsavel || "",
    contato: aluno?.contato || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log("Dados Salvos:", formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{aluno ? "Editar Aluno" : "Adicionar Aluno"}</h2>
        <label>Nome:</label>
        <input
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Nome completo"
        />
        <label>Responsável:</label>
        <input
          name="responsavel"
          value={formData.responsavel}
          onChange={handleChange}
          placeholder="Responsável"
        />
        <label>Contato:</label>
        <input
          name="contato"
          value={formData.contato}
          onChange={handleChange}
          placeholder="Contato"
        />
        <button onClick={handleSave}>Salvar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default Modal;
