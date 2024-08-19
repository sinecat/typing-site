import React from 'react';
import HotWordsTextTypingBox from "@/components/HotWordsTextTypingBox";
import { useLocale } from 'next-intl';
import {permanentRedirect} from "next/navigation";
const Page = () => {
    const locale = useLocale();
    permanentRedirect(`/${locale}/hot-words`)

    // return (
    //     <HotWordsTextTypingBox/>
    // );
};

export default Page;
