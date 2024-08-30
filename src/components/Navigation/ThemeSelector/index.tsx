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
import {getSystemTheme, setTheme} from "@/utils/spaghetti";

type Themes = 'light' | 'dark';

const ThemeSelector = ({theme}:{theme:string}) => {
    const [value, setValue] = useState(theme)

    const handleThemeChange = (theme: string) => {
        let currentTheme = theme
        if (theme === 'system') {
            currentTheme = getSystemTheme()
        }
        setValue(currentTheme)
        setTheme(currentTheme as Themes)
    }

    // 监听本地缓存来同步不同页面间的主题
    useEffect(() => {
        const checkTheme = (): void => {
            const item = (localStorage.getItem("theme") as Themes) || 'light';
            setValue(item)
            setTheme(item);
            document.getElementsByTagName("html")[0].dataset.theme = item;
        };
        checkTheme();
        window.addEventListener("storage", checkTheme);
        return (): void => {
            window.removeEventListener("storage", checkTheme);
        };
    }, []);

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