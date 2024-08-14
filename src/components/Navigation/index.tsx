'use client'

import React, {useState} from 'react';
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useParams, useSelectedLayoutSegment} from "next/navigation";
import {useRouter} from "@/navigation";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {defaultLocale, localesType} from "@/config";
import {useTranslations} from "next-intl";

const Navigation = () => {
    const t = useTranslations('Navigation')
    const selectedLayoutSegment = useSelectedLayoutSegment();
    const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
    const router = useRouter()
    // 获取url中的locale
    const params = useParams();


    const [currentPath, setCurrentPath] = useState(pathname);
    const [currentLanguage, setCurrentLanguage] = useState<String>(params.locale as localesType || defaultLocale);

    const handleValueChange = (val: string) => {
        router.push(val)
        setCurrentPath(val)
    }

    const handleSelectChange = (val: localesType) => {
        const nextLocale = val;
        setCurrentLanguage(nextLocale)
        router.replace(pathname, {locale: nextLocale});
    }

    return (
        <div className='flex justify-between'>
            <Tabs defaultValue="chinese" value={currentPath} className="w-full items-start"
                  onValueChange={handleValueChange}>
                <TabsList>
                    <TabsTrigger value="/">{t('chineseHotWords')}</TabsTrigger>
                    <TabsTrigger value="/english-sentence">{t('englishSentence')}</TabsTrigger>
                    <TabsTrigger value="/chinese-sentence">{t('chineseSentence')}</TabsTrigger>
                    <TabsTrigger value="/fingering">{t('Fingering')}</TabsTrigger>
                </TabsList>
            </Tabs>
            <Select value={currentLanguage as string} onValueChange={handleSelectChange}>
                <SelectTrigger className="w-28">
                    <SelectValue placeholder="language"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="zh">{t('chinese')}</SelectItem>
                    <SelectItem value="en">{t('english')}</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default Navigation;