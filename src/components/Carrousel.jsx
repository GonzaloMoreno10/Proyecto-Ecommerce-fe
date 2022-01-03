import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import banner from '../banner.jpg';

export const Carrousel = () => {
  return (
    <div id="carrousel">
      <AliceCarousel autoPlay autoPlayInterval="3000" style={{ width: '50px' }}>
        <img src={banner} alt="" className="sliderimg" />

        <img src={banner} alt="" className="sliderimg" />
        <img src={banner} alt="" className="sliderimg" />
      </AliceCarousel>
    </div>
  );
};
