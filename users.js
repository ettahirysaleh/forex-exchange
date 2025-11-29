const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../utils/authMiddleware');

router.get('/me', auth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id }, select: { id: true, email: true, name: true, balance: true } });
  res.send(user);
});

router.post('/deposit', auth, async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) return res.status(400).send({ error: 'Invalid amount' });
  const user = await prisma.user.update({ where: { id: req.user.id }, data: { balance: { increment: Number(amount) } } });
  res.send({ balance: user.balance });
});

router.post('/withdraw', auth, async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) return res.status(400).send({ error: 'Invalid amount' });
  const u = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (u.balance < amount) return res.status(400).send({ error: 'Insufficient balance' });
  const user = await prisma.user.update({ where: { id: req.user.id }, data: { balance: { decrement: Number(amount) } } });
  res.send({ balance: user.balance });
});

module.exports = router;
