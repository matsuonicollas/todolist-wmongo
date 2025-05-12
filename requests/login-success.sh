#!/bin/bash

# Login bem-sucedido
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ellen@example.com",
    "password": "Senha@123"
  }'

echo -e "\n"
