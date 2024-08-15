'use client'

import React, {useEffect, useState} from 'react';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarShortcut,
    MenubarTrigger
} from "@/components/ui/menubar";
import {MonitorCog, Moon, Sun} from "lucide-react";
import {getSystemTheme, initTheme, setTheme} from "@/utils/spaghetti";



const ThemeSelector = () => {
    const [value, setValue] = useState(initTheme())

    const handleThemeChange = (theme: string) => {
        let currentTheme = theme
        if (theme === 'system') {
            currentTheme = getSystemTheme()
        }
        setValue(currentTheme)
        setTheme(currentTheme as 'light' | 'dark')
    }

    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>
                    {
                        value === 'light' ? <Sun/> : <Moon/>
                    }
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem onClick={() => handleThemeChange('light')}>
                        Light<MenubarShortcut><Sun/></MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={() => handleThemeChange('dark')}>
                        Dark <MenubarShortcut><Moon/></MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={() => handleThemeChange('system')}>
                        System <MenubarShortcut><MonitorCog/></MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
};

export default ThemeSelector;