import { useMatch } from 'react-router-dom';

import { MediaPlayer } from '@/modules/media/MediaPlayer';
import { data } from '@/modules/podcastsBlock/PodcastsBlock';
import { useBackButton } from '@/utils/hooks/useBackButton';

import css from './MediaPodcast.module.scss';
import {useEffect} from "react";
import axios from "@/axios";

export const MediaPodcast = () => {
    useBackButton('/');
    const matchPodcast = useMatch('/mediaPodcast/:id');

    const id = Number(matchPodcast?.params.id);
    const entryInfo = data.find((item) => +item.id === +id);

    useEffect(() => {
        axios.post('/api/stat/podcadstquantity')
    }, []);

    return (
        <div className={css.mediaPodcastPage}>
            <MediaPlayer className={css.mediaPodcast} entryInfo={entryInfo} />
        </div>
    );
};
