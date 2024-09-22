import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThunkDispatch } from '@reduxjs/toolkit';

import WaterIcon from '@/assets/images/waterTracker/waterIcon.svg';
import { getUser } from '@/store/currentUserSlice';
import { editQuotaVolume } from '@/store/editQuotaVolumeSlice';
import { getWater } from '@/store/waterGetSlice';

import css from './WaterVolume.module.scss';

export type WaterVolumeProps = {
    sliderValue?: number;
};

export const WaterVolume = (props: WaterVolumeProps) => {
    const { sliderValue } = props;
    const pathname = window.location.pathname;
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const waterVolume = useSelector((state: any) => state.waterGet);
    const newQuota = useSelector((state: any) => state.editQuotaVolume.newQuota);

    // Состояние для редактирования и нового значения квоты
    const [isEditing, setIsEditing] = useState(false);
    const [editedQuota, setEditedQuota] = useState<number>(waterVolume?.data?.water_quota || 0);

    useEffect(() => {
        const fetchGetWater = async () => {
            await dispatch(getWater());
            await dispatch(getUser());
        };

        fetchGetWater();
    }, [sliderValue, dispatch]);

    // Функция для отправки изменений на сервер
    const handleChangeQuotaVolume = async () => {
        if (editedQuota !== waterVolume?.data?.water_quota) {
            await dispatch(editQuotaVolume(editedQuota));
            setIsEditing(false); // Скрываем инпут после отправки
        }
    };

    return (
        <div className={css.trackerInfo}>
            <div className={css.waterIcon}>
                <WaterIcon />
            </div>
            <div className={css.waterVolume}>
                <div className={css.volume}>
                    {waterVolume?.data?.water_ml} из
                    {isEditing ? (
                        <input
                            type="number"
                            value={editedQuota}
                            onChange={(e) => setEditedQuota(Number(e.target.value))}
                            onBlur={handleChangeQuotaVolume} // Сохранение при потере фокуса
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleChangeQuotaVolume();
                                }
                            }}
                            className={css.input}
                        />
                    ) : (
                        <> {newQuota !== null ? newQuota : waterVolume?.data?.water_quota} </>
                    )}{' '}
                    мл
                    {pathname === '/waterTracker' && (
                        <button
                            className={css.editIcon}
                            onClick={() => setIsEditing(true)} // Включаем режим редактирования
                            style={{ fontSize: '18px', padding: '10px' }} // Увеличенная кнопка карандаша
                        >
                            ✏️
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
