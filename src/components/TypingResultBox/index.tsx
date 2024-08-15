import React from 'react';
import {Card} from "@/components/ui/card";

type TypingResultBoxProps = {
    time: number
    errorCount: number
    wordsLength: number
}

type TypingResultBoxCardProps = {
    title: string
    content: string|number
}

export const TypingResultBoxCard = (props: TypingResultBoxCardProps) => {
    const {title,content} = props

    return <Card className='flex w-64 h-36 flex-col gap-5 text-3xl items-center justify-center p-5'>
        <span className='no-input'>{title}</span>
        <span className='text-4xl text-primary'>{content}</span>
    </Card>
};

const TypingResultBox = (props: TypingResultBoxProps) => {

    const {time, errorCount, wordsLength} = props

    return (
        <div className='flex gap-20 pt-20 min-h-72 text-3xl justify-between'>
            <TypingResultBoxCard title='Take Time' content={`${time}s`}/>
            <TypingResultBoxCard title='WPM' content={(wordsLength / Number(time) * 60).toFixed(1)}/>
            <TypingResultBoxCard title='Error Count' content={errorCount}/>
        </div>
    );
};

export default TypingResultBox;