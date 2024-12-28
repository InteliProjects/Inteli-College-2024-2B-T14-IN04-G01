import React, { useState, useEffect } from "react";
import { supabase } from "./createClient.js"; 
import "bootstrap/dist/css/bootstrap.min.css";
import Acesso from "./frontend/components/Acesso.jsx";
import Cadastro from './frontend/components/CadastroAlunos.jsx';

const App = () => {
  // Estado para gerenciar os dados da tabela `pessoa`
  const [pessoas, setPessoas] = useState([]);

  //Essa pessoa aqui é um objeto para criar novos usuários
  const [pessoa, setPessoa] = useState({
    nome: "",
    cpf: "",
    data_nascimento: "",
    nome_emergencia: "",
    contato_emergencia: "",
    tipo_acesso: "", 
    
    //Não sei se vai ser necessário colocar esses dados aqui:
      //*uuid_acesso: "",
      //tipo_pessoa: "",
      //id_pessoa: null, 

  });
  //Essa pessoa2 é um objeto para edição dos usuários
  const [pessoa2, setPessoa2] = useState({
    nome: "",
    cpf: "",
    data_nascimento: "",
    nome_emergencia: "",
    contato_emergencia: "",
    tipo_acesso: "", 
    
    //Não sei se vai ser necessário colocar esses dados aqui:
      //*uuid_acesso: "",
      //tipo_pessoa: "",
      //id_pessoa: null, 
  });

  console.log(pessoa)


  const [registros, setRegistros] = useState([]);
  const [registro, setRegistro] = useState({
    data_entrada: "",
    horario_entrada: "",
    data_saida: "",
    horario_saida: "",
    //Preciso validar se vai ser necessário isso aqui no inout
      //id_tipo_acesso: null, 
      //id_pessoa: null, 
  });

  // Fetch para carregar os dados dos usuarios no banco
  useEffect(() => {
    fetchPessoas();
    fetchRegistros();
  }, []);

  // Função para buscar pessoas
  async function fetchPessoas() {
    const { data, error } = await supabase.from("pessoa").select("*");
    if (error) {
      console.error(error);
    } else {
      setPessoas(data);
    }
  }

  // Função para buscar registros de entrada e saída
  async function fetchRegistros() {
    const { data, error } = await supabase.from("registro_entrada_saida").select("*");
    if (error) {
      console.error(error);
    } else {
      setRegistros(data);
    }
  }

  // Função para criar uma nova pessoa
  async function createPessoa() {
    const { data, error } = await supabase.from("pessoa").insert([pessoa]);
    if (error) {
      console.error(error);
    } else {
      fetchPessoas(); // Atualizar lista de pessoas
    }
  }

  // Função para deletar uma pessoa
  async function deletePessoa(id_pessoa) {
    const { data, error } = await supabase.from("pessoa").delete().eq("id_pessoa", id_pessoa);
    if (error) {
      console.error(error);
    } else {
      fetchPessoas(); // Atualizar lista de pessoas
    }
  }

  function displayUser(id_pessoa) {
    pessoas.map((pessoa) => {
      if (pessoa.id == id_pessoa) {
        setPessoa2({       
          nome: pessoa.nome ,
          cpf: pessoa.cpf,
          data_nascimento: pessoa.data_nascimento ,
          nome_emergencia: pessoa.nome_emergencia,
          contato_emergencia:pessoa.contato_emergencia ,
          tipo_acesso: pessoa.tipo_acesso  });
      }
    });
  }

  // Função para atualizar uma pessoa
  async function updatePessoa(id_pessoa) {
    const { data, error } = await supabase
      .from("pessoa")
      .update(pessoa)
      .eq("id_pessoa", id_pessoa);
    if (error) {
      console.error(error);
    } else {
      fetchPessoas(); // Atualizar lista de pessoas
    }
  }

  // Handle changes no formulário de criação
  function handleChange(event) {
    setPessoa((prevFormData) => ({
      ...prevFormData, // Preserva os valores anteriores do estado
      [event.target.name]: event.target.value, // Atualiza apenas o campo correspondente
    }));
  }
  //Edição
  function handleChange2(event) {
    setPessoa2((prevFormData) => ({
      ...prevFormData, // Preserva os valores anteriores do estado
      [event.target.name]: event.target.value, // Atualiza apenas o campo correspondente
    }));
  }
  

  return (
    <div className="container">
      <h1>Gerenciamento de Pessoas e Registros</h1>

      {/* Formulário para criar ou editar pessoa */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          pessoa.id_pessoa ? updatePessoa(pessoa.id_pessoa) : createPessoa();
        }}
      >
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={pessoa.nome}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={pessoa.cpf}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="data_nascimento"
          placeholder="Data de Nascimento"
          value={pessoa.data_nascimento}
          onChange={handleChange}
          required
        />
        <input
          type="varchar"
          name="nome_emergencia"
          placeholder="Nome de Emergência"
          value={pessoa.nome_emergencia}
          onChange={handleChange}
        />
        <input
          type="varchar"
          name="contato_emergencia"
          placeholder="Contato de Emergência"
          value={pessoa.contato_emergencia}
          onChange={handleChange}
        />
        <input
          type="varchar"
          name="tipo_acesso"
          placeholder="Tipo de Acesso"
          value={pessoa.tipo_acesso}
          onChange={handleChange}
        />
        <input
          type="varchar"
          name="tipo_pessoa"
          placeholder="Tipo de Pessoa"
          value={pessoa.tipo_pessoa}
          onChange={handleChange}
        />
        <button type="submit">Salvar</button>
      </form>

      {/* Tabela de pessoas */}
      <h2>Lista de Pessoas</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Nome de Emergência</th>
            <th>Contato de Emergência</th>
            <th>Tipo de Acesso</th>
            <th>Aluno/Professor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa) => (
            <tr key={pessoa.id_pessoa}>
              <td>{pessoa.id_pessoa}</td>
              <td>{pessoa.nome}</td>
              <td>{pessoa.cpf}</td>
              <td>{pessoa.data_nascimento}</td>
              <td>{pessoa.nome_emergencia}</td>
              <td>{pessoa.contato_emergencia}</td>
              <td>{pessoa.tipo_acesso}</td>
              <td>{pessoa.tipo_pessoa}</td>
              <td>
                <button onClick={() => setPessoa(pessoa)}>Editar</button>
                <button onClick={() => deletePessoa(pessoa.id_pessoa)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tabela de registros */}
      <h2>Registros de Entrada e Saída</h2>
      <table className="table">
        <thead>
          <tr>
            {/*    PUXAR AQUI O NOME DA PESSOA TAMBÉM      */}
            <th>ID Registro</th>
            <th>Data Entrada</th>
            <th>Horário Entrada</th>
            <th>Data Saída</th>
            <th>Horário Saída</th>
            <th>ID Pessoa</th>
  
          </tr>
        </thead>
          <tbody>
            {registros.map((registro_entrada_saida) => (
            <tr key={registro_entrada_saida.id_registro_entrada_saida}>
              <td>{registro_entrada_saida.id_registro_entrada_saida}</td>
              <td>{registro_entrada_saida.data_entrada}</td>
              <td>{registro_entrada_saida.horario_entrada}</td>
              <td>{registro_entrada_saida.data_saida}</td>
              <td>{registro_entrada_saida.horario_saida}</td>
              <td>{registro_entrada_saida.id_pessoa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
