import express from 'express';
import State from '../../db/models/stateSchema.js';
import District from '../../db/models/districtSchema.js';
const router = express.Router();

router.post('/state', async (req, res) => {
  try {
    const body = { ...req.body };

    const state = await State.create(body);
    res.status(201).json(state);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get('/state', async (req, res) => {
  try {
    const states = await State.find();
    res.status(200).json(states);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.delete('/state/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const state = await State.findByIdAndDelete(id);
    res.status(204).json({ message: 'state deleted' });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

// ----------------distict crud operation---------------------

router.post('/district', async (req, res) => {
  try {
    const body = { ...req.body };

    const district = await District.create(body);
    res.status(201).json(district);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get('/district', async (req, res) => {
  try {
    const districts = await District.find().populate('stateName');
    res.status(200).json(districts);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.delete('/district/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const district = await District.findByIdAndDelete(id);
    res.status(204).json({ message: 'district deleted' });
  } catch (e) {
    res.status(400).json(e.message);
  }
});
export default router;
