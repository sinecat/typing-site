import React, {useEffect, useRef, useState} from 'react';
import useTimer from "@/hooks/timer";
import {getRandomData} from "@/utils/getRandomData";
import {textData} from "@/constants/textData-zh";
import {TextDataType} from "@/constants/common";
import {Separator} from "@/components/ui/separator";
import TextBoard from "@/components/TextBoard";
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {RotateCcw, Terminal} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {useToast} from "@/components/ui/use-toast";
import './styles.css'
import {Card} from "@/components/ui/card";

const wordNumsConfig = [3, 20, 30, 40, 50]

const HotWordsTextTypingBox = () => {
    const {toast} = useToast()
    const [targetValue, setTargetValue] = useState<any>()
    const [inputValue, setInputValue] = useState('')
    const [successTextLength, setSuccessTextLength] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const [inputting, setInputting] = useState(false)
    const [wordNums, setWordNums] = useState(wordNumsConfig[0])
    const [errorCount, setErrorCount] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)

    const {time, start, pause, reset, end} = useTimer();
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value.replace('\n', '')
        if (value.length > targetValue?.strLength || value.length < successTextLength) return
        if (inputting) {
            const inputLetter = value?.[value?.length-1]
            const targetLetter = targetValue?.targetStr[value?.length-1]
            if (inputLetter && targetLetter && inputLetter !== targetLetter) {
                setErrorCount((prevState) => prevState + 1)
            }
            setInputValue(value)
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

    const freshData = (_wordNums: number) => {
        setIsFinished(false)
        setSuccessTextLength(0)
        setTargetValue(getRandomData(textData, _wordNums))
        setInputValue('')
        setInputting(false)
        reset()
        setInputFocus()
    }

    const handleWordNumsClick = (num: number) => {
        if (wordNums !== num) {
            setWordNums(num)
            freshData(num)
        }
    }

    const handleFreshClick = () => {
        freshData(wordNums)
    }

    const handleTextBoardClick = () => {
        setInputFocus()
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter' && isFocus && !isFinished) {
            setInputting(true)
            start()
        }
    }

    const handleBlur = () => {
        pause()
        setInputting(false)
        setIsFocus(false)
    }

    useEffect(() => {
        const init = () => {
            setTargetValue(getRandomData(textData, wordNums))

            window.addEventListener('keydown', handleKeyDown);

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
        init()
    }, []);

    // 用于计算输入正确的文字长度，输入正确的文字不可被删除
    useEffect(() => {
        let result = 0
        const inputValueArr = inputValue.split(' ')
        const targetValueArr = targetValue?.data?.map((item: TextDataType) => item.value)
        inputValueArr.forEach((item, index) => {
            const startIndex = inputValue.indexOf(targetValueArr?.[index])
            const endIndex = startIndex + targetValueArr?.[index]?.length
            const currentStrValue = inputValue.substring(startIndex, endIndex)
            if (currentStrValue && currentStrValue === targetValueArr?.[index]) {
                result += targetValueArr[index].length
            }
        })
        if (result === targetValue?.strLength && inputValue.endsWith(' ')) {
            setIsFinished(true)
            end()
        }
        setSuccessTextLength(result)
    }, [inputValue, targetValue])


    return (
        <div>
            <div className='mt-5 p-2 flex items-start justify-between'>
                <div className="flex h-5 items-center space-x-4 font-semibold no-input cursor-pointer">
                    {
                        wordNumsConfig?.map((item, index) => {
                            return (
                                <div key={'word-num-box' + item}>
                                    <div key={'word-num' + item}
                                         className={`${wordNums === item ? 'text-primary' : ''}`}
                                         onClick={() => handleWordNumsClick(item)}
                                    >
                                        {item}
                                    </div>
                                    {index === wordNumsConfig.length - 1 ? null :
                                        <Separator key={'Separator-word-num' + item} orientation="vertical"/>}
                                </div>
                            )
                        })
                    }
                </div>
                <div className='result mr-40'>
                    <div>Time: {time}S</div>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                {
                    isFinished ? <div className='flex gap-20 pt-20 min-h-72 text-3xl justify-between'>
                        <Card className='flex h-36 flex-col gap-5 text-3xl items-center justify-center p-5'>
                            <span className='no-input'>Take Time</span>
                            <span className='text-4xl text-primary'>{time}S</span>
                        </Card>
                        <Card className='flex h-36 flex-col gap-5 text-3xl items-center justify-center p-5'>
                            <span className='no-input'>Error Count</span>
                            <span className='text-4xl text-primary'>{errorCount}</span>
                        </Card>
                    </div> : <div className='flex flex-col items-center'>
                        <TextBoard focus={isFocus} inputValue={inputValue} targetValue={targetValue?.data}
                                   onClick={handleTextBoardClick}/>
                        <input type="text" value={inputValue} onChange={handleInputChange} className='text-input'
                               ref={inputRef}
                               onBlur={handleBlur} onKeyDown={handleKeyDown}/>
                        {isFocus && !inputting ?
                            <Alert className='absolute top-0 w-80 mt-10 animate-bounce text-lg translate-y-96'>
                                <AlertDescription className='text-lg'>
                                    Press <Badge
                                    className='bg-gray-100 text-primary text-lg font-light'>Enter</Badge> to
                                    start typing
                                </AlertDescription>
                            </Alert> : null}
                    </div>
                }
                <Button className='w-30 mt-5 flex gap-2' onClick={handleFreshClick}><RotateCcw/>Refresh</Button>
            </div>
        </div>
    );
};

export default HotWordsTextTypingBox;