import { Lexer } from "./core/lexer/Lexer";
import { Parser } from "./core/parser/Parser";
import { Interpreter } from "./core/interpreter/Interpreter";

export interface RunResult {
    lines: string[];
    error: string | null;
}

export function runBol(source: string): RunResult {
    const lines: string[] = [];
    try {
        const tokens = new Lexer(source).tokenize();
        const parser = new Parser(tokens);
        const program = parser.parse();

        // Pass a callback to capture 'he bol' output
        const interpreter = new Interpreter((line: string) => {
            lines.push(line);
        });

        interpreter.run(program);
        return { lines, error: null };
    } catch (e: any) {
        console.error("Bol Execution Error:", e);
        return { lines, error: e.message || String(e) };
    }
}
