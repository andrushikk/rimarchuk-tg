import React from 'react';

import css from './InviteFriend.module.scss'
import {AuthResponse, AuthUser} from "@/utils/types";
import {useSelector} from "react-redux";

const InviteFriend = ({ closeModal }: any) => {
  const authUser: AuthUser = useSelector((state: AuthResponse) => state.auth);

  return (
    <div className={css.inviteFriend} onClick={closeModal}>
      <div className={css.inviteContent} onClick={(e) => e.stopPropagation()}>
        <p className={css.inviteTitle}>
          Чтобы запустить трекер воды вам нужно хотя бы одному другу подарить внимание своему состоянию💙</p>
        <p className={css.inviteText}>Нажми на кнопку ниже ⬇️</p>
        <a href={`https://t.me/share/url?url=Привет,+я+слежу+за+своим+уровнем+воды+прямо+в+Telegram%0A%0AХочешь+также?+Тогда+переходи+по+ссылке:+https://t.me/imlegendbot?start=${authUser.user[0].user_id}`} className={css.inviteBtn}>
          <div className={css.inviteBtnText}>Пригласить друга</div>
        </a>
        <a href="#" onClick={closeModal} className={css.inviteCloseBtn}>
          <div className={css.inviteBtnText}>Закрыть</div>
        </a>
      </div>
    </div>
  );
};

export default InviteFriend;