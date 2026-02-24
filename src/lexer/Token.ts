import { TokenKind } from "./TokenKind.js";

/**
 * Token — the smallest meaningful unit of source code.
 *
 * Every token carries:
 *   kind  → what category it belongs to (NUMBER, HE_GHE, …)
 *   value → the exact raw text from the source
 *   line  → 1-based line number for error messages
 */
export interface Token {
    kind: TokenKind;
    value: string;
    line: number;
}
