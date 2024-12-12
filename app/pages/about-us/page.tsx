'use client'
import AboutPage from "@/components/pages/about";
    import PageRender from "@/components/layout/page-data";
// import { useEffect } from "react";
    
    const Page = () => {

      // useEffect(()=>{

      //   const generateToolsPages = async () => {
      //     const response = await fetch('/api/generateTools', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //     });
        
      //     const result = await response.json();
      //     console.log(result);
      //   };
        
      //   // Trigger file generation
      //   generateToolsPages();
      // },[])
      
     return (
      <PageRender slug="about-us">
        <AboutPage />
      </PageRender>
    )};
    
    export default Page;