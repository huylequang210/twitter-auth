const express = require('express');
const router = express.Router();
const User = require('../model/User');
const Chat = require('../model/Chat');
const userAuth = require('../config/auth').userAuth;
router.post('/register', async (req,res) => {
  const {name, email, password, password2} = req.body;
  const errors = [];
  if(!name || !email || !password || !password2) {
    errors.push({msg: 'Please fill in all fields'});
  } 
  if(password !== password2) {
    errors.push({msg: 'Passwords are not matched'});
  }
  if(password.length < 6) {
    errors.push({msg: 'Password should have more than 6 charaters'});
  }
  if(errors.length > 0) {
    return res.json(errors);
  } else {
    try {
      const findEmail = await User.find({email});
      const findName = await User.find({name});
      if(findName.length > 0) {
        errors.push({msg: 'Name is already used'});
        return res.json(errors);
      }
      if(findEmail.length > 0) {
        errors.push({msg: 'Email is already used'});
        return res.json(errors);
      }
      const user = new User({
        name,
        email,
        password
      });
      await user.save();
      return res.json(user);
    }catch(error) {
      console.error(error);
      res.status(502);
      res.end();
    }
  }
});

router.post('/login', async (req,res) => {
  const {email, password} = req.body;
  if(!email || !password) {
    res.json({msg: 'Please fill in all fields'});
  } else {
    try {
      const findEmail = await User.find({email});
      if(!findEmail[0]) {
        return res.json({msg: 'Email not found'});
      }
      if(findEmail[0].password !== password) {
        return res.json({msg: 'Wrong password'});
      }
      req.session.userId = findEmail[0]._id;
      return res.json(findEmail);
    }catch(error) {
      console.error(error);
      res.status(502);
      res.end();
    }
  }
});

router.get('/dashboard/:id', async (req,res) => { 
  const id = req.params.id;
  try {
    const findUser = await User.find({_id: id});
    if(!findUser[0]) {
      return res.json({msg: 'User not found'});
    }
    const findComments = await Chat.find({userId: id}).sort({createdAt: -1});
    return res.json(findComments);
  }catch(error) {
    console.error(error);
    res.status(502);
    res.end();
  }
  res.end();
});

router.get('/logout', async (req,res) => {
  delete req.session.userId;
  res.json(req.session);
});

// need userAuth to say hello to user
router.get('/chatting/:id', userAuth, async (req,res) => { 
  const id = req.params.id;
  try {
    const findUser = await User.find({_id: id});
    return res.json(findUser);
  }catch(error) {
    console.error(error);
    res.status(502);
    res.end();
  }
  res.end();
});

// need userAuth to post
router.post('/chatting/:id', userAuth, async (req, res) => {
  const {content, userId, userName} = req.body;
  console.log(req.session);
  try{
    const newPost = new Chat({
      content,
      userId,
      userName
    });
    await newPost.save();
    return res.json(newPost);
  }catch(error) {
    console.error(error);
    res.status(502);
    res.end();
  }
});

module.exports = router;
