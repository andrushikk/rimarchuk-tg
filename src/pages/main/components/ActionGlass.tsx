import { Link } from 'react-router-dom';

import GlassIcon from '@/assets/images/actionGlass/glass.svg';
import { CircleProgressBar } from '@/modules/progressBar/CircleProgressBar';

import css from './ActionGlass.module.scss';
import {useEffect, useState} from "react";
import {getWaterPercent} from "@/utils/api/water";

export const ActionGlass = () => {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    async function getPercent() {
      const res = await getWaterPercent()
      setPercent(res.percent)
    }
    getPercent()
  }, []);
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
