import { FC } from 'react';
import { Link } from 'react-router-dom';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { PodcastCard } from '@/pages/main/components/parts/PodcastCard';
import { IMedia } from '@/utils/types/media';

import { CommonHeader } from '../header/components/CommonHeader';
import css from './PodcastsBlock.module.scss';

export type PodcastsBlockProps = any;

export const data: IMedia[] = [
    {
        id: 1,
        name: 'Психология питания ребенка',
        url: 'https://content-water.plutus-fin.ru/music/20240925_171705665%20(1).mp3',
        time: '10:24',
        image: '',
    },
    {
        id: 2,
        name: 'Дети и стресс',
        url: 'https://content-water.plutus-fin.ru/VoiceMessages/%D0%94%D0%B5%D1%82%D0%B8%20%D0%B8%20%D1%81%D1%82%D1%80%D0%B5%D1%81%D1%81--online-audio-convert.com.mp3',
        time: '07:06',
        image: '',
    },
    {
        id: 3,
        name: 'Дети и Витамины',
        url: 'https://content-water.plutus-fin.ru/VoiceMessages/%D0%94%D0%B5%D1%82%D0%B8%20%D0%B8%20%D0%92%D0%B8%D1%82%D0%B0%D0%BC%D0%B8%D0%BD%D1%8B--online-audio-convert.com.mp3',
        time: '02:34',
        image: '',
    },
    {
        id: 4,
        name: 'Почему дети часто болеют',
        url: 'https://content-water.plutus-fin.ru/VoiceMessages/%D0%9F%D0%BE%D1%87%D0%B5%D0%BC%D1%83%20%D0%B4%D0%B5%D1%82%D0%B8%20%D1%87%D0%B0%D1%81%D1%82%D0%BE%20%D0%B1%D0%BE%D0%BB%D0%B5%D1%8E%D1%82--online-audio-convert.com.mp3',
        time: '02:51',
        image: '',
    },
    {
        id: 5,
        name: 'Натуропатия в лечении детей',
        url: 'https://content-water.plutus-fin.ru/VoiceMessages/%D0%9D%D0%B0%D1%82%D1%83%D1%80%D0%BE%D0%BF%D0%B0%D1%82%D0%B8%D1%8F%20%D0%B2%20%D0%BB%D0%B5%D1%87%D0%B5%D0%BD%D0%B8%D0%B8%20%D0%B4%D0%B5%D1%82%D0%B5%D0%B9--online-audio-convert.com.mp3',
        time: '03:13',
        image: '',
    },
    {
        id: 6,
        name: 'Дети и антипаразитарная программа',
        url: 'https://content-water.plutus-fin.ru/VoiceMessages/%D0%94%D0%B5%D1%82%D0%B8%20%D0%B8%20%D0%B0%D0%BD%D1%82%D0%B8%D0%BF%D0%B0%D1%80%D0%B0%D0%B7%D0%B8%D1%82%D0%B0%D1%80%D0%BD%D0%B0%D1%8F%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0--online-audio-convert.com.mp3',
        time: '02:13',
        image: '',
    },
    {
        id: 7,
        name: 'Дети и вода',
        url: 'https://content-water.plutus-fin.ru/VoiceMessages/%D0%94%D0%B5%D1%82%D0%B8%20%D0%B8%20%D0%B2%D0%BE%D0%B4%D0%B0--online-audio-convert.com.mp3',
        time: '02:46',
        image: '',
    },
    {
        id: 8,
        name: 'Как я создала программу',
        time: '13:55',
        url: 'https://content-water.plutus-fin.ru/music/%D0%9A%D0%90%D0%9A%20%D0%AF%20%D0%A1%D0%9E%D0%97%D0%94%D0%90%D0%9B%D0%90%20%D0%9F%D0%A0%D0%9E%D0%93%D0%A0%D0%90%D0%9C%D0%9C%D0%A3.ogg--online-audio-convert.com.mp3',
        image: '',
    },
    {
        id: 9,
        name: 'О той самой жизни в настоящем',
        url: 'https://content-water.plutus-fin.ru/music/%D0%9E%20%D1%82%D0%BE%D0%B9%20%D1%81%D0%B0%D0%BC%D0%BE%D0%B9%20%D0%B6%D0%B8%D1%85%D0%BD%D0%B8%20%D0%B2%20%D0%BD%D0%B0%D1%81%D1%82%D0%BE%D1%8F%D1%89%D0%B5%D0%BC.ogg--online-audio-convert.com.mp3',
        time: '11:21',
        image: '',
    },
    {
        id: 10,
        name: 'Поговорим о твоей мотивации',
        url: 'https://content-water.plutus-fin.ru/music/%D0%9F%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B8%D0%BC%20%D0%BE%20%D1%82%D0%B2%D0%BE%D0%B5%D0%B9%20%D0%BC%D0%BE%D1%82%D0%B8%D0%B2%D0%B0%D1%86%D0%B8%D0%B8.ogg--online-audio-convert.com.mp3',
        time: '9:30',
        image: '',
    },
    {
        id: 11,
        name: 'Создаем свои новые убеждения',
        url: 'https://content-water.plutus-fin.ru/music/%D0%A1%D0%BE%D0%B7%D0%B4%D0%B0%D0%B5%D0%BC%20%D1%81%D0%B2%D0%BE%D0%B8%20%D0%BD%D0%BE%D0%B2%D1%8B%D0%B5%20%D1%83%D0%B1%D0%B5%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F.ogg--online-audio-convert.com.mp3',
        time: '07:11',
        image: '',
    },
];

export const PodcastsBlock: FC<PodcastsBlockProps> = () => {
    return (
        <div className={css.podcastsBlock}>
            <Link to="/podcasts" className={css.resetStyle}>
                <CommonHeader title="Подкасты" />
            </Link>

            <Swiper spaceBetween={12} slidesPerView={1.75} className={css.slider} freeMode={true}>
                {data?.map((item, index) => (
                    <SwiperSlide key={item.id}>
                        <PodcastCard {...item} index={index} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
