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
                        <TabsTrigger value="english-sentence">English Sentence</TabsTrigger>
                        <TabsTrigger value="chinese-sentence">Chinese Sentence</TabsTrigger>
                    </TabsList>
                    <TabsContent value="chinese">
                        <HotWordsTextTypingBox />
                    </TabsContent>
                    <TabsContent value="english-sentence">
                        <SentenceTypingBox type='english'/>
                    </TabsContent>
                    <TabsContent value="chinese-sentence">
                        <SentenceTypingBox type='chinese'/>
                    </TabsContent>
                </Tabs>
            </div>
    );
};

export default Page;
