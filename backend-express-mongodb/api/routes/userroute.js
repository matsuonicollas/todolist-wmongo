import express from 'express';
import { register, login } from '../controller/clientcontroller.js';
import verifyToken from '../middleware/authmiddleware.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', register);
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return res.status(401).json({ error: 'Credenciais inválidas. Verifique seu e-mail e senha e tente novamente.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Credenciais inválidas. Verifique seu e-mail e senha e tente novamente.' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.status(200).json({ message: 'Login realizado com sucesso', token });
});

export default router;
