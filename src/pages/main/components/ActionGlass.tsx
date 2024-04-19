import { Link } from 'react-router-dom';

import GlassIcon from '@/assets/images/actionGlass/glass.svg';
import { CircleProgressBar } from '@/modules/progressBar/CircleProgressBar';

import css from './ActionGlass.module.scss';
import {useEffect, useState} from "react";
import {getWaterPercent} from "@/utils/api/water";
import {AuthResponse, AuthUser} from "@/utils/types";
import {useSelector} from "react-redux";

export const ActionGlass = () => {
  const [percent, setPercent] = useState(0)
  const authUser: AuthUser = useSelector((state: AuthResponse) => state.auth);

  useEffect(() => {
    async function getPercent() {
      const res = await getWaterPercent()
      setPercent(res.percent)
    }

    if (authUser.user[0]) {
      console.log(getPercent())
    }
  }, [authUser.user]);
    return (
        <div className={css.actionGlass}>
            <CircleProgressBar circleWidth={83} percent={percent} />

            <Link to="/waterTracker" className={css.addGlass}>
                <div className={css.glassIcon}>
                    <GlassIcon />
                </div>
                <div className={css.glassAdd}>
                    <p>Добавить стакан&nbsp;+</p>
                </div>
            </Link>
        </div>
    );
};
