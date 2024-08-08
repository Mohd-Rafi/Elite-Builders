import express from 'express';
import StatusAdding from '../../db/models/statusAddingSchema.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const body = { ...req.body };
    // console.log(body);
    const statusAdding = await StatusAdding.create(body);
    res.status(201).json(statusAdding);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const statusAdding = await StatusAdding.find();
    res.status(200).json(statusAdding);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const statusAdding = await StatusAdding.findByIdAndDelete(id);
    res.status(204).json({ message: 'StatusAdding deleted' });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

export default router;
