import React, {FC, useEffect, useState} from 'react';

import cs from 'classnames';

import cameraImage from '@/assets/images/statistics/camera.png';
import microImage from '@/assets/images/statistics/micro.png';
import waterImage from '@/assets/images/statistics/water.png';
import { IStatisticInfoCard } from '@/utils/types/statistic';

import css from './StatisticInfoCard.module.scss';
import {AuthResponse, AuthUser} from "@/utils/types";
import {useSelector} from "react-redux";

export type StatisticInfoCardProps = {
    className?: any;
};

export const StatisticInfoCard: FC<StatisticInfoCardProps> = (props) => {
    const { className } = props;
    const authUser: AuthUser = useSelector((state: AuthResponse) => state.auth);
    const [myStats, setMyStats] = useState({
        water_month: 0,
        water_week: 0,
        vid_quantity: 0,
        podcadst_quantity: 0,
    })

    useEffect(() => {
        const fetchUser = async () => {
            if (authUser.user[0]) {
                setMyStats({
                    water_month: authUser.user?.[0].water_month,
                    water_week: authUser.user?.[0].water_week,
                    vid_quantity: authUser.user?.[0].vid_quantity,
                    podcadst_quantity: authUser.user?.[0].podcadst_quantity
                })
            }
        };

        if (authUser.user.length > 0) {
            fetchUser();
        }
        console.log(myStats)
    }, [authUser.user]);

    const data: IStatisticInfoCard[] = [
        { id: '1', title: `${myStats.water_week} мл`, description: 'за неделю выпито воды', icon: waterImage },
        { id: '2', title: `${myStats.water_month} мл`, description: 'за месяц выпито воды', icon: waterImage },
        { id: '3', title: myStats.vid_quantity, description: 'Видео вы уже посмотрели', icon: cameraImage },
        { id: '4', title: myStats.podcadst_quantity, description: 'Подкастов вы уже послушали', icon: microImage },
    ];

    return (
        <div className={cs(css.statisticInfoCard, className)}>
            {data.map((item) => (
                <div key={item.id} className={cs(css.infoCardItem)}>
                    <img src={item.icon} className={css.infoCardIcon} alt="icon statistic" />
                    <div className={css.infoCardTitle}>{item.title}</div>
                    <div className={css.infoCardDescription}>{item.description}</div>
                </div>
            ))}
        </div>
    );
};
