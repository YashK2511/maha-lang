import * as fs from "fs";
import * as path from "path";
import { Lexer } from "./lexer/Lexer.js";
import { Parser } from "./parser/Parser.js";
import { Interpreter } from "./interpreter/Interpreter.js";

// ─────────────────────────────────────────────────────────────────────────────
// main.ts — CLI entry point for Bol.
//
// Usage:
//   npx tsx src/main.ts <file.bol>
//
// Pipeline:
//   source file → Lexer → token[] → Parser → Program AST → Interpreter → stdout
// ─────────────────────────────────────────────────────────────────────────────

function main(): void {
    const filePath = process.argv[2];

    if (!filePath) {
        console.error("Vapar: npx tsx src/main.ts <file.bol>");
        process.exit(1);
    }

    const absolutePath = path.resolve(filePath);

    if (!fs.existsSync(absolutePath)) {
        console.error(`Chuk: File saapadla nahi — "${absolutePath}"`);
        process.exit(1);
    }

    const source = fs.readFileSync(absolutePath, "utf-8");

    try {
        // Step 1 — Tokenize
        const lexer = new Lexer(source);
        const tokens = lexer.tokenize();

        // Step 2 — Parse
        const parser = new Parser(tokens);
        const program = parser.parse();

        // Step 3 — Interpret
        const interpreter = new Interpreter();
        interpreter.run(program);

    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error(`\n❌ ${err.name}: ${err.message}\n`);
        } else {
            console.error("❌ Anolkhit error:", err);
        }
        process.exit(1);
    }
}

main();
