import express from 'express';
import Career from '../../db/models/careerSchema.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const body = { ...req.body };
    // console.log(body);
    const careers = await Career.create(body);
    res.status(201).json(careers);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const careers = await Career.find();
    res.status(200).json(careers);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const careers = await Career.findById(id);
    res.status(200).json(careers);
  } catch (e) {
    res.status(400).json(e.message);
  }
});
router.patch('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };
    const careers = await Career.findByIdAndUpdate(id, body);
    res.status(200).json(careers);
  } catch (e) {
    res.status(400).json(e.message);
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const careers = await Career.findByIdAndDelete(id);
    res.status(204).json({ message: 'careers deleted' });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    const body = { ...req.body };
    const { id } = req.params;
    const careers = await Career.findByIdAndUpdate(id, body);
    return res
      .status(201)
      .json({ careers: careers, message: 'careers updated' });
  } catch (error) {
    res.status(400).json(error.message);
  }
});
export default router;
