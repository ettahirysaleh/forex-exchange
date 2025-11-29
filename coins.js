const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/latest', async (req, res) => {
  try {
    const latest = await prisma.$queryRaw`
      SELECT DISTINCT ON (symbol) id, symbol, price, "changePct", "fetchedAt"
      FROM "CoinSnapshot"
      ORDER BY symbol, "fetchedAt" DESC;
    `;
    res.send(latest);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
