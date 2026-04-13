import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  database: process.env.POSTGRES_DB || 'taskmanagement',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export async function waitForDb(retries = 10, delay = 2000): Promise<void> {
  for (let i = 0; i < retries; i++) {
    try {
      const client = await pool.connect();
      client.release();
      console.log('Database connection established');
      return;
    } catch (err) {
      console.log(`Database not ready, retrying (${i + 1}/${retries})...`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error('Could not connect to database');
}

export default pool;
