import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AuthResponse, AuthUser } from '@/utils/types';

import css from './InviteFriend.module.scss';

const InviteFriend = ({ closeModal }: any) => {
    const authUser: AuthUser = useSelector((state: AuthResponse) => state.auth);
    const text = encodeURIComponent(`Привет✨ 
Мой вклад в твое состояние. 
Я слежу за своим уровнем воды прямо в приложении Telegram, 
а еще там есть бесплатный курс и методички по здоровью от нутрициолога. 
Переходи по ссылке💛
https://t.me/imlegendbot?start=${authUser.user[0].user_id}`);
    const link = `https://t.me/share/url?url=${text}`;

    const navigate = useNavigate();
    return (
        <button className={css.inviteFriend} onClick={closeModal}>
            <button className={css.inviteContent} onClick={(e) => e.stopPropagation()}>
                <p className={css.inviteTitle}>
                    Чтобы запустить трекер воды вам нужно хотя бы одному другу подарить внимание своему состоянию💙
                </p>
                <p className={css.inviteText}>Нажми на кнопку ниже ⬇️</p>
                <a href={`${link}`} className={css.inviteBtn}>
                    <div className={css.inviteBtnText}>Пригласить друга</div>
                </a>

                <button
                    onClick={() => {
                        closeModal();
                        navigate('/');
                    }}
                    className={css.inviteBtn}
                >
                    <div className={css.inviteBtnText}>Закрыть</div>
                </button>
            </button>
        </button>
    );
};

export default InviteFriend;
