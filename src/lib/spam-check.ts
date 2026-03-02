export function isGibberish(text: string): boolean {
  if (!text || text.length < 3) return true;
  const clean = text.replace(/\s/g, "");

  // No spaces in long text → likely random string
  if (clean.length > 10 && !text.includes(" ")) return true;

  // Too few vowels for any language (Latin + Cyrillic + Turkish + Romanian)
  const vowels = clean.match(/[aeiouаеёиоуыэюяіїєüöäığşçâîăț]/gi) || [];
  const ratio = vowels.length / clean.length;
  if (clean.length > 8 && ratio < 0.1) return true;

  // Too many uppercase letters mixed with lowercase (random generator pattern)
  if (clean.length > 8) {
    const upper = (clean.match(/[A-ZА-ЯІЇЄҐ]/g) || []).length;
    const lower = (clean.match(/[a-zа-яіїєґ]/g) || []).length;
    if (upper > 3 && lower > 3 && Math.abs(upper - lower) < clean.length * 0.3)
      return true;
  }

  // Message too short to be meaningful (less than 2 words)
  const words = text.trim().split(/\s+/);
  if (words.length < 2 && clean.length < 15) return true;

  // Check for common word patterns — real messages have repeated common letters
  const uniqueChars = new Set(clean.toLowerCase()).size;
  if (clean.length > 12 && uniqueChars > clean.length * 0.8) return true;

  return false;
}

export function isFakeName(name: string): boolean {
  if (!name || name.length < 2) return true;
  const clean = name.replace(/\s/g, "");

  // No vowels in long name
  if (clean.length > 6) {
    const vowels = clean.match(/[aeiouаеёиоуыэюяіїєüöäığşçâîăț]/gi) || [];
    if (vowels.length === 0) return true;
  }

  // Random case mix with no spaces (e.g., "cHCmRkBxlyqtciTb")
  if (clean.length > 8) {
    const upper = (clean.match(/[A-ZА-ЯІЇЄҐ]/g) || []).length;
    const lower = (clean.match(/[a-zа-яіїєґ]/g) || []).length;
    if (upper > 2 && lower > 2 && !name.includes(" ")) return true;
  }

  // All same case, long, no spaces
  if (
    clean.length > 10 &&
    !name.includes(" ") &&
    (clean === clean.toUpperCase() || clean === clean.toLowerCase())
  ) {
    return true;
  }

  return false;
}

export function getSpamScore(data: {
  name: string;
  email: string;
  message: string;
}): number {
  let score = 0;
  if (isFakeName(data.name)) score += 0.3;
  if (isGibberish(data.message)) score += 0.7; // ← было 0.4, стало 0.7

  const disposable = [
    "mailinator.com",
    "guerrillamail.com",
    "tempmail.com",
    "throwaway.email",
    "yopmail.com",
    "10minutemail.com",
  ];
  const domain = data.email.split("@")[1]?.toLowerCase();
  if (disposable.includes(domain)) score += 0.3;

  return Math.min(score, 1);
}
