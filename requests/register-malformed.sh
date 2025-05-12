#!/bin/bash

# Tentativa de registro com requisição mal formatada (JSON inválido)
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuário Mal Formatado",
    "email": "malformatado@exemplo.com",
    password: "senha123"
  }'

echo -e "\n"