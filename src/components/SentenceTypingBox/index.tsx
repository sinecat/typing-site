import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Button} from "@/components/ui/button";
import {RotateCcw} from "lucide-react";
import useTimer from "@/hooks/timer";
import {toast} from "@/components/ui/use-toast";
import {getRandomData, getRandomDataSentence} from "@/utils/getRandomData";
import {textDataHotWordZh} from "@/constants/text-data-hot-word-zh";
import {textDataSentenceEn} from "@/constants/text-data-sentence-en";
import TypingResultBox from "@/components/TypingResultBox";
import TypingTipAlert from "@/components/TypingTipAlert";
import SentenceTypingBoard from "@/components/SentenceTextBoard";
import {textDataSentenceZh} from "@/constants/text-data-sentence-zh";
import {Textarea} from "@/components/ui/textarea";

type SentenceTypingBoxProps = {
    type: 'chinese' | 'english'
}

const SentenceTypingBox = (props: SentenceTypingBoxProps) => {
    const {type} = props
    const {time, start, pause, reset, end} = useTimer();
    const [inputValue, setInputValue] = useState('')
    const [targetValue, setTargetValue] = useState<any>()
    const [isFinished, setIsFinished] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const [inputting, setInputting] = useState(false)
    const [errorCount, setErrorCount] = useState(0)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const setCurrentDataValue = () => {
        if (type === 'chinese') {
            setTargetValue(getRandomDataSentence(textDataSentenceZh))
            return
        }
        setTargetValue(getRandomDataSentence(textDataSentenceEn))
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(inputting)
        if (!inputting) return
        let value = event.target.value.replace('\n', '')
        const inputLetter = value?.[value?.length - 1]
        const targetLetter = targetValue?.data[value?.length - 1]
        console.log(value)
        setInputValue(value)
        if (inputLetter && targetLetter && inputLetter !== targetLetter) {
            setErrorCount((prevState) => prevState + 1)
        }
    }

    const setInputFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
            setIsFocus(true)
            toast({
                title: "TIP",
                description: "Please switch to English input method",
            })
        }
    }

    const freshData = (_wordNums?: number) => {
        setIsFinished(false)
        reset()
        setCurrentDataValue()
        setInputFocus()
        setInputValue('')
        setErrorCount(0)
        setInputting(false)
    }

    const handleSentenceTypingBoardClick = () => {
        setInputFocus()
    }

    const handleFreshClick = () => {
        freshData()
    }

    const handleTextareaClick = ()=>{
        if (!isFocus) {
            setInputFocus()
        }
    }

    const handleBlur = () => {
        pause()
        setInputting(false)
        setIsFocus(false)
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && isFocus && !isFinished) {
            if (inputRef?.current) {
                //设置光标在最后
                inputRef.current.selectionStart = inputRef.current.selectionEnd = inputValue.length;
            }
            setInputting(true)
            start()
        }
    }

    useEffect(() => {
        if (inputValue === targetValue?.data) {
            setIsFinished(true)
            end()
        }
    }, [inputValue, targetValue]);

    useEffect(() => {
        const init = () => {
            setCurrentDataValue()
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
        init()
    }, []);

    return (
        <div className='flex mt-5 flex-col justify-center items-center'>
            <div className='w-full flex items-start justify-between'>
                <div className="flex h-5 items-center space-x-4 font-semibold no-input cursor-pointer">
                </div>
                <div className='result pr-40'>
                    <span>Time: {time}S</span>
                </div>
            </div>
            {
                isFinished ? <TypingResultBox time={time} errorCount={errorCount} wordsLength={targetValue?.length}/> :
                    <SentenceTypingBoard focus={isFocus} inputValue={inputValue}
                                         targetValue={targetValue?.data?.split('')}
                                         onClick={handleSentenceTypingBoardClick}/>
            }
            {isFocus && !inputting ? <TypingTipAlert/> : null}
            <div className='w-[1000px]'>
                <Textarea
                    className='w-full'
                    value={inputValue}
                    onChange={handleInputChange}
                    onClick={handleTextareaClick}
                    // className='h-0 w-0 opacity-0'
                    ref={inputRef}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div>
                <Button className='w-30 mt-10 flex gap-2' onClick={handleFreshClick}><RotateCcw/>Refresh</Button>
            </div>
        </div>
    );
};

export default SentenceTypingBox;
