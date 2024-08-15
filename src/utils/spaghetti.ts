export const initTheme: () => string = () => {
    const allCookies = document.cookie;
    const themeCookie = allCookies.split('; ').find(row => row.startsWith('theme='))?.split('=')[1];

    if (themeCookie === 'dark' || (!themeCookie && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
        return 'dark'
    } else {
        document.documentElement.classList.remove('dark')
        return 'light'
    }
}

export const setTheme = (theme: 'light' | 'dark' | 'system') => {
    if (theme === 'light') {
        document.documentElement.classList.remove('dark')
        // 设置为7天有效期
        document.cookie = `theme=light; path=/; max-age=604800`
        return
    }
    if (theme === 'dark') {
        document.documentElement.classList.add('dark')
        document.cookie = `theme=dark; path=/; max-age=604800`;
        return
    }
}

export const getSystemTheme = (): string => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
    }
    return 'light'
}