import express from 'express';
import CareerApplications from '../../db/models/careerApplicationsSchema.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const body = { ...req.body };
    // console.log(body);
    const careerapplication = await CareerApplications.create(body);
    res.status(201).json(careerapplication);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const careerapplication = await CareerApplications.find();
    res.status(200).json(careerapplication);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const careerapplication = await CareerApplications.findById(id);
    res.status(200).json(careerapplication);
  } catch (e) {
    res.status(400).json(e.message);
  }
});
router.patch('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };
    const careerapplication = await CareerApplications.findByIdAndUpdate(
      id,
      body
    );
    res.status(200).json(careerapplication);
  } catch (e) {
    res.status(400).json(e.message);
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const careerapplication = await CareerApplications.findByIdAndDelete(id);
    res.status(204).json({ message: 'careers deleted', careerapplication });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

export default router;
