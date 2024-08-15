'use client'
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
import HeaderBar from "@/components/HeaderBar";
import FreshButton from "@/components/FreshButton";
import {useTranslations} from "next-intl";
import {usePromptsToChangeInputMethod} from "@/hooks/prompt";

type SentenceTypingBoxProps = {
    type: 'chinese' | 'english'
}

const SentenceTypingBox = (props: SentenceTypingBoxProps) => {
    const {type} = props
    const {time, start, pause, reset, end} = useTimer();
    const t = useTranslations('Tip.PromptsToChangeInputMethod')
    const promptsToChangeInputMethod = usePromptsToChangeInputMethod(t)

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
        if (!inputting) {
            setInputting(true)
            start()
        }
        let value = event.target.value.replace('\n', '')
        const inputLetter = value?.[value?.length - 1]
        const targetLetter = targetValue?.data[value?.length - 1]
        setInputValue(value)
        if (inputLetter && targetLetter && inputLetter !== targetLetter) {
            setErrorCount((prevState) => prevState + 1)
        }
    }

    const setInputFocus = () => {
        if (inputRef.current) {
            //设置光标在最后
            inputRef.current.focus();
            inputRef.current.selectionStart = inputRef.current.selectionEnd = inputValue.length;

            setIsFocus(true)

            promptsToChangeInputMethod()
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

    const handleTextareaClick = () => {
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
        <div className='w-full flex flex-col justify-center items-center'>
            <HeaderBar showTab={false} time={time}/>
            {
                isFinished ? <TypingResultBox time={time} errorCount={errorCount} wordsLength={targetValue?.length}/> :
                    <SentenceTypingBoard focus={isFocus} inputValue={inputValue}
                                         targetValue={targetValue?.data?.split('')}
                                         onClick={handleSentenceTypingBoardClick}/>
            }
            {/*{isFocus && !inputting ? <TypingTipAlert/> : null}*/}
            <Textarea
                className='w-1/3'
                value={inputValue}
                onChange={handleInputChange}
                onClick={handleTextareaClick}
                ref={inputRef}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
            <FreshButton onClick={handleFreshClick}/>
        </div>
    );
};

export default SentenceTypingBox;
