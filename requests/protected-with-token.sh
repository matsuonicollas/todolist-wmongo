#!/bin/bash

# Primeiro, faz login para obter o token
TOKEN=$(curl -s -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@exemplo.com",
    "password": "senha123"
  }' | grep -o '"token":"[^"]*' | sed 's/"token":"//')

echo "Token obtido: $TOKEN"

# Acessa a rota protegida com o token
curl -X GET http://localhost:3000/api/protected \
  -H "Authorization: Bearer $TOKEN"

echo -e "\n"