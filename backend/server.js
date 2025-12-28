/**
 * Local development entrypoint
 *
 * Vercel uses index.js (exported Express app) automatically.
 * This file is only for running locally with `npm start`.
 */

require('dotenv').config();

const app = require('./index');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ Totally Travels backend listening on port ${PORT}`);
});
