import express from 'express';
import cors from 'cors';
import { waitForDb } from './db';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import taskRoutes from './routes/tasks';

const app = express();
const PORT = parseInt(process.env.API_PORT || '4000', 10);

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

async function main() {
  await waitForDb();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API server listening on port ${PORT}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
