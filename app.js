const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const coinRoutes = require('./routes/coins');
const userRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/coins', coinRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send({ ok: true }));

module.exports = app;
