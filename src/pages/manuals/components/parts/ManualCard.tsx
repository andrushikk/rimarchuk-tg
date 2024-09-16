import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import cs from 'classnames';

import ManualBook from '@/assets/images/manuals/book.svg';
import BuyBook from '@/assets/images/manuals/buy.svg';
import DownloadBook from '@/assets/images/manuals/download.svg';
import axios from '@/axios';
import { useTelegram } from '@/utils/hooks/useTelegram';
import { Manuals } from '@/utils/types/manuals';

import css from './ManualCard.module.scss';

export type ManualCardProps = Manuals & {
    index?: number;
    className?: any;
    isPage?: boolean;
};

export const ManualCard: FC<ManualCardProps> = (props) => {
    const { close } = useTelegram();
    const { name, description, cost, id, is_block } = props;
    const navigate = useNavigate();

    const handleManual = () => {
        if (is_block) {
            navigate(`/manual/${id}`);
            return;
        }
        axios.post(`https://api-wather.plutus-fin.ru/api/bot/sendmanual?manualID=${id}`);
        close();
    };

    return (
        <div className={css.manualCard}>
            <button onClick={handleManual} className={css.manualLink}>
                <div className={cs(css.iconColumn, css.manualIcon)}>
                    <ManualBook />
                </div>
                <div className={css.blockManual}>
                    <div className={css.textColumn}>
                        <div className={css.title}>{name}</div>
                        <div className={css.description}>{description}</div>
                    </div>
                    <div className={cs(css.iconColumn, css.downloadIcon)}>
                        {is_block ? <BuyBook /> : <DownloadBook />}
                    </div>
                </div>
            </button>
        </div>
    );
};
