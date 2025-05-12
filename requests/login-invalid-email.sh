curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ellen",
    "email": "ellengmail.com",
    "password": "senha321"
  }'

echo -e "\n"