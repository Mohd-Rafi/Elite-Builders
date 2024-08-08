import express from 'express';
import QRCode from '../../db/models/qrSchema.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const body = { ...req.body };
    // console.log(body);
    const qrcode = await QRCode.create(body);
    res.status(201).json(qrcode);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const qrcodes = await QRCode.find();
    res.status(200).json(qrcodes);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const qrcode = await QRCode.findById(id);
    res.status(200).json(qrcode);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const qrcode = await QRCode.findByIdAndDelete(id);
    res.status(204).json({ message: 'qrcode deleted' });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

export default router;
