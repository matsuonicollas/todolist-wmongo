import express from 'express';
import dotenv from 'dotenv';
import db from './database/configdb.js';
import User from './models/User.js';
import userRoute from './routes/userroute.js';
import exemploeroute from './routes/exampleroute.js';
import todoRoutes from './routes/todoroute.js';

dotenv.config();
db.connect();

const app = express();

app.use(express.json());
app.use("/user", userRoute);
app.use("/protected", exemploeroute);
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});
