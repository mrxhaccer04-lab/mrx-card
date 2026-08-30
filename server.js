const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from root directory
app.use(express.static(path.join(__dirname, './')));

// Root route — serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

// In-memory approval store
const approvals = {};

// Endpoint to approve user
app.get('/approve/:email', (req, res) => {
  approvals[req.params.email] = 'approved';
  res.send('✅ Approved');
});

// Endpoint to reject user
app.get('/reject/:email', (req, res) => {
  approvals[req.params.email] = 'rejected';
  res.send('❌ Rejected');
});

// Endpoint for frontend to check approval status
app.get('/api/approval-status', (req, res) => {
  const email = req.query.email;
  const status = approvals[email] || 'pending';
  res.json({ status });
});

// Fallback: serve index.html for any unknown route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
