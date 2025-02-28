import { 
  PhoneNumberParser,
  IbanValidator
} from "@/components/tools/data";

import { ToolCategory } from "@/types";

const dataTools: ToolCategory = {
  name: "Data Tools",
  icon: "Database",
  tools: [
    {
      name: "Phone Number Parser",
      icon: 'Phone',
      description: "Parse and format international phone numbers with ease. This tool allows you to quickly format phone numbers into the correct international format, ensuring consistency and proper display. It supports phone numbers from around the world and ensures they adhere to the required standards for each country. Whether you're working with user-submitted data or integrating phone validation into your web app, this tool simplifies the process. The intuitive interface allows for fast and accurate parsing of phone numbers from various regions.",
      faqs: [
        { question: "What countries are supported by the Phone Number Parser?", answer: "The tool supports phone numbers from all international countries, including their respective formats and country codes." },
        { question: "How do I parse a phone number?", answer: "Simply input the phone number in any format, and the tool will automatically parse and format it into the correct international format." },
        { question: "Can I validate phone numbers?", answer: "Yes, the tool can validate phone numbers to ensure they meet international standards." },
        { question: "Is this tool free to use?", answer: "Yes, the Phone Number Parser is free to use for all users." },
        { question: "How accurate is the phone number formatting?", answer: "The tool ensures high accuracy, adhering to international formatting rules for each country." }
      ],
      keywords: "phone, number, format, parse, international",
      slug: "/tool/phone-parser",
      component: PhoneNumberParser
    },
    {
      name: "IBAN Validator",
      icon: 'CreditCard',
      description: "Validate and parse International Bank Account Numbers (IBAN) quickly and accurately. This tool checks if an IBAN is valid by verifying its structure and ensuring it adheres to international banking standards. It can also extract the bank details embedded within the IBAN, such as country codes and bank identifiers. By parsing IBANs, you can avoid costly errors and ensure the accuracy of banking transactions. The tool is essential for developers and financial institutions who need to handle IBANs in their applications securely and efficiently.",
      faqs: [
        { question: "What is an IBAN?", answer: "An IBAN (International Bank Account Number) is a standard format for bank account numbers used internationally to identify accounts across borders." },
        { question: "How does the IBAN Validator work?", answer: "The IBAN Validator checks the structure of an IBAN, verifies the country code, and ensures the account number is valid according to international banking rules." },
        { question: "Can I parse IBANs from different countries?", answer: "Yes, the tool supports IBANs from all countries that use the IBAN system." },
        { question: "Is the IBAN Validator free to use?", answer: "Yes, the IBAN Validator is free for all users." },
        { question: "How can I use the IBAN Validator in my app?", answer: "You can integrate the IBAN Validator API into your app to automatically validate and parse IBANs from user input." }
      ],
      keywords: "iban, bank, account, validate, parse",
      slug: "/tool/iban-validator",
      component: IbanValidator
    }
  ]
};

export default dataTools;