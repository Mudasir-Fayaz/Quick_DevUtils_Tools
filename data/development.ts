import { 
  GitCheatsheet,
  RandomPortGenerator,
  CrontabGenerator,
  SqlPrettify,
  ChmodCalculator,
  DockerComposeConverter,
  EmailNormalizer,
  RegexCheatsheet
} from "@/components/tools/development";

import { ToolCategory } from "@/types";

const developmentTools: ToolCategory = {
  name: "Development Tools",
  icon: "Code2",
  tools: [
    {
      name: "Git Cheatsheet",
      icon: 'FolderGit',
      description: "The Git Cheatsheet is a comprehensive reference guide for Git commands and their usage. It includes common Git commands with examples, helping developers manage version control efficiently. Whether you’re a beginner or an experienced user, this tool simplifies Git’s complex commands into easy-to-understand formats. It’s perfect for quick look-ups, reminders, and understanding advanced Git functionality. Save time and increase productivity with this ultimate Git reference tool.",
      faqs: [
        { question: "What is Git?", answer: "Git is a version control system that tracks changes in files and coordinates work on those files among multiple people." },
        { question: "How do I use the Git Cheatsheet?", answer: "Browse through the list of commands and examples to find the relevant Git command or reference you need." },
        { question: "Is this Git Cheatsheet free?", answer: "Yes, the Git Cheatsheet is completely free to use." },
        { question: "Can I contribute to the Git Cheatsheet?", answer: "Yes, feel free to suggest additional commands or updates via the tool's repository." },
        { question: "How detailed are the Git command examples?", answer: "The examples include real-world use cases to help you understand each command's functionality." }
      ],
      keywords: "git, commands, cheatsheet, reference, version control",
      slug: "/tool/git-cheatsheet",
      component: GitCheatsheet
    },
    {
      name: "Random Port Generator",
      icon: 'Network',
      description: "The Random Port Generator helps developers generate available ports for development purposes. It ensures that the generated ports are not in use, preventing conflicts. This tool is particularly useful for setting up development environments where unique ports are necessary. With an intuitive interface, users can quickly generate ports without worrying about overlaps. It’s a must-have for software engineers and network administrators setting up local services or testing applications.",
      faqs: [
        { question: "What is a random port?", answer: "A random port is a port number chosen from a pool of unused ports, typically used in software or network development." },
        { question: "How does the Random Port Generator work?", answer: "It generates a random port number within a specified range and checks if it's available for use." },
        { question: "Can I specify a range for the port numbers?", answer: "Yes, you can define a range for generating the ports." },
        { question: "Is this tool free to use?", answer: "Yes, the Random Port Generator is free for all users." },
        { question: "What happens if the generated port is in use?", answer: "The tool will automatically generate a new port number until an available one is found." }
      ],
      keywords: "port, random, network, development",
      slug: "/tool/random-port",
      component: RandomPortGenerator
    },
    {
      name: "Crontab Generator",
      icon: 'Clock',
      description: "Create and validate crontab expressions with ease using the Crontab Generator. This tool allows you to generate cron jobs with flexible scheduling options for automating tasks on Unix-like systems. Whether you're setting up daily, weekly, or custom interval jobs, the Crontab Generator simplifies the syntax. It also validates your expression to ensure it’s correct, saving time and avoiding errors. This is an essential tool for system administrators and developers working with automated tasks.",
      faqs: [
        { question: "What is crontab?", answer: "Crontab is a Linux/Unix utility used for scheduling tasks to run automatically at specified intervals." },
        { question: "How do I generate a crontab expression?", answer: "Use the tool's input fields to select the time and frequency, and it will generate the correct cron expression for you." },
        { question: "Can I validate my crontab expression?", answer: "Yes, the tool will validate the cron expression to ensure it’s correctly formatted." },
        { question: "Is there a limit to the number of crontab jobs I can create?", answer: "No, you can create as many crontab expressions as you need." },
        { question: "Can I use this tool for crontab on Windows?", answer: "Crontab is native to Unix/Linux systems, but you can use similar task schedulers on Windows like Task Scheduler." }
      ],
      keywords: "cron, schedule, linux, automation",
      slug: "/tool/crontab",
      component: CrontabGenerator
    },
    {
      name: "SQL Prettify",
      icon: 'Database',
      description: "SQL Prettify is a tool to format and beautify your SQL queries, making them more readable and easier to understand. It automatically adds indentation and line breaks to SQL queries, ensuring proper alignment of clauses, making debugging and development much easier. Whether working with simple or complex queries, this tool ensures that your SQL code is clean and neatly formatted. It’s especially helpful for those working with large databases and complicated queries.",
      faqs: [
        { question: "What is SQL Prettify?", answer: "SQL Prettify formats SQL queries to make them more readable and easier to work with." },
        { question: "Can I use SQL Prettify for any type of SQL query?", answer: "Yes, it works with all types of SQL queries, from simple selects to complex joins and subqueries." },
        { question: "Is there a limit on the query length?", answer: "No, there’s no limit to the length of SQL queries you can prettify." },
        { question: "Is this tool free to use?", answer: "Yes, SQL Prettify is completely free." },
        { question: "Can I use SQL Prettify for large database queries?", answer: "Yes, SQL Prettify handles large queries efficiently." }
      ],
      keywords: "sql, format, prettify, database",
      slug: "/tool/sql-prettify",
      component: SqlPrettify
    },
    {
      name: "Chmod Calculator",
      icon: 'Lock',
      description: "Chmod Calculator helps you calculate Unix file permissions, allowing you to set access levels for different users and groups. Whether you need to grant or restrict permissions, this tool simplifies the process. It converts numeric permissions into symbolic format and vice versa, making it easier to understand and manage Unix file permissions. Perfect for developers and system administrators working with Linux and Unix systems, this tool ensures that file access control is both accurate and secure.",
      faqs: [
        { question: "What is chmod?", answer: "Chmod is a Linux/Unix command used to change file permissions for the user, group, and others." },
        { question: "How does the Chmod Calculator work?", answer: "It allows you to input numeric permissions or select symbolic permissions to calculate and display the corresponding values." },
        { question: "Can I use the Chmod Calculator for all Linux distributions?", answer: "Yes, the Chmod Calculator works with any Linux/Unix distribution." },
        { question: "Is there a limit to the number of files I can change permissions for?", answer: "No, you can calculate and modify permissions for as many files as needed." },
        { question: "What do the numeric values in chmod represent?", answer: "Numeric values represent read (4), write (2), and execute (1) permissions for the owner, group, and others." }
      ],
      keywords: "chmod, unix, permissions, linux",
      slug: "/tool/chmod-calculator",
      component: ChmodCalculator
    },
    {
      name: "Docker Run to Compose",
      icon: 'Container',
      description: "The Docker Run to Compose tool helps developers easily convert Docker run commands into docker-compose.yml files. It simplifies the transition from individual container commands to a more structured Docker Compose setup. By automatically generating the Compose file, it saves time and reduces manual effort. Ideal for developers who are new to Docker Compose or for those looking to streamline their container orchestration workflow. This tool is essential for developers working with Docker containers on complex projects.",
      faqs: [
        { question: "What is Docker Compose?", answer: "Docker Compose is a tool for defining and running multi-container Docker applications using a YAML file for configuration." },
        { question: "How does this tool convert Docker run commands?", answer: "The tool reads your Docker run commands and generates an equivalent docker-compose.yml configuration." },
        { question: "Can I customize the generated docker-compose.yml file?", answer: "Yes, you can edit and fine-tune the generated Compose file as needed." },
        { question: "Does this tool work with all Docker run commands?", answer: "It works with most Docker run commands but may not support every possible configuration." },
        { question: "Is this tool free to use?", answer: "Yes, the Docker Run to Compose tool is free to use." }
      ],
      keywords: "docker, compose, container, conversion",
      slug: "/tool/docker-compose",
      component: DockerComposeConverter
    },
    {
      name: "Email Normalizer",
      icon: 'Mail',
      description: "Email Normalizer allows you to validate and format email addresses to ensure they follow proper standards. This tool normalizes email addresses by removing extraneous characters and fixing common formatting errors, ensuring a uniform appearance. It also validates the email to ensure its authenticity and avoid invalid addresses in your application. Ideal for user registration forms or when dealing with email-based data, it improves data integrity and reduces errors related to invalid emails.",
      faqs: [
        { question: "What does Email Normalizer do?", answer: "It normalizes and validates email addresses, ensuring they follow the proper format and are valid." },
        { question: "Can I fix formatting errors in email addresses?", answer: "Yes, the tool automatically removes unnecessary characters and standardizes the email format." },
        { question: "How does Email Normalizer validate emails?", answer: "It checks if the email address is correctly formatted and whether it belongs to a valid domain." },
        { question: "Can I use this tool for bulk email validation?", answer: "Yes, you can use it for multiple email addresses at once." },
        { question: "Is the Email Normalizer free?", answer: "Yes, the Email Normalizer is free to use." }
      ],
      keywords: "email, normalize, validate, format",
      slug: "/tool/email-normalizer",
      component: EmailNormalizer
    },
    {
      name: "Regex Cheatsheet",
      icon: 'FileSearch',
      description: "Regex Cheatsheet provides an accessible reference for regular expression patterns and examples. It offers a curated list of the most commonly used regular expressions and their explanations. Perfect for both beginners and experienced developers, it simplifies the process of building and understanding regular expressions. Whether you need help with string matching, validation, or extraction, this tool is a fast way to find the right regex pattern. It’s an essential companion for developers working with text manipulation or pattern matching tasks.",
      faqs: [
        { question: "What is Regex?", answer: "Regex (regular expression) is a sequence of characters used to match patterns in text." },
        { question: "How do I use Regex Cheatsheet?", answer: "Browse through the list of regular expression patterns and select the one that matches your needs." },
        { question: "Can I see examples of how a regex pattern works?", answer: "Yes, each pattern comes with examples to demonstrate how it works." },
        { question: "Does this tool support all regex flavors?", answer: "It supports most common regex flavors used in programming languages and tools." },
        { question: "Is Regex Cheatsheet free?", answer: "Yes, Regex Cheatsheet is free for everyone to use." }
      ],
      keywords: "regex, regular expressions, patterns",
      slug: "/tool/regex-cheatsheet",
      component: RegexCheatsheet
    }
  ]
};

export default developmentTools;
