import { Value } from "./Value.js";

// ─────────────────────────────────────────────────────────────────────────────
// Environment — the variable store for a Bol program.
//
// Phase 2: scope chaining via a `parent` pointer.
//
// Each if/while block creates a fresh child Environment. Variable lookup
// and assignment walk up the parent chain, so inner blocks can read and
// mutate variables from outer scopes. Variable declaration (he ghe) always
// operates on the current (innermost) scope, enabling intentional shadowing.
//
//   Global scope
//     └── if-block scope
//           └── while-block scope
//
// Scope chain rules:
//   declare  → always in the current scope  (errors if already declared HERE)
//   assign   → walk up; errors if not found anywhere
//   get      → walk up; errors if not found anywhere
// ─────────────────────────────────────────────────────────────────────────────

export class Environment {
    private vars = new Map<string, Value>();

    constructor(private parent: Environment | null = null) { }

    /**
     * Declare a NEW variable in the current scope.
     * Throws if already declared in this exact scope (shadowing a parent is OK).
     */
    declare(name: string, value: Value): void {
        if (this.vars.has(name)) {
            throw new RuntimeError(
                `chuk zali na: "${name}" aadheech declared aahe — dobara "he ghe" vaparoo nakos`
            );
        }
        this.vars.set(name, value);
    }

    /**
     * Assign to an EXISTING variable.
     * Walks up the scope chain to find it; throws if not found anywhere.
     */
    assign(name: string, value: Value): void {
        if (this.vars.has(name)) {
            this.vars.set(name, value);
            return;
        }
        if (this.parent) {
            this.parent.assign(name, value);
            return;
        }
        throw new RuntimeError(
            `chuk zali na: "${name}" declared nahi — aadhi "he ghe ${name} = ..." kar`
        );
    }

    /**
     * Get a variable's current value.
     * Walks up the scope chain; throws if not found anywhere.
     */
    get(name: string): Value {
        if (this.vars.has(name)) {
            return this.vars.get(name)!;
        }
        if (this.parent) {
            return this.parent.get(name);
        }
        throw new RuntimeError(
            `chuk zali na: "${name}" saapadla nahi — declared aahe ka?`
        );
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// RuntimeError — thrown during interpretation (not parsing/lexing).
// ─────────────────────────────────────────────────────────────────────────────
export class RuntimeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "RuntimeError";
    }
}
