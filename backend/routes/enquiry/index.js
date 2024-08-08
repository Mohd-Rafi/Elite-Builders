import express from 'express';
import nodemailer from 'nodemailer';
import Enquiry from '../../db/models/enquirySchema.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const body = { ...req.body };
    let transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'elitebuildersenquiry@gmail.com',
        pass: process.env.MAIL_PASS,
      },
    });
    let options = {
      from: 'elitebuildersenquiry@gmail.com',
      to: 'insraftor@gmail.com',
      subject: 'ENQUIRY ABOUT ITEMS',
      text: `
      Name: ${body.name}
      Email: ${body.email}
      Mobile No : ${body.mobileno}
      ${body.message ? `Message :${body.message}` : ''}
      `,
    };
    transport.sendMail(options);

    const enquiry = await Enquiry.create(body);
    res.status(200).json(enquiry);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const enquiry = await Enquiry.aggregate([{ $sort: { createdAt: -1 } }]);
    res.status(200).json(enquiry);
  } catch (error) {
    res.status(400).json(error);
  }
});
export default router;
