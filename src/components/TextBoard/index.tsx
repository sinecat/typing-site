'use client'
import React, {ComponentProps, useEffect, useMemo, useRef, useState} from 'react';
import {TextDataType} from "@/constants/common";
import Cursor from "@/components/Cursor";
import {cn} from "@/lib/utils";

type TextBoardProps = ComponentProps<any> & {
    inputValue: string;
    targetValue: any[];
    onClick: () => void;
    focus?: boolean;
}

const TextBoard = (props: TextBoardProps) => {
        const {inputValue, targetValue, onClick, focus} = props;
        const inputLettersValueArr = inputValue.split('');
        const targetValueLength = targetValue?.map((item: TextDataType) => item.value).join('').length
        const textBoardRef = useRef<HTMLDivElement>(null)
        const [letterDomArr, setLetterDomArr] = useState<any>()

        const caretPosition = useMemo(() => {
            const currentCaretIndex = inputValue.length || 0;
            let result = {
                left: 0,
                top: 0
            };

            if (!textBoardRef.current) return result;

            const textBoardRect = textBoardRef.current.getBoundingClientRect();

            if (currentCaretIndex === targetValueLength) {
                const lastLetterDom = letterDomArr[targetValueLength - 1];
                if (lastLetterDom) {
                    const caretRect = lastLetterDom.getBoundingClientRect();
                    result = {
                        left: caretRect.right - textBoardRect.left,
                        top: caretRect.top - textBoardRect.top
                    };
                }
                return result;
            }

            const currentLetterDom = letterDomArr[currentCaretIndex];
            if (currentLetterDom) {
                const caretRect = currentLetterDom.getBoundingClientRect();
                result = {
                    left: caretRect.left - textBoardRect.left,
                    top: caretRect.top - textBoardRect.top
                };
            }

            return result;
        }, [inputValue, letterDomArr, targetValueLength])

        const getTextStartIndex = (index: number) => {
            let startIndex = 0
            for (let i = 0; i < index; i++) {
                startIndex += targetValue[i].value.length
            }
            return startIndex
        }

        useEffect(() => {
            let letterDomArr = document.querySelectorAll('.letter')
            setLetterDomArr(letterDomArr)
        }, [targetValue])

        return (
            <div className='max-w-5xl min-h-72'>
                <div className='relative p-5 w-full flex flex-wrap gap-4' ref={textBoardRef} onClick={onClick}>
                    {focus ?
                        <Cursor left={caretPosition.left} top={caretPosition.top}/> : null}
                    {
                        targetValue?.map((value: TextDataType, index: number) => {
                            const currentInputTextStartIndex = getTextStartIndex(index);
                            const currentInputTextEndIndex = currentInputTextStartIndex + value.value.length;
                            const currentInputTextValueArr = inputLettersValueArr.slice(currentInputTextStartIndex, currentInputTextEndIndex)
                            const targetTextValueArr = value.value.split('');
                            const inputText = currentInputTextValueArr.join('');
                            const valueText = value.value;

                            const currentTextColor = cn({
                                'text-primary': valueText.length === inputText.length && valueText.includes(inputText),
                                'danger': !valueText.includes(inputText) && inputText,
                                'no-input': !inputText || (valueText.includes(inputText) && valueText.length !== inputText.length),
                            });

                            return (
                                <div key={index} className='word flex flex-col gap-1 text-base text-center'>
                                    <div className={cn('label', currentTextColor)}>{value.text}</div>
                                    <div className='letters flex gap-0.5'>
                                        {
                                            targetTextValueArr.map((letter: string, _index: number) => {
                                                const currentColor = cn({
                                                    'text-primary': currentInputTextValueArr[_index] === targetTextValueArr[_index],
                                                    'danger': currentInputTextValueArr[_index] && currentInputTextValueArr[_index] !== targetTextValueArr[_index],
                                                    'no-input': !currentInputTextValueArr[_index],
                                                });

                                                return (
                                                    <div key={letter + _index}
                                                         className={cn('letter inline-block text-left font-semibold text-[22px]', currentColor)}>
                                                        {letter}
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
;

export default TextBoard;
