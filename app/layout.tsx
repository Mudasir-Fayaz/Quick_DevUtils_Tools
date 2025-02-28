
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
import { SideBar, SearchModal, GAScript } from "@/components/layout/nossr";
import GitHubCard from "@/components/layout/github-card";


 

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
  description: "Quick DevUtils is your ultimate one-stop platform, offering 150+ essential tools for developers, designers, and everyday users. Whether you're working with text, code, numbers, colors, or files, this app simplifies your workflow with a wide variety of powerful, easy-to-use utilities—all available directly in your browser.",
  keywords: "developer tools, QuickDevUtils, code generators, online converters, developer utilities, web development tools, coding tools, productivity tools, JSON formatter, CSS generator, JavaScript utilities, regex tester, online dev tools",
  manifest:'/web.manifest'
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
        <GAScript />
<StoreProvider>

        <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
      <div className="flex h-screen">
       <ComingSoonBanner />
          <SideBar />
     
         <MainContainer>

            <Header />
            <GitHubCard />
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
