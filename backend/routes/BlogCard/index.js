import express from 'express';
import BlogCard from '../../db/models/blogCardSchema.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const body = { ...req.body };
    // console.log(body);
    const blogCard = await BlogCard.create(body);
    res.status(201).json(blogCard);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const blogCards = await BlogCard.find();
    res.status(200).json(blogCards);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.get('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const blogCard = await BlogCard.findById(id);
    res.status(200).json(blogCard);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.post('/detail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };
    const blogcard = await BlogCard.findByIdAndUpdate(id, body);
    return res
      .status(201)
      .json({ user: blogcard, message: 'blogcard updated' });
  } catch (e) {
    res.status(400).json(e);
  }
});
// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const builderCard = await BlogCard.findById(id).populate([
//       'logo',
//       'qrcode',
//       'siteplan',
//       'statusgallery',
//       'gallery',
//     ]);
//     res.status(200).json(builderCard);
//   } catch (e) {
//     res.status(400).json(e.message);
//   }
// });

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const blogCard = await BlogCard.findByIdAndDelete(id);
    res.status(204).json({ message: 'BlogCard deleted' });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

export default router;
