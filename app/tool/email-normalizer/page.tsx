import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Email Normalizer",
  description: "Email Normalizer allows you to validate and format email addresses to ensure they follow proper standards. This tool normalizes email addresses by removing extraneous characters and fixing common formatting errors, ensuring a uniform appearance. It also validates the email to ensure its authenticity and avoid invalid addresses in your application. Ideal for user registration forms or when dealing with email-based data, it improves data integrity and reduces errors related to invalid emails.",
  keywords: "email, normalize, validate, format",
};

const ToolDetail = () => {
  const slug = "email-normalizer";

  if (!slug) {
    notFound();
  }

  return (
    <>
      <RenderTool slug={slug} />
    </>
  );
};

export default ToolDetail;