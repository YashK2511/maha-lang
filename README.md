# Maha Lang 🗣️

> **A programming language built for Marathi people — written from scratch in TypeScript.**

Maha Lang (also known as **Bol**) is a toy interpreted programming language with **Marathi-flavoured keywords**. It implements a clean **Lexer → Parser → AST → Interpreter** pipeline with zero runtime dependencies.

No black boxes. No magic. Just pure TypeScript.

---

## ✨ Features

- **Marathi keywords** — read and write code in Marathi
- **Variables** — declare with `he ghe`, print with `he bol`
- **Arithmetic** — `+`, `-`, `*`, `/` with full operator precedence
- **String concatenation** — join values using `+`
- **Booleans** — `khara` (true) / `khota` (false)
- **Conditionals** — `jr` / `nahitr jr` / `nahitr` (if / else if / else)
- **Logical operators** — `ani` (and), `kinva` (or), `nahi` (not)
- **While loops** — `joparyant` with `thamb` (break) and `pudhe ja` (continue)
- **Functions** — `karya` with multiple params, `parat` (return), and recursion
- **Null** — `shunya`
- **Comments** — single-line with `--`
- **CLI** — run `.bol` files with the `bol` command
- **Web Playground** — try Bol directly in the browser with Monaco editor

---

## 🚀 Installation

### Install the CLI globally via npm

```bash
npm install -g bol-lang
```

### Run a Bol program

```bash
bol run examples/namaskar.bol
```

### Other CLI commands

```bash
bol --help       # Show usage and keyword reference
bol --version    # Print the version
```

---

## 🛠️ Development Setup

Clone the repo and install dependencies:

```bash
git clone https://github.com/YashK2511/bol-lang.git
cd bol-lang
npm install
```

### Run a file in dev mode

```bash
npx tsx src/main.ts examples/namaskar.bol
# or via the CLI dev script:
npm run dev -- run examples/namaskar.bol
```

### Build the project

```bash
npm run build
```

---

## 📝 Syntax at a Glance

Every Bol program starts with `bola saheb` and ends with `yeto saheb`.

```
bola saheb

-- This is a comment

-- Variables
he ghe x = 10
he ghe naam = "Yash"

-- Print
he bol "Namaskar, Jaga!"
he bol naam

-- String concatenation
he bol "Maza naav aahe: " + naam

-- If / Else-if / Else
jr x > 20 {
  he bol "khup mota"
} nahitr jr x > 10 {
  he bol "thoda mota"
} nahitr {
  he bol "chota"
}

-- While loop
he ghe i = 0
joparyant i < 5 {
  he bol i
  i = i + 1
}

-- Break and Continue
joparyant i < 10 {
  jr i == 5 {
    thamb        -- exit loop
  }
  jr i == 3 {
    pudhe ja     -- skip this iteration
  }
  i = i + 1
}

-- Functions and Recursion
karya factorial(n) {
  jr n <= 1 {
    parat 1
  }
  parat n * factorial(n - 1)
}

he bol factorial(5)   -- 120

yeto saheb
```

---

## 📖 Keyword Reference

| Marathi Keyword | Meaning |
|---|---|
| `bola saheb` | Program start |
| `yeto saheb` | Program end |
| `he ghe` | Declare a variable |
| `he bol` | Print to console |
| `jr` | If |
| `nahitr jr` | Else if |
| `nahitr` | Else |
| `joparyant` | While loop |
| `thamb` | Break (exit loop) |
| `pudhe ja` | Continue (next iteration) |
| `karya` | Define a function |
| `parat` | Return from function |
| `khara` | Boolean `true` |
| `khota` | Boolean `false` |
| `shunya` | Null value |
| `ani` | Logical AND |
| `kinva` | Logical OR |
| `nahi` | Logical NOT |
| `--` | Single-line comment |

---

## 📂 Examples

| File | Demonstrates |
|---|---|
| `examples/namaskar.bol` | Hello World — basic print statements |
| `examples/shabda.bol` | Strings and string concatenation |
| `examples/ganit.bol` | Arithmetic operations |
| `examples/agar.bol` | If / else-if / else, logical operators |
| `examples/joparyant.bol` | While loops, `break`, `continue` |
| `examples/karya.bol` | Function declarations and calls |
| `examples/recursive.bol` | Recursion — factorial, power, abs, max |
| `examples/hello.bol` | Minimal starter program |

### Run any example:

```bash
bol run examples/recursive.bol
```

Expected output for `recursive.bol`:
```
120
1
8
3
```

---

## 🧪 Tests

```bash
# Run all tests
npm test

# Run individual tests
npm run test:lexer
npm run test:parser
```

Or directly via `tsx`:

```bash
npx tsx src/tests/lexer.test.ts
npx tsx src/tests/parser.test.ts
```

---

## 🌐 Web Playground

Try Maha Lang directly in your browser — no installation required.

The website features:
- **Monaco Editor** with Bol syntax highlighting
- **Live execution** — runs the interpreter in the browser
- **Example programs** — Hello World, Factorial, Fibonacci
- **Keyboard shortcut** — `Ctrl + Enter` / `Cmd + Enter` to run

> Start the playground locally:
> ```bash
> cd website
> npm install
> npm run dev
> ```

---

## 📁 Project Structure

```
maha-lang/
├── src/
│   ├── lexer/
│   │   ├── TokenKind.ts      # All token types
│   │   ├── Token.ts          # Token data structure
│   │   └── Lexer.ts          # Tokenizer — source → tokens
│   ├── ast/
│   │   └── index.ts          # AST node definitions
│   ├── parser/
│   │   └── Parser.ts         # Parser — tokens → AST
│   ├── interpreter/
│   │   ├── Value.ts          # Runtime value types
│   │   ├── Environment.ts    # Variable scoping
│   │   └── Interpreter.ts    # Tree-walk interpreter
│   ├── tests/
│   │   ├── lexer.test.ts     # Lexer unit tests
│   │   └── parser.test.ts    # Parser unit tests
│   ├── cli.ts                # CLI entry point (`bol` command)
│   └── main.ts               # Core runFile() engine
├── examples/                 # Sample .bol programs
├── website/                  # React + Vite playground
│   └── src/
│       ├── App.tsx           # Main UI component
│       ├── runBol.ts         # Browser-side interpreter wrapper
│       └── bolLanguage.ts    # Monaco syntax highlighting for Bol
├── dist/                     # Compiled output (after build)
├── package.json
└── tsconfig.json
```

---

## 🔧 Interpreter Pipeline

```
Source (.bol file)
      │
      ▼
   Lexer                →  TokenKind tokens
      │
      ▼
   Parser               →  Abstract Syntax Tree (AST)
      │
      ▼
  Interpreter           →  stdout / RuntimeError
```

Each stage throws a typed error (`LexerError`, `ParseError`, `RuntimeError`) with a clear message so debugging is straightforward.

---

## 📦 npm Scripts

| Script | Command | Description |
|---|---|---|
| `build` | `tsc` | Compile TypeScript to `dist/` |
| `dev` | `npx tsx src/cli.ts` | Run CLI without building |
| `start` | `node dist/cli.js` | Run compiled CLI |
| `test` | runs both test files | Run all tests |
| `test:lexer` | `npx tsx src/tests/lexer.test.ts` | Lexer tests only |
| `test:parser` | `npx tsx src/tests/parser.test.ts` | Parser tests only |

---

## 👨‍💻 Author

**Yash Kamble**

- GitHub: [@YashK2511](https://github.com/YashK2511)
- LinkedIn: [yash-kamble](https://www.linkedin.com/in/yash-kamble-214b5130b/)

---

## 📜 License

MIT — free to use, fork, and learn from.
