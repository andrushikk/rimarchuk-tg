import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThunkDispatch } from '@reduxjs/toolkit';
import cs from 'classnames';
import Cookies from 'js-cookie';

import CupIcon from '@/assets/images/actionGlass/cup.svg';
import CupBlackIcon from '@/assets/images/actionGlass/cupBlack.svg';
import MinusIcon from '@/assets/images/actionGlass/minus.svg';
import PlusIcon from '@/assets/images/actionGlass/plus.svg';
import { HeaderPage } from '@/modules/header/components/HeaderPage';
import WaterWaveImage from '@/pages/main/components/parts/WaterWaveImage';
import { getCheckPay } from '@/store/checkPaySlice';
import { getUser } from '@/store/currentUserSlice';
import { addVolumeWater } from '@/store/waterAddSlice';
import { getWater } from '@/store/waterGetSlice';
import { useBackButton } from '@/utils/hooks/useBackButton';
import { UserGet, UserGetResponse } from '@/utils/types';
import { GetWaterResponse, WaterData } from '@/utils/types/water';

import css from './WaterTracker.module.scss';
import { WaterVolume } from './WaterVolume';

const MAX_SIZE = 2560;
const CONTAINER_HEIGHT_PX = 238;
const CONTAINER_SIZE = 50;

export const WaterTracker = () => {
    useBackButton('/');
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const waterVolume = useSelector((state: GetWaterResponse) => state.waterGet);
    const currentUser: UserGet = useSelector((state: UserGetResponse) => state.currentUser);

    const [sliderValue, setSliderValue] = useState(waterVolume.data.data);

    useEffect(() => {
        setSliderValue(waterVolume.data.data)
    }, [waterVolume]);

    const handleSliderMouseUp = (e: BaseSyntheticEvent) => {
        const sliderValue = +e.target.value;
        setSliderValue(sliderValue);
    };

    const handleSliderChange = (e: BaseSyntheticEvent) => {
        const sliderRange = +e.target.value;
        setSliderValue(sliderRange);
    };
    const handleDecreaseSlider = () => {
        if (sliderValue > CONTAINER_SIZE) {
            setSliderValue(sliderValue - CONTAINER_SIZE)
        }
        else {
            setSliderValue(0)
        }
    }
    const handleIncreaseSlider = () => {
        if (sliderValue < MAX_SIZE - CONTAINER_SIZE) {
            setSliderValue(sliderValue + CONTAINER_SIZE)
        }
        else {
            setSliderValue(MAX_SIZE)
        }
    }
    const handlePostSliderValue = () => {
        const fetchGetWater = async () => {
            await dispatch(addVolumeWater(sliderValue))
            await dispatch(getWater());
            await dispatch(getUser());
        };

        fetchGetWater()
    }

    // const handleSliderMouseDown = (e: BaseSyntheticEvent) => {
    //     const value = e.target.value ?? 0;
    //     setAdjustedHeight((value / MAX_SIZE) * CONTAINER_HEIGHT_PX);
    // };

    return (
        <div className={css.waterTrackerWrapper}>
            <WaterWaveImage />
            <div className={css.waterTracker}>
                <HeaderPage title="Вода" className={css.waterHeader} />
                <WaterVolume sliderValue={waterVolume.data.data} />
            </div>
            <div className={css.range}>
                <div className={css.cupIcon}>
                    <CupIcon />
                </div>
                <div className={css.field}>
                    <button onClick={handleDecreaseSlider} className={cs(css.controlsWater, css.minusIcon)}>
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
                                max="2560"
                                value={sliderValue}
                                onChange={handleSliderChange}
                                // onTouchStart={handleSliderMouseDown}
                                onTouchEnd={handleSliderMouseUp}
                                // onMouseDown={handleSliderMouseDown}
                                onMouseUp={handleSliderMouseUp}
                                className={css.rangeInput}
                            />
                            <label htmlFor="range">{sliderValue}</label>
                        </div>
                    </div>
                    <button onClick={handleIncreaseSlider} className={cs(css.controlsWater, css.plusIcon)}>
                        <div className={css.ml}>мл</div>
                        <PlusIcon />
                    </button>
                </div>
            </div>
            <button onClick={handlePostSliderValue} className={css.addGlass}>
                <div className={css.addGlassIcon}>
                    <CupBlackIcon />
                </div>
                <p className={css.addGlassText}>Добавить стакан&nbsp;+</p>
            </button>
        </div>
    );
};
