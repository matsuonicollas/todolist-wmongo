import jwt from 'jsonwebtoken';

const validarTokenJWT = (req, res, next) => {
  try {
   
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ mensagem: 'Token de autenticação ausente. Por favor, forneça um token válido no cabeçalho Authorization.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ mensagem: 'Token inválido ou expirado. Faça login novamente para obter um novo token.' });
      }

      req.usuarioId = decoded.id;
      next();
    });

  } catch (erro) {
    console.error("Erro ao validar o token:", erro);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

export default validarTokenJWT;
