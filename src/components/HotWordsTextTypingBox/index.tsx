import React, {useEffect, useRef, useState} from 'react';
import useTimer from "@/hooks/timer";
import {getRandomData} from "@/utils/getRandomData";
import {textDataHotWordZh, textDataHotWordZhType} from "@/constants/text-data-hot-word-zh";
import TextBoard from "@/components/TextBoard";
import TypingResultBox from "@/components/TypingResultBox";
import HeaderBar from "@/components/HeaderBar";
import FreshButton from "@/components/FreshButton";
import {useTranslations} from "next-intl";
import {usePromptsToChangeInputMethod} from "@/hooks/prompt";
import {Textarea} from "@/components/ui/textarea";

const wordNumsConfig = [3, 20, 30, 40, 50]

const HotWordsTextTypingBox = () => {
    const {time, start, pause, reset, end} = useTimer();
    const t = useTranslations('Tip.PromptsToChangeInputMethod')
    const promptsToChangeInputMethod = usePromptsToChangeInputMethod(t)

    const [targetValue, setTargetValue] = useState<any>()
    const [inputValue, setInputValue] = useState('')
    const [successTextLength, setSuccessTextLength] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    const [isFocus, setIsFocus] = useState(false)
    const [inputting, setInputting] = useState(false)
    const [wordNums, setWordNums] = useState(wordNumsConfig[0])
    const [errorCount, setErrorCount] = useState(0)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!inputting) {
            setInputting(true)
            start()
        }
        let value = event.target.value.replace('\n', '')
        if (value.length > targetValue?.strLength || value.length < successTextLength) return
        const inputLetter = value?.[value?.length - 1]
        const targetLetter = targetValue?.targetStr[value?.length - 1]
        if (inputLetter && targetLetter && inputLetter !== targetLetter) {
            setErrorCount((prevState) => prevState + 1)
        }
        setInputValue(value)
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

    const freshData = (_wordNums: number) => {
        setIsFinished(false)
        setSuccessTextLength(0)
        setTargetValue(getRandomData(textDataHotWordZh, _wordNums))
        reset()
        setInputFocus()
        setInputValue('')
        setErrorCount(0)
        setInputting(false)
    }

    const handleWordNumsClick = (val:number) => {
        if (wordNums !== val) {
            setWordNums(val)
            freshData(val)
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
            if (inputRef?.current) {
                //设置光标在最后
                inputRef.current.selectionStart = inputRef.current.selectionEnd = inputValue.length;
            }
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
            setTargetValue(getRandomData(textDataHotWordZh, wordNums))

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
        const targetValueArr = targetValue?.data?.map((item: textDataHotWordZhType) => item.value)
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
        <div className='w-full'>
            <HeaderBar options={wordNumsConfig} value={wordNums} onValueChange={handleWordNumsClick}
                       time={time}/>
            <div className='flex flex-col items-center mt-10'>
                {
                    isFinished ?
                        <TypingResultBox time={time} errorCount={errorCount} wordsLength={targetValue?.strLength}/> :
                        <div className='flex flex-col items-center'>
                            <TextBoard focus={isFocus} inputValue={inputValue} targetValue={targetValue?.data}
                                       onClick={handleTextBoardClick}/>
                        </div>
                }
                {/*{isFocus && !inputting ? <TypingTipAlert/> : null}*/}
                <Textarea
                    value={inputValue}
                    onChange={handleInputChange}
                    className='h-0 w-0 opacity-0'
                    ref={inputRef}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                />
                <FreshButton onClick={handleFreshClick}/>
            </div>
        </div>
    );
};

export default HotWordsTextTypingBox;
