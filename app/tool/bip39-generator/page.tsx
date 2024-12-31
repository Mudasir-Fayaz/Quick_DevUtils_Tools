import { notFound } from "next/navigation";
import { RenderTool } from "@/components/layout/nossr";

export const metadata = {
  title: "BIP39 Generator",
  description: "Generate BIP39 passphrases from mnemonics or create random mnemonics with various language support. BIP39 is the standard for generating mnemonic phrases for cryptocurrency wallets and other secure applications. This tool helps create secure, easy-to-remember passphrases for wallet backups or secure system authentication.",
  keywords: "BIP39, mnemonic, passphrase, seed phrase, cryptocurrency",
};

const ToolDetail = () => {
  const slug = "bip39-generator";

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