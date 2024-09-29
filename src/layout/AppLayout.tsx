import { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { ThunkDispatch } from '@reduxjs/toolkit';

import axios from '@/axios';
import { Loader } from '@/components/Loader';
import { LoadingStatus } from '@/constants';
import { getAffirmationAll } from '@/store/affirmationSlice';
import { authToken } from '@/store/authSlice';
import { getCheckPay } from '@/store/checkPaySlice';
import { addNewUser, getUsersAll } from '@/store/userSlice';
import { getVideosAll } from '@/store/videosSlice';
import { useTelegram } from '@/utils/hooks/useTelegram';
import { AllUsers, UserResponse } from '@/utils/types';

import css from './AppLayout.module.scss';

export const AppLayout = () => {
    const { initDataUnsafe, close } = useTelegram();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const userId: number = initDataUnsafe?.user?.id;
    const userName: string = initDataUnsafe?.user?.first_name;
    const payObject = localStorage.getItem('status_pay');
    const { data, status } = useSelector((state: any) => state.checkPay);
    const [manualSent, setManualSent] = useState(false);
    const allUsers: AllUsers = useSelector((state: UserResponse) => state.user);

    useEffect(() => {
        const fetchData = async () => {
            if (!allUsers.data.length) {
                dispatch(getUsersAll());
                return;
            }

            if (userId && userName) {
                await dispatch(authToken(Number(userId)));
                const isIdExists = allUsers.data.some((user) => +user.user_id === +userId);
                if (!isIdExists) {
                    await dispatch(addNewUser({ user_id: +userId, user_name: userName }));
                } else {
                    await dispatch(getAffirmationAll());
                    await dispatch(getVideosAll());
                }
            }
        };

        fetchData();
    }, [dispatch, allUsers.data, userId, userName]);

    useEffect(() => {
        const fetchToken = async () => {
            await dispatch(authToken(Number(userId)));
        };

        if (userId) fetchToken();
    }, [userId, dispatch]);

    useEffect(() => {
        const fetchPayContent = async () => {
            if (manualSent) return;

            const payObjectParsed = JSON.parse(payObject);

            if (payObjectParsed?.pay_status === 'pay') {
                let response;
                if (data.course_id.includes(payObjectParsed.course_id)) {
                    response = await axios.post(
                        `https://api-wather.plutus-fin.ru/api/bot/sendmanual?manualID=${payObjectParsed.course_id}`
                    );
                } else if (data.manuals_id.includes(payObjectParsed.manuals_id)) {
                    response = await axios.post(
                        `https://api-wather.plutus-fin.ru/api/bot/sendmanual?manualID=${payObjectParsed.manuals_id}`
                    );
                }

                setManualSent(true);

                if (response?.status === 200) {
                    localStorage.removeItem('status_pay');
                    close();
                }
            }
        };

        if (status === LoadingStatus.none && userId) {
            dispatch(getCheckPay());
        } else if (status === LoadingStatus.fulfilled && payObject && !manualSent) {
            fetchPayContent();
        }
    }, [status, dispatch, userId, payObject, manualSent, close]);

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
