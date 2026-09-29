const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Render sets PORT automatically

// Use public/index.html if it exists, otherwise fall back to index.html at the repo root
const publicDir = path.join(__dirname, 'public');
const indexPath = fs.existsSync(path.join(publicDir, 'index.html'))
  ? path.join(publicDir, 'index.html')
  : path.join(__dirname, 'index.html');

app.disable('x-powered-by');
app.use(express.json());

// Static files (css, images, ...) from /public if the folder exists
app.use(express.static(publicDir));

// Homepage
app.get('/', (req, res) => res.sendFile(indexPath));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Example API route - replace with your own
app.get('/api/hello', (req, res) => res.json({ message: 'Hello from the server' }));

// 404 fallback
app.use((req, res) => res.status(404).sendFile(indexPath));

app.listen(PORT, () => console.log(`Server running on port ${PORT}, serving ${indexPath}`));
