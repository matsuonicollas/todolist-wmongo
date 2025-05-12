import { createUser, authenticateUser } from '../services/userservice.js';
import User from '../models/User.js';

// GET /users/list
export const listUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Oculta a senha
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar usuários' });
  }
};

// POST /user/register
export const register = async (req, res) => {
  console.log("Registrando usuário:", req.body);

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios' });
  }

  // Verifica se o e-mail tem formato válido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Formato de e-mail inválido' });
  }

  // Verifica se a senha tem pelo menos 6 caracteres
  if (password.length < 6) {
    return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres' });
  }

  try {
    const user = await createUser({ name, email, password });
    console.log("Usuário salvo:", user.email);
    return res.status(200).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error.message);
    return res.status(400).json({ message: error.message });
  }
};

// POST /user/login
export const login = async (req, res) => {
  console.log("Fazendo login do usuário:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios' });
  }

  try {
    const { token, name } = await authenticateUser({ email, password });
    console.log("Usuário logado com sucesso:", email);
    return res.status(200).json({ message: 'Login realizado com sucesso', token, name });
  } catch (error) {
    console.error("Erro ao fazer login do usuário:", error.message);
    return res.status(400).json({ message: error.message });
  }
};
