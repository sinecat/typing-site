import React from 'react';
import {Button, ButtonProps} from "@/components/ui/button";
import {RotateCcw} from "lucide-react";
import {useTranslations} from "next-intl";

const FreshButton = (props: ButtonProps) => {
    const t = useTranslations('Button')

    return (
        <Button className='w-30 mt-5 flex gap-2 text-white' {...props}><RotateCcw/>{t('refresh')}</Button>
    );
};

export default FreshButton;