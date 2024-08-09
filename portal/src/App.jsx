import { useState } from 'react';
import UserLogin from './Pages/Userlogin';
import UserSignUp from './Pages/UserSignup';
import PrivateRoute from './components/PrivateRoute';
import Home from './Pages/Home';
import HomeSlider from './Pages/HomeSlider';
import BlogerCard from './Pages/BlogerCard';
import UserReview from './Pages/UserReview';
import NewsAndEvents from './Pages/NewsAndEvents';
import BuilderCard from './Pages/BuilderCard';
import State from './Pages/State';
import District from './Pages/District';
import Logo from './Pages/Logo';
import QRCode from './Pages/QRCode';
import BuilderGallery from './Pages/BuilderGallery';
import SitePlanGallery from './Pages/SitePlanGallery';
import StatusGallery from './Pages/StatusGallery';
import StatusAdding from './Pages/StatusAdding';
import UserList from './Pages/UserList';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Enquiries from './Pages/Enquiries';
import Popup from './Pages/Popup';
import Careers from './Pages/Careers';
import CareersApplication from './Pages/CareersAppications';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<UserLogin />}></Route>
        <Route path="/signup" element={<UserSignUp />}></Route>
        <Route element={<PrivateRoute role="User" path="/" />}>
          <Route path="/home" element={<Home />}>
            <Route path="userlist" element={<UserList />} />
            <Route path="list-home-slider" element={<HomeSlider />} />
            <Route path="createblogcard" element={<BlogerCard />} />
            <Route path="createuserreview" element={<UserReview />} />
            <Route path="createnews" element={<NewsAndEvents />} />
            <Route path="enquiry" element={<Enquiries />} />
            <Route path="popup" element={<Popup />} />
            <Route path="careers" element={<Careers />} />
            <Route
              path="careers-application"
              element={<CareersApplication />}
            />
            <Route path="createbuildercard" element={<BuilderCard />} />
            <Route path="createlogo" element={<Logo />} />
            <Route path="createqr" element={<QRCode />} />
            <Route path="creategallery" element={<BuilderGallery />} />
            <Route path="createsitegallery" element={<SitePlanGallery />} />
            <Route path="createstatusadding" element={<StatusAdding />} />
            <Route path="createstatusgallery" element={<StatusGallery />} />
            <Route path="add-state" element={<State />} />
            <Route path="add-district" element={<District />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
