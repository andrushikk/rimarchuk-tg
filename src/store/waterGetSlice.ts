import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { waterGet } from '@/utils/api/water';
import { GetWaterError, WaterData } from '@/utils/types/water';

import { LoadingStatus } from '../constants';

export const getWater = createAsyncThunk('waterGet/getWater', async (_, { rejectWithValue }) => {
    try {
        return await waterGet();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const initialState: WaterData = {
    data: {
        water_ml: 0,
        water_quota: 2560,
    },
    status: LoadingStatus.none,
    error: LoadingStatus.none,
};

const waterGetSlice = createSlice({
    name: 'waterGet',
    initialState,
    reducers: {
        waterData(_, action) {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getWater.pending, (state) => {
            state.status = LoadingStatus.pending;
            state.error = null;
        });
        builder.addCase(getWater.fulfilled, (state, action) => {
            state.status = LoadingStatus.fulfilled;
            state.data = action.payload;
        });
        builder.addCase(getWater.rejected, (state, action) => {
            state.status = LoadingStatus.rejected;
            state.error = (action.payload as GetWaterError).status;
        });
    },
});

export const { waterData } = waterGetSlice.actions;

export default waterGetSlice.reducer;
