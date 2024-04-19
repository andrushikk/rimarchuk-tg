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
    <video className={`${css.preview} ${hidden ? css.hidden : ''}`} id="introVideo" autoPlay muted>
      <source src='/intro.mp4' type="video/mp4" />
      Ваш браузер не поддерживает воспроизведение видео.
    </video>
  );
};

export default VideoPreview;