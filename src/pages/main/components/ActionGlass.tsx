import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import GlassIcon from '@/assets/images/actionGlass/glass.svg';
import { CircleProgressBar } from '@/modules/progressBar/CircleProgressBar';
import { GetWaterResponse, WaterData } from '@/utils/types/water';

import css from './ActionGlass.module.scss';

export const ActionGlass = () => {
    const waterVolume: WaterData = useSelector((state: GetWaterResponse) => state.waterGet);
    const percent = Math.round((waterVolume.data.water_ml / waterVolume.data.water_quota) * 100);

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
