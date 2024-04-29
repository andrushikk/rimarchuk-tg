import React, {useEffect, useState} from 'react';
import css from './PreviewVideo.module.scss';

const VideoPreview = () => {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    let timeout = setTimeout(() => setHidden(true), 13500)

    return () => {
      clearTimeout(timeout)
    }
  }, []);

  return (
    <div className={`${css.content} ${hidden ? css.hidden : ''}`}>
      <video className={css.preview} id="introVideo" autoPlay muted>
        <source src='https://content-water.plutus-fin.ru/videos/intro.mp4' type="video/mp4"/>
        Ваш браузер не поддерживает воспроизведение видео.
      </video>
    </div>
  );
};

export default VideoPreview;
