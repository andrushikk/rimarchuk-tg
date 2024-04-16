import crystalImage from '@/assets/images/tasks/crystal.png';
import starImage from '@/assets/images/tasks/star.png';
import starsImage from '@/assets/images/tasks/stars.png';
import { AccordionComponent } from '@/modules/accordion/AccordionComponent';
import { HeaderPage } from '@/modules/header/components/HeaderPage';
import { ProgressBar } from '@/modules/progressBar/ProgressBar';
import { useBackButton } from '@/utils/hooks/useBackButton';
import { IAccordionContent } from '@/utils/types/statistic';

import css from './StatisticTasksPage.module.scss';
import {useEffect, useState} from "react";
import {AuthResponse, AuthUser} from "@/utils/types";
import {useSelector} from "react-redux";
import {levelsGet} from "@/utils/api/user";

const StatisticTasksPage = () => {
    useBackButton('/statistics');
    const [levels, setLevels] = useState([
        {
            id: '1',
            title: 'Звездочка',
            icon: starsImage,
            content: [
                {
                    title: 'Куплено 1/3 методичек',
                    progress: {
                        component: <ProgressBar percent={'0/3'} />,
                        id: '6',
                    },
                },
                {
                    title: '3/20 дней подряд заполняется трекер воды',
                    progress: {
                        component: <ProgressBar percent={'0/20'} />,
                        id: '7',
                    },
                },
            ],
        },
        {
            id: '2',
            title: 'Звезда',
            icon: starImage,
            content: [
                {
                    title: 'Куплено 1/3 методичек',
                    progress: {
                        component: <ProgressBar percent={'0/3'} />,
                        id: '8',
                    },
                },
                {
                    title: '3/20 дней подряд заполняется трекер воды',
                    progress: {
                        component: <ProgressBar percent={'0/20'} />,
                        id: '9',
                    },
                },
            ],
        },
        {
            id: '3',
            title: 'Легенда',
            icon: crystalImage,
            content: [
                {
                    title: 'Куплено 1/3 методичек',
                    progress: {
                        component: <ProgressBar percent={'0/3'} />,
                        id: '10',
                    },
                },
                {
                    title: '3/20 дней подряд заполняется трекер воды',
                    progress: {
                        component: <ProgressBar percent={'0/20'} />,
                        id: '11',
                    },
                },
            ],
        },
    ])
    const authUser: AuthUser = useSelector((state: AuthResponse) => state.auth);

    useEffect(() => {
        const fetchUser = async () => {
            let levelsRes = await levelsGet()
            setLevels(levelsOld => levelsOld.map((item, i) => ({
                ...item,
                content: [
                    {
                        title: `Куплено ${authUser.user[0].lvl_manuals}/${levelsRes.levels[i].quota_manuals} методичек`,
                        progress: {
                            component: <ProgressBar percent={`${authUser.user[0].lvl_manuals}/${levelsRes.levels[i].quota_manuals}`} />,
                            id: i + '1',
                        },
                    },
                    {
                        title: `${authUser.user[0].lvl_wather_day}/${levelsRes.levels[i].quota_water} дней подряд заполняется трекер воды`,
                        progress: {
                            component: <ProgressBar percent={`${authUser.user[0].lvl_wather_day}/${levelsRes.levels[i].quota_water}`} />,
                            id: i + '2',
                        },
                    },
                ]
})))
        };

        if (authUser.user.length > 0) {
            fetchUser();
        }
    }, [authUser.user]);

    return (
        <div className={css.statisticTasksPage}>
            <HeaderPage title="Задания" />
            <AccordionComponent data={levels} isTasksPage={true} />
        </div>
    );
};

export default StatisticTasksPage;
