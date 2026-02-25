/**
 * Parser unit tests — Phase 1 + Phase 2 + Phase 3 AST shapes.
 * Run with:  npx tsx src/tests/parser.test.ts
 */

import * as assert from "assert";
import { Lexer } from "../lexer/Lexer.js";
import { Parser } from "../parser/Parser.js";
import {
    Program, HeGheStatement, HeBolStatement, AssignStatement,
    IfStatement, WhileStatement, BreakStatement, ContinueStatement,
    FunctionDeclaration, ReturnStatement,
    BinaryExpr, UnaryExpr, BooleanLiteral, NullLiteral, FunctionCallExpr,
} from "../ast/index.js";

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

function parse(src: string): Program {
    return new Parser(new Lexer(src).tokenize()).parse();
}

console.log("\n=== Parser Tests ===\n");

// ── Phase 1 ────────────────────────────────────────────────────────────────────

console.log("── Phase 1 ──\n");

test("parses empty program", () => {
    const prog = parse("bola saheb\nyeto saheb");
    assert.strictEqual(prog.kind, "Program");
    assert.strictEqual(prog.stmts.length, 0);
});
test("parses he ghe statement", () => {
    const prog = parse("bola saheb\nhe ghe x = 10\nyeto saheb");
    const stmt = prog.stmts[0] as HeGheStatement;
    assert.strictEqual(stmt.kind, "HeGhe");
    assert.strictEqual(stmt.name, "x");
    assert.strictEqual(stmt.value.kind, "Number");
});
test("parses he bol with string literal", () => {
    const prog = parse(`bola saheb\nhe bol "Namaskar"\nyeto saheb`);
    const stmt = prog.stmts[0] as HeBolStatement;
    assert.strictEqual(stmt.kind, "HeBol");
    if (stmt.value.kind === "String") assert.strictEqual(stmt.value.value, "Namaskar");
});
test("additive left-associative: 1 + 2 + 3 → ((1+2)+3)", () => {
    const prog = parse("bola saheb\nhe ghe r = 1 + 2 + 3\nyeto saheb");
    const outer = (prog.stmts[0] as HeGheStatement).value as BinaryExpr;
    assert.strictEqual(outer.op, "+");
    assert.strictEqual((outer.left as BinaryExpr).op, "+");
});
test("* binds tighter than +", () => {
    const prog = parse("bola saheb\nhe ghe r = 2 + 3 * 4\nyeto saheb");
    const outer = (prog.stmts[0] as HeGheStatement).value as BinaryExpr;
    assert.strictEqual(outer.op, "+");
    assert.strictEqual((outer.right as BinaryExpr).op, "*");
});
test("parentheses override precedence", () => {
    const prog = parse("bola saheb\nhe ghe r = (2 + 3) * 4\nyeto saheb");
    const outer = (prog.stmts[0] as HeGheStatement).value as BinaryExpr;
    assert.strictEqual(outer.op, "*");
    assert.strictEqual((outer.left as BinaryExpr).op, "+");
});
test("parses assign statement", () => {
    const prog = parse("bola saheb\nhe ghe x = 1\nx = 2\nyeto saheb");
    assert.strictEqual(prog.stmts[1].kind, "Assign");
});
test("throws on unknown keyword", () => {
    assert.throws(() => parse("bola saheb\nlett x = 1\nyeto saheb"), /Chuk/);
});

// ── Phase 2 ────────────────────────────────────────────────────────────────────

console.log("\n── Phase 2 ──\n");

test("barobr → BooleanLiteral(true)", () => {
    const stmt = parse("bola saheb\nhe ghe x = barobr\nyeto saheb").stmts[0] as HeGheStatement;
    assert.strictEqual((stmt.value as BooleanLiteral).value, true);
});
test("chuk → BooleanLiteral(false)", () => {
    const stmt = parse("bola saheb\nhe ghe x = chuk\nyeto saheb").stmts[0] as HeGheStatement;
    assert.strictEqual((stmt.value as BooleanLiteral).value, false);
});
test("parses == as Binary node", () => {
    const stmt = parse("bola saheb\nhe ghe r = 7 == 7\nyeto saheb").stmts[0] as HeGheStatement;
    assert.strictEqual((stmt.value as BinaryExpr).op, "==");
});
test("comparison binds tighter than ani", () => {
    const stmt = parse("bola saheb\nhe ghe r = x > 0 ani y < 10\nyeto saheb").stmts[0] as HeGheStatement;
    const outer = stmt.value as BinaryExpr;
    assert.strictEqual(outer.op, "ani");
    assert.strictEqual((outer.left as BinaryExpr).op, ">");
});
test("ani binds tighter than kinva", () => {
    const stmt = parse("bola saheb\nhe ghe r = barobr kinva chuk ani barobr\nyeto saheb").stmts[0] as HeGheStatement;
    const outer = stmt.value as BinaryExpr;
    assert.strictEqual(outer.op, "kinva");
    assert.strictEqual((outer.right as BinaryExpr).op, "ani");
});
test("nahi → UnaryExpr", () => {
    const stmt = parse("bola saheb\nhe ghe r = nahi chuk\nyeto saheb").stmts[0] as HeGheStatement;
    assert.strictEqual(stmt.value.kind, "Unary");
    assert.strictEqual((stmt.value as UnaryExpr).op, "nahi");
});
test("simple jr statement — correct shape", () => {
    const prog = parse(`bola saheb\njr barobr {\n  he bol "ja"\n}\nyeto saheb`);
    const stmt = prog.stmts[0] as IfStatement;
    assert.strictEqual(stmt.kind, "If");
    assert.strictEqual(stmt.thenBlock.length, 1);
    assert.strictEqual(stmt.elseIfs.length, 0);
    assert.strictEqual(stmt.elseBlock, null);
});
test("jr / nahitr jr / nahitr chain", () => {
    const prog = parse(`bola saheb\njr chuk {\n  he bol "a"\n} nahitr jr chuk {\n  he bol "b"\n} nahitr {\n  he bol "c"\n}\nyeto saheb`);
    const stmt = prog.stmts[0] as IfStatement;
    assert.strictEqual(stmt.elseIfs.length, 1);
    assert.ok(stmt.elseBlock !== null);
});
test("joparyant — correct shape", () => {
    const prog = parse(`bola saheb\njoparyant chuk {\n  he bol "never"\n}\nyeto saheb`);
    const stmt = prog.stmts[0] as WhileStatement;
    assert.strictEqual(stmt.kind, "While");
    assert.strictEqual(stmt.body.length, 1);
});
test("thamb → BreakStatement", () => {
    const prog = parse(`bola saheb\njoparyant barobr {\n  thamb\n}\nyeto saheb`);
    assert.strictEqual((prog.stmts[0] as WhileStatement).body[0].kind, "Break");
});
test("pudhe ja → ContinueStatement", () => {
    const prog = parse(`bola saheb\njoparyant barobr {\n  pudhe ja\n}\nyeto saheb`);
    assert.strictEqual((prog.stmts[0] as WhileStatement).body[0].kind, "Continue");
});

// ── Phase 3 ────────────────────────────────────────────────────────────────────

console.log("\n── Phase 3 ──\n");

test("shunya → NullLiteral", () => {
    const stmt = parse("bola saheb\nhe ghe x = shunya\nyeto saheb").stmts[0] as HeGheStatement;
    assert.strictEqual(stmt.value.kind, "Null");
});

test("karya with params parsed correctly", () => {
    const prog = parse(`bola saheb
karya add(a, b) {
  parat a + b
}
yeto saheb`);
    const fn = prog.stmts[0] as FunctionDeclaration;
    assert.strictEqual(fn.kind, "FunctionDecl");
    assert.strictEqual(fn.name, "add");
    assert.deepStrictEqual(fn.params, ["a", "b"]);
    assert.strictEqual(fn.body.length, 1);
    assert.strictEqual(fn.body[0].kind, "Return");
});

test("karya with no params", () => {
    const prog = parse(`bola saheb
karya greet() {
  parat
}
yeto saheb`);
    const fn = prog.stmts[0] as FunctionDeclaration;
    assert.deepStrictEqual(fn.params, []);
});

test("parat with expression → ReturnStatement with value", () => {
    const prog = parse(`bola saheb
karya id(x) {
  parat x
}
yeto saheb`);
    const ret = (prog.stmts[0] as FunctionDeclaration).body[0] as ReturnStatement;
    assert.strictEqual(ret.kind, "Return");
    assert.ok(ret.value !== null);
    assert.strictEqual(ret.value!.kind, "Identifier");
});

test("parat alone → ReturnStatement with null value", () => {
    const prog = parse(`bola saheb
karya nothing() {
  parat
}
yeto saheb`);
    const ret = (prog.stmts[0] as FunctionDeclaration).body[0] as ReturnStatement;
    assert.strictEqual(ret.kind, "Return");
    assert.strictEqual(ret.value, null);
});

test("function call as expression: add(2, 3)", () => {
    const prog = parse(`bola saheb
he ghe r = add(2, 3)
yeto saheb`);
    const call = (prog.stmts[0] as HeGheStatement).value as FunctionCallExpr;
    assert.strictEqual(call.kind, "Call");
    assert.strictEqual(call.callee, "add");
    assert.strictEqual(call.args.length, 2);
    assert.strictEqual(call.args[0].kind, "Number");
    assert.strictEqual(call.args[1].kind, "Number");
});

test("function call with no arguments: hello()", () => {
    const prog = parse(`bola saheb
he ghe r = hello()
yeto saheb`);
    const call = (prog.stmts[0] as HeGheStatement).value as FunctionCallExpr;
    assert.strictEqual(call.callee, "hello");
    assert.strictEqual(call.args.length, 0);
});

test("nested call: f(g(1))", () => {
    const prog = parse(`bola saheb
he ghe r = f(g(1))
yeto saheb`);
    const outer = (prog.stmts[0] as HeGheStatement).value as FunctionCallExpr;
    assert.strictEqual(outer.callee, "f");
    const inner = outer.args[0] as FunctionCallExpr;
    assert.strictEqual(inner.kind, "Call");
    assert.strictEqual(inner.callee, "g");
});

test("call inside binary expr: add(1, 2) + 3", () => {
    const prog = parse(`bola saheb
he ghe r = add(1, 2) + 3
yeto saheb`);
    const expr = (prog.stmts[0] as HeGheStatement).value as BinaryExpr;
    assert.strictEqual(expr.op, "+");
    assert.strictEqual(expr.left.kind, "Call");
});

test("function with if/parat inside body", () => {
    const prog = parse(`bola saheb
karya abs(x) {
  jr x < 0 {
    parat x * -1
  }
  parat x
}
yeto saheb`);
    const fn = prog.stmts[0] as FunctionDeclaration;
    assert.strictEqual(fn.body.length, 2);
    assert.strictEqual(fn.body[0].kind, "If");
    assert.strictEqual(fn.body[1].kind, "Return");
});

// ── Summary ───────────────────────────────────────────────────────────────────

console.log(`\n${passed} passed, ${failed} failed.\n`);
if (failed > 0) process.exit(1);
