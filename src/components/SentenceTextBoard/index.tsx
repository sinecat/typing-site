import React, {ComponentProps, useEffect, useMemo, useRef, useState} from 'react';
import {cn} from "@/lib/utils";
import Cursor from "@/components/Cursor";

type SentenceTextBoardProps = ComponentProps<any> & {
    inputValue: string;
    targetValue: string[];
    onClick: () => void;
    focus?: boolean;
}

const SentenceTypingBoard = (props: SentenceTextBoardProps) => {
    const {inputValue, targetValue, onClick, focus} = props;
    const textBoardRef = useRef<HTMLDivElement>(null)
    const [letterDomArr, setLetterDomArr] = useState<any>()

    const caretPosition = useMemo(() => {
        const currentCaretIndex = inputValue.length || 0;
        const currentLetterDom = letterDomArr?.[currentCaretIndex];
        let result = {
            left: 0,
            top: 0
        }
        if (currentCaretIndex === targetValue?.length && textBoardRef.current) {
            const textBoardRect = textBoardRef.current.getBoundingClientRect();
            const caretRect = letterDomArr[targetValue?.length - 1]?.getBoundingClientRect();
            const caretLeft = caretRect.right - textBoardRect.left;
            const caretTop = caretRect.top - textBoardRect.top;
            result = {
                left: caretLeft,
                top: caretTop
            }
            return result
        }
        if (textBoardRef.current && currentLetterDom) {
            const textBoardRect = textBoardRef.current.getBoundingClientRect();
            const caretRect = currentLetterDom.getBoundingClientRect();
            const caretLeft = caretRect.left - textBoardRect.left;
            const caretTop = caretRect.top - textBoardRect.top;
            result = {
                left: caretLeft,
                top: caretTop
            }
        }
        return result
    }, [inputValue, letterDomArr, targetValue])

    useEffect(() => {
        let letterDomArr = document.querySelectorAll('.letter')
        setLetterDomArr(letterDomArr)
    }, [targetValue])

    return (
        <div className='mt-10 max-w-5xl min-h-72' ref={textBoardRef}
             onClick={onClick}>
            <div className='relative p-5 w-full flex flex-wrap gap-4'>
                <div className='word flex flex-wrap text-xl text-center items-start'>
                    {focus ?
                        <Cursor left={caretPosition.left} top={caretPosition.top}/> : null}
                    {
                        targetValue?.map((word: string, index: number) => {
                            const currentColor = cn({
                                'text-primary': inputValue[index] === word,
                                'danger': inputValue[index] && inputValue[index] !== word,
                                'no-input': !inputValue[index],
                            });

                            const currentBorderColor = cn({
                                'border-primary': inputValue[index] === word,
                                'border-red-500': inputValue[index] && inputValue[index] !== word,
                                'border-gray-400': !inputValue[index],
                            });

                            return (
                                <div
                                    key={word + index}
                                    className={cn(
                                        'letter inline-block text-center font-semibold min-w-[13px] mt-3 h-10 border-b-2',
                                        currentColor,
                                        currentBorderColor
                                    )}
                                >
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
