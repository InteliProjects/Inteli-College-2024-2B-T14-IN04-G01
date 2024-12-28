import React from "react";

const CadastroAlunos = ({ pessoa, handleChange, createPessoa }) => {
  return (
    <div>
      <h2>Cadastro de Alunos</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPessoa();
        }}
      >
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            className="form-control"
            placeholder="Nome"
            value={pessoa.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>CPF</label>
          <input
            type="text"
            name="cpf"
            className="form-control"
            placeholder="CPF"
            value={pessoa.cpf}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Data de Nascimento</label>
          <input
            type="date"
            name="data_nascimento"
            className="form-control"
            value={pessoa.data_nascimento}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nome de Emergência</label>
          <input
            type="text"
            name="nome_emergencia"
            className="form-control"
            placeholder="Nome de Emergência"
            value={pessoa.nome_emergencia}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Contato de Emergência</label>
          <input
            type="text"
            name="contato_emergencia"
            className="form-control"
            placeholder="Contato de Emergência"
            value={pessoa.contato_emergencia}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Tipo de Acesso</label>
          <input
            type="text"
            name="tipo_acesso"
            className="form-control"
            placeholder="Tipo de Acesso"
            value={pessoa.tipo_acesso}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Salvar
        </button>
      </form>
    </div>
  );
};

export default CadastroAlunos;
