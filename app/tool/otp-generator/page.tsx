import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "OTP Generator & Validator",
  description: "Generate and validate One-Time Passwords (OTPs) for added security in user authentication, two-factor authentication (2FA), and secure login processes.",
  keywords: "otp, 2fa, authentication, security",
};

const ToolDetail = () => {
  const slug = "otp-generator";

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