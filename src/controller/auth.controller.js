// eslint-disable-next-line new-cap
const router = require('express').Router();
const logger = require('../utils/logger');
const authService = require('../service/auth.service');
router.post('/register', async (req, res)=>{
  try {
    const userinfo = req.body;
    await authService.createAccount(userinfo);
    res.sendStatus(201);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
});

router.post('/login', async (req, res)=>{
  try {
    const userinfo = req.body;
    result = await authService.login(userinfo);
    res.send(result);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
