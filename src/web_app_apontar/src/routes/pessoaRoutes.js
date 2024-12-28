import express from 'express';
import { getPessoasByTipo, createPessoa, acionarCadastroBiometria, updatePessoa, deletePessoa  } from '../controllers/pessoasController.js';

const router = express.Router();

// Rota para listar pessoas filtradas por tipo_pessoa
router.get('/:tipo_pessoa', getPessoasByTipo);
router.post('/acionar-cadastro', acionarCadastroBiometria);
router.put('/:id', updatePessoa); // Atualização de pessoa
router.delete('/:id', deletePessoa); // Deleção de pessoa
// Rota para criar uma nova pessoa
router.post('/', createPessoa);

export default router;
