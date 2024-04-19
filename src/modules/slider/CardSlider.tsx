import React, { FC, ReactNode } from 'react';
import Slider, { type Settings } from 'react-slick';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import css from './CardSlider.module.scss';

export type CardSliderProps = {
    children: ReactNode;
    slidesToShow?: number;
    slidesToShowMobile?: number;
    autoplay?: boolean;
    speed?: number;
};

const CardSlider: FC<CardSliderProps> = (props) => {
    const { children, slidesToShow = 2, slidesToShowMobile, autoplay = false, speed } = props;

    const settings: Settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow,
        autoplay: autoplay,
        autoplaySpeed: speed,
        arrows: false,
        swipeToSlide: true,
        responsive: slidesToShowMobile
            ? [
                  {
                      breakpoint: 420,
                      settings: {
                          slidesToShow: slidesToShowMobile,
                      },
                  },
              ]
            : undefined,
    };

    return (
        <Slider {...settings} className={css.CardSlider}>
            {children}
        </Slider>
    );
};

export default CardSlider;
