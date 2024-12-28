import express from 'express';
import pessoaRoutes from './routes/pessoaRoutes.js'
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Rotas para o recurso "pessoas"
app.use('/api/pessoas', pessoaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});

app.use('/api/pessoas', (req, res, next) => {
  console.log(`Rota chamada: ${req.method} ${req.originalUrl}`);
  next();
}, pessoaRoutes);
