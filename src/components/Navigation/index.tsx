'use client'

import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import MainNav from "./MainNav";

const Navigation = () => {
    return (
        <div className='flex justify-between'>
            <MainNav/>
            <div className='flex gap-5'>
                <LanguageSelector/>
                <ThemeSelector/>
            </div>
        </div>
    );
};

export default Navigation;