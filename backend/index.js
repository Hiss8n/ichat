
import express from "express"
import cors from "cors"
import connectDB from './utils/db.js';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import contactRoutes from './routes/contact.routes.js';
import groupsRoutes from './routes/groups.routes.js';


import cronJobs from './utils/cron.js';
import { app, server} from "./utils/socket.js";




app.use(express.json( {limit: "20mb" }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.urlencoded({ limit: "20mb", extended: true }));

const PORT = process.env.PORT || 3000;

/* app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express backend!!!' });
}); */

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/groups', groupsRoutes);

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is now running on port ${PORT}`);
      cronJobs();
    });
  })
  .catch(err => {
    console.error('Failed to connect to DB, server not started');
  });
