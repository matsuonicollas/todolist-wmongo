#!/bin/bash
curl -X POST http://localhost:3000/api/todos \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjE1Zjg5Y2Y5ZjViZmFjMGY4NDFmMCIsImlhdCI6MTc0NzA1MTY4NCwiZXhwIjoxNzQ3MDU1Mjg0fQ.MZKoYmzzz9uUQVm3dY9Cqfq-4A4TyzE3Ot1WsONTPZQ" \
-d '{
  "title": "Novo To-Do",
  "description": "Descrição do to-do"
}'
