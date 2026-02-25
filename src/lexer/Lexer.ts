import { Token } from "./Token.js";
import { TokenKind } from "./TokenKind.js";

// ─────────────────────────────────────────────────────────────────────────────
// Lexer — converts raw source text into a flat stream of Tokens.
//
// Design choices:
//   • Regex-based:  Each token pattern is a RegExp anchored to the current
//     position (using the 'y' sticky flag). This avoids manual character
//     scanning for most tokens while keeping the code readable.
//
//   • Multi-word keyword detection:
//     Marathi keywords like "he ghe" and "bola saheb" are two words that
//     together form one token. After reading a word we immediately check if
//     the next non-space word extends it into a compound keyword.
//
//   • NEWLINE as delimiter:
//     Statements end at newlines, so we emit NEWLINE tokens so the parser
//     can use them as statement boundaries. Blank lines and comment lines
//     emit nothing.
// ─────────────────────────────────────────────────────────────────────────────

export class Lexer {
    private source: string;
    private pos: number = 0;   // current character index
    private line: number = 1;   // current 1-based line number
    private tokens: Token[] = [];

    constructor(source: string) {
        this.source = source;
    }

    // ── Public API ────────────────────────────────────────────────────────────

    /** Tokenize the entire source and return the flat token stream. */
    tokenize(): Token[] {
        while (this.pos < this.source.length) {
            this.readNext();
        }
        this.emit(TokenKind.EOF, "");
        return this.tokens;
    }

    // ── Core scanning loop ────────────────────────────────────────────────────

    private readNext(): void {
        const ch = this.source[this.pos];

        // ── Newline ───────────────────────────────────────────────────────────
        if (ch === "\n") {
            // Only emit NEWLINE if the last token wasn't already a NEWLINE or a
            // block-structure token — avoids noise from blank lines.
            const last = this.tokens[this.tokens.length - 1];
            if (last && last.kind !== TokenKind.NEWLINE) {
                this.emit(TokenKind.NEWLINE, "\\n");
            }
            this.pos++;
            this.line++;
            return;
        }

        // ── Whitespace (spaces and tabs — NOT newlines) ───────────────────────
        if (ch === " " || ch === "\t" || ch === "\r") {
            this.pos++;
            return;
        }

        // ── Comment: -- until end of line ─────────────────────────────────────
        if (this.source.startsWith("--", this.pos)) {
            while (this.pos < this.source.length && this.source[this.pos] !== "\n") {
                this.pos++;
            }
            return;
        }

        // ── String literal ────────────────────────────────────────────────────
        if (ch === '"') {
            this.readString();
            return;
        }

        // ── Number literal ────────────────────────────────────────────────────
        if (/[0-9]/.test(ch)) {
            this.readNumber();
            return;
        }

        // ── Word (keyword or identifier) ──────────────────────────────────────
        if (/[a-zA-Z_]/.test(ch)) {
            this.readWord();
            return;
        }

        // ── Operators & punctuation ───────────────────────────────────────────
        this.readSymbol();
    }

    // ── Token readers ─────────────────────────────────────────────────────────

    private readString(): void {
        const startLine = this.line;
        this.pos++; // skip opening "
        let value = "";

        while (this.pos < this.source.length && this.source[this.pos] !== '"') {
            if (this.source[this.pos] === "\n") {
                throw new LexerError(`Unterminated string on line ${startLine}`);
            }
            // Simple escape: \\n → actual newline
            if (this.source[this.pos] === "\\" && this.source[this.pos + 1] === "n") {
                value += "\n";
                this.pos += 2;
            } else {
                value += this.source[this.pos];
                this.pos++;
            }
        }

        if (this.pos >= this.source.length) {
            throw new LexerError(`Unterminated string starting on line ${startLine}`);
        }
        this.pos++; // skip closing "
        this.emit(TokenKind.STRING, value);
    }

    private readNumber(): void {
        const start = this.pos;
        while (this.pos < this.source.length && /[0-9]/.test(this.source[this.pos])) {
            this.pos++;
        }
        // Optional decimal part
        if (this.source[this.pos] === "." && /[0-9]/.test(this.source[this.pos + 1])) {
            this.pos++; // skip '.'
            while (this.pos < this.source.length && /[0-9]/.test(this.source[this.pos])) {
                this.pos++;
            }
        }
        this.emit(TokenKind.NUMBER, this.source.slice(start, this.pos));
    }

    private readWord(): void {
        const word = this.consumeWord();

        // ── Try to form a compound (two-word) keyword ─────────────────────────
        // Save position in case we need to backtrack.
        const savedPos = this.pos;
        const savedLine = this.line;

        // Skip spaces (but not newlines) to peek at the next word.
        while (this.pos < this.source.length &&
            (this.source[this.pos] === " " || this.source[this.pos] === "\t")) {
            this.pos++;
        }

        let nextWord = "";
        if (/[a-zA-Z_]/.test(this.source[this.pos] ?? "")) {
            const peekStart = this.pos;
            // Peek without consuming (read ahead, then decide)
            let peekPos = this.pos;
            while (peekPos < this.source.length && /[a-zA-Z0-9_]/.test(this.source[peekPos])) {
                peekPos++;
            }
            nextWord = this.source.slice(peekStart, peekPos);
        }

        const compound = `${word} ${nextWord}`.trim();

        // Check compound keyword table
        const compoundKind = COMPOUND_KEYWORDS[compound];
        if (compoundKind && nextWord !== "") {
            // Consume the second word too
            this.consumeWord();
            this.emit(compoundKind, compound);
            return;
        }

        // Not a compound keyword — restore position after the first word
        this.pos = savedPos;
        this.line = savedLine;

        // Check single-word keyword table
        const singleKind = SINGLE_KEYWORDS[word];
        if (singleKind) {
            this.emit(singleKind, word);
            return;
        }

        // It's a plain identifier
        this.emit(TokenKind.IDENTIFIER, word);
    }

    /** Consumes a [a-zA-Z_][a-zA-Z0-9_]* word and returns it. */
    private consumeWord(): string {
        const start = this.pos;
        while (this.pos < this.source.length && /[a-zA-Z0-9_]/.test(this.source[this.pos])) {
            this.pos++;
        }
        return this.source.slice(start, this.pos);
    }

    private readSymbol(): void {
        const ch = this.source[this.pos];

        // Two-character symbols first
        const two = this.source.slice(this.pos, this.pos + 2);
        if (two === "==") { this.pos += 2; this.emit(TokenKind.EQ_EQ, "=="); return; }
        if (two === "!=") { this.pos += 2; this.emit(TokenKind.BANG_EQ, "!="); return; }
        if (two === "<=") { this.pos += 2; this.emit(TokenKind.LT_EQ, "<="); return; }
        if (two === ">=") { this.pos += 2; this.emit(TokenKind.GT_EQ, ">="); return; }

        // Single-character symbols
        this.pos++;
        switch (ch) {
            case "+": this.emit(TokenKind.PLUS, "+"); break;
            case "-": this.emit(TokenKind.MINUS, "-"); break;
            case "*": this.emit(TokenKind.STAR, "*"); break;
            case "/": this.emit(TokenKind.SLASH, "/"); break;
            case "=": this.emit(TokenKind.ASSIGN, "="); break;
            case "(": this.emit(TokenKind.LPAREN, "("); break;
            case ")": this.emit(TokenKind.RPAREN, ")"); break;
            case "<": this.emit(TokenKind.LT, "<"); break;
            case ">": this.emit(TokenKind.GT, ">"); break;
            case "{": this.emit(TokenKind.LBRACE, "{"); break;
            case "}": this.emit(TokenKind.RBRACE, "}"); break;
            case ",": this.emit(TokenKind.COMMA, ","); break;
            default:
                throw new LexerError(
                    `[Line ${this.line}] Chuk: Anivadit character '${ch}' sapadla`
                );
        }
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private emit(kind: TokenKind, value: string): void {
        this.tokens.push({ kind, value, line: this.line });
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Keyword lookup tables
// Using plain objects for O(1) lookup and easy readability.
// ─────────────────────────────────────────────────────────────────────────────

const COMPOUND_KEYWORDS: Record<string, TokenKind> = {
    "bola saheb": TokenKind.BOLA_SAHEB,
    "yeto saheb": TokenKind.YETO_SAHEB,
    "he ghe": TokenKind.HE_GHE,
    "he bol": TokenKind.HE_BOL,
    "nahitr jr": TokenKind.NAHITR_JR,   // must come before "nahitr" alone
    "pudhe ja": TokenKind.PUDHE_JA,     // continue
};

const SINGLE_KEYWORDS: Record<string, TokenKind> = {
    "jr": TokenKind.JR,
    "nahitr": TokenKind.NAHITR,
    "joparyant": TokenKind.JOPARYANT,
    "thamb": TokenKind.THAMB,
    "karya": TokenKind.KARYA,         // function   [Phase 3]
    "parat": TokenKind.PARAT,         // return     [Phase 3]
    "shunya": TokenKind.SHUNYA,       // null       [Phase 3]
    "barobr": TokenKind.KHARA,
    "chuk": TokenKind.KHOTA,
    "ani": TokenKind.ANI,
    "kinva": TokenKind.KINVA,
    "nahi": TokenKind.NAHI,
};

// ─────────────────────────────────────────────────────────────────────────────
// Custom error class — keeps error messages clearly scoped to the Lexer.
// ─────────────────────────────────────────────────────────────────────────────
export class LexerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "LexerError";
    }
}
