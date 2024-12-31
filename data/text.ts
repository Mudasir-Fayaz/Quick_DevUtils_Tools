import {DiffChecker, WordCounter, TextAscii, TextFormatter, LoremIpsum, LineSorter, DuplicateLines, TextEditor} from "@/components/tools/text";
import { ToolCategory } from "@/types";
const textTools: ToolCategory = {
  name: "Text Tools",
  icon: "Type",
  tools: [
    {
      name: "Text Editor",
      icon: "Pencil",
      description: "A simple text editor that allows you to create, edit, and format text documents. Whether you're writing, note-taking, or drafting content, this tool provides a straightforward interface for all your text editing needs.",
      faqs: [
        { question: "How do I use the Text Editor?", answer: "Simply enter your text in the editor, and use the formatting options to adjust your text as needed." },
        { question: "Can I save my work?", answer: "Currently, the Text Editor doesn't support saving files directly, but you can copy your work to your clipboard." },
        { question: "Is there an autosave feature?", answer: "No, the Text Editor does not have an autosave feature, so please ensure you manually save your work." },
        { question: "Is this tool free?", answer: "Yes, the Text Editor is completely free to use." }
      ],
      keywords: "text editor, edit text, text writing tool, plain text editor, text creation",
      slug: "/tool/text-editor",
      component: TextEditor
    },
    {
      name: "Text Diff Checker",
      icon: "GitCompare",
      description: "The Text Diff Checker compares two text inputs side by side, highlighting differences between them for easier analysis and comparison. It's great for comparing document revisions or tracking changes in code.",
      faqs: [
        { question: "How do I compare two texts?", answer: "Simply paste two different texts into the provided fields, and the tool will show the differences between them." },
        { question: "Is this tool useful for code comparison?", answer: "Yes, the Text Diff Checker is particularly useful for comparing code changes." },
        { question: "Does it support multiple languages?", answer: "Yes, the tool works with all types of text and can compare documents in any language." },
        { question: "Can I save or export the comparison results?", answer: "Currently, you can only view the differences on-screen. You would need to manually copy the comparison." }
      ],
      keywords: "text diff checker, compare text, text comparison, text differences, diff tool, compare documents",
      slug: "/tool/text-diff-checker",
      component: DiffChecker
    },
    {
      name: "Word Counter",
      icon: "Hash",
      description: "The Word Counter counts the number of words, characters, and spaces in your text. It's a helpful tool for content creators, writers, and anyone looking to analyze the length of their text.",
      faqs: [
        { question: "What does the Word Counter do?", answer: "The Word Counter calculates the number of words, characters, and spaces in your text." },
        { question: "Can I use it for character and word limit tracking?", answer: "Yes, this tool is ideal for tracking word or character limits in essays, blog posts, or social media posts." },
        { question: "Is there a limit to the text length?", answer: "No, there is no limit to the amount of text you can input, but very long texts may take longer to process." },
        { question: "Does it count punctuation?", answer: "Yes, punctuation is counted as characters, but it is not considered as words." }
      ],
      keywords: "word counter, character counter, text analysis, word count tool, content length checker, character count tool",
      slug: "/tool/word-counter",
      component: WordCounter
    },
    {
      name: "Text Formatter",
      icon: "AlignLeft",
      description: "The Text Formatter allows you to format your text with various transformations such as capitalization, lowercasing, and more. It's a helpful tool for quickly adjusting text formatting.",
      faqs: [
        { question: "What types of transformations can I apply?", answer: "You can capitalize, lowercase, or apply other transformations to your text as needed." },
        { question: "Can I format text in bulk?", answer: "Yes, you can format long texts by applying the transformations to all of the content at once." },
        { question: "Is this tool free?", answer: "Yes, the Text Formatter is free to use." },
        { question: "Does the tool support advanced formatting?", answer: "The tool focuses on basic formatting like case transformations and does not support rich text or styles like bold or italics." }
      ],
      keywords: "text formatter, capitalize text, lowercase text, format text, text case converter, text transformer",
      slug: "/tool/text-formatter",
      component: TextFormatter
    },
    {
      name: "Lorem Ipsum Generator",
      icon: "Type",
      description: "The Lorem Ipsum Generator produces placeholder text for use in design mockups, templates, and prototypes. It's commonly used in design and web development projects to fill empty spaces with text.",
      faqs: [
        { question: "What is Lorem Ipsum?", answer: "Lorem Ipsum is dummy text used in the printing and typesetting industry. It has been the standard filler text since the 1500s." },
        { question: "How do I use the Lorem Ipsum Generator?", answer: "Select the amount of placeholder text you need, and the tool will generate it for you." },
        { question: "Is Lorem Ipsum text readable?", answer: "No, Lorem Ipsum text is nonsensical, designed only to mimic the look of natural language without distracting from the design." },
        { question: "Can I customize the generated text?", answer: "You can specify how many paragraphs or words you need, but the text itself remains the standard Lorem Ipsum format." }
      ],
      keywords: "lorem ipsum generator, placeholder text, filler text, dummy text generator, mockup text, design text generator",
      slug: "/tool/lorem-ipsum-generator",
      component: LoremIpsum
    },
    {
      name: "Text to ASCII Art",
      icon: "Columns",
      description: "Transform plain text into creative ASCII art. This tool turns your text into visually appealing designs using ASCII characters, great for fun or decorative purposes.",
      faqs: [
        { question: "What is ASCII art?", answer: "ASCII art is a graphic design technique that uses characters from the ASCII set to create images or text designs." },
        { question: "Can I convert any text into ASCII art?", answer: "Yes, simply input any text, and the tool will convert it into ASCII art." },
        { question: "What are some uses for ASCII art?", answer: "ASCII art is used in creative projects, email signatures, and online discussions to add visual flair." },
        { question: "Can I customize the ASCII art design?", answer: "The tool automatically generates ASCII art from the text, but customization is limited to the text itself." }
      ],
      keywords: "text to ascii art, ascii converter, ascii text generator, ascii art maker, text to art, creative ascii text",
      slug: "/tool/text-to-ascii-art",
      component: TextAscii
    },
    {
      name: "Line Sorter",
      icon: "SortAsc",
      description: "Sorts lines of text alphabetically or numerically. It's great for organizing lists, names, or any type of text data that needs to be sorted.",
      faqs: [
        { question: "How do I use the Line Sorter?", answer: "Paste your lines of text into the input field, choose whether to sort alphabetically or numerically, and the tool will sort them for you." },
        { question: "Can I sort lines in reverse order?", answer: "Yes, you can choose to sort lines in ascending or descending order." },
        { question: "What types of text can I sort?", answer: "The Line Sorter can handle any type of text, including numbers, names, and general lists." },
        { question: "Is this tool free?", answer: "Yes, the Line Sorter is completely free." }
      ],
      keywords: "line sorter, sort text, sort lines, alphabetical sorter, text sorting tool, numeric line sorter",
      slug: "/tool/line-sorter",
      component: LineSorter
    },
    {
      name: "Remove Duplicate Lines",
      icon: "Search",
      description: "The Remove Duplicate Lines tool detects and removes duplicate lines from your text input, ensuring unique and clean content. This is useful for lists, code, or any text requiring deduplication.",
      faqs: [
        { question: "How does the Remove Duplicate Lines tool work?", answer: "Paste your text into the input field, and the tool will automatically remove any duplicate lines." },
        { question: "Can I remove duplicates based on case sensitivity?", answer: "Yes, you can choose to either consider or ignore case sensitivity while removing duplicates." },
        { question: "Is this tool free?", answer: "Yes, the Remove Duplicate Lines tool is free to use." },
        { question: "Can I restore removed lines?", answer: "No, once duplicate lines are removed, they cannot be restored." }
      ],
      keywords: "remove duplicate lines, deduplicate text, text deduplication tool, clean duplicate lines, unique line generator",
      slug: "/tool/remove-duplicate-lines",
      component: DuplicateLines
    }
  ],
};

  export default textTools;