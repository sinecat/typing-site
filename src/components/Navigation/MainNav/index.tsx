'use client'
import React, {useState} from 'react';
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useTranslations} from "next-intl";
import {useParams, useSelectedLayoutSegment} from "next/navigation";
import {useRouter} from "@/navigation";

const MainNav = () => {
    const t = useTranslations('Navigation')
    const selectedLayoutSegment = useSelectedLayoutSegment();
    const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
    const router = useRouter()

    const [currentPath, setCurrentPath] = useState(pathname);

    const handleValueChange = (val: string) => {
        router.push(val)
        setCurrentPath(val)
    }

    return (
        <Tabs defaultValue="chinese" value={currentPath} className="w-full items-start"
              onValueChange={handleValueChange}>
            <TabsList>
                <TabsTrigger value="/">{t('chineseHotWords')}</TabsTrigger>
                <TabsTrigger value="/english-sentence">{t('englishSentence')}</TabsTrigger>
                <TabsTrigger value="/chinese-sentence">{t('chineseSentence')}</TabsTrigger>
                <TabsTrigger value="/fingering">{t('Fingering')}</TabsTrigger>
            </TabsList>
        </Tabs>
    );
};

export default MainNav;