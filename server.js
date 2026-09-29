const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Render sets PORT automatically

app.disable('x-powered-by');
app.use(express.json());

// Serve everything in /public (index.html, css, images, ...)
app.use(express.static(path.join(__dirname, 'public')));

// Health check (set this as the Health Check Path in Render)
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Example API route - replace with your own
app.get('/api/hello', (req, res) => res.json({ message: 'Hello from the server' }));

// 404 fallback
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
