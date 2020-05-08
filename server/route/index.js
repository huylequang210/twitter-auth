const express = require('express');
const router = express.Router();
const User = require('../model/User');
const Chat = require('../model/Chat');
const userAuth = require('../config/auth').userAuth;

router.get('/', async (req, res) => {
  try{
    const comments = await Chat.find({}).sort({createdAt: -1});
    res.json(comments);
  }catch(error) {
    console.error(error);
    res.status(502);
    res.end();
  }
});

module.exports = router;