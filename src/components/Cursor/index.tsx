import React from 'react';

const Cursor = (props: { left: string|number, top: string|number }) => {
    const {left,top} = props
    return (
        <div
            className='absolute w-[3px] h-[30px] translate-y-[-1/10] duration-500 left-0 top-0 animate-opacity bg-primary'
            style={{left: left+'px', top: top+'px'}}>

        </div>
    );
};

export default Cursor;