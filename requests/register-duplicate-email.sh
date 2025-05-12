# Registrar um usuário com sucesso
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ellen",
    "email": "ellen@gmail.com",
    "password": "senha123"
  }'

echo -e "\n"