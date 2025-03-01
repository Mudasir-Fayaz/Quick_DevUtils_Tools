import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "Bcrypt Tool",
  description: "Hash and compare text strings using bcrypt - a password-hashing function based on the Blowfish cipher. Bcrypt is designed for secure password hashing with built-in salting to protect against rainbow table attacks. Ideal for securing user passwords in web applications or any system requiring strong password security.",
  keywords: "bcrypt, password hash, hash compare, blowfish, password encryption, salt",
};

const ToolDetail = () => {
  const slug = "bcrypt";

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