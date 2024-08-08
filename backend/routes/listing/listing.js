import express from 'express';
import multer from 'multer';
import { nanoid } from 'nanoid';
import fs from 'fs';
import Listing from '../../db/models/listingSchema.js';
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const body = { ...req.body };
    const listing = await Listing.create(body);
    res.status(200).json(listing);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get('/district/get', async (req, res) => {
  try {
    const { district } = req.query;
    const listings = await Listing.find({
      district: { $regex: district, $options: 'i' },
    });
    res.status(200).json(listings);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
