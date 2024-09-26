import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { ThunkDispatch } from '@reduxjs/toolkit';

import axios from '@/axios';
import { Loader } from '@/components/Loader';
import { authToken } from '@/store/authSlice';
import { getCheckPay } from '@/store/checkPaySlice';
import { useTelegram } from '@/utils/hooks/useTelegram';

import css from './AppLayout.module.scss';

export const AppLayout = () => {
    const { initDataUnsafe, close } = useTelegram();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const userId: number = initDataUnsafe?.user?.id;
    const payObject = localStorage.getItem('status_pay');
    const { data } = useSelector((state: any) => state.checkPay);

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
                if (JSON.parse(payObject)?.pay_status === 'pay') {
                    if (data?.course_id?.includes(JSON.parse(payObject).course_id)) {
                        const response = await axios.post(
                            `https://api-wather.plutus-fin.ru/api/bot/sendmanual?manualID=${
                                JSON.parse(payObject).course_id
                            }`
                        );
                        if (response.status === 200) {
                            localStorage.removeItem('status_pay');
                            close();
                        }
                    } else if (data?.manuals_id?.includes(JSON.parse(payObject).manuals_id)) {
                        const response = await axios.post(
                            `https://api-wather.plutus-fin.ru/api/bot/sendmanual?manualID=${
                                JSON.parse(payObject).manuals_id
                            }`
                        );
                        if (response.status === 200) {
                            localStorage.removeItem('status_pay');
                            close();
                        }
                    }
                }
            }
        };

        fetchPayContent();
    }, [dispatch]);

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
