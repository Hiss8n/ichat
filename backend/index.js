
import express from "express"
import cors from "cors"
import connectDB from './utils/db.js';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import contactRoutes from './routes/contact.routes.js';
import cronJobs from './utils/cron.js';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express backend!!!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/contact', contactRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      cronJobs();
    });
  })
  .catch(err => {
    console.error('Failed to connect to DB, server not started');
  });
