import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from "next-intl/server";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React from "react";
import Navigation from "@/components/Navigation";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({children, params: {locale}}: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {
    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body className={inter.className + 'font-serif'}>
        <NextIntlClientProvider messages={messages}>
            <div className='p-5'>
                <Navigation />
                {children}
                <Toaster/>
            </div>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
