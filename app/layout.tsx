
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import StoreProvider from "../components/StoreProvider";
 import { Container,  Header,Footer } from "@/components/layout";
 import MainContainer from "@/components/layout/main-container";
 import ComingSoonBanner from "@/components/layout/coming-soon-banner";
 import SupportButton from "@/components/layout/support-button";
import { SideBar, SearchModal } from "@/components/layout/nossr";


 

//import { Provider } from 'react-redux';
//import store from '../../store';
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Quick DevUtils | All-in-One Developer Tools, Converters & Generators",
  description: "QuickDevUtils is your go-to web app for all essential developer tools, converters, and code generators. Access a comprehensive collection of utilities for web development, coding, and productivity — all in one place, quick and easy!",
  keywords: "developer tools, QuickDevUtils, code generators, online converters, developer utilities, web development tools, coding tools, productivity tools, JSON formatter, CSS generator, JavaScript utilities, regex tester, online dev tools"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
<StoreProvider>

        <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
      <div className="flex h-screen">
       <ComingSoonBanner />
          <SideBar />
     
         <MainContainer>

            <Header />
         <Container>
          {children}
          <SupportButton />
         </Container>
         <Footer />
         </MainContainer>
          
     <SearchModal /> 
        
        
     
        </div>
       
        </NextThemesProvider>
        </NextUIProvider>
</StoreProvider>
      </body>
    </html>
  );
}
