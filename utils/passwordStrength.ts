export function calculatePasswordStrength(password: string): {
    score: number;
    crackTime: string;
    length: number;
    entropy: number;
    charSetSize: number;
  } {
    const length = password.length;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[^A-Za-z0-9]/.test(password);
  
    let charSetSize = 0;
    if (hasLowercase) charSetSize += 26;
    if (hasUppercase) charSetSize += 26;
    if (hasNumbers) charSetSize += 10;
    if (hasSpecialChars) charSetSize += 33;
  
    const entropy = Math.log2(Math.pow(charSetSize, length));
    const score = Math.min(100, Math.round((entropy / 100) * 100));
  
    let crackTime = "Instantly";
    if (entropy > 28) crackTime = "Minutes";
    if (entropy > 36) crackTime = "Hours";
    if (entropy > 60) crackTime = "Years";
    if (entropy > 128) crackTime = "Centuries";
  
    return { score, crackTime, length, entropy: Math.round(entropy), charSetSize };
  }
  
  