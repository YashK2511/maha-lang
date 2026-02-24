# bol lang 🗣️

A toy interpreted programming language with **Marathi-flavoured keywords**, built from scratch in TypeScript.

Implements a clean **lexer → parser → AST → interpreter** pipeline — no dependencies, no magic, no black boxes.

---

## Features

| Phase | Feature |
|---|---|
| Phase 1 | Variables (`he ghe`), print (`he bol`), arithmetic, strings |
| Phase 2 | Booleans (`khara`/`khota`), `if`/`else if`/`else`, `while` loops, `break`, `continue` |
| Phase 3 | Functions (`karya`), return (`parat`), recursion, null (`shunya`) |

## Syntax at a glance

```
bola saheb

-- Variables and print
he ghe x = 10
he bol "Namaskar, Jaga!"

-- If / else if / else
jr x > 5 {
  he bol "mota"
} nahitr {
  he bol "chota"
}

-- While loop
joparyant x > 0 {
  he bol x
  x = x - 1
}

-- Functions
karya factorial(n) {
  jr n <= 1 {
    parat 1
  }
  parat n * factorial(n - 1)
}
he bol factorial(5)   -- 120

yeto saheb
```

## Keyword Reference

| Marathi | Meaning |
|---|---|
| `bola saheb` | program start |
| `yeto saheb` | program end |
| `he ghe` | declare variable |
| `he bol` | print |
| `jr` | if |
| `nahitr jr` | else if |
| `nahitr` | else |
| `joparyant` | while |
| `thamb` | break |
| `pudhe ja` | continue |
| `karya` | function |
| `parat` | return |
| `khara` | true |
| `khota` | false |
| `shunya` | null |
| `ani` | and |
| `kinva` | or |
| `nahi` | not |

## Running

```bash
npm install
npx tsx src/main.ts examples/recursive.bol
```

## Tests

```bash
npx tsx src/tests/lexer.test.ts
npx tsx src/tests/parser.test.ts
```

## Project Structure

```
src/
  lexer/        TokenKind.ts  Token.ts  Lexer.ts
  ast/          index.ts
  parser/       Parser.ts
  interpreter/  Value.ts  Environment.ts  Interpreter.ts
  tests/        lexer.test.ts  parser.test.ts
  main.ts
examples/
  namaskar.bol  shabda.bol  ganit.bol
  agar.bol      joparyant.bol
  karya.bol     recursive.bol
```
