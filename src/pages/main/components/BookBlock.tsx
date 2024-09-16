import React, { useEffect, useState } from 'react';

import bookOneSrc from '@/assets/images/bookBlock/book.png';
import bookFourSrc from '@/assets/images/bookBlock/bookFour.png';
import bookThree from '@/assets/images/bookBlock/bookThree.png';
import bookTwoSrc from '@/assets/images/bookBlock/bookTwo.png';
import CardSlider from '@/modules/slider/CardSlider';
import { IBookBlock } from '@/utils/types/book';

import css from './BookBlock.module.scss';
import { BookCard } from './parts/BookCard';

export const data: IBookBlock[] = [
    {
        id: '2',
        link: false,
        book: false,
        content: [
            {
                contentTitle: 'ПЕРСОНАЛЬНАЯ ПРОГРАММА С СОПРОВОЖДЕНИЕМ 2 МЕСЯЦА + 1 МЕСЯЦ В 🎁',
                contentList: [
                    {
                        title: 'Анализ состояния здоровья (обратная связь по результатам анализов/назначение анализов)',
                    },
                    {
                        title: 'Личная схема лечения/поддержания здоровья',
                    },
                    {
                        title: 'Восстановление дефицитов, подбор нутриентов: вы получите план введения витаминов и минералов, чтобы закрыть основные потребности организма, восполнить дефициты, а также оказать положительное влияние на состояние кожи, волос, ногтей, а также гормональную систему, либидо.',
                    },
                    {
                        title: 'Рекомендации по питанию под состояние здоровья и цели',
                    },
                    {
                        title: 'Личное ведение по программе в группе, ответы на вопросы, коррекция программы по необходимости.',
                    },
                ],
                price: '44 444',
                descriptionPrice: 'Стоимость',
                buttonText: 'Купить',
                buttonBuy: 'Купить',
                bonus: false,
                voiceMessage:
                    'https://content-water.plutus-fin.ru/VoiceMessages/%D0%9B%D0%B8%D1%87%D0%BD%D0%B0%D1%8F%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%20%D1%81%20%D1%81%D0%BE%D0%BF%D1%80.2%20%D0%BC%D0%B5%D1%81%D1%8F%D1%86%D0%B0.ogg--online-audio-convert.com.mp3',
                clientResult: 'https://t.me/resultrimarchuk',
            },
            {
                contentTitle: 'КОНСУЛЬТАЦИЯ И РАЗБОР АНАЛИЗОВ',
                contentList: [
                    {
                        title: 'Анализ состояния здоровья (обратная связь по результатам анализов/назначение анализов)',
                    },
                    {
                        title: 'Пути решения проблемы',
                    },
                    {
                        title: 'Подбор общей программы лечения',
                    },
                    {
                        title: 'Консультация проходит в WhatsApp/телеграмм',
                    },
                ],
                price: '9 990',
                buttonText: 'Купить',
                buttonBuy: 'Купить',
                descriptionPrice: 'Стоимость',
                voiceMessage:
                    'https://content-water.plutus-fin.ru/VoiceMessages/%D0%9A%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8F%20%D0%B8%20%D1%80%D0%B0%D0%B7%D0%B1%D0%BE%D1%80%20%D0%B0%D0%BD%D0%B0%D0%BB%D0%B8%D0%B7%D0%BE%D0%B2--online-audio-convert.com.mp3',
                clientResult: 'https://t.me/resultrimarchuk',
            },
            {
                contentTitle: 'ЛИЧНАЯ ПРОГРАММА ‌БЕЗ СОПРОВОЖДЕНИЯ',
                contentList: [
                    {
                        title: 'Анализ состояния здоровья (обратная связь по результатам анализов/назначение анализов)',
                    },
                    { title: 'Личная схема лечения/поддержания здоровья' },
                    {
                        title: 'Восстановление дефицитов, подбор нутриентов: вы получите план введения витаминов и минералов, чтобы закрыть основные потребности организма, восполнить дефициты, а также оказать положительное влияние на состояние кожи, волос, ногтей, а также гормональную систему, либидо.',
                    },
                    { title: 'Рекомендация по питанию под состояние здоровья и цели.' },
                ],
                price: '15 555',
                buttonText: 'Купить',
                buttonBuy: 'Купить',
                descriptionPrice: 'Стоимость',
                voiceMessage:
                    'https://content-water.plutus-fin.ru/VoiceMessages/%D0%9B%D0%B8%D1%87%D0%BD%D0%B0%D1%8F%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%20%D0%B1%D0%B5%D0%B7%20%D1%81%D0%BE%D0%BF%D1%80%D0%BE%D0%B2%D0%BE%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F--online-audio-convert.com.mp3',
                clientResult: 'https://t.me/resultrimarchuk',
            },
            {
                contentTitle:
                    'ПЕРСОНАЛЬНАЯ ПРОГРАММА ДЛЯ ЛЕЧЕНИЯ ИЛИ ПОДДЕРЖАНИЯ ЗДОРОВЬЯ С СОПРОВОЖДЕНИЕМ 1 МЕСЯЦ + 1 НЕДЕЛЯ В 🎁',
                contentList: [
                    {
                        title: 'Анализ состояния здоровья (обратная связь по результатам анализов/назначение анализов)',
                    },
                    { title: 'Личная схема лечения/поддержания здоровья' },
                    {
                        title: 'Восстановление дефицитов, подбор нутриентов: вы получите план введения витаминов и минералов, чтобы закрыть основные потребности организма, восполнить дефициты, а также оказать положительное влияние на состояние кожи, волос, ногтей, а также гормональную систему, либидо.',
                    },
                    { title: 'Рекомендация по питанию под состояние здоровья и цели.' },
                ],
                price: '22 222',
                buttonText: 'Купить',
                buttonBuy: 'Купить',
                descriptionPrice: 'Стоимость',
                voiceMessage:
                    'https://content-water.plutus-fin.ru/VoiceMessages/%D0%9B%D0%B8%D1%87%D0%BD%D0%B0%D1%8F%20%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%20%D1%81%20%D1%81%D0%BE%D0%BF%D1%80%D0%BE%D0%B2%D0%BE%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5%D0%BC%201%20%D0%BC%D0%B5%D1%81%D1%8F%D1%86--online-audio-convert.com.mp3',
                clientResult: 'https://t.me/resultrimarchuk',
            },
        ],
        title: 'Личная консультация от Марины Римарчук',
        image: bookTwoSrc,
        description: 'Энергию и ресурс не надо искать - это есть в нашем теле',
    },
    {
        id: '4',
        book: true,
        title: (
            <div>
                Книга <span className={css.bookPart}>«Будь здоровым сейчас» </span>+личная консультация
            </div>
        ),
        content: [
            {
                contentTitle: 'Книга «Будь здоровым сейчас» + личная консультация',
                contentInfo: 'Консультация в подарок:\n' + 'Детская или взрослая (Стоимостью 5000 ₽)',
                contentList: [
                    {
                        title: 'разбор/назначение анализов',
                    },
                    {
                        title: 'индивидуальный подбор схемы восстановления здоровья',
                    },
                    {
                        title: 'рекомендации по витаминам и добавкам',
                    },
                    {
                        title: 'рекомендации по питанию',
                    },
                ],
                descriptionPrice: 'Стоимость печатной книги + консультации',
                price: '5 990',
                buttonText: 'Стоимость печатной книги + консультации',
                buttonBuy: 'Купить',
            },
        ],
        description: 'Энергию и ресурс не надо искать - это есть в нашем теле.',
        image: bookFourSrc,
    },
    {
        id: '1',
        link: true,
        book: false,
        title: (
            <div>
                <span className={css.bookTitleCard}>I’M LEGEND</span>
            </div>
        ),
        description: 'Твоё перерождение',
        image: bookOneSrc,
    },
];

export const BookBlock = () => {
    const [speed, setSpeed] = useState(17000);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSpeed(10000);
        }, 18000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);
    return (
        <div className={css.bookBlock}>
            <CardSlider slidesToShowMobile={1.05} slidesToShow={1.05} autoplay={true} speed={speed}>
                {data?.map((item, index) => (
                    <BookCard key={item.id} {...item} index={index} />
                ))}
            </CardSlider>
        </div>
    );
};
