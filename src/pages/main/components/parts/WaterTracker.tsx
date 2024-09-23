import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThunkDispatch } from '@reduxjs/toolkit';
import cs from 'classnames';

import CupIcon from '@/assets/images/actionGlass/cup.svg';
import CupBlackIcon from '@/assets/images/actionGlass/cupBlack.svg';
import MinusIcon from '@/assets/images/actionGlass/minus.svg';
import PlusIcon from '@/assets/images/actionGlass/plus.svg';
import { HeaderPage } from '@/modules/header/components/HeaderPage';
import WaterWaveImage from '@/pages/main/components/parts/WaterWaveImage';
import { getUser } from '@/store/currentUserSlice';
import { addVolumeWater, delVolumeWater } from '@/store/waterAddSlice';
import { getWater } from '@/store/waterGetSlice';
import { useBackButton } from '@/utils/hooks/useBackButton';
import { UserGet, UserGetResponse } from '@/utils/types';
import { GetWaterResponse } from '@/utils/types/water';

import InviteFriend from '../InviteFriend';
import css from './WaterTracker.module.scss';
import { WaterVolume } from './WaterVolume';

const CONTAINER_HEIGHT_PX = 300;

export const WaterTracker = () => {
    useBackButton('/');
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const waterVolume = useSelector((state: GetWaterResponse) => state.waterGet);
    const currentUser: UserGet = useSelector((state: UserGetResponse) => state.currentUser);

    const MAX_SIZE = waterVolume.data.water_quota;

    const [prevSliderValue, setPrevSliderValue] = useState(() => {
        const savedValue = localStorage.getItem('prevSliderValue');
        return savedValue ? parseInt(savedValue, 10) : 0;
    });

    const [inviteFriend, setInviteFriend] = useState(false);
    const [localSliderValue, setLocalSliderValue] = useState(prevSliderValue);
    const [adjustedHeight, setAdjustedHeight] = useState(0);
    const [adjustedWaterHeight, setAdjustedWaterHeight] = useState(0);
    const [allowToScrollSlider, setAllowToScrollSlider] = useState(false);

    useEffect(() => {
        const fetchInitialData = async () => {
            await dispatch(getWater());
            await dispatch(getUser());
        };

        if (!currentUser.data?.wather_block) {
            setAllowToScrollSlider(false);
        } else {
            setAllowToScrollSlider(true);
        }

        fetchInitialData();
    }, [dispatch]);

    useEffect(() => {
        const updatedWaterVolume = waterVolume?.data?.water_ml ?? 0;
        setPrevSliderValue(updatedWaterVolume);
        setLocalSliderValue(updatedWaterVolume);
        localStorage.setItem('prevSliderValue', updatedWaterVolume.toString());
    }, [waterVolume]);

    useEffect(() => {
        setAdjustedHeight((localSliderValue / MAX_SIZE) * 210);
        setAdjustedWaterHeight((localSliderValue / MAX_SIZE) * 350);
    }, [localSliderValue, MAX_SIZE]);

    const handleIncrease = () => {
        setLocalSliderValue(Math.min(localSliderValue + 320, MAX_SIZE));
    };

    const handleDecrease = () => {
        setLocalSliderValue(Math.max(localSliderValue - 320, 0));
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSliderValue(+e.target.value);
    };

    const handleAddGlassClick = async () => {
        const fetchGetWater = async () => {
            if (!currentUser.data.wather_block) {
                setInviteFriend(true);
                return;
            } else {
                setInviteFriend(false);
            }
        };

        if (currentUser.data) fetchGetWater();

        const diff = localSliderValue - prevSliderValue;

        if (diff === 0) return;

        const idUser = currentUser.data?.user_id;

        try {
            if (diff > 0) {
                await dispatch(addVolumeWater({ user_id: idUser, water_ml: localSliderValue }));
            } else if (diff < 0) {
                await dispatch(delVolumeWater({ user_id: idUser, water_ml: -diff }));
            }

            const updatedWaterVolume = waterVolume?.data?.water_ml ?? 0;
            setPrevSliderValue(updatedWaterVolume);
            setLocalSliderValue(updatedWaterVolume);
            localStorage.setItem('prevSliderValue', updatedWaterVolume.toString());

            await dispatch(getWater());
            await dispatch(getUser());
        } catch (error) {
            console.error('Failed to update water value:', error);
        }
    };

    return (
        <div className={css.waterTrackerWrapper}>
            {inviteFriend ? (
                <InviteFriend closeModal={() => setInviteFriend(false)} userId={currentUser.data?.user_id} />
            ) : null}
            <div className={css.waterTracker}>
                <HeaderPage title="Вода" className={css.waterHeader} />
                <WaterVolume sliderValue={localSliderValue} />
            </div>
            <div className={css.range}>
                <div className={css.cupIcon}>
                    <CupIcon />
                </div>
                <div className={css.field}>
                    <button
                        type="button"
                        onClick={handleDecrease}
                        className={cs(css.controlsWater, css.minusIcon)}
                        disabled={!allowToScrollSlider}
                    >
                        <MinusIcon />
                    </button>
                    <div className={css.rangeWithScale}>
                        <div className={css.scaleValues}>
                            {Array.from({ length: 9 }, (_, index) => (
                                <span key={index * 320} className={css.mark}></span>
                            ))}
                        </div>
                        <div className={css.rangeContainer}>
                            <input
                                type="range"
                                id="range"
                                min="0"
                                max={MAX_SIZE}
                                value={localSliderValue}
                                onChange={handleSliderChange}
                                className={css.rangeInput}
                                disabled={!allowToScrollSlider}
                            />
                            <label
                                htmlFor="range"
                                className={css.waterLevelLabel}
                                style={{ left: `${adjustedHeight}px` }}
                            >
                                {localSliderValue}
                            </label>
                        </div>
                    </div>
                    <button
                        onClick={handleIncrease}
                        type="button"
                        className={cs(css.controlsWater, css.plusIcon)}
                        disabled={!allowToScrollSlider}
                    >
                        <div className={css.ml}>мл</div>
                        <PlusIcon />
                    </button>
                </div>
            </div>
            <button type="button" onClick={handleAddGlassClick} className={css.addGlass}>
                <div className={css.addGlassIcon}>
                    <CupBlackIcon />
                </div>
                <p className={css.addGlassText}>Добавить стакан&nbsp;+</p>
            </button>
            <WaterWaveImage waterLevel={adjustedWaterHeight} />
        </div>
    );
};
