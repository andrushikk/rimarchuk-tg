import { FC, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useMatch } from 'react-router-dom';

import cs from 'classnames';

import NextLesson from '@/assets/images/course/next.svg';
import VideoPlayer from '@/modules/media/VideoPlayer';
import { useBackButton } from '@/utils/hooks/useBackButton';
import { GetLessonsResponse, Lesson } from '@/utils/types';
import { ICourseCard } from '@/utils/types/courses';

import { dataCourses } from '../../CoursesPage';
import css from './CourseShowInfo.module.scss';

export type CourseShowInfoProps = {
    children?: ReactNode;
    isShowBook?: boolean;
    isShowManual?: boolean;
};

export const CourseShowInfo: FC<CourseShowInfoProps> = () => {
    const matchShowCourse = useMatch('/course/card/:id/show/:id');
    let cardId: number;
    const id = Number(matchShowCourse?.params.id);

    const lessons = useSelector((state: GetLessonsResponse) => state.lessons.data);
    const match = matchShowCourse?.pathname.match(/\/course\/card\/(\d+)\/show\/(\d+)/);

    if (match) {
        cardId = Number(match[1]);
    }

    useBackButton(`/course/card/${match ? Number(match[1]) : '/courses'}`);

    const card: ICourseCard | undefined = dataCourses
        .flatMap((course) => course.card)
        .find((entry) => +entry.id === +cardId);

    const lesson: Lesson = lessons.find((entry) => +entry.id === id);

    const lastLesson = card?.lesson?.slice(-1)[0];
    /*  console.log(lastLesson.id, 'lastLesson.id');
    console.log(id, 'id');
    console.log(lastLesson.id === id, 'lastLesson.id === id');*/

    useEffect(() => {
        console.log(lesson, 'lesson?.lesson_video');
    }, [lesson]);

    return (
        <div className={css.courseShowInfo}>
            <div className={css.courseShowDescription}>{lesson?.lesson_name}</div>
            <div className={css.courseShowTitle}>{lesson?.lesson_name}</div>
            <div className={cs(css.courseShowVideo)}>
                <VideoPlayer videoUrl={lesson?.lesson_video} width={'360px'} height={'202px'} />
            </div>
            <Link to={`/course/card/${match ? Number(match[1]) : null}/show/${id + 1}`} className={css.nextLesson}>
                <button disabled={+lastLesson?.id === +id} className={css.nextLessonBtn}>
                    <div className={css.courseShowText}>
                        <p>Следующий урок</p>
                    </div>
                    <div className={css.courseShowIcon}>
                        <NextLesson />
                    </div>
                </button>
            </Link>
        </div>
    );
};
