import { Statement } from "../ast/index.js";

/**
 * Value — the runtime type in Bol.
 *
 * Phase 1:  number | string
 * Phase 2:  number | string | boolean
 * Phase 3:  number | string | boolean | null | FunctionValue
 */

/**
 * FunctionValue — a callable stored in the environment like any other value.
 * It carries the parameter names and body AST so the interpreter can
 * create a new scope and execute it on each call.
 */
export type FunctionValue = {
    kind: "Function";
    name: string;
    params: string[];
    body: Statement[];
};

export type Value = number | string | boolean | null | FunctionValue;
