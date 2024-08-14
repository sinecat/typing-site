'use client'

import React from 'react';
import {Separator} from "@/components/ui/separator";
import {useTranslations} from "next-intl";

type HeaderBarProps = {
    value?: any,
    options?: number[]|string[],
    onValueChange?: (val: any) => void,
    time?: number|string,
    showTime?: boolean
    showTab?: boolean
}

const HeaderBar = (props: HeaderBarProps) => {
    const {value, options, onValueChange, time, showTime=true, showTab=true} = props
    const t = useTranslations('HeaderBar')
    const handleWordNumsClick = (num: any) => {
        onValueChange?.(num)
    }

    return (
        <div className='w-full mt-5 flex items-start justify-between'>
            <div className="flex h-5 items-center space-x-4 font-semibold no-input cursor-pointer">
                {
                    showTab ? options?.map((item, index) => {
                        return (
                            <div key={'word-num-box' + item}>
                                <div key={'word-num' + item}
                                     className={`${value === item ? 'text-primary' : ''}`}
                                     onClick={() => handleWordNumsClick(item)}
                                >
                                    {item}
                                </div>
                                {index === options.length - 1 ? null :
                                    <Separator key={'Separator-word-num' + item} orientation="vertical"/>}
                            </div>
                        )
                    }) : null
                }
            </div>
            <div className='result'>
                {showTime ? <span>{t('takeTime')}: {time}S</span> : null}
            </div>
        </div>
    );
};

export default HeaderBar;