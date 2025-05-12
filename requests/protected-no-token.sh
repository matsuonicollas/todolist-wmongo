#!/bin/bash

# Tentativa de acessar a rota protegida sem token
curl -X GET http://localhost:3000/api/protected

echo -e "\n"