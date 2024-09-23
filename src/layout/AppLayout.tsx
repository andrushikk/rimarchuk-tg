import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { ThunkDispatch } from '@reduxjs/toolkit';

import { Loader } from '@/components/Loader';
import { authToken } from '@/store/authSlice';
import { useTelegram } from '@/utils/hooks/useTelegram';

import css from './AppLayout.module.scss';

export const AppLayout = () => {
    const { initDataUnsafe } = useTelegram();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const userId: number = initDataUnsafe?.user?.id;

    useEffect(() => {
        const fetchToken = async () => {
            await dispatch(authToken(Number(userId)));
        };

        if (userId) fetchToken();
    }, [userId, dispatch]);

    return (
        <div className={css.layout}>
            {/*{!videoPlayed && (*/}
            {/*    <ReactPlayer*/}
            {/*        url="https://content-water.plutus-fin.ru/videos/intro.mp4"*/}
            {/*        playing={true}*/}
            {/*        loop={false}*/}
            {/*        muted={true}*/}
            {/*        width="100%"*/}
            {/*        height="100%"*/}
            {/*        style={{ position: 'relative', top: 0, left: 0 }}*/}
            {/*        onEnded={handleVideoEnded}*/}
            {/*    />*/}
            {/*)}*/}

            {/*{videoPlayed && (*/}
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
            {/*)}*/}
        </div>
    );
};
