import { FactorialCalculator, GcdLcmCalculator, MathCalculator, PercentCalculator, PrimeChecker, RandomNumberGenerator, UnitConverter } from "@/components/tools/math";

const mathTools = {
  name: "Math Tools",
  icon: 'Calculator',
  tools: [
    {
      name: "Calculator",
      icon: 'Calculator',
      description: "Performs basic arithmetic operations such as addition, subtraction, multiplication, and division.",
      keywords: "calculator, math calculator, basic math, arithmetic operations, addition, subtraction, multiplication, division",
      slug: "/tool/calculator",
      component: MathCalculator
    },
    {
      name: "Percentage Calculator",
      icon: 'Percent',
      description: "Calculates percentages, percentage increase, and percentage decrease for various values.",
      keywords: "percentage calculator, percentage increase, percentage decrease, percent change, percentage calculations, percent, percentage difference",
      slug: "/tool/percentage-calculator",
      component: PercentCalculator
    },
    {
      name: "Random Number Generator",
      icon: 'Shuffle',
      description: "Generates a random number within a specified range, useful for simulations and probability studies.",
      keywords: "random number generator, rng, random number, number generator, randomizer, random range, random value",
      slug: "/tool/random-number-generator",
      component: RandomNumberGenerator
    },
    {
      name: "Factorial Calculator",
      icon: 'Cpu',
      description: "Calculates the factorial of a number, useful for combinatorics and probability calculations.",
      keywords: "factorial calculator, factorial, combinatorics, math factorial, n factorial, factorial math, probability calculations",
      slug: "/tool/factorial-calculator",
      component: FactorialCalculator
    },
    {
      name: "Prime Number Checker",
      icon: 'Columns',
      description: "Checks if a number is a prime number, which is only divisible by 1 and itself.",
      keywords: "prime number checker, check prime number, is prime, prime number, prime number verification, number theory",
      slug: "/tool/prime-number-checker",
      component: PrimeChecker
    },
    {
      name: "GCD & LCM Calculator",
      icon: 'ChevronRight',
      description: "Finds the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of two or more numbers.",
      keywords: "gcd calculator, lcm calculator, greatest common divisor, least common multiple, gcd, lcm, math gcd, math lcm, number theory",
      slug: "/tool/gcd-lcm-calculator",
      component: GcdLcmCalculator
    },
    {
      name: "Unit Converter",
      icon: 'Maximize2',
      description: "Converts between various units of measurement such as length, weight, and temperature.",
      keywords: "unit converter, length converter, weight converter, temperature converter, measurement converter, convert units, metric converter, imperial converter, unit conversion",
      slug: "/tool/unit-converter",
      component: UnitConverter
    }
  ]
}

  export default mathTools;