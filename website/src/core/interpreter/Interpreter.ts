import { Environment, RuntimeError } from "./Environment.js";
import { Value, FunctionValue } from "./Value.js";
import {
    Program, Statement, Expression,
    IfStatement, WhileStatement, FunctionDeclaration,
} from "../ast/index.js";

// ─────────────────────────────────────────────────────────────────────────────
// Interpreter — walks the AST and executes the program.
//
// Pattern: Visitor — a single switch on node.kind per category.
//
// Control-flow signals (all three use the same mechanism):
//   break    → signal = { tag: "break" }
//   continue → signal = { tag: "continue" }
//   return   → signal = { tag: "return", value: Value | null }
//
// execBlock stops early on any non-null signal.
// The appropriate consumer (execWhile / evalCall) reads and clears it.
//
// Two-pass top-level execution:
//   Pass 1 — register all FunctionDeclarations in the global env.
//   Pass 2 — execute everything else in order.
// This allows functions to be called before they are defined textually.
// ─────────────────────────────────────────────────────────────────────────────

type Signal =
    | { tag: "break" }
    | { tag: "continue" }
    | { tag: "return"; value: Value | null }
    | null;

export class Interpreter {
    private env = new Environment();
    private signal: Signal = null;

    // ── Public API ────────────────────────────────────────────────────────────

    constructor(private output: (line: string) => void = console.log) { }

    run(program: Program): void {
        // Pass 1: hoist all function declarations into the global scope.
        for (const stmt of program.stmts) {
            if (stmt.kind === "FunctionDecl") {
                this.execFunctionDecl(stmt, this.env);
            }
        }
        // Pass 2: execute all other statements in order.
        for (const stmt of program.stmts) {
            if (stmt.kind !== "FunctionDecl") {
                this.execStmt(stmt, this.env);
            }
        }
    }

    // ── Statement visitors ────────────────────────────────────────────────────

    private execStmt(stmt: Statement, env: Environment): void {
        switch (stmt.kind) {

            // ── Phase 1 ────────────────────────────────────────────────────
            case "HeGhe":
                env.declare(stmt.name, this.evalExpr(stmt.value, env));
                break;
            case "Assign":
                env.assign(stmt.name, this.evalExpr(stmt.value, env));
                break;
            case "HeBol":
                this.output(this.display(this.evalExpr(stmt.value, env)));
                break;

            // ── Phase 2 ────────────────────────────────────────────────────
            case "If":
                this.execIf(stmt, env);
                break;
            case "While":
                this.execWhile(stmt, env);
                break;
            case "Break":
                this.signal = { tag: "break" };
                break;
            case "Continue":
                this.signal = { tag: "continue" };
                break;

            // ── Phase 3 ────────────────────────────────────────────────────
            case "FunctionDecl":
                // Already handled in the hoisting pass; skip in pass 2.
                break;
            case "Return":
                this.signal = {
                    tag: "return",
                    value: stmt.value !== null ? this.evalExpr(stmt.value, env) : null,
                };
                break;

            default:
                const _exhaustive: never = stmt;
                throw new RuntimeError(`Anivadit statement kind: ${(_exhaustive as any).kind}`);
        }
    }

    /** Execute a block, stopping early if any signal is set. */
    private execBlock(stmts: Statement[], env: Environment): void {
        for (const stmt of stmts) {
            if (this.signal !== null) break;
            this.execStmt(stmt, env);
        }
    }

    /**
     * Register a function declaration as a FunctionValue in the environment.
     * Called during the hoisting pass, not during the block-execution pass.
     */
    private execFunctionDecl(stmt: FunctionDeclaration, env: Environment): void {
        const fn: FunctionValue = {
            kind: "Function",
            name: stmt.name,
            params: stmt.params,
            body: stmt.body,
        };
        // Use declare so re-defining a function is a runtime error.
        env.declare(stmt.name, fn);
    }

    private execIf(stmt: IfStatement, env: Environment): void {
        const condition = this.evalExpr(stmt.condition, env);
        if (typeof condition !== "boolean") {
            throw new RuntimeError(
                `"jr" la boolean condition havi — "${this.display(condition)}" milala`
            );
        }
        if (condition) {
            this.execBlock(stmt.thenBlock, new Environment(env)); return;
        }
        for (const elseIf of stmt.elseIfs) {
            const cond = this.evalExpr(elseIf.condition, env);
            if (typeof cond !== "boolean") {
                throw new RuntimeError(
                    `"nahitr jr" la boolean condition havi — "${this.display(cond)}" milala`
                );
            }
            if (cond) {
                this.execBlock(elseIf.block, new Environment(env)); return;
            }
        }
        if (stmt.elseBlock !== null) {
            this.execBlock(stmt.elseBlock, new Environment(env));
        }
    }

    private execWhile(stmt: WhileStatement, env: Environment): void {
        while (true) {
            const condition = this.evalExpr(stmt.condition, env);
            if (typeof condition !== "boolean") {
                throw new RuntimeError(
                    `"joparyant" la boolean condition havi — "${this.display(condition)}" milala`
                );
            }
            if (!condition) break;

            this.execBlock(stmt.body, new Environment(env));

            if (this.signal?.tag === "break") { this.signal = null; break; }
            if (this.signal?.tag === "continue") { this.signal = null; }
            // A "return" signal bubbles up through the while loop — DON'T clear it.
        }
    }

    // ── Expression visitors ───────────────────────────────────────────────────

    evalExpr(expr: Expression, env: Environment): Value {
        switch (expr.kind) {
            case "Number": return expr.value;
            case "String": return expr.value;
            case "Boolean": return expr.value;
            case "Null": return null;

            case "Identifier":
                return env.get(expr.name);

            case "Binary":
                return this.evalBinary(expr.op, expr.left, expr.right, env);

            case "Unary":
                return this.evalUnary(expr.op, expr.operand, env);

            case "Call":
                return this.evalCall(expr.callee, expr.args, env);

            default:
                const _exhaustive: never = expr;
                throw new RuntimeError(`Anivadit expression kind: ${(_exhaustive as any).kind}`);
        }
    }

    /**
     * Evaluate a function call:
     *   1. Look up callee → must be a FunctionValue
     *   2. Evaluate all arguments in caller's scope
     *   3. Check arity
     *   4. Create child scope, bind params → arg values
     *   5. Execute body
     *   6. Capture and clear the return signal
     *   7. Return the captured value (null if no explicit parat)
     */
    private evalCall(callee: string, argExprs: Expression[], env: Environment): Value {
        // 1. Look up the function
        const fn = env.get(callee);
        if (fn === null || typeof fn !== "object" || fn.kind !== "Function") {
            throw new RuntimeError(
                `"${callee}" he function nahi — karya madhye define kelay ka?`
            );
        }

        // 2. Evaluate arguments in the caller's scope
        const args = argExprs.map(a => this.evalExpr(a, env));

        // 3. Arity check
        if (args.length !== fn.params.length) {
            throw new RuntimeError(
                `"${callee}" la ${fn.params.length} arguments havi, ${args.length} dile`
            );
        }

        // 4. New scope for the function body (child of global, not caller)
        //    — prevents callee from reading caller's local variables.
        const callEnv = new Environment(this.env);
        for (let i = 0; i < fn.params.length; i++) {
            callEnv.declare(fn.params[i], args[i]);
        }

        // 5. Execute body
        this.execBlock(fn.body, callEnv);

        // 6. Capture return value and clear signal
        let returnValue: Value = null;
        if (this.signal?.tag === "return") {
            returnValue = this.signal.value;
            this.signal = null;
        }

        // 7. Return
        return returnValue;
    }

    private evalBinary(
        op: string, leftExpr: Expression, rightExpr: Expression, env: Environment
    ): Value {
        // Short-circuit logical operators
        if (op === "ani") {
            const left = this.evalExpr(leftExpr, env);
            if (typeof left !== "boolean")
                throw new RuntimeError(`"ani" fakt booleans sathi — "${this.display(left)}" milala`);
            if (!left) return false;
            const right = this.evalExpr(rightExpr, env);
            if (typeof right !== "boolean")
                throw new RuntimeError(`"ani" fakt booleans sathi — "${this.display(right)}" milala`);
            return right;
        }
        if (op === "kinva") {
            const left = this.evalExpr(leftExpr, env);
            if (typeof left !== "boolean")
                throw new RuntimeError(`"kinva" fakt booleans sathi — "${this.display(left)}" milala`);
            if (left) return true;
            const right = this.evalExpr(rightExpr, env);
            if (typeof right !== "boolean")
                throw new RuntimeError(`"kinva" fakt booleans sathi — "${this.display(right)}" milala`);
            return right;
        }

        const left = this.evalExpr(leftExpr, env);
        const right = this.evalExpr(rightExpr, env);

        if (typeof left === "number" && typeof right === "number") {
            switch (op) {
                case "+": return left + right;
                case "-": return left - right;
                case "*": return left * right;
                case "/":
                    if (right === 0) throw new RuntimeError("Shunya ne bhag karta yet nahi");
                    return left / right;
                case "==": return left === right;
                case "!=": return left !== right;
                case "<": return left < right;
                case ">": return left > right;
                case "<=": return left <= right;
                case ">=": return left >= right;
            }
        }
        if (typeof left === "boolean" && typeof right === "boolean") {
            if (op === "==") return left === right;
            if (op === "!=") return left !== right;
            throw new RuntimeError(
                `"${op}" booleans sathi vaparata yet nahi — fakt "==" va "!=" chalta`
            );
        }
        if (op === "+") return this.display(left) + this.display(right);
        if (op === "==") return left === right;
        if (op === "!=") return left !== right;

        throw new RuntimeError(
            `"${op}" "${typeof left}" va "${typeof right}" sathi vaparata yet nahi`
        );
    }

    private evalUnary(op: string, operandExpr: Expression, env: Environment): Value {
        const operand = this.evalExpr(operandExpr, env);
        if (op === "nahi") {
            if (typeof operand !== "boolean")
                throw new RuntimeError(`"nahi" fakt boolean sathi — "${this.display(operand)}" milala`);
            return !operand;
        }
        if (op === "-") {
            if (typeof operand !== "number")
                throw new RuntimeError(`Unary "-" fakt number sathi — "${this.display(operand)}" milala`);
            return -operand;
        }
        throw new RuntimeError(`Aniklit unary operator: "${op}"`);
    }

    // ── Display helper ────────────────────────────────────────────────────────

    private display(val: Value): string {
        if (val === null) return "shunya";
        if (typeof val === "boolean") return val ? "khara" : "khota";
        if (typeof val === "number") return val.toString();
        if (typeof val === "object" && val.kind === "Function")
            return `<karya ${val.name}>`;
        return val as string;
    }
}
