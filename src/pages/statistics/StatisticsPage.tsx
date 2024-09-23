import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useBackButton } from '@/utils/hooks/useBackButton';
import { useTelegram } from '@/utils/hooks/useTelegram';
import { UserGet, UserGetResponse } from '@/utils/types';

import css from './StatisticsPage.module.scss';
import { MyStatistics } from './components/MyStatistics';

const StatisticsPage = () => {
    useBackButton('/');
    const { initDataUnsafe } = useTelegram();
    const [userImg, setUserImg] = useState('');

    const currentUser: UserGet = useSelector((state: UserGetResponse) => state.currentUser);

    useEffect(() => {
        const fetchUser = async () => {
            if (currentUser.data && currentUser.data.user_name) {
                setUserImg(currentUser.data?.user_img);
            }
        };

        if (currentUser.data) fetchUser();
    }, [currentUser.data]);

    return (
        <div className={css.statisticsWrapper}>
            <div className={css.statisticsPage}>
                <div className={css.userAvatar}>
                    {userImg === '' ? (
                        <div className={css.loader}></div>
                    ) : (
                        <img
                            src={userImg ? `data:image/png;base64,${userImg}` : ''}
                            className={css.userAvatar}
                            alt="avatar"
                        />
                    )}
                </div>
                <p className={css.username}>{initDataUnsafe?.user?.first_name ?? 'Аноним'}</p>
            </div>
            <MyStatistics />
        </div>
    );
};

export default StatisticsPage;
