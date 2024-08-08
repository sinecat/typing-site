'use client'

import React, {useEffect, useState} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import HotWordsTextTypingBox from "@/components/HotWordsTextTypingBox";
import SentenceTypingBox from "@/components/SentenceTypingBox";

const Page = () => {

    return (
            <div className='w-full flex p-5 items-center justify-center'>
                <Tabs defaultValue="chinese" className="w-full items-start">
                    <TabsList>
                        <TabsTrigger value="chinese">Chinese Hot Words</TabsTrigger>
                        <TabsTrigger value="english">English Sentence</TabsTrigger>
                    </TabsList>
                    <TabsContent value="chinese">
                        <HotWordsTextTypingBox />
                    </TabsContent>
                    <TabsContent value="english">
                        <SentenceTypingBox />
                    </TabsContent>
                </Tabs>
            </div>
    );
};

export default Page;