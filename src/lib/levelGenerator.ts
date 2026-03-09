// Level generator - creates 15 levels per difficulty with multi-language support
// This file is imported by gameData.ts

import type { Language } from "@/components/portfolio/LanguageSelector";

export interface MultiLangLevel {
    id: number;
    title: string;
    briefing: string;
    description: string;
    testCases: { input: unknown[]; expected: unknown; label: string }[];
    points: number;
    langs: Record<Language, { starterCode: string; hints: string[]; solution: string }>;
}

// Helper: JS-only level (for simpler levels where all langs share JS logic)
function jsLevel(
    id: number, title: string, briefing: string, desc: string, pts: number,
    testCases: { input: unknown[]; expected: unknown; label: string }[],
    starter: string, hints: string[], solution: string,
    cStarter?: string, cHints?: string[], cSol?: string,
    cppStarter?: string, cppHints?: string[], cppSol?: string,
    javaStarter?: string, javaHints?: string[], javaSol?: string,
): MultiLangLevel {
    return {
        id, title, briefing, description: desc, testCases, points: pts,
        langs: {
            c: { starterCode: cStarter || `// C: ${desc}\n#include <stdio.h>\n\n// Write your solve function here\n`, hints: cHints || hints, solution: cSol || solution },
            cpp: { starterCode: cppStarter || `// C++: ${desc}\n#include <iostream>\nusing namespace std;\n\n// Write your solve function here\n`, hints: cppHints || hints, solution: cppSol || solution },
            java: { starterCode: javaStarter || `// Java: ${desc}\npublic class Main {\n  // Write your solve method here\n}\n`, hints: javaHints || hints, solution: javaSol || solution },
            javascript: { starterCode: starter, hints, solution },
        },
    };
}

// ═══ CODEQUEST BEGINNER (15 levels) ═══
export const cqBeginnerLevels: MultiLangLevel[] = [
    jsLevel(1, "LEVEL 01 — REVERSE A STRING", "Reverse a string to decode the secret.", "Write `solve(str)` → return the string reversed.",
        100, [{ input: ["hello"], expected: "olleh", label: "solve('hello') → 'olleh'" }, { input: ["abc"], expected: "cba", label: "solve('abc') → 'cba'" }, { input: ["a"], expected: "a", label: "solve('a') → 'a'" }],
        "function solve(str) {\n  // Reverse the string\n  \n}", ["1. Split into array: str.split('')", "2. Reverse: .reverse()", "3. Join back: .join('')", "4. Chain: str.split('').reverse().join('')", "5. Return the result"],
        "function solve(str) {\n  return str.split('').reverse().join('');\n}",
        '#include <string.h>\nchar* solve(char* s) {\n  // Reverse in-place\n  return s;\n}', ["1. Get len with strlen(s)", "2. Two pointers: i=0, j=len-1", "3. Swap s[i] and s[j]", "4. Move inward: i++, j--", "5. Return s"],
        '#include <string.h>\nchar* solve(char* s) {\n  int len=strlen(s);\n  for(int i=0,j=len-1;i<j;i++,j--){char t=s[i];s[i]=s[j];s[j]=t;}\n  return s;\n}',
        '#include <string>\n#include <algorithm>\nusing namespace std;\nstring solve(string s) {\n  // Reverse\n  return s;\n}', ["1. Use reverse(s.begin(), s.end())", "2. Or manually swap", "3. Return s", "4. #include <algorithm>", "5. One line solution"],
        '#include <string>\n#include <algorithm>\nusing namespace std;\nstring solve(string s) {\n  reverse(s.begin(),s.end());\n  return s;\n}',
        'public class Main {\n  public static String solve(String s) {\n    // Reverse\n    return "";\n  }\n}', ["1. Use StringBuilder", "2. new StringBuilder(s)", "3. .reverse().toString()", "4. Return result", "5. Strings are immutable in Java"],
        'public class Main {\n  public static String solve(String s) {\n    return new StringBuilder(s).reverse().toString();\n  }\n}'
    ),
    jsLevel(2, "LEVEL 02 — SUM AN ARRAY", "Calculate total distance by summing segments.", "Write `solve(arr)` → return sum of all numbers.",
        150, [{ input: [[1, 2, 3]], expected: 6, label: "solve([1,2,3]) → 6" }, { input: [[5, 5, 5, 5]], expected: 20, label: "solve([5,5,5,5]) → 20" }, { input: [[10]], expected: 10, label: "solve([10]) → 10" }],
        "function solve(arr) {\n  // Sum all numbers\n  \n}", ["1. Use .reduce()", "2. (sum, n) => sum + n", "3. Initial value: 0", "4. arr.reduce((s,n)=>s+n, 0)", "5. Return the result"],
        "function solve(arr) {\n  return arr.reduce((s,n) => s+n, 0);\n}"
    ),
    jsLevel(3, "LEVEL 03 — FIND MINIMUM", "Find the shortest path!", "Write `solve(arr)` → return smallest number.",
        200, [{ input: [[5, 3, 8, 1]], expected: 1, label: "solve([5,3,8,1]) → 1" }, { input: [[42, 17]], expected: 17, label: "solve([42,17]) → 17" }, { input: [[100]], expected: 100, label: "solve([100]) → 100" }],
        "function solve(arr) {\n  // Find minimum\n  \n}", ["1. Math.min() finds smallest", "2. Takes individual args", "3. Use spread: ...arr", "4. Math.min(...arr)", "5. Return it"],
        "function solve(arr) {\n  return Math.min(...arr);\n}"
    ),
    jsLevel(4, "LEVEL 04 — DOUBLE EACH", "Double every value in the array.", "Write `solve(arr)` → return array with each element doubled.",
        200, [{ input: [[1, 2, 3]], expected: [2, 4, 6], label: "solve([1,2,3]) → [2,4,6]" }, { input: [[0, 5]], expected: [0, 10], label: "solve([0,5]) → [0,10]" }],
        "function solve(arr) {\n  // Double each element\n  \n}", ["1. Use .map()", "2. n => n * 2", "3. arr.map(n => n*2)", "4. Map returns new array", "5. Return it"],
        "function solve(arr) {\n  return arr.map(n => n * 2);\n}"
    ),
    jsLevel(5, "LEVEL 05 — COUNT LENGTH", "Count the characters!", "Write `solve(str)` → return the length of the string.",
        100, [{ input: ["hello"], expected: 5, label: "solve('hello') → 5" }, { input: [""], expected: 0, label: "solve('') → 0" }],
        "function solve(str) {\n  // Return length\n  \n}", ["1. Strings have .length", "2. str.length", "3. No parentheses!", "4. Return str.length", "5. That's it!"],
        "function solve(str) {\n  return str.length;\n}"
    ),
    jsLevel(6, "LEVEL 06 — FIND MAXIMUM", "Find the strongest signal!", "Write `solve(arr)` → return the largest number.",
        200, [{ input: [[1, 9, 3]], expected: 9, label: "solve([1,9,3]) → 9" }, { input: [[5]], expected: 5, label: "solve([5]) → 5" }],
        "function solve(arr) {\n  // Find max\n  \n}", ["1. Math.max() finds largest", "2. Use spread: ...arr", "3. Math.max(...arr)", "4. Similar to Math.min", "5. Return it"],
        "function solve(arr) {\n  return Math.max(...arr);\n}"
    ),
    jsLevel(7, "LEVEL 07 — TO UPPERCASE", "Shout the message!", "Write `solve(str)` → return string in all caps.",
        150, [{ input: ["hello"], expected: "HELLO", label: "solve('hello') → 'HELLO'" }, { input: ["abc"], expected: "ABC", label: "solve('abc') → 'ABC'" }],
        "function solve(str) {\n  // Uppercase\n  \n}", ["1. Use .toUpperCase()", "2. Note the capital C", "3. str.toUpperCase()", "4. Returns new string", "5. Return it"],
        "function solve(str) {\n  return str.toUpperCase();\n}"
    ),
    jsLevel(8, "LEVEL 08 — FIRST ELEMENT", "Get the first key!", "Write `solve(arr)` → return the first element.",
        100, [{ input: [["a", "b", "c"]], expected: "a", label: "solve(['a','b','c']) → 'a'" }, { input: [[7]], expected: 7, label: "solve([7]) → 7" }],
        "function solve(arr) {\n  // Return first element\n  \n}", ["1. Arrays are 0-indexed", "2. First element: arr[0]", "3. That's index 0", "4. return arr[0]", "5. Simple!"],
        "function solve(arr) {\n  return arr[0];\n}"
    ),
    jsLevel(9, "LEVEL 09 — LAST ELEMENT", "Get the exit key!", "Write `solve(arr)` → return the last element.",
        150, [{ input: [["a", "b", "c"]], expected: "c", label: "solve(['a','b','c']) → 'c'" }, { input: [[1, 2, 3, 4, 5]], expected: 5, label: "solve([1,2,3,4,5]) → 5" }],
        "function solve(arr) {\n  // Return last element\n  \n}", ["1. arr.length gives size", "2. Last index: length - 1", "3. arr[arr.length - 1]", "4. Or use arr.at(-1)", "5. Return it"],
        "function solve(arr) {\n  return arr[arr.length - 1];\n}"
    ),
    jsLevel(10, "LEVEL 10 — REPEAT STRING", "Amplify the signal!", "Write `solve(str, n)` → return str repeated n times.",
        200, [{ input: ["ha", 3], expected: "hahaha", label: "solve('ha',3) → 'hahaha'" }, { input: ["x", 1], expected: "x", label: "solve('x',1) → 'x'" }],
        "function solve(str, n) {\n  // Repeat string n times\n  \n}", ["1. Use .repeat(n)", "2. str.repeat(n)", "3. Returns new string", "4. 'ab'.repeat(2) → 'abab'", "5. Return it"],
        "function solve(str, n) {\n  return str.repeat(n);\n}"
    ),
    jsLevel(11, "LEVEL 11 — ABSOLUTE VALUE", "Remove negative interference!", "Write `solve(n)` → return absolute value.",
        100, [{ input: [-5], expected: 5, label: "solve(-5) → 5" }, { input: [3], expected: 3, label: "solve(3) → 3" }, { input: [0], expected: 0, label: "solve(0) → 0" }],
        "function solve(n) {\n  // Absolute value\n  \n}", ["1. Math.abs() removes sign", "2. Math.abs(-5) → 5", "3. Math.abs(5) → 5", "4. return Math.abs(n)", "5. Works for all numbers"],
        "function solve(n) {\n  return Math.abs(n);\n}"
    ),
    jsLevel(12, "LEVEL 12 — ARRAY LENGTH", "Count the paths!", "Write `solve(arr)` → return how many elements.",
        100, [{ input: [[1, 2, 3]], expected: 3, label: "solve([1,2,3]) → 3" }, { input: [[]], expected: 0, label: "solve([]) → 0" }],
        "function solve(arr) {\n  // Return array length\n  \n}", ["1. Arrays have .length", "2. arr.length", "3. No parentheses", "4. Empty array → 0", "5. Return it"],
        "function solve(arr) {\n  return arr.length;\n}"
    ),
    jsLevel(13, "LEVEL 13 — JOIN ARRAY", "Merge the codes!", "Write `solve(arr)` → join array into string with '-'.",
        200, [{ input: [["a", "b", "c"]], expected: "a-b-c", label: "solve(['a','b','c']) → 'a-b-c'" }, { input: [["x"]], expected: "x", label: "solve(['x']) → 'x'" }],
        "function solve(arr) {\n  // Join with '-'\n  \n}", ["1. Use .join(separator)", "2. arr.join('-')", "3. '-' goes between elements", "4. Single element: no separator", "5. Return the result"],
        "function solve(arr) {\n  return arr.join('-');\n}"
    ),
    jsLevel(14, "LEVEL 14 — INCLUDES CHECK", "Search for the key!", "Write `solve(arr, val)` → return true if val is in arr.",
        200, [{ input: [[1, 2, 3], 2], expected: true, label: "solve([1,2,3], 2) → true" }, { input: [[1, 2, 3], 5], expected: false, label: "solve([1,2,3], 5) → false" }],
        "function solve(arr, val) {\n  // Check if val exists\n  \n}", ["1. Use .includes()", "2. arr.includes(val)", "3. Returns true/false", "4. Checks strict equality", "5. Return the result"],
        "function solve(arr, val) {\n  return arr.includes(val);\n}"
    ),
    jsLevel(15, "LEVEL 15 — MULTIPLY ALL", "Power up the grid!", "Write `solve(arr)` → return product of all numbers.",
        300, [{ input: [[1, 2, 3]], expected: 6, label: "solve([1,2,3]) → 6" }, { input: [[2, 5]], expected: 10, label: "solve([2,5]) → 10" }, { input: [[4]], expected: 4, label: "solve([4]) → 4" }],
        "function solve(arr) {\n  // Multiply all\n  \n}", ["1. Use .reduce()", "2. (product, n) => product * n", "3. Initial value: 1 (not 0!)", "4. arr.reduce((p,n)=>p*n, 1)", "5. Return the result"],
        "function solve(arr) {\n  return arr.reduce((p,n) => p*n, 1);\n}"
    ),
];

// ═══ CODEQUEST INTERMEDIATE (15 levels) ═══
export const cqIntermediateLevels: MultiLangLevel[] = [
    jsLevel(1, "LEVEL 01 — PALINDROME CHECK", "The gate opens for palindromes.", "Write `solve(str)` → true if palindrome.",
        200, [{ input: ["racecar"], expected: true, label: "solve('racecar') → true" }, { input: ["hello"], expected: false, label: "solve('hello') → false" }, { input: ["madam"], expected: true, label: "solve('madam') → true" }],
        "function solve(str) {\n  // Check palindrome\n  \n}", ["1. Reverse the string", "2. Compare to original", "3. str === reversed", "4. Use split/reverse/join", "5. Return boolean"],
        "function solve(str) {\n  return str === str.split('').reverse().join('');\n}"
    ),
    jsLevel(2, "LEVEL 02 — FILTER EVENS", "Only even codes unlock doors.", "Write `solve(arr)` → return only even numbers.",
        250, [{ input: [[1, 2, 3, 4, 5, 6]], expected: [2, 4, 6], label: "solve([1..6]) → [2,4,6]" }, { input: [[7, 8, 9]], expected: [8], label: "solve([7,8,9]) → [8]" }],
        "function solve(arr) {\n  // Filter evens\n  \n}", ["1. Use .filter()", "2. n % 2 === 0 means even", "3. arr.filter(n=>n%2===0)", "4. Filter returns new array", "5. Return it"],
        "function solve(arr) {\n  return arr.filter(n => n % 2 === 0);\n}"
    ),
    jsLevel(3, "LEVEL 03 — COUNT CHARS", "Count letter frequency.", "Write `solve(str)` → object counting each char.",
        300, [{ input: ["aab"], expected: { a: 2, b: 1 }, label: "solve('aab') → {a:2,b:1}" }, { input: ["aa"], expected: { a: 2 }, label: "solve('aa') → {a:2}" }],
        "function solve(str) {\n  // Count chars\n  \n}", ["1. Create counts = {}", "2. Loop: for(const c of str)", "3. counts[c] = (counts[c]||0)+1", "4. ||0 handles first time", "5. Return counts"],
        "function solve(str) {\n  const c={};\n  for(const ch of str) c[ch]=(c[ch]||0)+1;\n  return c;\n}"
    ),
    jsLevel(4, "LEVEL 04 — FLATTEN ARRAY", "Flatten the nested maze!", "Write `solve(arr)` → flatten nested arrays.",
        300, [{ input: [[[1, [2, 3], [4]]]], expected: [1, 2, 3, 4], label: "solve([1,[2,3],[4]]) → [1,2,3,4]" }],
        "function solve(arr) {\n  // Flatten\n  \n}", ["1. .flat() flattens one level", "2. .flat(Infinity) all levels", "3. arr.flat(Infinity)", "4. Returns new flat array", "5. Return it"],
        "function solve(arr) {\n  return arr.flat(Infinity);\n}"
    ),
    jsLevel(5, "LEVEL 05 — UNIQUE VALUES", "Remove duplicates!", "Write `solve(arr)` → only unique values.",
        300, [{ input: [[1, 2, 2, 3, 3]], expected: [1, 2, 3], label: "solve([1,2,2,3,3]) → [1,2,3]" }, { input: [["a", "b", "a"]], expected: ["a", "b"], label: "solve(['a','b','a']) → ['a','b']" }],
        "function solve(arr) {\n  // Remove duplicates\n  \n}", ["1. Set stores unique values", "2. new Set(arr)", "3. Spread back: [...set]", "4. [...new Set(arr)]", "5. Return it"],
        "function solve(arr) {\n  return [...new Set(arr)];\n}"
    ),
    jsLevel(6, "LEVEL 06 — SORT ASCENDING", "Order the sequence!", "Write `solve(arr)` → sort numbers ascending.",
        250, [{ input: [[3, 1, 2]], expected: [1, 2, 3], label: "solve([3,1,2]) → [1,2,3]" }, { input: [[5, 3, 8]], expected: [3, 5, 8], label: "solve([5,3,8]) → [3,5,8]" }],
        "function solve(arr) {\n  // Sort ascending\n  \n}", ["1. .sort() sorts strings!", "2. For numbers: (a,b)=>a-b", "3. arr.sort((a,b)=>a-b)", "4. Modifies original array", "5. Return arr"],
        "function solve(arr) {\n  return arr.sort((a,b) => a-b);\n}"
    ),
    jsLevel(7, "LEVEL 07 — CAPITALIZE WORDS", "Make each word important!", "Write `solve(str)` → capitalize first letter of each word.",
        350, [{ input: ["hello world"], expected: "Hello World", label: "solve('hello world') → 'Hello World'" }],
        "function solve(str) {\n  // Capitalize words\n  \n}", ["1. Split by space", "2. Map each word", "3. word[0].toUpperCase() + word.slice(1)", "4. Join with space", "5. Return result"],
        "function solve(str) {\n  return str.split(' ').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ');\n}"
    ),
    jsLevel(8, "LEVEL 08 — FIND INDEX", "Locate the target!", "Write `solve(arr, target)` → return index of target, -1 if not found.",
        250, [{ input: [[10, 20, 30], 20], expected: 1, label: "solve([10,20,30],20) → 1" }, { input: [[1, 2], 5], expected: -1, label: "solve([1,2],5) → -1" }],
        "function solve(arr, target) {\n  // Find index\n  \n}", ["1. Use .indexOf()", "2. Returns -1 if not found", "3. arr.indexOf(target)", "4. First occurrence only", "5. Return it"],
        "function solve(arr, target) {\n  return arr.indexOf(target);\n}"
    ),
    jsLevel(9, "LEVEL 09 — COUNT VOWELS", "Find the resonance!", "Write `solve(str)` → count vowels (aeiou).",
        300, [{ input: ["hello"], expected: 2, label: "solve('hello') → 2" }, { input: ["xyz"], expected: 0, label: "solve('xyz') → 0" }],
        "function solve(str) {\n  // Count vowels\n  \n}", ["1. Define vowels: 'aeiou'", "2. Loop through str", "3. Check if char is vowel", "4. Use .includes()", "5. Count matches"],
        "function solve(str) {\n  return [...str].filter(c=>'aeiou'.includes(c.toLowerCase())).length;\n}"
    ),
    jsLevel(10, "LEVEL 10 — CHUNK ARRAY", "Split into groups!", "Write `solve(arr, size)` → split into chunks of given size.",
        400, [{ input: [[1, 2, 3, 4, 5], 2], expected: [[1, 2], [3, 4], [5]], label: "solve([1..5],2) → [[1,2],[3,4],[5]]" }],
        "function solve(arr, size) {\n  // Chunk array\n  \n}", ["1. Use a loop", "2. .slice(i, i+size)", "3. Step by size", "4. Push each chunk to result", "5. Return chunks array"],
        "function solve(arr, size) {\n  const r=[];\n  for(let i=0;i<arr.length;i+=size) r.push(arr.slice(i,i+size));\n  return r;\n}"
    ),
    jsLevel(11, "LEVEL 11 — SUM OF DIGITS", "Compress the code!", "Write `solve(n)` → sum of all digits.",
        300, [{ input: [123], expected: 6, label: "solve(123) → 6" }, { input: [9], expected: 9, label: "solve(9) → 9" }],
        "function solve(n) {\n  // Sum digits\n  \n}", ["1. Convert to string", "2. Split into chars", "3. Convert each to number", "4. Sum them up", "5. String(n).split('')"],
        "function solve(n) {\n  return String(n).split('').reduce((s,d)=>s+Number(d),0);\n}"
    ),
    jsLevel(12, "LEVEL 12 — TITLE CASE", "Format the intel!", "Write `solve(str)` → first letter uppercase, rest lowercase.",
        250, [{ input: ["hELLO"], expected: "Hello", label: "solve('hELLO') → 'Hello'" }, { input: ["abc"], expected: "Abc", label: "solve('abc') → 'Abc'" }],
        "function solve(str) {\n  // Title case\n  \n}", ["1. First char: str[0].toUpperCase()", "2. Rest: str.slice(1).toLowerCase()", "3. Combine them", "4. Handle empty string", "5. Return result"],
        "function solve(str) {\n  return str[0].toUpperCase() + str.slice(1).toLowerCase();\n}"
    ),
    jsLevel(13, "LEVEL 13 — REMOVE FALSY", "Clean the data!", "Write `solve(arr)` → remove all falsy values.",
        300, [{ input: [[0, 1, false, 2, "", 3]], expected: [1, 2, 3], label: "solve([0,1,false,2,'',3]) → [1,2,3]" }],
        "function solve(arr) {\n  // Remove falsy\n  \n}", ["1. Falsy: 0, false, '', null, undefined, NaN", "2. Use .filter(Boolean)", "3. Boolean converts to true/false", "4. arr.filter(Boolean)", "5. Return it"],
        "function solve(arr) {\n  return arr.filter(Boolean);\n}"
    ),
    jsLevel(14, "LEVEL 14 — ZIP ARRAYS", "Merge two streams!", "Write `solve(a, b)` → pair elements: [[a[0],b[0]], ...].",
        400, [{ input: [[1, 2, 3], ["a", "b", "c"]], expected: [[1, "a"], [2, "b"], [3, "c"]], label: "solve([1,2,3],['a','b','c'])" }],
        "function solve(a, b) {\n  // Zip arrays\n  \n}", ["1. Use .map() on one array", "2. a.map((v, i) => [v, b[i]])", "3. i is the index", "4. Pair elements by index", "5. Return result"],
        "function solve(a, b) {\n  return a.map((v,i) => [v, b[i]]);\n}"
    ),
    jsLevel(15, "LEVEL 15 — GROUP BY PARITY", "Classify the codes!", "Write `solve(arr)` → {even: [...], odd: [...]}.",
        450, [{ input: [[1, 2, 3, 4]], expected: { even: [2, 4], odd: [1, 3] }, label: "solve([1,2,3,4]) → {even:[2,4],odd:[1,3]}" }],
        "function solve(arr) {\n  // Group by even/odd\n  \n}", ["1. Create {even:[], odd:[]}", "2. Loop through arr", "3. n%2===0 ? even : odd", "4. Push to appropriate array", "5. Return the object"],
        "function solve(arr) {\n  return {even: arr.filter(n=>n%2===0), odd: arr.filter(n=>n%2!==0)};\n}"
    ),
];

// ═══ CODEQUEST PRO (15 levels) ═══
export const cqProLevels: MultiLangLevel[] = [
    jsLevel(1, "LEVEL 01 — PRIME CHECK", "Only primes open the vault.", "Write `solve(n)` → true if n is prime.",
        250, [{ input: [7], expected: true, label: "solve(7) → true" }, { input: [4], expected: false, label: "solve(4) → false" }, { input: [2], expected: true, label: "solve(2) → true" }],
        "function solve(n) {\n  // Prime check\n  \n}", ["1. n < 2 → false", "2. Loop from 2 to √n", "3. If n % i === 0 → false", "4. Use i*i <= n", "5. After loop → true"],
        "function solve(n) {\n  if(n<2)return false;\n  for(let i=2;i*i<=n;i++)if(n%i===0)return false;\n  return true;\n}"
    ),
    jsLevel(2, "LEVEL 02 — SECOND LARGEST", "Find the backup route.", "Write `solve(arr)` → second largest number.",
        300, [{ input: [[5, 3, 8, 1, 9]], expected: 8, label: "solve([5,3,8,1,9]) → 8" }, { input: [[1, 2, 3]], expected: 2, label: "solve([1,2,3]) → 2" }],
        "function solve(arr) {\n  // Second largest\n  \n}", ["1. Remove duplicates", "2. Sort descending", "3. Return index 1", "4. [...new Set(arr)].sort()", "5. (a,b)=>b-a"],
        "function solve(arr) {\n  return [...new Set(arr)].sort((a,b)=>b-a)[1];\n}"
    ),
    jsLevel(3, "LEVEL 03 — FIBONACCI", "Generate the sequence!", "Write `solve(n)` → nth Fibonacci number (0-indexed).",
        350, [{ input: [0], expected: 0, label: "solve(0) → 0" }, { input: [1], expected: 1, label: "solve(1) → 1" }, { input: [6], expected: 8, label: "solve(6) → 8" }],
        "function solve(n) {\n  // Nth Fibonacci\n  \n}", ["1. F(0)=0, F(1)=1", "2. F(n) = F(n-1)+F(n-2)", "3. Use loop, not recursion", "4. Track prev two values", "5. Swap each iteration"],
        "function solve(n) {\n  let a=0,b=1;\n  for(let i=0;i<n;i++){[a,b]=[b,a+b];}\n  return a;\n}"
    ),
    jsLevel(4, "LEVEL 04 — ANAGRAM CHECK", "Are these the same code?", "Write `solve(a, b)` → true if anagrams.",
        350, [{ input: ["listen", "silent"], expected: true, label: "solve('listen','silent') → true" }, { input: ["hello", "world"], expected: false, label: "solve('hello','world') → false" }],
        "function solve(a, b) {\n  // Anagram check\n  \n}", ["1. Sort both strings", "2. Compare sorted versions", "3. split→sort→join", "4. Anagrams have same letters", "5. Return comparison"],
        "function solve(a, b) {\n  const s=s=>s.split('').sort().join('');\n  return s(a)===s(b);\n}"
    ),
    jsLevel(5, "LEVEL 05 — FACTORIAL", "Calculate the permutations!", "Write `solve(n)` → n! (factorial).",
        300, [{ input: [5], expected: 120, label: "solve(5) → 120" }, { input: [0], expected: 1, label: "solve(0) → 1" }, { input: [1], expected: 1, label: "solve(1) → 1" }],
        "function solve(n) {\n  // Factorial\n  \n}", ["1. 0! = 1 by definition", "2. n! = n × (n-1)!", "3. Use a loop", "4. Start result = 1", "5. Multiply: result *= i"],
        "function solve(n) {\n  let r=1;\n  for(let i=2;i<=n;i++)r*=i;\n  return r;\n}"
    ),
    jsLevel(6, "LEVEL 06 — POWER OF TWO", "Binary gate check!", "Write `solve(n)` → true if n is a power of 2.",
        300, [{ input: [8], expected: true, label: "solve(8) → true" }, { input: [6], expected: false, label: "solve(6) → false" }, { input: [1], expected: true, label: "solve(1) → true" }],
        "function solve(n) {\n  // Power of 2?\n  \n}", ["1. Powers of 2: 1,2,4,8,16...", "2. Bit trick: n & (n-1) === 0", "3. Must be positive", "4. n > 0 && (n&(n-1))===0", "5. Return boolean"],
        "function solve(n) {\n  return n > 0 && (n & (n-1)) === 0;\n}"
    ),
    jsLevel(7, "LEVEL 07 — LONGEST WORD", "Find the dominant signal!", "Write `solve(str)` → length of longest word.",
        350, [{ input: ["hello beautiful world"], expected: 9, label: "solve('hello beautiful world') → 9" }],
        "function solve(str) {\n  // Longest word length\n  \n}", ["1. Split by space", "2. Map to lengths", "3. Find max", "4. Math.max(...lengths)", "5. Return it"],
        "function solve(str) {\n  return Math.max(...str.split(' ').map(w=>w.length));\n}"
    ),
    jsLevel(8, "LEVEL 08 — ROTATE ARRAY", "Shift the sequence!", "Write `solve(arr, k)` → rotate array right by k positions.",
        400, [{ input: [[1, 2, 3, 4, 5], 2], expected: [4, 5, 1, 2, 3], label: "solve([1..5],2) → [4,5,1,2,3]" }],
        "function solve(arr, k) {\n  // Rotate right by k\n  \n}", ["1. k = k % arr.length", "2. Slice last k elements", "3. Concat with remaining", "4. arr.slice(-k).concat(arr.slice(0,-k))", "5. Handle k=0"],
        "function solve(arr, k) {\n  k=k%arr.length;\n  return arr.slice(-k).concat(arr.slice(0,-k));\n}"
    ),
    jsLevel(9, "LEVEL 09 — MISSING NUMBER", "Find the gap!", "Write `solve(arr)` → find missing number from 0 to n.",
        400, [{ input: [[3, 0, 1]], expected: 2, label: "solve([3,0,1]) → 2" }, { input: [[0, 1]], expected: 2, label: "solve([0,1]) → 2" }],
        "function solve(arr) {\n  // Missing number\n  \n}", ["1. Expected sum: n*(n+1)/2", "2. n = arr.length", "3. Actual sum: reduce", "4. Missing = expected - actual", "5. Return difference"],
        "function solve(arr) {\n  const n=arr.length;\n  return n*(n+1)/2-arr.reduce((s,v)=>s+v,0);\n}"
    ),
    jsLevel(10, "LEVEL 10 — INTERSECTION", "Find common elements!", "Write `solve(a, b)` → elements in both arrays.",
        400, [{ input: [[1, 2, 3], [2, 3, 4]], expected: [2, 3], label: "solve([1,2,3],[2,3,4]) → [2,3]" }],
        "function solve(a, b) {\n  // Intersection\n  \n}", ["1. Filter a by what's in b", "2. a.filter(v=>b.includes(v))", "3. Or use Set for O(n)", "4. new Set(b)", "5. Return filtered"],
        "function solve(a, b) {\n  const s=new Set(b);\n  return a.filter(v=>s.has(v));\n}"
    ),
    jsLevel(11, "LEVEL 11 — DEEP CLONE", "Copy without reference!", "Write `solve(obj)` → deep copy of object.",
        350, [{ input: [{ a: 1, b: { c: 2 } }], expected: { a: 1, b: { c: 2 } }, label: "solve({a:1,b:{c:2}})" }],
        "function solve(obj) {\n  // Deep clone\n  \n}", ["1. JSON.stringify converts to string", "2. JSON.parse converts back", "3. Creates new object", "4. No shared references", "5. Return parsed"],
        "function solve(obj) {\n  return JSON.parse(JSON.stringify(obj));\n}"
    ),
    jsLevel(12, "LEVEL 12 — DEBOUNCE COUNT", "Count unique consecutive!", "Write `solve(arr)` → count of elements different from previous.",
        400, [{ input: [[1, 1, 2, 2, 3]], expected: 3, label: "solve([1,1,2,2,3]) → 3" }, { input: [[1, 1, 1]], expected: 1, label: "solve([1,1,1]) → 1" }],
        "function solve(arr) {\n  // Count unique consecutive\n  \n}", ["1. Filter where arr[i]!==arr[i-1]", "2. First element always counts", "3. Or use reduce", "4. Track previous value", "5. Return count"],
        "function solve(arr) {\n  return arr.filter((v,i)=>i===0||v!==arr[i-1]).length;\n}"
    ),
    jsLevel(13, "LEVEL 13 — MATRIX TRANSPOSE", "Flip the grid!", "Write `solve(matrix)` → transpose rows↔columns.",
        450, [{ input: [[[1, 2], [3, 4]]], expected: [[1, 3], [2, 4]], label: "solve([[1,2],[3,4]]) → [[1,3],[2,4]]" }],
        "function solve(m) {\n  // Transpose\n  \n}", ["1. Swap rows and columns", "2. m[0].map((_, i) => ...)", "3. m.map(row => row[i])", "4. Each column becomes row", "5. Return new matrix"],
        "function solve(m) {\n  return m[0].map((_,i)=>m.map(r=>r[i]));\n}"
    ),
    jsLevel(14, "LEVEL 14 — ROMAN NUMERALS", "Decode the ancient code!", "Write `solve(n)` → convert number to Roman numeral string.",
        500, [{ input: [3], expected: "III", label: "solve(3) → 'III'" }, { input: [4], expected: "IV", label: "solve(4) → 'IV'" }, { input: [9], expected: "IX", label: "solve(9) → 'IX'" }],
        "function solve(n) {\n  // To Roman numeral\n  \n}", ["1. Map values: [1000,900,500...]", "2. Map symbols: ['M','CM','D'...]", "3. Loop: while n >= val", "4. Append symbol, subtract val", "5. Return string"],
        "function solve(n) {\n  const v=[1000,900,500,400,100,90,50,40,10,9,5,4,1];\n  const s=['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];\n  let r='';\n  for(let i=0;i<v.length;i++)while(n>=v[i]){r+=s[i];n-=v[i];}\n  return r;\n}"
    ),
    jsLevel(15, "LEVEL 15 — FLATTEN OBJECT", "Decode nested intel!", "Write `solve(obj)` → flatten nested object with dot notation keys.",
        500, [{ input: [{ a: 1, b: { c: 2 } }], expected: { "a": 1, "b.c": 2 }, label: "solve({a:1,b:{c:2}}) → {'a':1,'b.c':2}" }],
        "function solve(obj) {\n  // Flatten object\n  \n}", ["1. Recursive approach", "2. Check if value is object", "3. Prepend parent key with '.'", "4. Use Object.entries()", "5. Merge all results"],
        "function solve(obj,pre='') {\n  return Object.entries(obj).reduce((r,[k,v])=>{\n    const key=pre?pre+'.'+k:k;\n    return typeof v==='object'&&v!==null?{...r,...solve(v,key)}:{...r,[key]:v};\n  },{});\n}"
    ),
];
