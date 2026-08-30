const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// In-memory approval store (use database in production)
const approvals = {};

// Serve static files (HTML, CSS, JS)
app.use(express.static('.'));

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

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
