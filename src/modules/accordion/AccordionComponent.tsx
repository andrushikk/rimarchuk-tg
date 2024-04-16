import React, { FC } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemState,
} from 'react-accessible-accordion';

import ArrowDown from '@/assets/images/arrowIcon/chevronDown.svg';
import ArrowUp from '@/assets/images/arrowIcon/chevronUp.svg';
import { IAccordionContent } from '@/utils/types/statistic';

import css from './AccordionComponent.module.scss';
import { AccordionItemState as AccordionState } from './types';

export type AccordionComponentProps = {
    data: IAccordionContent[];
    isTasksPage?: boolean;
};

export const AccordionComponent: FC<AccordionComponentProps> = (props) => {
    const { data, isTasksPage } = props;

    return (
        <Accordion allowZeroExpanded={true} className={css.accordion}>
            {data?.map((entry) => (
                <AccordionItem key={`${entry.id}-accordion-item`} className={css.accordionItem}>
                    <AccordionItemHeading className={css.accordionHeading}>
                        <AccordionItemButton className={css.accordionButton}>
                            {isTasksPage && (
                                <div className={css.accordionTasksWrapper}>
                                    <img src={entry.icon} className={css.accordionTasksIcon} alt="task icon" />
                                    <div className={css.accordionTasksTitle}>{entry.title}</div>
                                </div>
                            )}
                            {!isTasksPage && <div>{entry.title}</div>}

                            {!(entry.id === '1' && isTasksPage) && (
                                <AccordionItemState>
                                    {({ expanded }: AccordionState) =>
                                        expanded ? (
                                            <div className={css.accordionArrowIcon}>
                                                <ArrowUp />
                                            </div>
                                        ) : (
                                            <div className={css.accordionArrowIcon}>
                                                <ArrowDown />
                                            </div>
                                        )
                                    }
                                </AccordionItemState>
                            )}
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className={css.accordionPanel}>
                        {entry?.content?.map((item) => (
                            <div className={css.accordionLevelContent} key={`${item.progress?.id}-accordion-level`}>
                                <div className={css.accordionLevelTitle}>{item.title}</div>
                                <div>{item.progress?.component}</div>
                            </div>
                        ))}
                    </AccordionItemPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
};
