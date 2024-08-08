import express from 'express';
import User from '../../db/models/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    // console.log(req.body);
    const body = { ...req.body };
    const user = await User.findOne({ email: body.email });
    if (user) {
      return res.status(400).json({ error: 'EMAIL ALREADY EXIST' });
    }
    if (body.password != body.confirmPassword) {
      return res.status(400).json({ error: 'PASSWORDS DOES NOT MATCH' });
    }
    const hashedPassword = await bcrypt.hash(body.password, 2);
    body.password = hashedPassword;
    const newUser = await User.create(body);
    console.log(newUser);
    return res.status(201).json(newUser);
  } catch (e) {
    res.status(400).json(e);
    console.log(e);
  }
});

router.post('/login', async (req, res) => {
  try {
    const body = { ...req.body };
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.status(403).json({ error: 'EMAIL OR PASSWORD INCORRECT' });
    }
    const isMatching = await bcrypt.compare(body.password, user.password);
    if (!isMatching) {
      return res.status(403).json({ error: 'EMAIL OR PASSWORD INCORRECT' });
    }

    const key = process.env.SECRET_KEY;
    const token = jwt.sign({ role: 'User', id: user._id }, key, {
      expiresIn: '10d',
    });
    return res
      .status(200)
      .json({ message: 'User Login Successfull', token: token });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };
    if (body.hasOwnProperty('password')) {
      if (body.password != body.confirmPassword) {
        return res.status(400).json({ error: 'PASSWORDS DOES NOT MATCH' });
      }
      const hashedPassword = await bcrypt.hash(body.password, 2);
      body.password = hashedPassword;
      const user = await User.findByIdAndUpdate(id, body);
      return res.status(201).json({ user: user, message: 'user updated' });
    } else {
      const user = await User.findByIdAndUpdate(id, body);
      return res.status(201).json({ user: user, message: 'user updated' });
    }
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).json(user);
});

router.get('/', async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(204).json({ message: 'user deleted' });
  } catch (e) {
    res.status(400).json(e);
  }
});

export default router;
