import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Page/Home/Home';
import MediaCenter from './Page/More Abou Media Center/MediaCenter';
import Residential from './Page/Residential/Residential';
// import Portal from './Page/Portal/Portal';
import District from './Page/District Page/District';
import HomLoanFaq from './Page/Home Loan FAQ/HomLoanFaq';
import Philosophy from './Page/Philosophy Page/Philosophy';
import ElitePrivilage from './Page/Elite Privilage/ElitePrivilage';
import EliteBlogs from './Page/Eliite Blogs/EliteBlogs';
import EliteBlogExtraPage from './Page/Elite Blog Extra/EliteBlogExtraPage';
import ImageFallery from './Page/Image Gallery/ImageFallery';
import ContactPage from './Page/Contact Page/ContactPage';
import HomeGuide from './Page/Home Buying Guide/HomeGuide';
import ProductDetails from './Page/Product Details/ProductDetails';
import Disclaimer from './Page/Disclaimer Page/Disclaimer';
import Terms from './Page/Terms Page/Terms';
import Privacy from './Page/Privacy Policy/Privacy';
import Rera from './Page/Rera Page/Rera';
import SiteMap from './Page/Site Map Page/SiteMap';
import ReactGA from 'react-ga4';
import Redirect from './Page/Redirected Page/Redirect';
import Careers from './Page/Careers Page/Careers';

const App = () => {
  //original id
  ReactGA.initialize('G-MRBZL89HD0');

  //testing id
  // ReactGA.initialize('G-5952W962F30');

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/media-center" element={<MediaCenter />} />
        <Route path="/residential" element={<Residential />} />
        <Route path="/districtName/:district" element={<District />} />
        <Route path="/homeloan" element={<HomLoanFaq />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/rera" element={<Rera />} />
        <Route path="/sitemap" element={<SiteMap />} />
        <Route path="/philosophy" element={<Philosophy />} />
        <Route path="/elite-privilage" element={<ElitePrivilage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/home-buying-guide" element={<HomeGuide />} />
        <Route path="/elite-blog" element={<EliteBlogs />} />
        <Route path="/elite-blog-extra/:id" element={<EliteBlogExtraPage />} />
        <Route path="/careers" element={<Careers />} />
        <Route
          path="/media-center/image-gallery/:id"
          element={<ImageFallery />}
        />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/redirect" element={<Redirect />} />
      </Routes>
    </div>
  );
};

export default App;
