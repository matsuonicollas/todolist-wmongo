#!/bin/bash

# Tentativa de acessar a rota protegida com token inválido
curl -X GET http://localhost:3000/api/protected \
  -H "Authorization: Bearer token_invalido_12345"

echo -e "\n"