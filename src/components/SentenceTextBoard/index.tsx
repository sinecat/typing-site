import React, {ComponentProps, useEffect, useMemo, useRef, useState} from 'react';
import {cn} from "@/lib/utils";

type SentenceTextBoardProps = ComponentProps<any> & {
    inputValue: string;
    targetValue: string[];
    onClick: () => void;
    focus?: boolean;
}

const SentenceTypingBoard = (props:SentenceTextBoardProps) => {
    const {inputValue, targetValue, onClick, focus} = props;
    const textBoardRef = useRef<HTMLDivElement>(null)
    const [letterDomArr, setLetterDomArr] = useState<any>()

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

    useEffect(() => {
        let letterDomArr = document.querySelectorAll('.letter')
        setLetterDomArr(letterDomArr)
    }, [targetValue])

    return (
        <div className='flex flex-col items-center mt-10 w-max-[1024px] min-h-72' ref={textBoardRef}
             onClick={onClick}>
            <div className='relative p-5 w-full flex flex-wrap gap-4'>
                <div className='word flex flex-wrap text-xl text-center items-start'>
                    {focus ?
                        <div
                            className='absolute w-[3px] h-[30px] translate-y-[-1/10] duration-500 left-0 top-0 animate-opacity bg-primary'
                            style={{left: caretPosition.left, top: caretPosition.top}}></div> : null}
                    {
                        targetValue?.map((word: string, index: number) => {
                            let currentColor = '';
                            let currentBorderColor =''
                            if (inputValue[index]) {
                                if (inputValue[index] === word) {
                                    currentColor = 'text-primary';
                                    currentBorderColor = 'border-primary'
                                } else {
                                    currentColor = 'danger';
                                    currentBorderColor = 'border-red-500'
                                }
                            } else {
                                currentColor = 'no-input';
                                currentBorderColor = 'border-gray-400'
                            }
                            return (
                                <div key={word + index} className={`letter inline-block text-center font-semibold w-[13px] h-10 ${currentColor} border-b-2 ${currentBorderColor}`}>
                                    {word}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default SentenceTypingBoard;
