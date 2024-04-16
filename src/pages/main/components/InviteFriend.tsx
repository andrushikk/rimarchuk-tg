import React from 'react';

import css from './InviteFriend.module.scss'
import {Link} from "react-router-dom";
import {useTelegram} from "@/utils/hooks/useTelegram";
import axios from "@/axios";

const InviteFriend = () => {
  const { close } = useTelegram()
  const handleInviteFriend = () => {
    axios.get('https://api-wather.plutus-fin.ru/api/bot/sendurlref')
      .then(() => {
        close();
      })
  }
  const handleClose = () => {
    close();
  }
  return (
    <div className={css.inviteFriend}>
      <div className={css.inviteContent}>
        <p className={css.inviteTitle}>Чтобы запустить игру вам нужно пригласить хотя бы одного друга в наше приложение</p>
        <p className={css.inviteText}>Сделать это можно в нашем специальном разделе, переходить можно по кнопке ниже</p>
        <Link to="/tasks" onClick={handleInviteFriend} className={css.inviteBtn}>
          <div className={css.inviteBtnText}>Пригласить друга</div>
        </Link>
        <Link to="/tasks" onClick={handleClose} className={css.inviteBtn}>
          <div className={css.inviteBtnText}>Закрыть</div>
        </Link>
      </div>
    </div>
  );
};

export default InviteFriend;