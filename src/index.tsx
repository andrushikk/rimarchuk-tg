import ReactDOM from 'react-dom/client';

import { App } from './layout/App';
import './mockEnv';
// УБЕРИТЕ ИМПОРТ ЕСЛИ НУЖЕН ПРОДАКШН
import { PreloadPodcast } from './modules/media/PreloadPodcast';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <>
        <PreloadPodcast />
        <App />
    </>
);
