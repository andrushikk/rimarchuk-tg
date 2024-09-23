import { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { ThunkDispatch } from '@reduxjs/toolkit';

import axios from '@/axios';
import { Loader } from '@/components/Loader';
import { authToken } from '@/store/authSlice';
import { getCheckPay } from '@/store/checkPaySlice';
import { useTelegram } from '@/utils/hooks/useTelegram';

import css from './AppLayout.module.scss';

export const AppLayout = () => {
    const { initDataUnsafe } = useTelegram();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const userId: number = initDataUnsafe?.user?.id;
    const [courses, setCourses] = useState([]);
    const [manuals, setManuals] = useState([]);

    useEffect(() => {
        const fetchToken = async () => {
            await dispatch(authToken(Number(userId)));
        };

        if (userId) fetchToken();
    }, [userId, dispatch]);

    useEffect(() => {
        const fetchPayContent = async () => {
            const response = await dispatch(getCheckPay());
            if (getCheckPay.fulfilled.match(response)) {
                setCourses(response.payload.course_id);
                setManuals(response.payload.manuals_id);
            }
        };

        const payObject = localStorage.getItem('status_pay');
        if (JSON.parse(payObject)?.pay_status === 'pay') {
            fetchPayContent();
            if (JSON.parse(payObject).course_id in courses) {
                axios.post(
                    `https://api-wather.plutus-fin.ru/api/bot/sendmanual?manualID=${JSON.parse(payObject).course_id}`
                );
                localStorage.removeItem('status_pay');
            } else if (JSON.parse(payObject).manuals_id in manuals) {
                axios.post(
                    `https://api-wather.plutus-fin.ru/api/bot/sendmanual?manualID=${JSON.parse(payObject).manuals_id}`
                );
                localStorage.removeItem('status_pay');
            }
        }
    }, [courses, manuals, dispatch]);

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
