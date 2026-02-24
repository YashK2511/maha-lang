import * as fs from "fs";
import * as path from "path";
import { Lexer } from "./lexer/Lexer.js";
import { Parser } from "./parser/Parser.js";
import { Interpreter } from "./interpreter/Interpreter.js";

// ─────────────────────────────────────────────────────────────────────────────
// main.ts — interpreter engine for Bol.
//
// Pipeline:
//   source → Lexer → tokens → Parser → AST → Interpreter → stdout
//
// Exported:
//   runFile(filePath) — called by cli.ts; throws on error so the CLI
//                       can control how the error is displayed.
//
// Direct invocation (dev mode):
//   npx tsx src/main.ts <file.bol>
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Run a Bol source file.
 * @param filePath - absolute or relative path to a .bol file
 * Throws LexerError | ParseError | RuntimeError on failure.
 */
export function runFile(filePath: string): void {
    const absolutePath = path.resolve(filePath);
    const source = fs.readFileSync(absolutePath, "utf-8");

    const tokens = new Lexer(source).tokenize();
    const program = new Parser(tokens).parse();
    new Interpreter().run(program);
}

// ── Direct invocation guard (dev mode) ───────────────────────────────────────

if (require.main === module) {
    const filePath = process.argv[2];
    if (!filePath) {
        console.error("Vapar: npx tsx src/main.ts <file.bol>");
        process.exit(1);
    }
    if (!fs.existsSync(path.resolve(filePath))) {
        console.error(`Chuk: File saapadla nahi — "${path.resolve(filePath)}"`);
        process.exit(1);
    }
    try {
        runFile(filePath);
    } catch (err: unknown) {
        console.error(`\n❌ ${(err as Error).name}: ${(err as Error).message}\n`);
        process.exit(1);
    }
}
