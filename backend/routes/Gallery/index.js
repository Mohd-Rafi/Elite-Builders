import express from 'express';
import Gallery from '../../db/models/gallerySchema.js';
import SitePlan from '../../db/models/sitePlanSchema.js';
import StatusGallery from '../../db/models/statusGallerySchema.js';
const router = express.Router();

router.post('/gallery', async (req, res) => {
  try {
    const body = { ...req.body };

    const gallery = await Gallery.create(body);
    res.status(201).json(gallery);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get('/gallery', async (req, res) => {
  try {
    const gallerys = await Gallery.find();
    res.status(200).json(gallerys);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.get('gallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const gallery = await Gallery.findById(id);
    res.status(200).json(gallery);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.delete('gallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const gallery = await Gallery.findByIdAndDelete(id);
    res.status(204).json({ message: 'gallery deleted' });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.post('/siteplan', async (req, res) => {
  try {
    const body = { ...req.body };

    const sitePlan = await SitePlan.create(body);
    res.status(201).json(sitePlan);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get('/siteplan', async (req, res) => {
  try {
    const sitePlans = await SitePlan.find();
    res.status(200).json(sitePlans);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.get('/siteplan/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sitePlan = await SitePlan.findById(id);
    res.status(200).json(sitePlan);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.delete('/siteplan/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sitePlan = await SitePlan.findByIdAndDelete(id);
    res.status(204).json({ message: 'sitePlan deleted' });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

// -----------------statusgallery-----------------------
router.post('/statusgallery', async (req, res) => {
  try {
    const body = { ...req.body };

    const statusgallery = await StatusGallery.create(body);
    res.status(201).json(statusgallery);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get('/statusgallery', async (req, res) => {
  try {
    const statusgallerys = await StatusGallery.find().populate('name');
    res.status(200).json(statusgallerys);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.get('/statusgallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const statusgallery = await StatusGallery.findById(id);
    res.status(200).json(statusgallery);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.delete('/statusgallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const statusgallery = await StatusGallery.findByIdAndDelete(id);
    res.status(204).json({ message: 'statusgallery deleted' });
  } catch (e) {
    res.status(400).json(e.message);
  }
});
export default router;
