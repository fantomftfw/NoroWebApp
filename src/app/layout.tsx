import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes';
import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const nohemi = localFont({
  src: [
    {
      path: '../assets/fonts/Nohemi-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Nohemi-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Nohemi-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Nohemi-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-nohemi',
})

export const metadata: Metadata = {
  title: "ADHD Hero",
  description: "Your personalized focus and task management space.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
    >
      <html lang="en">
        <body className={`${nohemi.variable} font-nohemi bg-background-dark text-text-primary`} suppressHydrationWarning={true}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
