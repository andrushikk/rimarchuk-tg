import { WaterTrackerProps } from '@/pages/main/components/WaterTracker';
import { AuthUser } from '@/utils/types';

import css from './WaterTrackerHeader.module.scss';
import { WaterVolume } from './WaterVolume';

export type WaterTrackerHeaderProps = {
    authUser?: AuthUser;
};

export const WaterTrackerHeader = (props: WaterTrackerHeaderProps) => {
    const { authUser } = props;

    return (
        <div className={css.waterTrackerHeader}>
            <div className={css.trackerTitle}>Трекер воды</div>
            <WaterVolume authUser={authUser} />
        </div>
    );
};
