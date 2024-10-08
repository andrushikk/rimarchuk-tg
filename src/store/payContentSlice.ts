import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { LoadingStatus } from '@/constants';
import { payContentRequest } from '@/utils/api/pay';
import { UserError } from '@/utils/types';
import { Pay, PayResponse } from '@/utils/types/pay';

export const payContent = createAsyncThunk(
    'payContent/payContent',
    async ({ customer_phone, customer_email, cost, course_id, manuals_id }: Pay, { rejectWithValue }) => {
        try {
            const content: Pay = {
                customer_phone,
                customer_email,
                cost,
                course_id,
                manuals_id,
            };

            return await payContentRequest(content);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState: PayResponse = {
    pay_url: '',
    status: LoadingStatus.none,
    error: LoadingStatus.none,
};

const payContentSlice = createSlice({
    name: 'payContent',
    initialState,
    reducers: {
        contentPay(_, action) {
            return action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(payContent.pending, (state) => {
            state.status = LoadingStatus.pending;
            state.error = null;
        });
        builder.addCase(payContent.fulfilled, (state, action) => {
            state.status = LoadingStatus.fulfilled;
            state.pay_url = action.payload.pay_url;
        });
        builder.addCase(payContent.rejected, (state, action) => {
            state.status = LoadingStatus.rejected;
            state.error = (action.payload as UserError).status;
        });
    },
});

export const { contentPay } = payContentSlice.actions;

export default payContentSlice.reducer;
