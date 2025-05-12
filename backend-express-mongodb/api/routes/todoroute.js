import express from 'express';
import Todo from '../models/Todo.js';
import validarTokenJWT from '../middleware/authmiddleware.js';

const router = express.Router();

// Criar um novo to-do
router.post('/', validarTokenJWT, async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = new Todo({
      userId: req.usuarioId, // Corrigido para usar o ID atribuído pelo middleware
      title,
      description
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno ao processar a solicitação. Por favor, tente novamente mais tarde.' });
  }
});

// Listar os to-dos do usuário logado
router.get('/', validarTokenJWT, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.usuarioId }); // Corrigido para usar o ID atribuído pelo middleware
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno ao processar a solicitação. Por favor, tente novamente mais tarde.' });
  }
});

// Obter um to-do específico do usuário logado
router.get('/:id', validarTokenJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({ _id: id, userId: req.usuarioId });

    if (!todo) {
      return res.status(403).json({ error: 'Acesso negado. Você não tem permissão para visualizar este to-do.' });
    }

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar o to-do. Por favor, tente novamente mais tarde.' });
  }
});

// Atualizar um to-do
router.put('/:id', validarTokenJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.usuarioId }, // Corrigido para usar o ID atribuído pelo middleware
      { title, description, status, updatedAt: Date.now() },
      { new: true }
    );
    if (!todo) return res.status(404).json({ error: 'To-do não encontrado. Verifique o ID fornecido e tente novamente.' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Erro interno ao processar a solicitação. Por favor, tente novamente mais tarde.' });
  }
});

// Deletar um to-do
router.delete('/:id', validarTokenJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.usuarioId }); // Corrigido para usar o ID atribuído pelo middleware
    if (!todo) return res.status(404).json({ error: 'To-do não encontrado. Verifique o ID fornecido e tente novamente.' });
    res.json({ message: 'To-do deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro interno ao processar a solicitação. Por favor, tente novamente mais tarde.' });
  }
});

export default router;
