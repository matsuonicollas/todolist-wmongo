#!/bin/bash

# Substitua <ID_DO_TODO> pelo ID real do to-do que deseja atualizar.
curl -X PUT http://localhost:3000/api/todos/68216079ad2983facda906a3 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjE1Zjg5Y2Y5ZjViZmFjMGY4NDFmMCIsImlhdCI6MTc0NzAyMTc3NCwiZXhwIjoxNzQ3MDI1Mzc0fQ.eJl-X3imZC1atWc8b2Dms0WOJEBe6sutmQNlk-B8PS0" \
-d '{
  "title": "Título Atualizado",
  "description": "Descrição Atualizada",
  "status": "concluído"
}'
