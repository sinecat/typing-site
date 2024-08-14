export const defaultLocale = 'zh' as const;
export const locales = [
    'zh',
    'en'
] as const;

export type localesType = typeof locales[number];