
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Proxy endpoint to Wise Old Man
app.get('/api/player/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const url = `https://api.wiseoldman.net/v2/players/${encodeURIComponent(username)}`;
    const response = await axios.get(url, { timeout: 15000 });
    res.json(response.data);
  } catch (error) {
    console.error('WOM error:', error?.response?.status || error.message);
    res.status(500).json({ error: 'Failed to fetch player data' });
  }
});

// Serve built frontend
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));
app.get('*', (req, res) => res.sendFile(path.join(publicDir, 'index.html')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
