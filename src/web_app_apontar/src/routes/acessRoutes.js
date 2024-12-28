import express from 'express';
import {
  getAccessLogs,
  createAccessLog,
  updateAccessLog,
  deleteAccessLog,
} from '../controllers/AccessLogsController';

const router = express.Router();

// Rotas CRUD
router.get('/', getAccessLogs);
router.post('/', createAccessLog);
router.put('/:id', updateAccessLog);
router.delete('/:id', deleteAccessLog);

export default router;
