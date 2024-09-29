import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThunkDispatch } from '@reduxjs/toolkit';

import { Menu } from '@/modules/menu/Menu';
import { PodcastsBlock } from '@/modules/podcastsBlock/PodcastsBlock';
import { VideoBlock } from '@/modules/videoBlock/VideoBlock';
import { getUser } from '@/store/currentUserSlice';
import { AuthResponse, AuthUser } from '@/utils/types';

import css from './Main.module.scss';
import { AffirmationDay } from './components/AffirmationDay';
import { BookBlock } from './components/BookBlock';
import { WaterTracker } from './components/WaterTracker';

const MainPage = () => {
    const [, setIsMobile] = useState(window.innerWidth < 500);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    // const userId: number = 5231658595
    // const userName: string = 'Andrey'

    const authUser: AuthUser = useSelector(
        (state: AuthResponse) => state.auth || { user: [], status: null, error: null }
    );

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 500);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            localStorage.setItem('api_token', authUser.user[0].api_token);
            await dispatch(getUser());
        };

        if (authUser.user?.length > 0) {
            fetchUser();
        }
    }, [authUser.user, dispatch]);

    return (
        <div className={css.container}>
            <div>
                <AffirmationDay />
                <WaterTracker />
                <BookBlock />
                <PodcastsBlock />
                <VideoBlock />
                <Menu />
            </div>
        </div>
    );
};

export default MainPage;
