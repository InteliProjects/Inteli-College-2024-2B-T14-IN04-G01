import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//import { supabase } from "../src/data/services/createClient.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Acesso from "./frontend/components/Acesso.jsx";
import CadastroAlunos from "./frontend/components/CadastroAlunos.jsx";
import Alunos from "./frontend/pages/Alunos.jsx";
import Cadastro from "./frontend/pages/Cadastro.jsx";
import Home from "./frontend/pages/Home.jsx";
import Login from "./frontend/pages/Login.jsx";
import Professores from "./frontend/pages/Professor.jsx";
import Professor from "./frontend/pages/Presenca.jsx";
import Visitas from "./frontend/pages/Visitas.jsx"
import AdicionarVisita from "./frontend/pages/AdicionarVisita.jsx";
import Presenca from "./frontend/pages/Presenca.jsx";
import Master from "./frontend/components/Master.jsx";

const App = () => {
  const [pessoas, setPessoas] = useState([]);
  const [pessoa, setPessoa] = useState({
    nome: "",
    cpf: "",
    data_nascimento: "",
    nome_emergencia: "",
    contato_emergencia: "",
    tipo_acesso: "",
  });

  useEffect(() => {
    fetchPessoas();
  }, []);

  async function fetchPessoas() {
    const { data, error } = await supabase.from("pessoa").select("*");
    if (error) {
      console.error(error);
    } else {
      setPessoas(data);
    }
  }

  async function createPessoa() {
    const { data, error } = await supabase.from("pessoa").insert([pessoa]);
    if (error) {
      console.error(error);
    } else {
      fetchPessoas();
    }
  }

  async function deletePessoa(id_pessoa) {
    const { data, error } = await supabase.from("pessoa").delete().eq("id_pessoa", id_pessoa);
    if (error) {
      console.error(error);
    } else {
      fetchPessoas();
    }
  }

  function handleChange(event) {
    setPessoa((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <Router>
      <Routes>
        <Route element={<Master/>}>
          <Route path="/" element={<Cadastro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/alunos" element={<Alunos />} /> 
          <Route path="/professores" element={<Professores />} />
          <Route path="/Acesso" element={<Acesso />} />
          <Route path="/CadastroAlunos" element={<CadastroAlunos />} />
          <Route path="/Professor" element={<Professor />} />
          <Route path="/visitas" element={<Visitas />} />
          <Route path="/adicionarvisita" element={<AdicionarVisita />} />
          <Route path="/Presenca" element={<Presenca />} />
        </Route>
        
      </Routes>
    </Router>

  );
};

export default App;
