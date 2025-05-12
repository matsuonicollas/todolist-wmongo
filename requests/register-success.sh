curl -X POST http://localhost:3000/user/register \
-H "Content-Type: application/json" \
-d '{
  "name": "Ellen",
  "email": "ellen@example.com",
  "password": "Senha@123"
}'