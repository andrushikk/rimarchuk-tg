import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import imageSrc from '@/assets/images/tasks/stars.png';
import { ProgressBar } from '@/modules/progressBar/ProgressBar';

import { StatisticInfoCard } from './StatisticInfoCard';
import css from './StatisticLevel.module.scss';
import {statPercentGet} from "@/utils/api/user";
import {AuthResponse, AuthUser} from "@/utils/types";
import {useSelector} from "react-redux";
import cs from "classnames";

export const StatisticLevel = () => {
    const [statPercent, setStatPercent] = useState(3)
    const authUser: AuthUser = useSelector((state: AuthResponse) => state.auth);

    useEffect(() => {
        const fetchUser = async () => {
            const {percent} = await statPercentGet()
            setStatPercent(percent)
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
                        <div className={css.completeTitle}>До следующего уровня выполнено:</div>
                        <div className={css.completePercent}>
                            <div className={css.completeNumber} style={{width: `${statPercent}%`}}>
                                <span className={css.number}>{statPercent}%</span>
                            </div>
                        </div>
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
