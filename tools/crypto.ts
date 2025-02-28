import { TokenGenerator, HashText, BcryptTool, UuidGenerator, UlidGenerator, TextCrypto, Bip39Generator, HmacGenerator, RsaGenerator, PasswordAnalyzer } from "@/components/tools/crypto";
import { ToolCategory } from "@/types";

const cryptoTools: ToolCategory = {
  name: "Crypto Tools",
  icon: 'LockKeyhole',
  tools: [
    {
      name: "Token Generator",
      icon: 'Shuffle',
      description: "A tool that generates unique tokens or keys for various applications, ensuring secure and efficient data handling. This tool is essential for generating authentication tokens, API keys, or random tokens for secure access control and communication. Ideal for developers, system administrators, and security professionals needing to generate secure and unpredictable keys or tokens for their applications.",
      keywords: "token generator, unique key generator, secure tokens, token creation, random token, authentication token, token management, cryptographic tokens, secure key generation",
      slug: "/tool/token-generator",
      component: TokenGenerator,
      faqs: [
        {
          question: "What is a token generator?",
          answer: "A token generator creates unique tokens or keys used for secure authentication, data access control, and cryptographic operations in various applications."
        },
        {
          question: "Why use a token generator?",
          answer: "Token generators provide secure and random tokens that prevent unauthorized access, ensure data integrity, and facilitate secure communication between systems."
        },
        {
          question: "Can tokens be used for authentication?",
          answer: "Yes, tokens are commonly used for authentication in APIs and web applications, ensuring that only authorized users or systems can access data or services."
        },
        {
          question: "Are the generated tokens secure?",
          answer: "Yes, the tokens are generated using secure methods, ensuring they are unpredictable and resistant to attacks."
        },
        {
          question: "Can I customize the token length?",
          answer: "Yes, you can customize the token length and other properties to meet your specific requirements."
        }
      ]
    },
    {
      name: "Hash Text",
      icon: 'EyeOff',
      description: "Generates secure hash values for text using various algorithms. This tool helps you securely hash passwords, sensitive data, or any other text using algorithms like MD5, SHA-256, and more. It is useful for storing data securely and verifying integrity. Ideal for developers and security experts working with data encryption and hashing techniques.",
      keywords: "hash generator, text hashing tool, secure hash generator, hash algorithms, data encryption, text encryption, hash encoding, secure text tools, cryptographic hash",
      slug: "/tool/hash-text",
      component: HashText,
      faqs: [
        {
          question: "What is text hashing?",
          answer: "Text hashing is the process of generating a fixed-size hash value from a variable-length input. This is typically used for data integrity checks and password storage."
        },
        {
          question: "Why should I use hash values?",
          answer: "Hashing is essential for securely storing sensitive information like passwords, as it prevents the original data from being exposed."
        },
        {
          question: "Which hashing algorithms can I use?",
          answer: "You can use various hashing algorithms, including MD5, SHA-1, SHA-256, and more, depending on your security needs."
        },
        {
          question: "Can I reverse a hash to get the original text?",
          answer: "No, hashes are designed to be one-way functions. Once text is hashed, it cannot be reversed to its original form."
        },
        {
          question: "How do I choose the right hashing algorithm?",
          answer: "Select an algorithm based on your security needs. SHA-256 is commonly used for security-critical applications, while MD5 is used for checksums and data integrity verification."
        }
      ]
    },
    {
      name: "Bcrypt Tool",
      icon: 'Lock',
      description: "Hash and compare text strings using bcrypt - a password-hashing function based on the Blowfish cipher. Bcrypt is designed for secure password hashing with built-in salting to protect against rainbow table attacks. Ideal for securing user passwords in web applications or any system requiring strong password security.",
      keywords: "bcrypt, password hash, hash compare, blowfish, password encryption, salt",
      slug: "/tool/bcrypt",
      component: BcryptTool,
      faqs: [
        {
          question: "What is bcrypt?",
          answer: "Bcrypt is a password hashing algorithm designed to be slow and resistant to brute-force attacks. It automatically applies a salt to each password to ensure security."
        },
        {
          question: "Why use bcrypt for password hashing?",
          answer: "Bcrypt is slow by design, which makes it harder for attackers to perform brute-force or dictionary attacks on hashed passwords."
        },
        {
          question: "How does bcrypt help with password security?",
          answer: "Bcrypt applies a salt and hashes the password multiple times, making it more resistant to common password cracking techniques."
        },
        {
          question: "Can I compare two bcrypt hashes?",
          answer: "Yes, you can compare a plaintext password to a bcrypt hash using the bcrypt comparison function to check if they match."
        },
        {
          question: "Is bcrypt still secure?",
          answer: "Yes, bcrypt remains one of the most secure password-hashing algorithms, especially when using high iteration counts."
        }
      ]
    },
    {
      name: "UUID Generator",
      icon: 'Fingerprint',
      description: "Generate various versions of Universally Unique Identifiers (UUIDs) with customizable options. UUIDs are used to uniquely identify objects or entities in databases, APIs, and distributed systems. This tool supports multiple versions of UUIDs, allowing developers to create IDs that are unique and globally recognizable.",
      keywords: "uuid, guid, unique identifier, v1, v3, v4, v5, nil uuid, random uuid",
      slug: "/tool/uuid-generator",
      component: UuidGenerator,
      faqs: [
        {
          question: "What is a UUID?",
          answer: "A UUID (Universally Unique Identifier) is a 128-bit identifier that is globally unique, commonly used to identify objects or records in databases and distributed systems."
        },
        {
          question: "How many versions of UUID are there?",
          answer: "There are several versions of UUID, including version 1 (time-based), version 3 (name-based), version 4 (random), and version 5 (name-based using SHA-1)."
        },
        {
          question: "What is the difference between UUID and GUID?",
          answer: "UUID and GUID are essentially the same thing, with GUID being the term commonly used in Microsoft's ecosystem and UUID being the term used more generally in other systems."
        },
        {
          question: "How is UUID generated?",
          answer: "UUID can be generated using various methods, such as based on the current time, a random value, or a cryptographic hash of a name."
        },
        {
          question: "Can I generate UUIDs for different purposes?",
          answer: "Yes, the tool allows you to generate UUIDs for different versions and use cases, such as for identifying database entries or creating session tokens."
        }
      ]
    },
    {
      name: "ULID Generator",
      icon: 'KeyRound',
      description: "Generate Universally Unique Lexicographically Sortable Identifiers (ULIDs) with various formatting options. ULIDs are similar to UUIDs but are designed to be lexicographically sortable and have better handling of time-based sorting, making them suitable for distributed systems and applications that require unique, time-ordered identifiers.",
      keywords: "ulid, unique identifier, sortable id, timestamp id, monotonic",
      slug: "/tool/ulid-generator",
      component: UlidGenerator,
      faqs: [
        {
          question: "What is a ULID?",
          answer: "A ULID (Universally Unique Lexicographically Sortable Identifier) is a 128-bit identifier similar to UUID but designed to be lexicographically sortable and time-ordered."
        },
        {
          question: "How is a ULID different from a UUID?",
          answer: "ULIDs are time-ordered, which makes them useful for systems that require sorting identifiers by time, unlike UUIDs which are randomly generated."
        },
        {
          question: "Can I use ULID for database entries?",
          answer: "Yes, ULIDs are excellent for database entries, especially when you need unique identifiers that can also be sorted by creation time."
        },
        {
          question: "How are ULIDs generated?",
          answer: "ULIDs are generated using the current time in milliseconds, followed by random components, ensuring both uniqueness and sortability."
        },
        {
          question: "Do ULIDs work with distributed systems?",
          answer: "Yes, ULIDs are perfect for distributed systems where unique and time-ordered identifiers are crucial."
        }
      ]
    },
    {
      name: "Encrypt/Decrypt Text",
      icon: 'KeySquare',
      description: "Encrypt and decrypt text using various crypto algorithms like AES, TripleDES, Rabbit, and RC4. This tool provides a range of encryption and decryption methods to secure sensitive text data for storage or communication. It's ideal for developers and security professionals working on encryption tasks for web applications, API security, or file protection.",
      keywords: "encryption, decryption, AES, TripleDES, Rabbit, RC4, cipher",
      slug: "/tool/text-crypto",
      component: TextCrypto,
      faqs: [
        {
          question: "What is encryption?",
          answer: "Encryption is the process of converting plaintext data into a secure format using cryptographic algorithms, making it unreadable without the correct key."
        },
        {
          question: "Which encryption algorithms can I use?",
          answer: "You can use a variety of algorithms, including AES, TripleDES, Rabbit, and RC4, depending on your security needs."
        },
        {
          question: "What is decryption?",
          answer: "Decryption is the reverse process of encryption, where encrypted data is converted back into its original plaintext form using the correct key."
        },
        {
          question: "How secure are these encryption methods?",
          answer: "These algorithms, particularly AES, are widely regarded as secure, but the overall security also depends on key management and usage."
        },
        {
          question: "Can I encrypt and decrypt any type of text?",
          answer: "Yes, you can encrypt or decrypt any text string using the provided algorithms, as long as you have the correct key."
        }
      ]
    },
    {
      name: "BIP39 Generator",
      icon: 'Brain',
      description: "Generate BIP39 passphrases from mnemonics or create random mnemonics with various language support. BIP39 is the standard for generating mnemonic phrases for cryptocurrency wallets and other secure applications. This tool helps create secure, easy-to-remember passphrases for wallet backups or secure system authentication.",
      keywords: "BIP39, mnemonic, passphrase, seed phrase, cryptocurrency",
      slug: "/tool/bip39-generator",
      component: Bip39Generator,
      faqs: [
        {
          question: "What is BIP39?",
          answer: "BIP39 is a standard for generating mnemonic phrases used in cryptocurrency wallets and other applications to securely store passphrases or private keys."
        },
        {
          question: "Why use BIP39 mnemonics?",
          answer: "BIP39 mnemonics are easy to remember and provide a secure way to back up private keys or passphrases in cryptocurrency wallets."
        },
        {
          question: "How do I generate a BIP39 passphrase?",
          answer: "You can generate a BIP39 passphrase by selecting a language and then either entering a mnemonic or generating a new random one."
        },
        {
          question: "Can I use BIP39 for non-cryptocurrency purposes?",
          answer: "Yes, BIP39 can be used for other secure passphrase generation purposes, such as backing up sensitive system credentials."
        },
        {
          question: "How long are BIP39 passphrases?",
          answer: "BIP39 passphrases are typically 12 to 24 words long, depending on the security level chosen."
        }
      ]
    },
    {
      name: "HMAC Generator",
      icon: 'Shield',
      description: "Generate Hash-based Message Authentication Codes (HMAC) using various hashing functions. HMAC is a cryptographic technique used to verify the integrity and authenticity of a message or data. It is widely used in APIs and security protocols for ensuring the authenticity of data transmissions.",
      keywords: "HMAC, hash, authentication, message integrity, cryptographic hash",
      slug: "/tool/hmac-generator",
      component: HmacGenerator,
      faqs: [
        {
          question: "What is HMAC?",
          answer: "HMAC (Hash-based Message Authentication Code) is a mechanism that combines a cryptographic hash function with a secret key to verify the integrity and authenticity of a message."
        },
        {
          question: "What is HMAC used for?",
          answer: "HMAC is used to verify that the data received has not been altered and that it comes from a trusted sender."
        },
        {
          question: "How does HMAC work?",
          answer: "HMAC works by applying a cryptographic hash function to a message combined with a secret key. The result is an authentication code that can be verified by the recipient."
        },
        {
          question: "Can I use HMAC for API security?",
          answer: "Yes, HMAC is widely used in APIs and security protocols to authenticate and ensure the integrity of data transmissions."
        },
        {
          question: "Which hashing algorithms can be used with HMAC?",
          answer: "You can use a variety of hashing algorithms with HMAC, including SHA-256, SHA-1, and MD5."
        }
      ]
    },
    {
      name: "RSA Key Pair Generator",
      icon: 'KeyRound',
      description: "Generate secure RSA public/private key pairs with customizable key sizes. RSA is a widely used public-key encryption algorithm, essential for secure data exchange in many applications, including digital signatures, SSL/TLS, and email encryption.",
      keywords: "rsa, public key, private key, key pair, certificate, encryption",
      slug: "/tool/rsa-generator",
      component: RsaGenerator,
      faqs: [
        {
          question: "What is RSA?",
          answer: "RSA is a public-key cryptosystem that enables secure data exchange and digital signatures using a pair of keys: a public key for encryption and a private key for decryption."
        },
        {
          question: "Why use RSA keys?",
          answer: "RSA keys provide a highly secure method for encrypting data and verifying digital signatures, widely used in secure communications, such as SSL/TLS and email encryption."
        },
        {
          question: "What key sizes can I generate?",
          answer: "You can generate RSA keys with customizable sizes, typically ranging from 1024 to 4096 bits, depending on the level of security you require."
        },
        {
          question: "How are RSA keys used?",
          answer: "RSA keys are used in secure data transmission protocols, digital signatures, and authentication systems to protect sensitive data and ensure authenticity."
        },
        {
          question: "Can RSA be used in public key infrastructure?",
          answer: "Yes, RSA is a cornerstone of public key infrastructure (PKI), enabling secure communications in many enterprise and government systems."
        }
      ]
    },
    {
      name: "Password Strength Analyzer",
      icon: 'ShieldCheck',
      description: "Analyze password strength and estimate crack time with detailed entropy analysis. This tool helps assess whether passwords are strong enough to resist common cracking methods. Ideal for developers and security experts working to improve system security by ensuring strong password policies.",
      keywords: "password strength, entropy, crack time, security analysis, password checker",
      slug: "/tool/password-analyzer",
      component: PasswordAnalyzer,
      faqs: [
        {
          question: "How is password strength calculated?",
          answer: "Password strength is calculated based on factors like length, complexity (use of symbols, numbers, and uppercase letters), and entropy (randomness)."
        },
        {
          question: "What is entropy in password strength?",
          answer: "Entropy refers to the randomness of a password. Higher entropy means the password is harder to guess or crack."
        },
        {
          question: "How does this tool estimate crack time?",
          answer: "The tool estimates the time it would take for an attacker to crack your password using brute-force or dictionary attacks, based on its complexity."
        },
        {
          question: "Should I always aim for a high password strength?",
          answer: "Yes, using a strong password reduces the risk of unauthorized access, especially for sensitive systems or accounts."
        },
        {
          question: "Can I improve my password strength?",
          answer: "Yes, increasing the length, adding complexity (symbols, numbers, etc.), and avoiding common words or patterns will significantly improve password strength."
        }
      ]
    }
  ]
}


  export default cryptoTools;
