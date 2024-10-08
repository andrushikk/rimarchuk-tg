import { FC } from 'react';
import { Link } from 'react-router-dom';

import cs from 'classnames';

import VideoPlay from '@/assets/images/videoCard/playVideo.svg';
import videoPictureSrc from '@/assets/images/videoCard/videoTwo.jpg';
import { Videos } from '@/utils/types/videos';

import css from './VideoCard.module.scss';

export type VideoCardProps = Videos & {
    className?: any;
    isPage?: boolean;
    index?: number;
};

export const VideoCard: FC<VideoCardProps> = (props) => {
    const { id, className, name, pic_url, vid_url, isPage, index } = props;

    return (
        <div className={cs(css.videoCardWrapper, className)}>
            <div className={cs(css.videoCard, isPage ? css.videoPageCard : '')}>
                <img src={pic_url} />
            </div>
            <div className={css.cardTitle}>{name}</div>

            <Link to={`/video/${id}`} className={css.videoPlay}>
                <div className={css.videoIcon}>
                    <VideoPlay />
                </div>
                <p className={css.startVideo}>Смотреть</p>
            </Link>
        </div>
    );
};
