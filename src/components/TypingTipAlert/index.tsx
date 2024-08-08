import React from 'react';
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Badge} from "@/components/ui/badge";

const TypingTipAlert = () => {
    return (
        <Alert className='absolute top-5 w-80 mt-10 animate-bounce text-lg'>
            <AlertDescription className='text-lg'>
                Press <Badge
                className='bg-gray-100 text-primary text-lg font-light'>Enter</Badge> to
                start typing
            </AlertDescription>
        </Alert>
    );
};

export default TypingTipAlert;