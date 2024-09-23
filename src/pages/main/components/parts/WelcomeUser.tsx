import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ArrowIcon from '@/assets/images/arrowIcon/arrow.svg';
import QuestionsIcon from '@/assets/images/welcomeUser/questions.svg';
import { useTelegram } from '@/utils/hooks/useTelegram';
import { UserGet, UserGetResponse } from '@/utils/types';

import css from './WelcomeUser.module.scss';

export const WelcomeUser = () => {
    const { initDataUnsafe } = useTelegram();
    const [userImg, setUserImg] = useState('');

    const currentUser: UserGet = useSelector((state: UserGetResponse) => state.currentUser);

    const userName = initDataUnsafe?.user?.first_name;

    useEffect(() => {
        const fetchUser = async () => {
            if (currentUser.data && currentUser.data.user_name) {
                setUserImg(currentUser.data?.user_img);
            }
        };

        if (currentUser.data) fetchUser();
    }, [currentUser.data]);

    return (
        <div className={css.welcomeUser}>
            <Link to="/statistics">
                <div className={css.user}>
                    <div className={css.greetings}>
                        {userImg === '' ? (
                            <div className={css.loader}></div>
                        ) : (
                            <img
                                src={userImg ? `data:image/png;base64,${userImg}` : ''}
                                className={css.userAvatar}
                                alt="avatar"
                            />
                        )}

                        <div className={css.userInfo}>
                            <div className={css.helloUser}>Привет</div>
                            <div className={css.username}>{userName ?? 'Аноним'}</div>
                        </div>
                    </div>
                    <button type="button" className={css.arrowIcon}>
                        <ArrowIcon />
                    </button>
                </div>
            </Link>
            <button type="button" className={css.questions}>
                <Link to="/questions">
                    <QuestionsIcon />
                </Link>
            </button>
        </div>
    );
};
