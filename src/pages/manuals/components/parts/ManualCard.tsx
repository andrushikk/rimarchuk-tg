import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import cs from 'classnames';

import ManualBook from '@/assets/images/manuals/book.svg';
import BuyBook from '@/assets/images/manuals/buy.svg';
import DownloadBook from '@/assets/images/manuals/download.svg';
import { Manuals } from '@/utils/types/manuals';

import css from './ManualCard.module.scss';
import axios from "@/axios";
import {useTelegram} from "@/utils/hooks/useTelegram";

export type ManualCardProps = Manuals & {
    index?: number;
    className?: any;
    isPage?: boolean;
};

export const ManualCard: FC<ManualCardProps> = (props) => {
    const { close } = useTelegram()
    const { name, description, cost, id, is_block } = props;

    const handleManual = () => {
        axios.post(`https://api-wather.plutus-fin.ru/api/bot/sendmanual?manualID=${id}`)
        close()
    }

    return (
        <div className={css.manualCard}>
            <Link to={is_block ? `/manual/${id}` : '#'} onClick={handleManual} className={css.manualLink}>
                <div className={cs(css.iconColumn, css.manualIcon)}>
                    <ManualBook />
                </div>
                <div className={css.blockManual}>
                    <div className={css.textColumn}>
                        <div className={css.title}>{name}</div>
                        <div className={css.description}>{description}</div>
                    </div>
                    <div className={cs(css.iconColumn, css.downloadIcon)}>{is_block ? <BuyBook /> : <DownloadBook />}</div>
                </div>
            </Link>
        </div>
    );
};
