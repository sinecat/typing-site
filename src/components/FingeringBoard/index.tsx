import React, {useEffect, useMemo, useRef, useState} from 'react';
import {leftHandKeys, rightHandKeys, totalKeys} from "@/constants/text-data-fingering";
import {cn} from "@/lib/utils";
import {toast} from "@/components/ui/use-toast";

type FingeringBoardProps = {
    type: string
}

const FingeringBoard = (props: FingeringBoardProps) => {

    const {type} = props
    const [targetKey, setTargetKey] = useState<string>('')
    const [inputKey, setInputKey] = useState<string>('')
    const [isFocus, setIsFocus] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const currentFingerBoardTargetData = useMemo(() => {
        let currentFingerBoardTargetData = []
        switch (type) {
            case 'leftHand':
                currentFingerBoardTargetData = leftHandKeys
                break;
            case 'rightHand':
                currentFingerBoardTargetData = rightHandKeys
                break;
            default:
                currentFingerBoardTargetData = totalKeys.flat()
                break;
        }
        return currentFingerBoardTargetData
    }, [type])

    const getRandomKey = () => {
        const targetKey = currentFingerBoardTargetData[Math.floor(Math.random() * currentFingerBoardTargetData.length)]
        setTargetKey(targetKey)
    }

    const handleKeysBoxClick = () => {
        setIsFocus(true)
        inputRef.current?.focus()
        toast({
            title: "TIP",
            description: "Now you can practice fingering",
        })
    }

    const handleKeyDown = (event: any) => {
        console.log(123)
        console.log(event.key)
        if (isFocus) {
            const keyValue = event.key.toUpperCase()
            setInputKey(keyValue)
            if (targetKey.includes(keyValue)) {
                getRandomKey()
                setInputKey('')
            }
        }
    }

    useEffect(() => {
        const init = () => {
            getRandomKey()
            inputRef.current?.focus()
            setIsFocus(true)
            toast({
                title: "TIP",
                description: "Now you can practice fingering",
            })
        }

        init()
    }, [type]);

    return (
        <div className='flex justify-center w-full mt-24'>
            <div className='flex justify-center max-w-5xl min-h-72' onClick={handleKeysBoxClick}
                 onKeyDown={handleKeyDown}>
                <div className='flex flex-col gap-2'>
                    {
                        totalKeys.map((item, index) =>
                            (<div key={index} className={cn('flex gap-2', {
                                'pl-5': index === 1,
                                'pl-10': index === 2
                            })}>
                                {
                                    item.map((item: string, index) => {
                                        return <div key={index}
                                                    className={cn('w-16 h-16 rounded-md p-2 border-2 border-primary opacity-60', {
                                                        'blur-[1px]': !currentFingerBoardTargetData.includes(item),
                                                        'bg-primary text-white': targetKey === item,
                                                        'animate-bounce': targetKey === item && inputKey && inputKey !== item
                                                    })}>
                                            {item}
                                        </div>
                                    })
                                }
                            </div>))
                    }
                </div>
            </div>
            <input
                type="text"
                className='h-0 w-0 opacity-0'
                ref={inputRef}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default FingeringBoard;
