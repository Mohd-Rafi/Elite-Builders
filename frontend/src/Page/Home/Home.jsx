import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import CarouselComponent from '../../components/Banner';
import BuildingLifeStyles from '../../components/Building LifeStyles/BuildingLifeStyles';
import Locations from '../../components/Locations and Qote/Locations';
import CarouselSection from '../../components/Carousel Section/CarouselSection';
import ServiceSection from '../../components/Service Section/ServiceSection';
import MoreAbout from '../../components/More About/MoreAbout';
import ContactSection from '../../components/Contact Section/ContactSection';
import Footer from '../../components/Footer/Footer';

import BuildingCard from '../../components/BuildingCard/BuildingCard';
import customAxios from '../../../utils/CustomAxios';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';

const Home = () => {
  const [state, setState] = useState([]);
  let [loading, setLoading] = useState(false);

  const fetchDataApiCall = async () => {
    try {
      setLoading(true);
      const response = await customAxios.get('/slider/homesliders');
      setState(response.data);
      setLoading(false);
    } catch (e) {
      setLoading(true);
      console.log(e.message);
    }
  };
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: '/',
      title: 'Home',
    });
    fetchDataApiCall();
  }, []);
  return (
    <div>
      <Helmet>
        <title>
          Elite Developers | Flats,Apartments and villas in
          Thrissur,Trivandrum,Kerala
        </title>
        <meta
          name="description"
          content="Best builders in Kerala located at Thrissur and Trivandrum ,Offers you Villas and flats in Thrissur developed with an eye for great design employing the best resources."
        />
        <meta
          name="keywords"
          content="builders at thrissur,builders at trivandrum,apartments thrissur,flat thrissur,villa "
        />
      </Helmet>

      <Header />
      <CarouselComponent state={state} loading={loading} />
      <BuildingLifeStyles />
      <BuildingCard />
      <Locations />
      <CarouselSection />
      <ServiceSection />
      <MoreAbout />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
