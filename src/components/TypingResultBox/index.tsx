import React from 'react';
import {Card} from "@/components/ui/card";

type TypingResultBoxProps = {
    time: number
    errorCount: number
    wordsLength: number
}

const TypingResultBox = (props: TypingResultBoxProps) => {

    const {time, errorCount, wordsLength} = props

    return (
        <div className='flex gap-20 pt-20 min-h-72 text-3xl justify-between'>
            <Card className='flex w-64 h-36 flex-col gap-5 text-3xl items-center justify-center p-5'>
                <span className='no-input'>Take Time</span>
                <span className='text-4xl text-primary'>{time}s</span>
            </Card>
            <Card className='flex w-64 h-36 flex-col gap-5 text-3xl items-center justify-center p-5'>
                <span className='no-input'>WPM</span>
                <span
                    className='text-4xl text-primary'>{(wordsLength / Number(time) * 60).toFixed(1)}</span>
            </Card>
            <Card className='flex w-64 h-36 flex-col gap-5 text-3xl items-center justify-center p-5'>
                <span className='no-input'>Error Count</span>
                <span className='text-4xl text-primary'>{errorCount}</span>
            </Card>
        </div>
    );
};

export default TypingResultBox;