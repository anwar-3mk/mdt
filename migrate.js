const { pool } = require('./pool');

async function migrate() {
  // users table for identities/progress if needed later
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      user_id TEXT PRIMARY KEY,
      guild_id TEXT NOT NULL,
      progress INTEGER NOT NULL DEFAULT 0,
      identity JSONB,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_users_guild ON users(guild_id);
  `);

  // bot_state stores the big JSON that was previously in data.json
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bot_state (
      id SMALLINT PRIMARY KEY DEFAULT 1,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    INSERT INTO bot_state (id, data)
    VALUES (1, '{}'::jsonb)
    ON CONFLICT (id) DO NOTHING;
  `);
  // done
  console.log('Migration done');
}

migrate()
  .then(() => process.exit(0))
  .catch((e) => { console.error(e); process.exit(1); });


