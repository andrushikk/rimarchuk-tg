import { LoadingStatus } from '@/constants';

export type Lesson = {
    id: number;
    lesson_course_id: number;
    lesson_number: number;
    lesson_pic: string | null;
    lesson_name: string;
    lesson_desc: string;
    lesson_video: string;
    is_Blocked: 0 | 1;
};

export type DataLesson = {
    data: Lesson[];
    status: LoadingStatus;
    error: LoadingStatus;
};

export type GetLessonsResponse = {
    lessons: DataLesson;
};

export type Lessons = Lesson[];
