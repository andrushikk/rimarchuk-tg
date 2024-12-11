import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '@/axios';
import { LoadingStatus } from '@/constants';
import { Lessons } from '@/utils/types';

export const getLessonsByCourseId = createAsyncThunk(
    'lesson/getLessons',
    async (lesson_course_id: number, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/lessons/lesson_course_id?lesson_course_id=${lesson_course_id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    data: [] as Lessons,
    status: LoadingStatus.none,
    error: LoadingStatus.none,
};

const lessonSlice = createSlice({
    initialState,
    name: 'lesson',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLessonsByCourseId.pending, (state) => {
            state.status = LoadingStatus.pending;
        });
        builder.addCase(getLessonsByCourseId.fulfilled, (state, action) => {
            state.status = LoadingStatus.fulfilled;
            state.data = action.payload;
        });
        builder.addCase(getLessonsByCourseId.rejected, (state) => {
            state.status = LoadingStatus.rejected;
        });
    },
});

export default lessonSlice.reducer;
