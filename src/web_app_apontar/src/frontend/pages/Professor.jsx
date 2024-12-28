import React, { useState } from "react";
import "../../assets/styles/Professor.css"; // Seu CSS original
import { Edit, Delete } from "@mui/icons-material"; // Ícones originais
import Modal from "../components/ModalProf"; // Importação do modal

const Professor = () => {
  const [professores, setProfessores] = useState([
    { id: "#73003", nome: "Zé da Manga", data: "12/11/2024", horarios: ["08:43:12", "16:34:48"]},
    { id: "#73004", nome: "Maria Clara", data: "12/11/2024", horarios: ["10:00:00", "18:00:00"]},
  ]);
  const [filter, setFilter] = useState("");
  const [filteredProfessores, setFilteredProfessores] = useState(professores);
  const [showModal, setShowModal] = useState(false);
  const [editProfessor, setEditProfessor] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Deseja realmente excluir este professor?")) {
      setFilteredProfessores(filteredProfessores.filter((prof) => prof.id !== id));
    }
  };

  const handleEdit = (professor) => {
    setEditProfessor(professor);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditProfessor(null);
    setShowModal(true);
  };

  const handleFilter = () => {
    const result = professores.filter((prof) => prof.materia.toLowerCase().includes(filter.toLowerCase()));
    setFilteredProfessores(result);
  };

  const handleSave = (data) => {
    if (editProfessor) {
      const updated = filteredProfessores.map((prof) =>
        prof.id === editProfessor.id ? { ...data, id: prof.id } : prof
      );
      setFilteredProfessores(updated);
    } else {
      const newProf = { id: `#${Math.random().toFixed(5).slice(2)}`, ...data };
      setFilteredProfessores([...filteredProfessores, newProf]);
    }
    setShowModal(false);
  };

  return (
    <div id="webcrumbs" className="flex">
      <main className="w-full p-6 flex flex-col ml-[250px]">
        <header className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Pesquisar"
              className="border rounded-md px-4 py-2 bg-white text-neutral-700"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
             <button className="button-filter" onClick={handleFilter}>
                Filtrar
              </button>
          </div>
          <button className="bg-red-500 text-neutral-50 rounded-md px-4 py-2 font-semibold" onClick={handleAdd}>
            + Add Professor
          </button>
        </header>

        {/* Tabela */}
        <div className="bg-white shadow rounded-lg p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-neutral-100">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nome</th>
                <th className="px-4 py-2">Data</th>
                <th className="px-4 py-2">Horários</th>
                <th className="px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProfessores.map((prof, index) => (
                <tr key={prof.id} className={index % 2 === 0 ? "bg-neutral-50" : "bg-neutral-100"}>
                  <td className="px-4 py-2">{prof.id}</td>
                  <td className="px-4 py-2">{prof.nome}</td>
                  <td className="px-4 py-2">{prof.data}</td>
                  <td className="px-4 py-2">
                    {prof.horarios.join(" - ")} <span className="text-green-500 font-semibold">{prof.materia}</span>
                  </td>
                  <td className="px-4 py-2 flex gap-4">
                    <button onClick={() => handleEdit(prof)}>
                      <Edit color="primary" />
                    </button>
                    <button onClick={() => handleDelete(prof.id)}>
                      <Delete color="error" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && <Modal professor={editProfessor} onClose={() => setShowModal(false)} onSave={handleSave} />}
      </main>
    </div>
  );
};

export default Professor;
