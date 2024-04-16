import React from 'react';

import css from './InviteFriend.module.scss'
import {Link} from "react-router-dom";
import {useTelegram} from "@/utils/hooks/useTelegram";
import axios from "@/axios";

const InviteFriend = ({ closeModal }: any) => {
  const { close } = useTelegram()
  const handleInviteFriend = () => {
    axios.get('https://api-wather.plutus-fin.ru/api/bot/sendurlref')
      .then(() => {
        close();
      })
  }
  return (
    <div className={css.inviteFriend} onClick={closeModal}>
      <div className={css.inviteContent} onClick={(e) => e.stopPropagation()}>
        <p className={css.inviteTitle}>Чтобы запустить трекер воды вам нужно пригласить хотя бы одного друга</p>
        <p className={css.inviteText}>Сделать это можно в нашем специальном разделе. Нажми на кнопку ниже</p>
        <Link to="/tasks" onClick={handleInviteFriend} className={css.inviteBtn}>
          <div className={css.inviteBtnText}>Пригласить друга</div>
        </Link>
        <Link to="/tasks" onClick={closeModal} className={css.inviteBtn}>
          <div className={css.inviteBtnText}>Закрыть</div>
        </Link>
      </div>
    </div>
  );
};

export default InviteFriend;