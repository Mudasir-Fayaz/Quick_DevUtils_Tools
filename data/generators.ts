import { RandomAlphabet, RandomPassword, RandomString, RandomRegex, RandomNumber, RandomInteger, RandomDigit, RandomDigitPair, RandomFraction, RandomIntegerRange, RandomPrime, RandomBinary, RandomOctal, RandomDecimal, RandomHex, RandomBytes, RandomDate, RandomTime, RandomIP, RandomMAC, RandomUUID, RandomGUID, RandomJSON, RandomXML, RandomCSV, RandomTSV   } from "@/components/tools/generators";  

import { ToolCategory } from "@/types";

const generatorTools: ToolCategory = {
  name: "Generator Tools",
  icon: "Cog",
  tools: [
    {
        name: "Random Alphabet Letters",
        icon: 'AlphabetIcon',
        description: "Quickly generate one or more random alphabet letters. This tool is useful for generating random characters for games, testing, or creative projects. Whether you need a single random letter or multiple letters, this tool allows you to customize the number of letters generated and the type (uppercase or lowercase). Perfect for generating random strings, passwords, or just for fun!",
        faqs: [
          { question: "What is the purpose of this tool?", answer: "This tool generates random alphabet letters, useful for games, testing, or creating random strings." },
          { question: "Can I generate multiple letters at once?", answer: "Yes, you can generate any number of random letters at once." },
          { question: "Can I choose between uppercase and lowercase letters?", answer: "Yes, you can specify if you want uppercase, lowercase, or both types of letters." },
          { question: "Is this tool free to use?", answer: "Yes, the Random Alphabet Letters tool is free for all users." },
          { question: "How does the tool work?", answer: "Simply select the number of letters you want and specify whether they should be uppercase, lowercase, or a mix of both." }
        ],
        keywords: "random, alphabet, letters, generate, characters",
        slug: "/tool/random-alphabet-letters",
        component: RandomAlphabet
      },
      {
        name: "Random Password",
        icon: 'KeyIcon',
        description: "Quickly generate random passwords of arbitrary length. This tool allows you to create strong, secure passwords with a mix of characters including letters, numbers, and symbols. It's perfect for securing accounts or generating random passwords for testing purposes. You can customize the length and complexity to suit your needs, ensuring that your passwords are both secure and easy to use.",
        faqs: [
          { question: "Can I specify the length of the password?", answer: "Yes, you can specify any length for the password, from short to long." },
          { question: "What types of characters are included in the generated passwords?", answer: "The tool generates passwords with uppercase letters, lowercase letters, numbers, and symbols." },
          { question: "Is this tool free to use?", answer: "Yes, the Random Password tool is free for all users." },
          { question: "How do I use the generated password?", answer: "You can use the generated password to secure your accounts or for testing purposes." },
          { question: "Are the generated passwords secure?", answer: "Yes, the passwords generated are random and secure, making them suitable for protecting sensitive information." }
        ],
        keywords: "password, random, secure, generate, security",
        slug: "/tool/random-password",
        component: RandomPassword
      },
      {
        name: "Random String",
        icon: 'TypeIcon',
        description: "Generate random strings of arbitrary length and complexity. This tool lets you generate alphanumeric or custom strings with the option to include special characters. It’s great for creating random tokens, user identifiers, or any other type of string data you need for your web or app development.",
        faqs: [
          { question: "What can I use this tool for?", answer: "You can generate random strings for tokens, user IDs, or any use case requiring random text." },
          { question: "Can I specify the length of the string?", answer: "Yes, you can set the exact length of the string." },
          { question: "Can I include special characters?", answer: "Yes, you can choose to include special characters in the generated string." },
          { question: "Is this tool free to use?", answer: "Yes, the Random String tool is free for all users." },
          { question: "How does the tool work?", answer: "Simply choose the string length and select the type of characters you want to include, and the tool will generate a random string." }
        ],
        keywords: "string, random, generate, text, identifier",
        slug: "/tool/random-string",
        component: RandomString
      },
      {
        name: "Random Data from Regex",
        icon: 'FileCodeIcon',
        description: "Quickly generate random data that matches a given regular expression. This tool is helpful for generating mock data for testing, development, or simply experimenting with regular expressions. You can input your own regular expression pattern and the tool will create data that fits the structure you've defined.",
        faqs: [
          { question: "What is the purpose of this tool?", answer: "It helps generate random data that conforms to a regular expression pattern you define." },
          { question: "Can I input my own regular expression?", answer: "Yes, you can enter any valid regular expression, and the tool will generate data that matches it." },
          { question: "Is this tool free to use?", answer: "Yes, the Random Data from Regex tool is free for all users." },
          { question: "How do I use the tool?", answer: "Input a regular expression pattern, and the tool will generate matching random data for you." },
          { question: "Can I generate random strings with specific formats?", answer: "Yes, this tool allows you to create random data that adheres to your specific format requirements." }
        ],
        keywords: "random, data, regex, generate, mock data",
        slug: "/tool/random-data-from-regex",
        component: RandomRegex
      },
      {
        name: "Random Number",
        icon: 'HashIcon',
        description: "Quickly generate random numbers of any range and size. Whether you need small numbers, large numbers, or even numbers within a specific range, this tool makes it easy to generate random numbers for your needs. Perfect for use in games, simulations, and random selection processes.",
        faqs: [
          { question: "Can I specify the range for the random numbers?", answer: "Yes, you can specify a minimum and maximum value to generate numbers within that range." },
          { question: "How large can the numbers be?", answer: "You can generate numbers as large as needed, limited only by system constraints." },
          { question: "Is this tool free to use?", answer: "Yes, the Random Number tool is free for all users." },
          { question: "How does the tool work?", answer: "Simply input a range for the numbers, and the tool will generate random values within that range." },
          { question: "Can I generate a series of random numbers?", answer: "Yes, you can generate multiple random numbers in a single request." }
        ],
        keywords: "random, number, generate, range, game",
        slug: "/tool/random-number",
        component: RandomNumber
      },
      {
        name: "Random Integer",
        icon: 'DicesIcon',
        description: "Quickly generate random integers within a specified range. This tool is useful for generating whole numbers that are needed in programming, testing, or simulations. You can define the minimum and maximum values for the integers and generate a range of them easily.",
        faqs: [
          { question: "What is an integer?", answer: "An integer is a whole number that can be positive, negative, or zero, without any fractional or decimal part." },
          { question: "Can I specify the range for the random integers?", answer: "Yes, you can define the minimum and maximum values for the generated integers." },
          { question: "How does the tool work?", answer: "Simply input the range for the integers, and the tool will generate random whole numbers within that range." },
          { question: "Can I generate multiple random integers?", answer: "Yes, you can generate as many random integers as needed within the defined range." },
          { question: "Is this tool free to use?", answer: "Yes, the Random Integer tool is free for all users." }
        ],
        keywords: "random, integer, generate, range, number",
        slug: "/tool/random-integer",
        component: RandomInteger
      },
      {
        name: "Random Digit",
        icon: 'CircleDotIcon',
        description: "Generate a list of random digits from 0 to 9. This tool is useful for generating PINs, OTPs, or any other use case that requires random digits. You can generate any number of random digits in a single click, making it ideal for quickly testing systems that require numerical input.",
        faqs: [
          { question: "What is a random digit?", answer: "A random digit is a single number from 0 to 9, generated randomly." },
          { question: "How many digits can I generate?", answer: "You can specify how many random digits you want to generate." },
          { question: "Can I generate a mix of digits?", answer: "Yes, you can generate multiple random digits in a sequence." },
          { question: "Is this tool free to use?", answer: "Yes, the Random Digit tool is free for all users." },
          { question: "What can I use random digits for?", answer: "You can use random digits for creating PINs, OTPs, or other numerical data." }
        ],
        keywords: "random, digit, generate, number, pin",
        slug: "/tool/random-digit",
        component: RandomDigit
      },
      {
        name: "Random Digit Pair",
        icon: 'CircleDotIcon',
        description: "Generate random digit pairs from 00 to 99. This tool is useful for generating two-digit numbers for purposes such as codes, OTPs, or testing systems that require paired digits. You can customize the number of digit pairs generated based on your needs.",
        faqs: [
          { question: "What is a random digit pair?", answer: "A random digit pair consists of two digits, from 00 to 99, generated randomly." },
          { question: "How many digit pairs can I generate?", answer: "You can specify how many random digit pairs you want to generate." },
          { question: "Can I generate specific ranges of digit pairs?", answer: "This tool generates random pairs from 00 to 99, covering all possibilities." },
          { question: "Is this tool free to use?", answer: "Yes, the Random Digit Pair tool is free for all users." },
          { question: "What can I use random digit pairs for?", answer: "Random digit pairs can be used for generating codes, PINs, or testing applications." }
        ],
        keywords: "random, digit, pair, generate, number",
        slug: "/tool/random-digit-pair",
        component: RandomDigitPair
      },
      {
        name: "Random Fraction",
        icon: 'PercentIcon',
        description: "Quickly generate random fractions. You can generate fractions with custom numerators and denominators or let the tool randomly pick values for you. Perfect for mathematical testing, games, or any other project requiring random fractions.",
        faqs: [
          { question: "What is a random fraction?", answer: "A random fraction consists of a numerator and a denominator, generated randomly or based on the range you specify." },
          { question: "Can I specify the range for the numerator and denominator?", answer: "Yes, you can define the minimum and maximum values for both the numerator and denominator." },
          { question: "Is this tool free to use?", answer: "Yes, the Random Fraction tool is free for all users." },
          { question: "How does the tool work?", answer: "You can define a range for both the numerator and denominator, or let the tool generate them randomly." },
          { question: "Can I generate multiple random fractions?", answer: "Yes, you can generate as many random fractions as needed." }
        ],
        keywords: "random, fraction, generate, number, math",
        slug: "/tool/random-fraction",
        component: RandomFraction
      },
      {
        name: "Random Integer Range",
        icon: 'ArrowUpDownIcon',
        description: "Generate a sequence of random integers within a specified range. This tool allows you to customize the range of values and specify how many integers to generate, making it useful for simulations, gaming, and testing.",
        faqs: [
          { question: "What is a random integer range?", answer: "A random integer range generates a sequence of whole numbers within a specified range." },
          { question: "Can I specify the number of integers to generate?", answer: "Yes, you can define how many random integers to generate within the given range." },
          { question: "Is this tool free to use?", answer: "Yes, the Random Integer Range tool is free for all users." },
          { question: "How does the tool work?", answer: "Simply specify the minimum and maximum values for the range, along with the number of integers you want to generate." },
          { question: "Can I generate a sequence of integers in any order?", answer: "Yes, you can specify whether the integers should be generated in ascending or descending order." }
        ],
        keywords: "random, integer, range, generate, number",
        slug: "/tool/random-integer-range",
        component: RandomIntegerRange
      },
      {
        name: "Random Prime Number",
        icon: 'PrimeIcon',
        description: "Generate random prime numbers. This tool allows you to generate prime numbers within a specified range. Prime numbers are useful in cryptography, algorithms, and other applications requiring prime factors.",
        faqs: [
          { question: "What is a prime number?", answer: "A prime number is a number greater than 1 that has no divisors other than 1 and itself." },
          { question: "Can I specify the range for the prime numbers?", answer: "Yes, you can define a range, and the tool will generate prime numbers within that range." },
          { question: "Is this tool free to use?", answer: "Yes, the Random Prime Number tool is free for all users." },
          { question: "How does the tool work?", answer: "Simply define the range, and the tool will generate prime numbers within that range." },
          { question: "What can I use prime numbers for?", answer: "Prime numbers are commonly used in cryptography, number theory, and algorithms." }
        ],
        keywords: "random, prime, number, generate, math",
        slug: "/tool/random-prime-number",
        component: RandomPrime
      },
      {
        name: "Random Binary Number",
        icon: 'BinaryIcon',
        description: "Generate random binary numbers. This tool is perfect for generating binary numbers (1s and 0s) for testing, simulations, or cryptographic purposes. You can specify the length of the binary number or let the tool generate random lengths.",
        faqs: [
          { question: "What is a binary number?", answer: "A binary number is a number that consists of only two digits: 0 and 1." },
          { question: "Can I specify the length of the binary number?", answer: "Yes, you can define how long you want the binary number to be." },
          { question: "Is this tool free to use?", answer: "Yes, the Random Binary Number tool is free for all users." },
          { question: "How does the tool work?", answer: "Simply define the length of the binary number, and the tool will generate a random binary number of that length." },
          { question: "What can I use binary numbers for?", answer: "Binary numbers are used in computer science, cryptography, and digital systems." }
        ],
        keywords: "random, binary, number, generate, computer",
        slug: "/tool/random-binary-number",
        component: RandomBinary
      },
      {
        name: "Random Octal Number",
        icon: 'OctagonIcon',
        description: "Generate random octal numbers. This tool generates random numbers in octal (base-8) format. It's useful for computing, programming, or testing systems that work with octal values.",
        faqs: [
          { question: "What is an octal number?", answer: "An octal number is a number expressed in base-8, using digits from 0 to 7." },
          { question: "Can I specify the length of the octal number?", answer: "Yes, you can define how long you want the octal number to be." },
          { question: "Is this tool free to use?", answer: "Yes, the Random Octal Number tool is free for all users." },
          { question: "How does the tool work?", answer: "Simply define the length of the octal number, and the tool will generate a random octal number of that length." },
          { question: "What can I use octal numbers for?", answer: "Octal numbers are used in computing, programming, and digital systems." }
        ],
        keywords: "random, octal, number, generate, computing",
        slug: "/tool/random-octal-number",
        component: RandomOctal
      },
      {
        name: "Random Decimal Number",
        icon: 'PercentIcon',
        description: "Generate random decimal numbers. This tool allows you to generate decimal numbers (base-10) with specified precision or within a specified range. It's ideal for financial applications, simulations, or any task requiring random decimal numbers.",
        faqs: [
          { question: "What is a decimal number?", answer: "A decimal number is a number expressed in base-10, consisting of digits from 0 to 9." },
          { question: "Can I specify the number of decimal places?", answer: "Yes, you can define how many decimal places you want the generated number to have." },
          { question: "Is this tool free to use?", answer: "Yes, the Random Decimal Number tool is free for all users." },
          { question: "How does the tool work?", answer: "You can define a range for the decimal number or the number of decimal places, and the tool will generate random numbers accordingly." },
          { question: "What can I use decimal numbers for?", answer: "Decimal numbers are used in financial calculations, statistics, and scientific applications." }
        ],
        keywords: "random, decimal, number, generate, finance",
        slug: "/tool/random-decimal-number",
        component: RandomDecimal
      },
      {
        name: "Random Hex Number",
        icon: 'HexagonIcon',
        description: "Generate random hexadecimal numbers. This tool generates numbers in hexadecimal (base-16) format. Useful for cryptographic applications, color generation, and programming tasks that require hexadecimal values.",
        faqs: [
          { question: "What is a hexadecimal number?", answer: "A hexadecimal number is a number expressed in base-16, using digits 0-9 and letters A-F." },
          { question: "Can I specify the length of the hexadecimal number?", answer: "Yes, you can define how long you want the hexadecimal number to be." },
          { question: "Is this tool free to use?", answer: "Yes, the Random Hex Number tool is free for all users." },
          { question: "How does the tool work?", answer: "Simply define the length of the hexadecimal number, and the tool will generate a random hexadecimal number of that length." },
          { question: "What can I use hexadecimal numbers for?", answer: "Hexadecimal numbers are commonly used in computing, color codes, and cryptography." }
        ],
        keywords: "random, hexadecimal, number, generate, cryptography",
        slug: "/tool/random-hex-number",
        component: RandomHex
      },
      {
        name: "Random Bytes",
        icon: 'PackageIcon',
        description: "Generate random bytes. This tool generates random byte sequences for use in encryption, data generation, or testing. You can specify the length of the byte sequence or generate it randomly.",
        faqs: [
          { question: "What are random bytes?", answer: "Random bytes are a sequence of random values, each one representing a byte of data." },
          { question: "Can I specify the length of the byte sequence?", answer: "Yes, you can define how many bytes you want to generate." },
          { question: "Is this tool free to use?", answer: "Yes, the Random Bytes tool is free for all users." },
          { question: "How does the tool work?", answer: "Simply define the length of the byte sequence, and the tool will generate random bytes accordingly." },
          { question: "What can I use random bytes for?", answer: "Random bytes are useful in cryptography, data masking, and generating secure random values." }
        ],
        keywords: "random, bytes, generate, cryptography, data",
        slug: "/tool/random-bytes",
        component: RandomBytes
      },
      {
        name: "Random Date",
        icon: 'CalendarIcon',
        description: "Generate random calendar dates. This tool allows you to generate random dates within a specified range. Useful for testing, simulations, or generating historical or future dates for various applications.",
        faqs: [
          { question: "What is a random date?", answer: "A random date is a date generated randomly within a specified date range." },
          { question: "Can I specify the date range?", answer: "Yes, you can define a start date and end date, and the tool will generate random dates within that range." },
          { question: "Is this tool free to use?", answer: "Yes, the Random Date tool is free for all users." },
          { question: "How does the tool work?", answer: "You can define the range of dates, and the tool will generate random dates within that range." },
          { question: "What can I use random dates for?", answer: "Random dates can be used for testing, simulations, or generating historical data for applications." }
        ],
        keywords: "random, date, generate, calendar, testing",
        slug: "/tool/random-date",
        component: RandomDate
      },
      {
        name: "Random Time",
        icon: 'ClockIcon',
        description: "Generate random clock times. This tool generates random times within a specified range of hours and minutes. Ideal for creating test data for time-based applications, simulations, or event scheduling.",
        faqs: [
          { question: "What is a random time?", answer: "A random time consists of a randomly selected hour and minute within a specified range." },
          { question: "Can I specify the time range?", answer: "Yes, you can define a start and end time, and the tool will generate random times within that range." },
          { question: "Is this tool free to use?", answer: "Yes, the Random Time tool is free for all users." },
          { question: "How does the tool work?", answer: "Simply define the range of times, and the tool will generate random times within that range." },
          { question: "What can I use random times for?", answer: "Random times are useful for testing time-based applications or creating event schedules." }
        ],
        keywords: "random, time, generate, clock, testing",
        slug: "/tool/random-time",
        component: RandomTime
      },
      {
        name: "Random IP",
        icon: 'GlobeIcon',
        description: "Generate random IP addresses. This tool generates random IPv4 addresses within a specified range, useful for network testing, security simulations, or other IP-related tasks.",
        faqs: [
          { question: "What is a random IP address?", answer: "A random IP address is an address generated randomly within the specified IP range." },
          { question: "Can I specify the IP range?", answer: "Yes, you can define the start and end range for the IP addresses." },
          { question: "Is this tool free to use?", answer: "Yes, the Random IP tool is free for all users." },
          { question: "How does the tool work?", answer: "Simply define the IP range, and the tool will generate random IP addresses within that range." },
          { question: "What can I use random IP addresses for?", answer: "Random IP addresses can be used for network testing, security simulations, or generating test data." }
        ],
        keywords: "random, IP, address, generate, network",
        slug: "/tool/random-ip",
        component: RandomIP
      },
      {
        name: "Random MAC",
        icon: 'WifiIcon',
        description: "Generate random MAC (Media Access Control) addresses. This tool generates random MAC addresses, which are unique identifiers assigned to network interfaces. Useful for network testing, security simulations, and device identification purposes.",
        faqs: [
          { question: "What is a random MAC address?", answer: "A MAC address is a unique identifier assigned to a network interface, and a random MAC address is one generated randomly for testing or simulation purposes." },
          { question: "Can I specify the format of the MAC address?", answer: "Yes, the MAC address generated will follow the standard format (XX:XX:XX:XX:XX:XX) by default." },
          { question: "Is this tool free to use?", answer: "Yes, the Random MAC tool is free for all users." },
          { question: "How does the tool work?", answer: "The tool generates a random MAC address that can be used in various networking and security applications." },
          { question: "What can I use random MAC addresses for?", answer: "Random MAC addresses are commonly used for network testing, security simulations, and device identification." }
        ],
        keywords: "random, MAC, address, generate, network",
        slug: "/tool/random-mac",
        component: RandomMAC
      },
      {
        name: "Random UUID",
        icon: 'Fingerprint',
        description: "Generate random UUIDs (Universally Unique Identifiers). This tool creates random UUIDs that can be used for generating unique identifiers in various applications, such as databases, web applications, and system administration.",
        faqs: [
          { question: "What is a UUID?", answer: "A UUID is a 128-bit number used to uniquely identify information in a system. It’s commonly used to ensure that identifiers are globally unique." },
          { question: "Can I generate a UUID of any version?", answer: "Yes, this tool can generate UUIDs of different versions, depending on your needs." },
          { question: "Is this tool free to use?", answer: "Yes, the Random UUID tool is free for all users." },
          { question: "How does the tool work?", answer: "Simply click to generate a random UUID that is unique and suitable for your application." },
          { question: "What can I use UUIDs for?", answer: "UUIDs are commonly used for unique identification in databases, web applications, and other distributed systems." }
        ],
        keywords: "random, UUID, identifier, generate, unique",
        slug: "/tool/random-uuid",
        component: RandomUUID
      },
      {
        name: "Random GUID",
        icon: 'ScanIcon',
        description: "Generate random GUIDs (Globally Unique Identifiers). This tool creates GUIDs for applications where unique identifiers are necessary, such as database entries, object references, and system management.",
        faqs: [
          { question: "What is a GUID?", answer: "A GUID is a globally unique identifier, similar to a UUID, used for identifying resources or objects in distributed systems." },
          { question: "How does the GUID generation process work?", answer: "The tool generates a random GUID by using an algorithm that ensures global uniqueness." },
          { question: "Is this tool free to use?", answer: "Yes, the Random GUID tool is free for all users." },
          { question: "Can I generate GUIDs of different lengths?", answer: "GUIDs are typically 128-bit long, and the tool generates GUIDs in this standard format." },
          { question: "What can I use GUIDs for?", answer: "GUIDs are used for uniquely identifying items across different systems, such as databases, distributed applications, and objects." }
        ],
        keywords: "random, GUID, identifier, generate, unique",
        slug: "/tool/random-guid",
        component: RandomGUID
      },
      {
        name: "Random JSON",
        icon: 'BracketsIcon',
        description: "Generate random JSON data structures. This tool creates random JSON objects, arrays, and key-value pairs for testing APIs, databases, or applications that require randomized JSON data input.",
        faqs: [
          { question: "What is JSON?", answer: "JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate." },
          { question: "Can I define the structure of the generated JSON?", answer: "Yes, you can define the keys, values, and the number of objects or arrays you need in the generated JSON." },
          { question: "Is this tool free to use?", answer: "Yes, the Random JSON tool is free for all users." },
          { question: "How does the tool work?", answer: "Simply specify the structure and number of objects, and the tool will generate random JSON data for you." },
          { question: "What can I use random JSON for?", answer: "Random JSON can be used for testing APIs, populating mock databases, or generating data for simulations and demos." }
        ],
        keywords: "random, JSON, data, generate, API",
        slug: "/tool/random-json",
        component: RandomJSON
      },
      {
        name: "Random XML",
        icon: 'FileCodeIcon',
        description: "Generate random XML documents. This tool generates random XML data with user-defined tags and attributes. It’s useful for generating mock data for testing, database population, or XML-related applications.",
        faqs: [
          { question: "What is XML?", answer: "XML (eXtensible Markup Language) is a markup language that defines rules for encoding documents in a format that is both human-readable and machine-readable." },
          { question: "Can I define custom tags for the generated XML?", answer: "Yes, you can define the structure and tags for the generated XML document." },
          { question: "Is this tool free to use?", answer: "Yes, the Random XML tool is free for all users." },
          { question: "How does the tool work?", answer: "You specify the structure, and the tool generates random XML data with the tags and attributes you define." },
          { question: "What can I use random XML for?", answer: "Random XML is useful for generating mock data for testing XML parsers, populating databases, and for use in simulations." }
        ],
        keywords: "random, XML, data, generate, testing",
        slug: "/tool/random-xml",
        component: RandomXML
      },
      {
        name: "Random CSV",
        icon: 'FileSpreadsheetIcon',
        description: "Generate random CSV files. This tool creates random CSV (Comma Separated Values) files, which are commonly used for data storage, exporting, and importing in various applications and databases.",
        faqs: [
          { question: "What is a CSV file?", answer: "CSV is a simple file format used to store tabular data in which each line represents a record and each field in the record is separated by commas." },
          { question: "Can I specify the number of columns and rows?", answer: "Yes, you can define the number of columns and rows, and the tool will generate a CSV file with that structure." },
          { question: "Is this tool free to use?", answer: "Yes, the Random CSV tool is free for all users." },
          { question: "How does the tool work?", answer: "Simply specify the number of rows and columns, and the tool will generate a CSV file with random data." },
          { question: "What can I use random CSV files for?", answer: "Random CSV files are useful for testing data imports and exports, populating databases, or creating mock datasets for applications." }
        ],
        keywords: "random, CSV, data, generate, files",
        slug: "/tool/random-csv",
        component: RandomCSV
      },
      {
        name: "Random TSV",
        icon: 'FileSpreadsheetIcon',
        description: "Generate random TSV (Tab Separated Values) files. This tool creates random TSV files that are often used for data storage and transfer where tab-separated data is required.",
        faqs: [
          { question: "What is a TSV file?", answer: "TSV is a text-based file format used to store tabular data where fields in each record are separated by tabs." },
          { question: "Can I specify the number of columns and rows?", answer: "Yes, you can define the number of rows and columns, and the tool will generate a TSV file accordingly." },
          { question: "Is this tool free to use?", answer: "Yes, the Random TSV tool is free for all users." },
          { question: "How does the tool work?", answer: "Specify the structure (rows and columns) for the TSV file, and the tool generates random data based on that." },
          { question: "What can I use random TSV files for?", answer: "Random TSV files are useful for testing data imports, populating databases, or creating mock datasets for applications." }
        ],
        keywords: "random, TSV, data, generate, files",
        slug: "/tool/random-tsv",
        component: RandomTSV
      }
      
      
  ]
};

export default generatorTools;