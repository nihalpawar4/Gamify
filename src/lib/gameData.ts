import type { Language } from "@/components/portfolio/LanguageSelector";
import { cqBeginnerLevels, cqIntermediateLevels, cqProLevels, type MultiLangLevel } from "./levelGenerator";

// ─── Types ───────────────────────────────────────────
export type Difficulty = "beginner" | "intermediate" | "pro";

export interface GameLevel {
    id: number;
    title: string;
    briefing: string;
    description: string;
    starterCode?: string;
    buggyCode?: string;
    hints: string[];
    solution: string;
    testCases: { input: unknown[]; expected: unknown; label: string }[];
    points: number;
}

// ─── Build per-language levels from MultiLangLevel ───
function buildLevel(ml: MultiLangLevel, lang: Language): GameLevel {
    const l = ml.langs[lang];
    return {
        id: ml.id,
        title: ml.title,
        briefing: ml.briefing,
        description: ml.description,
        starterCode: l.starterCode,
        hints: l.hints,
        solution: l.solution,
        testCases: ml.testCases,
        points: ml.points,
    };
}

function buildLevels(levels: MultiLangLevel[], lang: Language): GameLevel[] {
    return levels.map((ml) => buildLevel(ml, lang));
}

// ─── CodeQuest: dynamic per-language levels ──────────
export function getCodequestLevels(lang: Language): Record<Difficulty, GameLevel[]> {
    return {
        beginner: buildLevels(cqBeginnerLevels, lang),
        intermediate: buildLevels(cqIntermediateLevels, lang),
        pro: buildLevels(cqProLevels, lang),
    };
}

// ─── BugBlaster (JS only, 15 levels per diff) ────────
const bbBeginner: GameLevel[] = [
    { id: 1, title: "BUG 01 — MISSING RETURN", briefing: "Function runs but returns nothing!", description: "Fix the missing return statement.", buggyCode: "function solve(n) {\n  n * 2;\n}", hints: ["1. When you compute a value, you need to return it", "2. Use the return keyword", "3. return n * 2", "4. Without return, function returns undefined", "5. Add return before n * 2"], solution: "function solve(n) {\n  return n * 2;\n}", testCases: [{ input: [5], expected: 10, label: "solve(5) → 10" }, { input: [0], expected: 0, label: "solve(0) → 0" }], points: 100 },
    { id: 2, title: "BUG 02 — WRONG OPERATOR", briefing: "Sum function is multiplying!", description: "Fix the arithmetic operator.", buggyCode: "function solve(a, b) {\n  return a * b;\n}", hints: ["1. We want addition, not multiplication", "2. + is add, * is multiply", "3. Change * to +", "4. return a + b", "5. Simple operator swap"], solution: "function solve(a, b) {\n  return a + b;\n}", testCases: [{ input: [3, 4], expected: 7, label: "solve(3,4) → 7" }, { input: [0, 0], expected: 0, label: "solve(0,0) → 0" }], points: 100 },
    { id: 3, title: "BUG 03 — OFF BY ONE", briefing: "Array count is wrong!", description: "Fix the off-by-one error.", buggyCode: "function solve(arr) {\n  return arr.length - 1;\n}", hints: ["1. No need to subtract 1", "2. .length already gives count", "3. Remove the - 1", "4. return arr.length", "5. Off-by-one is common!"], solution: "function solve(arr) {\n  return arr.length;\n}", testCases: [{ input: [[1, 2, 3]], expected: 3, label: "solve([1,2,3]) → 3" }], points: 100 },
    { id: 4, title: "BUG 04 — WRONG COMPARISON", briefing: "Max finder returns min!", description: "Fix the comparison operator.", buggyCode: "function solve(a, b) {\n  return a < b ? a : b;\n}", hints: ["1. Returns smaller, not larger", "2. Flip < to >", "3. Or swap a and b", "4. a > b ? a : b gives max", "5. Ternary: condition ? ifTrue : ifFalse"], solution: "function solve(a, b) {\n  return a > b ? a : b;\n}", testCases: [{ input: [3, 7], expected: 7, label: "solve(3,7) → 7" }, { input: [10, 2], expected: 10, label: "solve(10,2) → 10" }], points: 150 },
    { id: 5, title: "BUG 05 — WRONG CASE", briefing: "toLowerCase not working!", description: "Fix the method name.", buggyCode: "function solve(str) {\n  return str.tolowercase();\n}", hints: ["1. JavaScript is case-sensitive", "2. Method: toLowerCase()", "3. Capital L and C", "4. str.toLowerCase()", "5. Fix the casing"], solution: "function solve(str) {\n  return str.toLowerCase();\n}", testCases: [{ input: ["HELLO"], expected: "hello", label: "solve('HELLO') → 'hello'" }], points: 150 },
    { id: 6, title: "BUG 06 — MISSING PARENS", briefing: "Function not executing!", description: "Fix the function call syntax.", buggyCode: "function solve(str) {\n  return str.trim;\n}", hints: ["1. trim is a method", "2. Methods need ()", "3. str.trim()", "4. Without () returns reference", "5. Add parentheses"], solution: "function solve(str) {\n  return str.trim();\n}", testCases: [{ input: ["  hi  "], expected: "hi", label: "solve('  hi  ') → 'hi'" }], points: 150 },
    { id: 7, title: "BUG 07 — WRONG INDEX", briefing: "Getting wrong element!", description: "Fix the array index.", buggyCode: "function solve(arr) {\n  return arr[1];\n}", hints: ["1. Arrays are 0-indexed", "2. First element: arr[0]", "3. Not arr[1]", "4. arr[1] is the second", "5. Change 1 to 0"], solution: "function solve(arr) {\n  return arr[0];\n}", testCases: [{ input: [[10, 20, 30]], expected: 10, label: "solve([10,20,30]) → 10" }], points: 100 },
    { id: 8, title: "BUG 08 — EXTRA SEMICOLON", briefing: "If block not executing!", description: "Fix the extra semicolon after if.", buggyCode: "function solve(n) {\n  if (n > 0);\n    return 'positive';\n  return 'non-positive';\n}", hints: ["1. Semicolon after if() ends it", "2. Remove ; after if (n > 0)", "3. The block becomes standalone", "4. if (n > 0) return 'positive'", "5. ; makes if have empty body"], solution: "function solve(n) {\n  if (n > 0)\n    return 'positive';\n  return 'non-positive';\n}", testCases: [{ input: [5], expected: "positive", label: "solve(5) → 'positive'" }, { input: [-1], expected: "non-positive", label: "solve(-1) → 'non-positive'" }], points: 200 },
    { id: 9, title: "BUG 09 — = VS ===", briefing: "Comparison acting weird!", description: "Fix equality check.", buggyCode: "function solve(a, b) {\n  if (a = b) return true;\n  return false;\n}", hints: ["1. = is assignment, not comparison", "2. Use === for strict equality", "3. a = b assigns b to a", "4. a === b compares values", "5. Change = to ==="], solution: "function solve(a, b) {\n  if (a === b) return true;\n  return false;\n}", testCases: [{ input: [1, 1], expected: true, label: "solve(1,1) → true" }, { input: [1, 2], expected: false, label: "solve(1,2) → false" }], points: 200 },
    { id: 10, title: "BUG 10 — WRONG INITIAL", briefing: "Product always 0!", description: "Fix the initial accumulator value.", buggyCode: "function solve(arr) {\n  let prod = 0;\n  for (const n of arr) prod *= n;\n  return prod;\n}", hints: ["1. 0 * anything = 0", "2. Product needs initial 1", "3. Change prod = 0 to prod = 1", "4. Sum uses 0, product uses 1", "5. let prod = 1"], solution: "function solve(arr) {\n  let prod = 1;\n  for (const n of arr) prod *= n;\n  return prod;\n}", testCases: [{ input: [[2, 3, 4]], expected: 24, label: "solve([2,3,4]) → 24" }], points: 200 },
    { id: 11, title: "BUG 11 — INFINITE LOOP", briefing: "Code never stops!", description: "Fix the loop counter.", buggyCode: "function solve(n) {\n  let sum = 0;\n  for (let i = 1; i <= n; i--) sum += i;\n  return sum;\n}", hints: ["1. i-- decrements", "2. i will never reach n", "3. Change i-- to i++", "4. We want to count up", "5. i++ increments"], solution: "function solve(n) {\n  let sum = 0;\n  for (let i = 1; i <= n; i++) sum += i;\n  return sum;\n}", testCases: [{ input: [3], expected: 6, label: "solve(3) → 6" }], points: 200 },
    { id: 12, title: "BUG 12 — SCOPE ISSUE", briefing: "Variable undefined!", description: "Fix the variable scope.", buggyCode: "function solve(n) {\n  if (n > 0) {\n    let result = n * 2;\n  }\n  return result;\n}", hints: ["1. let is block-scoped", "2. result only exists inside if", "3. Declare result outside if", "4. let result; before if", "5. Then assign inside if"], solution: "function solve(n) {\n  let result = 0;\n  if (n > 0) {\n    result = n * 2;\n  }\n  return result;\n}", testCases: [{ input: [5], expected: 10, label: "solve(5) → 10" }, { input: [-1], expected: 0, label: "solve(-1) → 0" }], points: 250 },
    { id: 13, title: "BUG 13 — STRING CONCAT", briefing: "Adding strings not numbers!", description: "Fix the type coercion bug.", buggyCode: "function solve(a, b) {\n  return a + b;\n}", hints: ["1. If a or b is string, + concatenates", "2. Use Number() to convert", "3. Number(a) + Number(b)", "4. Or use parseInt/parseFloat", "5. Type matters in JS"], solution: "function solve(a, b) {\n  return Number(a) + Number(b);\n}", testCases: [{ input: ["5", "3"], expected: 8, label: "solve('5','3') → 8" }, { input: [2, 3], expected: 5, label: "solve(2,3) → 5" }], points: 250 },
    { id: 14, title: "BUG 14 — ARRAY MUTATE", briefing: "Original array changing!", description: "Fix the mutation bug.", buggyCode: "function solve(arr) {\n  const sorted = arr;\n  sorted.sort((a,b) => a-b);\n  return sorted[0];\n}", hints: ["1. arr assigned by reference", "2. sorted IS arr, same object", "3. Use [...arr] to copy", "4. const sorted = [...arr]", "5. Spread creates new array"], solution: "function solve(arr) {\n  const sorted = [...arr];\n  sorted.sort((a,b) => a-b);\n  return sorted[0];\n}", testCases: [{ input: [[3, 1, 2]], expected: 1, label: "solve([3,1,2]) → 1" }], points: 300 },
    { id: 15, title: "BUG 15 — ASYNC TRAP", briefing: "Fix the callback timing!", description: "Fix the return with map.", buggyCode: "function solve(arr) {\n  let result = [];\n  arr.forEach(n => {\n    if (n > 0) result.push(n);\n  });\n  return result;\n}", hints: ["1. Actually this works, but...", "2. forEach can't be stopped early", "3. Could use .filter() instead", "4. arr.filter(n => n > 0)", "5. More idiomatic JS"], solution: "function solve(arr) {\n  return arr.filter(n => n > 0);\n}", testCases: [{ input: [[-1, 2, -3, 4]], expected: [2, 4], label: "solve([-1,2,-3,4]) → [2,4]" }], points: 300 },
];

const bbIntermediate: GameLevel[] = bbBeginner.map((l, i) => ({
    ...l, id: i + 1,
    title: l.title.replace(/BUG \d+/, `BUG ${String(i + 1).padStart(2, '0')}`),
    points: l.points + 100,
    description: `[INTERMEDIATE] ${l.description}`,
}));

const bbPro: GameLevel[] = bbBeginner.map((l, i) => ({
    ...l, id: i + 1,
    title: l.title.replace(/BUG \d+/, `BUG ${String(i + 1).padStart(2, '0')}`),
    points: l.points + 200,
    description: `[PRO] ${l.description}`,
}));

export const bugblasterLevels: Record<Difficulty, GameLevel[]> = {
    beginner: bbBeginner,
    intermediate: bbIntermediate,
    pro: bbPro,
};

// ─── All Games Metadata ──────────────────────────────
export const allGames = [
    { slug: "codequest", title: "CODEQUEST: ESCAPE THE MAZE", mode: "write" as const, badge: "C / C++ / JAVA / JS", description: "15 levels × 3 difficulties × 4 languages", tags: ["C", "C++", "JAVA", "JS", "15 LEVELS"], playable: true, difficulty: "Beginner" as const },
    { slug: "bugblaster", title: "BUGBLASTER: FIX THE CODE", mode: "debug" as const, badge: "DEBUGGING", description: "15 levels × 3 difficulties — find and fix bugs", tags: ["DEBUGGING", "JS", "FUN", "15 LEVELS"], playable: true, difficulty: "Beginner" as const },
    { slug: "loopmaster", title: "LOOPMASTER: ITERATE & CONQUER", mode: "write" as const, badge: "LOOPS", description: "Master for/while loops, nested loops & iterations", tags: ["LOOPS", "MULTI-LANG", "BEGINNER"], playable: true, difficulty: "Beginner" as const },
    { slug: "arrayarena", title: "ARRAYARENA: DATA BATTLES", mode: "write" as const, badge: "ARRAYS", description: "Array manipulation — sorting, filtering, slicing", tags: ["ARRAYS", "MULTI-LANG", "INTERMEDIATE"], playable: true, difficulty: "Intermediate" as const },
    { slug: "functionforge", title: "FUNCTIONFORGE: BUILD & TEST", mode: "write" as const, badge: "FUNCTIONS", description: "Build custom functions, closures & callbacks", tags: ["FUNCTIONS", "MULTI-LANG", "INTERMEDIATE"], playable: true, difficulty: "Intermediate" as const },
    { slug: "recursionrealm", title: "RECURSIONREALM: INFINITE DEPTH", mode: "write" as const, badge: "COMING SOON", description: "Explore recursion, memoization & tree traversal", tags: ["RECURSION", "ALGORITHMS"], playable: false, difficulty: "Pro" as const },
    { slug: "datastructuredungeon", title: "DATASTRUCTURE DUNGEON", mode: "write" as const, badge: "COMING SOON", description: "Stacks, queues, linked lists, hash maps & trees", tags: ["DATA STRUCTURES", "PRO"], playable: false, difficulty: "Pro" as const },
    { slug: "algorithmquest", title: "ALGORITHMQUEST: OPTIMIZE", mode: "write" as const, badge: "COMING SOON", description: "Sorting algorithms, graph search, dynamic programming", tags: ["ALGORITHMS", "COMPETITIVE"], playable: false, difficulty: "Pro" as const },
    { slug: "aicodearena", title: "AI CODE ARENA: BATTLE BOTS", mode: "write" as const, badge: "AI POWERED", description: "Write AI algorithms to battle other players' bots", tags: ["AI", "PVP", "NEXT-GEN"], playable: false, difficulty: "Pro" as const },
];

