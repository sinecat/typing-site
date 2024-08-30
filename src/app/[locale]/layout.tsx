import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from "next-intl/server";
import React from "react";
import Navigation from "@/components/Navigation";
import { cookies } from 'next/headers';

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "typing-site",
    description: "typing-site",
};

export default async function RootLayout({children, params: {locale}}: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {
    const messages = await getMessages();
    const theme = cookies().get('theme')?.value || 'light'; // 默认使用 light 主题

    return (
        <html lang={locale} className={theme}>
        <body className={inter.className + 'font-serif'}>
        <NextIntlClientProvider messages={messages}>
            <div className='p-5'>
                <Navigation theme={theme}/>
                {children}
                <Toaster/>
            </div>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
