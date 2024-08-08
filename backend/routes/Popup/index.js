import express from 'express';
import Popup from '../../db/models/popupSchema.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const body = { ...req.body };
    // console.log(body);
    const popup = await Popup.create(body);
    res.status(201).json(popup);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const popup = await Popup.find();
    res.status(200).json(popup);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const popup = await Popup.findById(id);
    res.status(200).json(popup);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

// router.post('/detail/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const body = { ...req.body };
//     const NewsAndEvent = await Popup.findByIdAndUpdate(id, body);
//     return res
//       .status(201)
//       .json({ user: NewsAndEvent, message: 'NewsAndEvent updated' });
//   } catch (e) {
//     res.status(400).json(e);
//   }
// });

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const popup = await Popup.findByIdAndDelete(id);
    res.status(204).json({ message: 'NewsAndEvent deleted', popup });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

export default router;
