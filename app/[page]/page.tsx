import PageRender from "@/components/layout/page-data";
import {AboutPage, Contact, PrivacyPolicy, RefundPolicy, TermsConditions }from "@/components/pages"
import getConfig from "next/config";
import { notFound } from "next/navigation";


type PageKeys = 'about-us' | 'privacy-policy' | 'terms-conditions' | 'contact-us' | 'refund-cancellations';

// Define a type for the values (React components)
type PageValues = JSX.Element;
const {serverRuntimeConfig} = getConfig();
export const runtime = serverRuntimeConfig.runtime;
// Combine the two types for the object
const pageData: Record<PageKeys, PageValues> = {
  'about-us': <AboutPage />,
  'privacy-policy': <PrivacyPolicy />,
  'terms-conditions': <TermsConditions />,
  'contact-us': <Contact />,
  'refund-cancellations': <RefundPolicy />,
};


const Page = async ({
  params,
}: {
  params: Promise<{ page: PageKeys }>
}) => {
  const page = (await params).page
  if (!page) {
    notFound();
  }
  
  return (
    <>
    <PageRender slug="page">

  {pageData[page]}
    </PageRender>
    </>
  )
}

// export async function generateStaticParams() {
//   // Extract all slugs (keys from pageData)
//   const slugs = Object.keys(pageData);

//   // Return an array of params objects
//   return slugs.map((slug) => ({ page:slug }));
// }

export default Page
