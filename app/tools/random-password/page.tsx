import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Random Password",
  description: "Quickly generate random passwords of arbitrary length. This tool allows you to create strong, secure passwords with a mix of characters including letters, numbers, and symbols. It's perfect for securing accounts or generating random passwords for testing purposes. You can customize the length and complexity to suit your needs, ensuring that your passwords are both secure and easy to use.",
  keywords: "password, random, secure, generate, security",
};

const ToolDetail = () => {
  const slug = "random-password";

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