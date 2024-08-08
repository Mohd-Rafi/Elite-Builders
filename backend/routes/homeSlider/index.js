import express from 'express';
import HomeSlider from '../../db/models/homeSliderSchema.js';

const router = express.Router();

router.post('/homeslider', async (req, res) => {
  try {
    const body = { ...req.body };
    // console.log(body);
    const homeslider = await HomeSlider.create(body);
    res.status(201).json(homeslider);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get('/homesliders', async (req, res) => {
  try {
    const homesliders = await HomeSlider.find();
    res.status(200).json(homesliders);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.delete('/homeslider/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const homesliders = await HomeSlider.findByIdAndDelete(id);
    res.status(204).json({ message: 'slider deleted' });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

export default router;
