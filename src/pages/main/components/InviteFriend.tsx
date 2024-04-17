import React from 'react';

import css from './InviteFriend.module.scss'
import {Link} from "react-router-dom";
import {useTelegram} from "@/utils/hooks/useTelegram";
import axios from "@/axios";
import {UserGet, UserGetResponse} from "@/utils/types";
import {useSelector} from "react-redux";

const InviteFriend = ({ closeModal }: any) => {
  const currentUser: UserGet = useSelector((state: UserGetResponse) => state.currentUser);

  return (
    <div className={css.inviteFriend} onClick={closeModal}>
      <div className={css.inviteContent} onClick={(e) => e.stopPropagation()}>
        <p className={css.inviteTitle}>Чтобы запустить трекер воды вам нужно пригласить хотя бы одного друга</p>
        <p className={css.inviteText}>Нажми на кнопку ниже</p>
        <a href={`https://t.me/share/url?url=Привет,+я+слежу+за+своим+уровнем+воды+прямо+в+Telegram%0A%0AХочешь+также?+Тогда+переходи+по+ссылке:+https://t.me/imlegendbot?start=${currentUser.data.user_id}`} className={css.inviteBtn}>
          <div className={css.inviteBtnText}>Пригласить друга</div>
        </a>
        <a href="#" onClick={closeModal} className={css.inviteBtn}>
          <div className={css.inviteBtnText}>Закрыть</div>
        </a>
      </div>
    </div>
  );
};

export default InviteFriend;