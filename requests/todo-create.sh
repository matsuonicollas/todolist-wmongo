#!/bin/bash

curl -X POST http://localhost:3000/api/todos \
-H "Content-Type: application/json" \
-H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjE1Zjg5Y2Y5ZjViZmFjMGY4NDFmMCIsImlhdCI6MTc0NzAyMjM1OSwiZXhwIjoxNzQ3MDI1OTU5fQ.Ht52k_LysQtV8Xv-Jcl-LUoVbwllit5FlycS5UUrOTw" \
-d '{
  "title": "Novo To-Do",
  "description": "Descrição do to-do"
}'
