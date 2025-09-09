const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// In-memory store
const urlMap = new Map();

// Expiry scheduler
const scheduleExpiry = (code, durationSeconds) => {
  setTimeout(() => {
    urlMap.delete(code);
    console.log(`⏳ Expired: ${code}`);
  }, durationSeconds * 1000);
};

// POST /api/shorten
app.post('/api/shorten', (req, res) => {
  const entries = req.body;

  const results = entries.map((entry, i) => {
    const code = entry.shortcode || `mock${i}`;
    const original = entry.original;
    const validity = parseInt(entry.validity) || 1800;

    urlMap.set(code, original);
    scheduleExpiry(code, validity);

    return {
      original,
      shortened: `http://localhost:3000/s/${code}`
    };
  });

  res.json(results);
});

// GET /s/:code
app.get('/s/:code', (req, res) => {
  const code = req.params.code;
  const original = urlMap.get(code);

  if (original) {
    res.redirect(original);
  } else {
    res.status(404).send('Shortened URL expired or not found.');
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('✅ Backend is running.');
});

// ✅ Express v5 wildcard route for React frontend
app.use(express.static(path.join(__dirname, 'build')));
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});