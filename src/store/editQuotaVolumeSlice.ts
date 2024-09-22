import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { editQuota } from '@/utils/api/water';
import { UserError } from '@/utils/types/user';

import { LoadingStatus } from '../constants';
import { getWater } from './waterGetSlice';

export const editQuotaVolume = createAsyncThunk(
    'editQuotaVolume/editQuotaVolume',
    async (newQuota: number, { rejectWithValue, dispatch }) => {
        try {
            const response = await editQuota(newQuota);
            if (response.status === 200) {
                await dispatch(getWater());
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    newQuota: null as number | null,
    status: LoadingStatus.none,
    error: LoadingStatus.none,
};

const editQuotaVolumeSlice = createSlice({
    name: 'editQuotaVolume',
    initialState,
    reducers: {
        waterData(_, action) {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(editQuotaVolume.pending, (state) => {
            state.status = LoadingStatus.pending;
            state.error = null;
        });
        builder.addCase(editQuotaVolume.fulfilled, (state, action) => {
            state.status = LoadingStatus.fulfilled;
            state.newQuota = action.payload.newQuota;
        });
        builder.addCase(editQuotaVolume.rejected, (state, action) => {
            state.status = LoadingStatus.rejected;
            state.error = (action.payload as UserError).status;
        });
    },
});

export const { waterData } = editQuotaVolumeSlice.actions;

export default editQuotaVolumeSlice.reducer;
