import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClock,
  FaUserFriends,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../assets/styles/Presenca.css";

const Presenca = () => {
  const [filter, setFilter] = useState("");
  const [alunos, setAlunos] = useState([
    {
      id: "#73003",
      nome: "Pedro José",
      dataRegistro: "12/11/2024",
      horarioEntrada: "08:43:12",
      horarioSaida: "17:43:12",
      presenca: true,
    },
    {
      id: "#73004",
      nome: "Maria Clara",
      dataRegistro: "12/11/2024",
      horarioEntrada: "08:43:12",
      horarioSaida: "17:43:12",
      presenca: false,
    },
  ]);

  // Filtro para pesquisa
  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(filter.toLowerCase())
  );

  // Alternar presença
  const togglePresenca = (id) => {
    setAlunos((prevAlunos) =>
      prevAlunos.map((aluno) =>
        aluno.id === id ? { ...aluno, presenca: !aluno.presenca } : aluno
      )
    );
  };

  return (
    <div className="presenca-container">
      {/* Conteúdo Principal */}
      <main className="main-content">
        <div className="search-bar-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Pesquisar"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Nome</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Data Registro
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Horário Entrada
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Horário Saída
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Presença</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alunosFiltrados.map((aluno) => (
                <TableRow key={aluno.id}>
                  <TableCell>{aluno.id}</TableCell>
                  <TableCell>{aluno.nome}</TableCell>
                  <TableCell>{aluno.dataRegistro}</TableCell>
                  <TableCell>{aluno.horarioEntrada}</TableCell>
                  <TableCell>{aluno.horarioSaida}</TableCell>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={aluno.presenca}
                      onChange={() => togglePresenca(aluno.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
};

export default Presenca;
