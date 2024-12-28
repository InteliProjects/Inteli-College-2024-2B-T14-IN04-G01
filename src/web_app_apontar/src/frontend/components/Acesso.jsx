import React from "react";

const Acesso = ({ pessoas, deletePessoa }) => {
  return (
    <div>
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
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deletePessoa(pessoa.id_pessoa)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Acesso;
