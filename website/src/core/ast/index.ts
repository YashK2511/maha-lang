// ─────────────────────────────────────────────────────────────────────────────
// AST Node Types for Bol — Phase 1 + Phase 2 + Phase 3
//
// Design: discriminated unions with a literal `kind` field as the tag.
// Nodes are plain data; behaviour lives in the Interpreter (visitor pattern).
// ─────────────────────────────────────────────────────────────────────────────

// ── Expressions ───────────────────────────────────────────────────────────────

/** A literal integer or float:   42   3.14 */
export type NumberLiteral = {
    kind: "Number";
    value: number;
};

/** A literal string:   "Namaskar" */
export type StringLiteral = {
    kind: "String";
    value: string;
};

/** A literal boolean:   barobr (true)   chuk (false) */
export type BooleanLiteral = {
    kind: "Boolean";
    value: boolean;
};

/** A literal null:   shunya */
export type NullLiteral = {
    kind: "Null";
};

/** A reference to a variable or function:   x   vel   add */
export type Identifier = {
    kind: "Identifier";
    name: string;
};

/**
 * A binary expression:   left op right
 *
 * Operators (by group):
 *   arithmetic:  +  -  *  /
 *   comparison:  ==  !=  <  >  <=  >=
 *   logical:     ani (and)  kinva (or)
 */
export type BinaryExpr = {
    kind: "Binary";
    op: string;
    left: Expression;
    right: Expression;
};

/**
 * A unary prefix expression:   nahi <expr>  — logical NOT
 */
export type UnaryExpr = {
    kind: "Unary";
    op: string;       // "nahi"
    operand: Expression;
};

/**
 * A function call expression:   name(arg1, arg2, …)
 * Arguments are evaluated in the caller's scope.
 */
export type FunctionCallExpr = {
    kind: "Call";
    callee: string;
    args: Expression[];
};

/** Union of all expression node types. */
export type Expression =
    | NumberLiteral
    | StringLiteral
    | BooleanLiteral
    | NullLiteral
    | Identifier
    | BinaryExpr
    | UnaryExpr
    | FunctionCallExpr;

// ── Statements ────────────────────────────────────────────────────────────────

/**
 * he ghe <name> = <expression>
 * Declares a new variable and gives it an initial value.
 */
export type HeGheStatement = {
    kind: "HeGhe";
    name: string;
    value: Expression;
};

/**
 * <name> = <expression>
 * Assigns to an already-declared variable.
 */
export type AssignStatement = {
    kind: "Assign";
    name: string;
    value: Expression;
};

/**
 * he bol <expression>
 * Evaluates the expression and prints it to stdout.
 */
export type HeBolStatement = {
    kind: "HeBol";
    value: Expression;
};

/**
 * jr <condition> { <block> }
 *   [nahitr jr <condition> { <block> }]*
 *   [nahitr { <block> }]
 */
export type IfStatement = {
    kind: "If";
    condition: Expression;
    thenBlock: Statement[];
    elseIfs: Array<{ condition: Expression; block: Statement[] }>;
    elseBlock: Statement[] | null;
};

/**
 * joparyant <condition> { <block> }
 * Supports break (thamb) and continue (pudhe ja) inside the body.
 */
export type WhileStatement = {
    kind: "While";
    condition: Expression;
    body: Statement[];
};

/** thamb — exits the nearest enclosing while loop. */
export type BreakStatement = {
    kind: "Break";
};

/** pudhe ja — skips to the next loop iteration. */
export type ContinueStatement = {
    kind: "Continue";
};

/**
 * karya name(param1, param2, …) { body }
 * Defines a named function at the top level.
 */
export type FunctionDeclaration = {
    kind: "FunctionDecl";
    name: string;
    params: string[];
    body: Statement[];
};

/**
 * parat [expression]
 * Exits the current function, optionally returning a value.
 * `parat` alone returns null (shunya).
 */
export type ReturnStatement = {
    kind: "Return";
    value: Expression | null;
};

/** Union of all statement node types. */
export type Statement =
    | HeGheStatement
    | AssignStatement
    | HeBolStatement
    | IfStatement
    | WhileStatement
    | BreakStatement
    | ContinueStatement
    | FunctionDeclaration
    | ReturnStatement;

// ── Root ──────────────────────────────────────────────────────────────────────

/**
 * Program — the root AST node.
 * Produced by the parser; consumed by the interpreter.
 */
export type Program = {
    kind: "Program";
    stmts: Statement[];
};
