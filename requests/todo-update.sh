#!/bin/bash

# Substitua <ID_DO_TODO> pelo ID real do to-do que deseja atualizar.
curl -X PUT http://localhost:3000/api/todos/6821e4b7e3d16219b2faad27 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjE1Zjg5Y2Y5ZjViZmFjMGY4NDFmMCIsImlhdCI6MTc0NzA1MTY4NCwiZXhwIjoxNzQ3MDU1Mjg0fQ.MZKoYmzzz9uUQVm3dY9Cqfq-4A4TyzE3Ot1WsONTPZQ" \
-d '{
  "title": "Título Atualizado",
  "description": "Descrição Atualizada",
  "status": "concluído"
}'
