#!/usr/bin/env node

/**
 * cli.ts — The `bol` command-line interface.
 *
 * This file handles ONLY argument parsing and user-facing output.
 * All interpreter logic lives in main.ts → Lexer → Parser → Interpreter.
 *
 * Usage:
 *   bol run <file.bol>    — execute a Bol program
 *   bol --version         — print version
 *   bol --help            — print usage
 */

import * as fs from "fs";
import * as path from "path";
import { runFile } from "./main.js";

// ── Version & name pulled from package.json ───────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("../package.json") as { name: string; version: string; description: string };

// ── ANSI colour helpers (no external deps) ────────────────────────────────────
const c = {
    bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
    red: (s: string) => `\x1b[31m${s}\x1b[0m`,
    yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
    cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
    green: (s: string) => `\x1b[32m${s}\x1b[0m`,
    dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
};

// ── Help text ─────────────────────────────────────────────────────────────────
function printHelp(): void {
    console.log(`
${c.bold(c.cyan("bol"))} — ${pkg.description}

${c.bold("USAGE")}
  ${c.cyan("bol")} ${c.yellow("run")} ${c.dim("<file.bol>")}    Execute a Bol program
  ${c.cyan("bol")} ${c.yellow("--version")}           Print version number
  ${c.cyan("bol")} ${c.yellow("--help")}              Show this help

${c.bold("EXAMPLES")}
  ${c.dim("$")} bol run examples/recursive.bol
  ${c.dim("$")} bol run examples/maza.bol

${c.bold("KEYWORDS (quick reference)")}
  ${c.green("bola saheb")} / ${c.green("yeto saheb")}   program start / end
  ${c.green("he ghe")} x = 10            declare variable
  ${c.green("he bol")} x                 print
  ${c.green("jr")} / ${c.green("nahitr")}               if / else
  ${c.green("joparyant")}                while loop
  ${c.green("karya")} f(a, b) { … }      function definition
  ${c.green("parat")} value              return
`);
}

// ── Error helper ──────────────────────────────────────────────────────────────
function die(message: string, hint?: string): never {
    console.error(`\n${c.red("✗ Chuk:")} ${message}`);
    if (hint) console.error(`  ${c.dim("→")} ${hint}`);
    console.error();
    process.exit(1);
}

// ── Argument parsing ──────────────────────────────────────────────────────────
const args = process.argv.slice(2);

if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    printHelp();
    process.exit(0);
}

if (args[0] === "--version" || args[0] === "-v") {
    console.log(`${pkg.name} ${c.bold(pkg.version)}`);
    process.exit(0);
}

// ── `bol run <file>` ─────────────────────────────────────────────────────────
if (args[0] !== "run") {
    die(
        `Anivadit command: "${args[0]}"`,
        `Valid command: ${c.cyan("bol run <file.bol>")}`
    );
}

const filePath = args[1];

if (!filePath) {
    die(
        "File path dila nahi",
        `Vapar: ${c.cyan("bol run <file.bol>")}`
    );
}

if (!filePath.endsWith(".bol")) {
    die(
        `File extension chukichi: "${path.basename(filePath)}"`,
        `Bol programs la ".bol" extension havi, e.g. ${c.cyan("maza.bol")}`
    );
}

const absolutePath = path.resolve(filePath);

if (!fs.existsSync(absolutePath)) {
    die(
        `File saapadla nahi: "${absolutePath}"`,
        `File ahe ka? Path barobar aahe ka?`
    );
}

// ── Run ───────────────────────────────────────────────────────────────────────
try {
    runFile(absolutePath);
} catch (err: unknown) {
    const e = err as Error;
    console.error(`\n${c.red("✗")} ${c.bold(e.name)}: ${e.message}\n`);
    process.exit(1);
}
