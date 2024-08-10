import React, {useState} from 'react';
import {Separator} from "@/components/ui/separator";
import FingeringBoard from "@/components/FingeringBoard";

const fingeringTypeConfig = [
    'total',
    'leftHand',
    'rightHand'
]

const FingeringTypingBox = () => {
    const [selectedFingeringType,setSelectedFingeringType] = useState('total')

    const handleFingeringTypeClick = (item:string)=>{
        setSelectedFingeringType(item)
    }

    return (
        <div>
            <div className='mt-5 flex items-start justify-between'>
                <div className="flex h-5 items-center space-x-4 font-semibold no-input cursor-pointer">
                    {
                        fingeringTypeConfig?.map((item, index) => {
                            return (
                                <div key={'word-num-box' + item}>
                                    <div key={'word-num' + item}
                                         className={`${selectedFingeringType === item ? 'text-primary' : ''}`}
                                         onClick={() => handleFingeringTypeClick(item)}
                                    >
                                        {item}
                                    </div>
                                    {index === fingeringTypeConfig.length - 1 ? null :
                                        <Separator key={'Separator-word-num' + item} className='bg-primary'
                                                   orientation="vertical"/>}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <FingeringBoard
                type={selectedFingeringType}
            />
        </div>
    );
};

export default FingeringTypingBox;
