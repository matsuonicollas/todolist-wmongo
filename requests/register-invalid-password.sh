#!/bin/bash

# Tentativa de registrar um usuário com senha inválida (menos de 6 caracteres)
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuário Senha Curta",
    "email": "senha_curta@exemplo.com",
    "password": "123"
  }'

echo -e "\n"