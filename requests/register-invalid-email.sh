#!/bin/bash

# Tentativa de registrar um usuário com e-mail inválido
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuário Email Inválido",
    "email": "emailinvalido",
    "password": "senha123"
  }'

echo -e "\n"