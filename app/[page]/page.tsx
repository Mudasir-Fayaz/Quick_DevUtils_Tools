import PageRender from "@/components/layout/page-data";
import {AboutPage, Contact, PrivacyPolicy, TermsConditions }from "@/components/pages"
import { notFound } from "next/navigation";


type PageKeys = 'about-us' | 'privacy-policy' | 'terms-conditions' | 'contact-us';

// Define a type for the values (React components)
type PageValues = JSX.Element;

// Combine the two types for the object
const pageData: Record<PageKeys, PageValues> = {
  'about-us': <AboutPage />,
  'privacy-policy': <PrivacyPolicy />,
  'terms-conditions': <TermsConditions />,
  'contact-us': <Contact />,
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
