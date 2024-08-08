import express from 'express';
import Logo from '../../db/models/logoSchema.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const body = { ...req.body };
    console.log(body);
    const logo = await Logo.create(body);
    res.status(201).json(logo);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const logos = await Logo.find();
    res.status(200).json(logos);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const logos = await Logo.findById(id);
    res.status(200).json(logos);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const logo = await Logo.findByIdAndDelete(id);
    res.status(204).json({ message: 'logo deleted' });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

export default router;
