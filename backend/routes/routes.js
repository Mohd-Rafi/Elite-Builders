import express from 'express';
import imageRoute from './image/image.js';
import UserRoute from './user/index.js';
import sliderRouter from './homeSlider/index.js';
import stateRouter from './location/index.js';
import logoSchema from './Logo/index.js';
import qrCodeSchema from './QRCode/index.js';
import gallerySchema from './Gallery/index.js';
import builderCardSchema from './BuilderCard/index.js';
import blogCardSchema from './BlogCard/index.js';
import newsAndEventSchema from './NewsAndEvents/index.js';
import StatusAddingSchema from './AddStatus/index.js';
import userReviewSchema from './userReview/index.js';
import EnquirySchema from './enquiry/index.js';
import popupSchema from './Popup/index.js';
import careerSchema from './Career/index.js';
import careerApplicationSchema from './CareerApplications/index.js';

const router = express.Router();

router.use('/upload', imageRoute);
router.use('/user', UserRoute);
router.use('/slider', sliderRouter);
router.use('/location', stateRouter);
router.use('/logo', logoSchema);
router.use('/qrcode', qrCodeSchema);
router.use('/image', gallerySchema);
router.use('/buildercard', builderCardSchema);
router.use('/blogcard', blogCardSchema);
router.use('/statusadding', StatusAddingSchema);
router.use('/newsandevents', newsAndEventSchema);
router.use('/userreview', userReviewSchema);
router.use('/enquiry', EnquirySchema);
router.use('/popup', popupSchema);
router.use('/career', careerSchema);
router.use('/career-application', careerApplicationSchema);

export default router;
