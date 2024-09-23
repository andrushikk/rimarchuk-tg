import css from './InviteFriend.module.scss';

const InviteFriend = ({ closeModal, userId }: any) => {
    const text = encodeURIComponent(`Привет✨ 
Мой вклад в твое состояние. 
Я слежу за своим уровнем воды прямо в приложении Telegram, 
а еще там есть бесплатный курс и методички по здоровью от нутрициолога. 
Переходи по ссылке💛
https://t.me/imlegendbot?start=${userId}`);
    const link = `https://t.me/share/url?url=${text}`;

    return (
        <div className={css.inviteFriend} onClick={closeModal}>
            <div className={css.inviteContent} onClick={(e) => e.stopPropagation()}>
                <p className={css.inviteTitle}>
                    Чтобы запустить трекер воды вам нужно хотя бы одному другу подарить внимание своему состоянию💙
                </p>
                <p className={css.inviteText}>Нажми на кнопку ниже ⬇️</p>
                <a href={`${link}`} className={css.inviteBtn}>
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
