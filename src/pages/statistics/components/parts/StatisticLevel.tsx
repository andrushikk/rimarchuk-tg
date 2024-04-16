import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import imageSrc from '@/assets/images/tasks/stars.png';
import { ProgressBar } from '@/modules/progressBar/ProgressBar';

import { StatisticInfoCard } from './StatisticInfoCard';
import css from './StatisticLevel.module.scss';
import {AuthResponse, AuthUser} from "@/utils/types";
import {useSelector} from "react-redux";
import axios from "@/axios";
import {levelsGet} from "@/utils/api/user";

export const StatisticLevel = () => {
    const authUser: AuthUser = useSelector((state: AuthResponse) => state.auth);
    const [manual, setManual] = useState({
        all: 20,
        current: 3,
    })
    const [waterDay, setWaterDay] = useState({
        all: 20,
        current: 3,
    })

    useEffect(() => {
        const fetchUser = async () => {
            let {levels} = await levelsGet()
            const level = levels.filter(item => item.id === authUser?.user?.[0].lvl_cur)
            if (authUser.user[0]) {
                setManual({
                    all: level[0].quota_manuals,
                    current: authUser?.user?.[0].lvl_manuals
                });
                setWaterDay({
                    all: level[0].quota_water,
                    current: authUser?.user?.[0].lvl_wather_day
                });
            }
        };

        if (authUser.user.length > 0) {
            fetchUser();
        }
    }, [authUser.user]);
    return (
        <>
            <div className={css.statisticLevelWrapper}>
                <div className={css.levelCard}>
                    <div className={css.levelCurrent}>
                        <img src={imageSrc} className={css.currentIcon} alt="level icon"/>
                        <div className={css.currentInfo}>
                            <div className={css.infoTitle}>Звездочка</div>
                            <div className={css.infoDescription}>Ваш текущий уровень</div>
                        </div>
                    </div>
                    <div className={css.completeLevel}>
                        <div className={css.completeTitle}>Куплен {manual.current}/{manual.all} методичек</div>
                        <ProgressBar percent={manual.current / manual.all * 100}/>
                    </div>
                    <div className={css.completeLevel}>
                        <div className={css.completeTitle}>{waterDay.current}/{waterDay.all} дней подряд заполняется трекер воды</div>
                        <ProgressBar percent={waterDay.current / waterDay.all * 100}/>
                    </div>
                    <Link to="/tasks" className={css.watchQuestion}>
                        <div className={css.watchText}>Смотреть задания</div>
                    </Link>
                </div>
            </div>
            <StatisticInfoCard/>
        </>
    );
};
