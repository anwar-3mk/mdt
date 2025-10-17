const { pool } = require('./pool');

async function loadState() {
  const { rows } = await pool.query('SELECT data FROM bot_state WHERE id = 1');
  return rows[0]?.data || {};
}

async function saveState(state) {
  await pool.query(
    `UPDATE bot_state SET data = $1::jsonb, updated_at = NOW() WHERE id = 1`,
    [JSON.stringify(state)]
  );
}

module.exports = { loadState, saveState };


