import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script'
import React, { useEffect } from 'react'

const GoogleAnalytics = () => {
    
    const pathname = usePathname();
    const searchParams = useSearchParams();
  
    useEffect(() => {
      const url = `${pathname}${searchParams.toString() ? `?${searchParams}` : ''}`;
      if (typeof window.gtag === 'function') {
        window.gtag('config', 'G-16YRJG15S7', {
          page_path: url,
        });
      }
    }, [pathname, searchParams]);
    

  return (
    <>
    
        <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-16YRJG15S7"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-16YRJG15S7');
          `,
        }}
      />
    </>
  )
}

export default GoogleAnalytics
