import express from 'express';
import BuilderCard from '../../db/models/builderCardSchema.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const body = { ...req.body };
    // console.log(body);
    const builderCard = await BuilderCard.create(body);
    res.status(201).json(builderCard);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const builderCard = await BuilderCard.find().populate(['district', 'logo']);
    res.status(200).json(builderCard);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const builderCard = await BuilderCard.findById(id).populate([
      'logo',
      'qrcode',
      'siteplan',
      'gallery',
    ]);
    res.status(200).json(builderCard);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const builderCard = await BuilderCard.findByIdAndDelete(id);
    res.status(204).json({ message: 'BuilderCard deleted' });
  } catch (e) {
    res.status(400).json(e.message);
  }
});
router.get('/district/get', async (req, res) => {
  try {
    const { district } = req.query;
    const listings = await BuilderCard.find({
      district: { $regex: district, $options: 'i' },
    });
    res.status(200).json(listings);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.patch('/update/:id', async (req, res) => {
  try {
    const body = { ...req.body };
    const { id } = req.params;
    const builderCard = await BuilderCard.findByIdAndUpdate(id, body);
    return res
      .status(201)
      .json({ builderCard: builderCard, message: 'buildercard updated' });
  } catch (error) {
    res.status(400).json(error.message);
  }
});
export default router;
