import express from 'express';
import UserReview from '../../db/models/userReviewSchema.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const body = { ...req.body };
    console.log(body);
    const userreview = await UserReview.create(body);
    res.status(201).json(userreview);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const userreview = await UserReview.find();
    res.status(200).json(userreview);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userreview = await UserReview.findById(id);
    res.status(200).json(userreview);
  } catch (e) {
    res.status(400).json(e.message);
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userreview = await UserReview.findByIdAndDelete(id);
    res.status(200).json(userreview);
  } catch (e) {
    res.status(400).json(e.message);
  }
});
export default router;
