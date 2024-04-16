import { AuthUser } from '@/utils/types';

import { ActionGlass } from './ActionGlass';
import css from './WaterTracker.module.scss';
import { WaterTrackerHeader } from './parts/WaterTrackerHeader';

export type WaterTrackerProps = {
    authUser?: AuthUser;
};

export const WaterTracker = (props: WaterTrackerProps) => {
    const { authUser } = props;
    return (
        <div className={css.waterTracker}>
            <WaterTrackerHeader authUser={authUser} />
            <ActionGlass />
        </div>
    );
};
