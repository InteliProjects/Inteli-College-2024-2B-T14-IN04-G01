import React, { useState } from "react";

const Modal = ({ professor, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nome: professor?.nome || "",
    data: professor?.data || "",
    horarios: professor?.horarios.join(", ") || "",
    materia: professor?.materia || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave({ ...formData, horarios: formData.horarios.split(",").map((h) => h.trim()) });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="font-bold mb-4">{professor ? "Editar Professor" : "Adicionar Professor"}</h2>
        <label className="mb-2">Nome:</label>
        <input
          className="input-field"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
        />
        <label className="mb-2">Data:</label>
        <input
          className="input-field"
          name="data"
          type="date"
          value={formData.data}
          onChange={handleChange}
        />
        <label className="mb-2">Horários (separados por vírgula):</label>
        <input
          className="input-field"
          name="horarios"
          value={formData.horarios}
          onChange={handleChange}
        />
        <label className="mb-2">Matéria:</label>
        <input
          className="input-field"
          name="materia"
          value={formData.materia}
          onChange={handleChange}
        />
        <div className="modal-buttons">
          <button className="button-save" onClick={handleSubmit}>
            Salvar
          </button>
          <button className="button-cancel" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
