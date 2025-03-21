import { FactorialCalculator, GcdLcmCalculator, MathCalculator, PercentCalculator, PrimeChecker, RandomNumberGenerator, UnitConverter } from "@/components/tools/math";

const mathTools = {
  name: "Math Tools",
  icon: 'Calculator',
  tools: [
    {
      name: "Calculator",
      icon: 'Calculator',
      description: "Calculator performs basic arithmetic operations such as addition, subtraction, multiplication, and division. It is a simple and easy-to-use tool for anyone needing to solve basic math problems, whether for school, work, or personal use. The calculator works efficiently for quick computations and everyday calculations.",
      faqs: [
        { question: "What can the Calculator do?", answer: "It can perform basic arithmetic operations like addition, subtraction, multiplication, and division." },
        { question: "Is this tool free?", answer: "Yes, the Calculator is free to use." },
        { question: "Can I use it for complex calculations?", answer: "This tool is for basic math only; for complex calculations, consider using advanced calculators." },
        { question: "How do I use the Calculator?", answer: "Simply enter the numbers and select the operation you want to perform." },
        { question: "Is there a limit to the numbers I can calculate?", answer: "No, the Calculator can handle a wide range of numbers for basic operations." }
      ],
      keywords: "calculator, math calculator, basic math, arithmetic operations, addition, subtraction, multiplication, division",
      slug: "/tool/calculator",
      component: MathCalculator
    },
    {
      name: "Percentage Calculator",
      icon: 'Percent',
      description: "Percentage Calculator calculates percentages, percentage increase, and percentage decrease for various values. It's ideal for quickly determining percentage values, changes, and differences. Whether you're calculating a discount, tax, or profit margin, this tool simplifies the process.",
      faqs: [
        { question: "What does the Percentage Calculator do?", answer: "It calculates percentages, percentage increases, and percentage decreases." },
        { question: "How can I calculate a percentage increase?", answer: "Enter the original value and the increase amount to find the percentage increase." },
        { question: "Can I use this tool for percentage decrease calculations?", answer: "Yes, simply enter the original value and the decrease amount to find the percentage decrease." },
        { question: "Is this tool free?", answer: "Yes, the Percentage Calculator is free to use." },
        { question: "Can I calculate percentage differences between two values?", answer: "Yes, you can use the tool to calculate the percentage difference between two numbers." }
      ],
      keywords: "percentage calculator, percentage increase, percentage decrease, percent change, percentage calculations, percent, percentage difference",
      slug: "/tool/percentage-calculator",
      component: PercentCalculator
    },
    {
      name: "Random Number Generator",
      icon: 'Shuffle',
      description: "Random Number Generator generates a random number within a specified range, useful for simulations, probability studies, and random selection tasks. This tool is ideal for creating random values for lotteries, experiments, or games.",
      faqs: [
        { question: "What is the Random Number Generator?", answer: "It generates random numbers within a specified range, useful for various applications." },
        { question: "Can I set a custom range for the random numbers?", answer: "Yes, you can define the range from which the random number will be generated." },
        { question: "Is this tool free?", answer: "Yes, the Random Number Generator is free to use." },
        { question: "What can I use the generated numbers for?", answer: "You can use the random numbers for simulations, games, probability studies, and more." },
        { question: "Does the tool generate truly random numbers?", answer: "The numbers are pseudo-random, generated by an algorithm that mimics randomness." }
      ],
      keywords: "random number generator, rng, random number, number generator, randomizer, random range, random value",
      slug: "/tool/random-number-generator",
      component: RandomNumberGenerator
    },
    {
      name: "Factorial Calculator",
      icon: 'CpuIcon',
      description: "Factorial Calculator calculates the factorial of a number, useful for combinatorics, probability calculations, and algebra. Factorials are commonly used in permutations, combinations, and other mathematical concepts that involve counting or arranging objects.",
      faqs: [
        { question: "What is a factorial?", answer: "A factorial is the product of all positive integers less than or equal to a number." },
        { question: "How do I calculate a factorial?", answer: "Enter a number, and the tool will calculate the factorial of that number." },
        { question: "Is this tool free?", answer: "Yes, the Factorial Calculator is free to use." },
        { question: "Can I calculate large factorials?", answer: "Yes, the tool can handle relatively large factorials, but extremely large numbers may result in computational limits." },
        { question: "What are factorials used for?", answer: "Factorials are used in permutations, combinations, and probability theory." }
      ],
      keywords: "factorial calculator, factorial, combinatorics, math factorial, n factorial, factorial math, probability calculations",
      slug: "/tool/factorial-calculator",
      component: FactorialCalculator
    },
    {
      name: "Prime Number Checker",
      icon: 'Columns',
      description: "Prime Number Checker helps determine if a number is prime, meaning it is only divisible by 1 and itself. This tool is useful in number theory, cryptography, and other areas of mathematics where prime numbers play a significant role.",
      faqs: [
        { question: "What is a prime number?", answer: "A prime number is a number greater than 1 that has no divisors other than 1 and itself." },
        { question: "How can I check if a number is prime?", answer: "Enter the number, and the tool will tell you if it's prime or not." },
        { question: "Is this tool free?", answer: "Yes, the Prime Number Checker is free to use." },
        { question: "Can I check large numbers for primality?", answer: "Yes, the tool can check both small and large numbers for primality." },
        { question: "Why are prime numbers important?", answer: "Prime numbers are important in fields like cryptography, number theory, and computer science." }
      ],
      keywords: "prime number checker, check prime number, is prime, prime number, prime number verification, number theory",
      slug: "/tool/prime-number-checker",
      component: PrimeChecker
    },
    {
      name: "GCD & LCM Calculator",
      icon: 'ChevronRightIcon',
      description: "GCD & LCM Calculator finds the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of two or more numbers. These mathematical operations are essential in simplifying fractions, solving problems in number theory, and finding common denominators in fractions.",
      faqs: [
        { question: "What is GCD?", answer: "GCD (Greatest Common Divisor) is the largest number that divides two or more numbers without leaving a remainder." },
        { question: "What is LCM?", answer: "LCM (Least Common Multiple) is the smallest number that is a multiple of two or more numbers." },
        { question: "How can I calculate GCD and LCM?", answer: "Enter the numbers you want to calculate the GCD and LCM for, and the tool will compute the values." },
        { question: "Is this tool free?", answer: "Yes, the GCD & LCM Calculator is free to use." },
        { question: "Can I calculate GCD and LCM for more than two numbers?", answer: "Yes, you can enter multiple numbers to calculate both the GCD and LCM." }
      ],
      keywords: "gcd calculator, lcm calculator, greatest common divisor, least common multiple, gcd, lcm, math gcd, math lcm, number theory",
      slug: "/tool/gcd-lcm-calculator",
      component: GcdLcmCalculator
    },
    {
      name: "Unit Converter",
      icon: 'Maximize2Icon',
      description: "Unit Converter helps convert between various units of measurement such as length, weight, and temperature. This tool makes it easy to switch between metric, imperial, and other measurement systems for a wide range of units like meters to feet, kilograms to pounds, or Celsius to Fahrenheit.",
      faqs: [
        { question: "What can I convert with the Unit Converter?", answer: "You can convert units for length, weight, temperature, and other common measurements." },
        { question: "How do I convert between different units?", answer: "Select the unit type, input the value you want to convert, and choose the target unit." },
        { question: "Is this tool free?", answer: "Yes, the Unit Converter is free to use." },
        { question: "Can I convert complex units?", answer: "Yes, the tool supports a wide range of unit conversions, including complex ones." },
        { question: "Can I use the tool for temperature conversions?", answer: "Yes, you can easily convert between temperature units like Celsius, Fahrenheit, and Kelvin." }
      ],
      keywords: "unit converter, length converter, weight converter, temperature converter, measurement converter, convert units, metric converter, imperial converter, unit conversion",
      slug: "/tool/unit-converter",
      component: UnitConverter
    }
  ]
}

  export default mathTools;