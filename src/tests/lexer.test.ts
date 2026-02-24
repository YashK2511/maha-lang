/**
 * Lexer unit tests — Phase 1 + Phase 2 + Phase 3.
 * Run with:  npx tsx src/tests/lexer.test.ts
 */

import * as assert from "assert";
import { Lexer } from "../lexer/Lexer.js";
import { TokenKind } from "../lexer/TokenKind.js";
import { Token } from "../lexer/Token.js";

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void): void {
    try {
        fn();
        console.log(`  ✅  ${name}`);
        passed++;
    } catch (e: any) {
        console.error(`  ❌  ${name}`);
        console.error(`      ${e.message}`);
        failed++;
    }
}

function lex(src: string): Token[] {
    return new Lexer(src).tokenize();
}

function firstOf(src: string): Token {
    return lex(src)[0];
}

console.log("\n=== Lexer Tests ===\n");

// ── Phase 1 ────────────────────────────────────────────────────────────────────

console.log("── Phase 1 ──\n");

test("emits BOLA_SAHEB for 'bola saheb'", () =>
    assert.strictEqual(firstOf("bola saheb").kind, TokenKind.BOLA_SAHEB));
test("emits YETO_SAHEB for 'yeto saheb'", () =>
    assert.strictEqual(firstOf("yeto saheb").kind, TokenKind.YETO_SAHEB));
test("emits HE_GHE for 'he ghe'", () =>
    assert.strictEqual(firstOf("he ghe").kind, TokenKind.HE_GHE));
test("emits HE_BOL for 'he bol'", () =>
    assert.strictEqual(firstOf("he bol").kind, TokenKind.HE_BOL));
test("emits NUMBER token with correct value", () => {
    const t = firstOf("42"); assert.strictEqual(t.kind, TokenKind.NUMBER); assert.strictEqual(t.value, "42");
});
test("emits STRING token without quotes", () => {
    const t = firstOf('"Namaskar"'); assert.strictEqual(t.kind, TokenKind.STRING); assert.strictEqual(t.value, "Namaskar");
});
test("emits IDENTIFIER for variable name", () =>
    assert.strictEqual(firstOf("vel").kind, TokenKind.IDENTIFIER));
test("skips -- comments", () => {
    const toks = lex("-- just a comment\nbola saheb");
    // No prior token → no NEWLINE emitted for the post-comment \n.
    // The first real token is BOLA_SAHEB.
    assert.strictEqual(toks[0].kind, TokenKind.BOLA_SAHEB);
});
test("emits PLUS, MINUS, STAR, SLASH", () => {
    const toks = lex("+ - * /");
    assert.strictEqual(toks[0].kind, TokenKind.PLUS);
    assert.strictEqual(toks[1].kind, TokenKind.MINUS);
    assert.strictEqual(toks[2].kind, TokenKind.STAR);
    assert.strictEqual(toks[3].kind, TokenKind.SLASH);
});
test("ends with EOF", () => {
    const toks = lex("42");
    assert.strictEqual(toks[toks.length - 1].kind, TokenKind.EOF);
});
test("tracks line numbers", () => {
    const toks = lex("bola saheb\nhe ghe");
    // toks: [BOLA_SAHEB(1), NEWLINE(1), HE_GHE(2), EOF(2)]
    // NEWLINE is emitted BEFORE this.line++, so it carries line=1.
    assert.strictEqual(toks[0].line, 1);  // BOLA_SAHEB
    assert.strictEqual(toks[1].line, 1);  // NEWLINE (emitted before line++)
    assert.strictEqual(toks[2].line, 2);  // HE_GHE on line 2
});

// ── Phase 2 ────────────────────────────────────────────────────────────────────

console.log("\n── Phase 2 ──\n");

test("emits KHARA for 'khara'", () => assert.strictEqual(firstOf("khara").kind, TokenKind.KHARA));
test("emits KHOTA for 'khota'", () => assert.strictEqual(firstOf("khota").kind, TokenKind.KHOTA));
test("emits ANI for 'ani'", () => assert.strictEqual(firstOf("ani").kind, TokenKind.ANI));
test("emits KINVA for 'kinva'", () => assert.strictEqual(firstOf("kinva").kind, TokenKind.KINVA));
test("emits NAHI for 'nahi'", () => assert.strictEqual(firstOf("nahi").kind, TokenKind.NAHI));
test("emits JR for 'jr'", () => assert.strictEqual(firstOf("jr").kind, TokenKind.JR));
test("emits NAHITR_JR for 'nahitr jr' as a single compound token", () =>
    assert.strictEqual(firstOf("nahitr jr").kind, TokenKind.NAHITR_JR));
test("emits NAHITR for standalone 'nahitr'", () =>
    assert.strictEqual(firstOf("nahitr").kind, TokenKind.NAHITR));
test("emits JOPARYANT for 'joparyant'", () =>
    assert.strictEqual(firstOf("joparyant").kind, TokenKind.JOPARYANT));
test("emits THAMB for 'thamb'", () => assert.strictEqual(firstOf("thamb").kind, TokenKind.THAMB));
test("emits PUDHE_JA for 'pudhe ja' as a single compound token", () =>
    assert.strictEqual(firstOf("pudhe ja").kind, TokenKind.PUDHE_JA));
test("emits LBRACE for '{'", () => assert.strictEqual(firstOf("{").kind, TokenKind.LBRACE));
test("emits RBRACE for '}'", () => assert.strictEqual(firstOf("}").kind, TokenKind.RBRACE));
test("emits EQ_EQ for '=='", () => assert.strictEqual(firstOf("==").kind, TokenKind.EQ_EQ));
test("emits BANG_EQ for '!='", () => assert.strictEqual(firstOf("!=").kind, TokenKind.BANG_EQ));
test("emits LT_EQ for '<='", () => assert.strictEqual(firstOf("<=").kind, TokenKind.LT_EQ));
test("emits GT_EQ for '>='", () => assert.strictEqual(firstOf(">=").kind, TokenKind.GT_EQ));

// ── Phase 3 ────────────────────────────────────────────────────────────────────

console.log("\n── Phase 3 ──\n");

test("emits KARYA for 'karya'", () => assert.strictEqual(firstOf("karya").kind, TokenKind.KARYA));
test("emits PARAT for 'parat'", () => assert.strictEqual(firstOf("parat").kind, TokenKind.PARAT));
test("emits SHUNYA for 'shunya'", () => assert.strictEqual(firstOf("shunya").kind, TokenKind.SHUNYA));
test("emits COMMA for ','", () => assert.strictEqual(firstOf(",").kind, TokenKind.COMMA));
test("tokenises karya name() correctly", () => {
    const toks = lex("karya add(a, b)");
    assert.strictEqual(toks[0].kind, TokenKind.KARYA);
    assert.strictEqual(toks[1].kind, TokenKind.IDENTIFIER); assert.strictEqual(toks[1].value, "add");
    assert.strictEqual(toks[2].kind, TokenKind.LPAREN);
    assert.strictEqual(toks[3].kind, TokenKind.IDENTIFIER); assert.strictEqual(toks[3].value, "a");
    assert.strictEqual(toks[4].kind, TokenKind.COMMA);
    assert.strictEqual(toks[5].kind, TokenKind.IDENTIFIER); assert.strictEqual(toks[5].value, "b");
    assert.strictEqual(toks[6].kind, TokenKind.RPAREN);
});
test("parat is not confused with an identifier", () => {
    const toks = lex("parat 42");
    assert.strictEqual(toks[0].kind, TokenKind.PARAT);
    assert.strictEqual(toks[1].kind, TokenKind.NUMBER);
});

// ── Summary ───────────────────────────────────────────────────────────────────

console.log(`\n${passed} passed, ${failed} failed.\n`);
if (failed > 0) process.exit(1);
