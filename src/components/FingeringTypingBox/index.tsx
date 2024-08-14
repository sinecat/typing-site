'use client'
import React, {useMemo, useState} from 'react';
import FingeringBoard from "@/components/FingeringBoard";
import HeaderBar from "@/components/HeaderBar";
import {useTranslations} from "next-intl";

const FingeringTypingBox = () => {
    const [selectedFingeringType, setSelectedFingeringType] = useState('total')
    const t = useTranslations('FingeringOptions')

    const fingeringTypeConfig = useMemo(() => (
        [
            t('total'),
            t('leftHand'),
            t('rightHand')
        ]
    ), [t])

    const handleFingeringTypeClick = (val: string) => {
        setSelectedFingeringType(val)
    }

    return (
        <div>
            <HeaderBar options={fingeringTypeConfig} value={selectedFingeringType} showTime={false}
                       onValueChange={handleFingeringTypeClick}/>
            <FingeringBoard
                type={selectedFingeringType}
            />
        </div>
    );
};

export default FingeringTypingBox;
