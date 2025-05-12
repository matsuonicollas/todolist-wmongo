#!/bin/bash

# Tentativa de login com requisição mal formatada (JSON inválido)
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@exemplo.com",
    password: "senha123"
  }'

echo -e "\n"