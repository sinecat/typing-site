'use client'
import React, {useState} from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useTranslations} from "next-intl";
import {defaultLocale, localesType} from "@/config";
import {useParams, useSelectedLayoutSegment} from "next/navigation";
import {useRouter} from "@/navigation";

const LanguageSelector = () => {
    const t = useTranslations('Navigation')
    const router = useRouter()
    const selectedLayoutSegment = useSelectedLayoutSegment();
    const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
    // 获取url中的locale
    const params = useParams();

    const [currentLanguage, setCurrentLanguage] = useState<String>(params.locale as localesType || defaultLocale);

    const handleSelectChange = (val: localesType) => {
        const nextLocale = val;
        setCurrentLanguage(nextLocale)
        router.replace(pathname, {locale: nextLocale});
    }

    return (
        <Select value={currentLanguage as localesType} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-28">
                <SelectValue placeholder="language"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="zh">{t('chinese')}</SelectItem>
                <SelectItem value="en">{t('english')}</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default LanguageSelector;