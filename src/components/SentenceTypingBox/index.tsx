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

const SentenceTypingBox = () => {

    const {time, start, pause, reset, end} = useTimer();
    const [inputValue, setInputValue] = useState('')
    const [targetValue, setTargetValue] = useState<any>()
    const [isFinished, setIsFinished] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const [inputting, setInputting] = useState(false)
    const [errorCount, setErrorCount] = useState(0)
    const [letterDomArr, setLetterDomArr] = useState<any>()
    const textBoardRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const caretPosition = useMemo(() => {
        const currentCaretIndex = inputValue.length || 0;
        const currentLetterDom = letterDomArr?.[currentCaretIndex];
        let result = {
            left: '0px',
            top: '0px'
        }
        if (currentCaretIndex === targetValue?.length && textBoardRef.current) {
            const textBoardRect = textBoardRef.current.getBoundingClientRect();
            const caretRect = letterDomArr[targetValue?.length - 1]?.getBoundingClientRect();
            const caretLeft = caretRect.right - textBoardRect.left;
            const caretTop = caretRect.top - textBoardRect.top;
            result = {
                left: `${caretLeft}px`,
                top: `${caretTop}px`
            }
            return result
        }
        if (textBoardRef.current && currentLetterDom) {
            const textBoardRect = textBoardRef.current.getBoundingClientRect();
            const caretRect = currentLetterDom.getBoundingClientRect();
            const caretLeft = caretRect.left - textBoardRect.left;
            const caretTop = caretRect.top - textBoardRect.top;
            result = {
                left: `${caretLeft}px`,
                top: `${caretTop}px`
            }
        }
        return result
    }, [inputValue, letterDomArr, targetValue])
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace('\n', '')
        setInputValue(value)
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
        setInputFocus()
        setInputValue('')
        setErrorCount(0)
        setInputting(false)
    }

    const handleBoardClick = () => {
        setInputFocus()
    }

    const handleFreshClick = () => {
        freshData()
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
            setTargetValue(getRandomDataSentence(textDataSentenceEn))
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
        init()
    }, []);

    useEffect(() => {
        let letterDomArr = document.querySelectorAll('.letter')
        setLetterDomArr(letterDomArr)
    }, [targetValue])

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='w-full mt-5 p-2 flex items-start justify-between'>
                <div className="flex h-5 items-center space-x-4 font-semibold no-input cursor-pointer">
                </div>
                <div className='result mr-40'>
                    <div>Time: {time}S</div>
                </div>
            </div>
            {
                isFinished ? <TypingResultBox time={time} errorCount={errorCount} wordsLength={targetValue?.length}/> :
                    <div className='flex flex-col items-center mt-10 w-[1024px] min-h-72' ref={textBoardRef}
                         onClick={handleBoardClick}>
                        <div className='relative p-5 w-full flex flex-wrap gap-4'>
                            <div className='word flex flex-wrap text-xl text-center items-start'>
                                {isFocus ?
                                    <div
                                        className='absolute w-[3px] h-[30px] translate-y-[-1/10] duration-500 left-0 top-0 animate-opacity bg-primary'
                                        style={{left: caretPosition.left, top: caretPosition.top}}></div> : null}
                                {
                                    targetValue?.data?.split('').map((word: string, index: number) => {
                                        let currentColor = '';
                                        if (inputValue[index]) {
                                            if (inputValue[index] === word) {
                                                currentColor = 'text-primary';
                                            } else {
                                                currentColor = 'danger';
                                            }
                                        } else {
                                            currentColor = 'no-input';
                                        }
                                        return (
                                            <div key={word + index}
                                                 className={`letter inline-block text-center font-semibold w-[13px] h-10 ${currentColor}`}>
                                                {word}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
            }
            {isFocus && !inputting ? <TypingTipAlert/> : null}
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className='h-0 w-0 opacity-0'
                ref={inputRef}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
            <div>
                <Button className='w-30 mt-5 flex gap-2' onClick={handleFreshClick}><RotateCcw/>Refresh</Button>
            </div>
        </div>
    );
};

export default SentenceTypingBox;