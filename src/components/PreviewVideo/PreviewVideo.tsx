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
      <source src='/intro.webm' type="video/webm" />
      Ваш браузер не поддерживает воспроизведение видео.
    </video>
  );
};

export default VideoPreview;
