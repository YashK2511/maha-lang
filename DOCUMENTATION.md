# Maha-Lang Documentation

> **Your friendly guide to learning programming — one step at a time.**

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Philosophy & Design Goals](#2-philosophy--design-goals)
3. [Environment Setup](#3-environment-setup)
4. [Language Basics](#4-language-basics)
   - 4.1 [Program Structure](#41-program-structure)
   - 4.2 [Comments](#42-comments)
   - 4.3 [Variables](#43-variables)
   - 4.4 [Data Types](#44-data-types)
   - 4.5 [Printing Output](#45-printing-output)
5. [Operators](#5-operators)
   - 5.1 [Arithmetic Operators](#51-arithmetic-operators)
   - 5.2 [Comparison Operators](#52-comparison-operators)
   - 5.3 [Logical Operators](#53-logical-operators)
6. [Control Flow](#6-control-flow)
   - 6.1 [Conditional Statements](#61-conditional-statements-jr--nahitr)
   - 6.2 [Loops](#62-loops-joparyant)
7. [Functions](#7-functions-karya)
8. [Modularization](#8-modularization)
9. [Code Examples](#9-code-examples)
10. [Common Mistakes & Tips](#10-common-mistakes--tips)
11. [Keyword Reference](#11-keyword-reference)
12. [Conclusion & Next Steps](#12-conclusion--next-steps)

---

## 1. Introduction

### What is Maha-Lang?

Maha-Lang (also known as **Bol**) is a small, friendly programming language built for learning. It uses **Marathi-flavoured keywords**, so if you speak Marathi, the code will feel natural and easy to read. Even if you do not speak Marathi, the keywords are short and simple to memorize.

### Why was it created?

Learning to code can feel overwhelming. Most programming languages are designed for professional software engineers, not for beginners. Maha-Lang was created to solve that problem. It gives you a **safe, simple playground** where you can:

- **Understand how programming works** — step by step
- **Learn what happens inside a programming language** — how source code becomes something the computer can execute
- **Build your logical thinking skills** — without worrying about complex syntax or confusing error messages

### Who is it for?

- **Absolute beginners** who have never written a single line of code
- **Students** who want to understand how interpreters and compilers work behind the scenes
- **Curious minds** who want to explore programming in a stress-free environment

### Important note

Maha-Lang is a **learning-first language**. It is a playground for exploration and understanding. It is not designed for building production applications or large projects. Think of it as your **training ground** — the place where you build the foundation that will help you learn any other programming language with confidence.

---

## 2. Philosophy & Design Goals

Maha-Lang is built on three guiding principles:

### Learning over complexity

Every feature in Maha-Lang is designed to teach you a concept. There are no hidden tricks, no complicated setup steps, and no overwhelming number of features. You learn one thing at a time, and each thing is clear.

### Logic building over syntax memorization

The goal is not to make you memorize keywords. The goal is to help you **think like a programmer**. When you write a loop or an if-statement in Maha-Lang, you are learning the *logic* behind it — the reasoning, the flow, the decision-making. These skills will stay with you no matter what language you use next.

### Simplicity and readability

The code you write in Maha-Lang should be easy to read, almost like reading short sentences. The Marathi keywords are chosen to be intuitive:
- `he bol` means "say this" — so it prints something to the screen
- `jr` means "if" — so it makes a decision
- `joparyant` means "as long as" — so it repeats something

### Reducing cognitive overhead

"Cognitive overhead" is a fancy way of saying "too many things to think about at once." Maha-Lang reduces this by keeping the language small. There are only a handful of keywords to learn, the error messages are clear, and the structure is consistent. You can focus on **what** your program does instead of fighting with **how** to write it.

---

## 3. Environment Setup

Follow these steps to get Maha-Lang running on your computer. Do not worry if some of these tools are new to you — we will walk through everything.

### Step 1: Install Node.js

Maha-Lang is built using a technology called **Node.js**. You need to install it first.

1. Open your web browser
2. Go to [https://nodejs.org](https://nodejs.org)
3. Download the version labelled **"LTS"** (Long Term Support — this is the stable, recommended version)
4. Run the installer and follow the on-screen instructions
5. When the installation is done, open your **Terminal** (on Mac/Linux) or **Command Prompt** (on Windows)
6. Type the following command and press Enter:

```bash
node --version
```

You should see a version number printed, something like `v20.x.x`. If you see this, Node.js is installed correctly.

7. Also check that **npm** (Node Package Manager — it comes with Node.js) is installed:

```bash
npm --version
```

You should see a version number here too.

### Step 2: Install the Maha-Lang CLI

The easiest way to use Maha-Lang is to install the Command Line Interface (CLI) globally on your computer. This gives you a `bol` command that you can use from anywhere.

Run this command in your terminal:

```bash
npm install -g bol-lang
```

That is it! Maha-Lang is now installed.

### Step 3: Create your first program

1. Open any **text editor** (Notepad, VS Code, Sublime Text — anything works)
2. Create a new file and name it `namaskar.bol`
   - The `.bol` extension tells the interpreter that this is a Maha-Lang program
3. Type the following code into the file:

```
bola saheb
  he bol "Namaskar, Jaga!"
yeto saheb
```

4. Save the file

### Step 4: Run your program

In your terminal, navigate to the folder where you saved the file, and run:

```bash
bol run namaskar.bol
```

You should see this output:

```
Namaskar, Jaga!
```

🎉 **Congratulations!** You just ran your first Maha-Lang program!

### Alternative: Development setup (for contributors)

If you want to explore or modify the Maha-Lang source code itself, you can clone the repository:

```bash
git clone https://github.com/YashK2511/bol-lang.git
cd bol-lang
npm install
```

To run a program in development mode (without building first):

```bash
npx tsx src/main.ts examples/namaskar.bol
```

### Other CLI commands

```bash
bol --help       # Show usage and all keywords at a glance
bol --version    # Print the installed version number
```

---

## 4. Language Basics

### 4.1 Program Structure

Every Maha-Lang program has a clear beginning and end. This is like a frame around your code — it tells the interpreter where your program starts and where it stops.

- **`bola saheb`** — marks the beginning of your program (think of it as "Hello, sir — let's begin!")
- **`yeto saheb`** — marks the end of your program (think of it as "Done, sir — I'll be going!")

```
bola saheb
  -- Your code goes here
yeto saheb
```

**Rules:**
- Every program **must** start with `bola saheb` and end with `yeto saheb`
- All your code goes between these two lines
- If you forget either one, the interpreter will show an error

---

### 4.2 Comments

Comments are notes you write in your code for yourself (or for other people reading your code). The interpreter completely ignores comments — they do not affect how your program runs.

In Maha-Lang, comments start with **`--`** (two dashes):

```
bola saheb
  -- This is a comment. The interpreter will skip this line.
  -- Comments help you explain what your code does.
  he bol "Hello!"   -- You can also put a comment at the end of a line
yeto saheb
```

**When to use comments:**
- To explain what a tricky piece of code does
- To leave a note for your future self
- To temporarily disable a line of code without deleting it

---

### 4.3 Variables

A **variable** is like a labelled box where you store a value. You give the box a name, put something inside it, and later you can look at what is inside or change it.

#### Declaring a variable

Use **`he ghe`** (which means "take this") to create a new variable and give it a value:

```
he ghe x = 10
```

This creates a variable named `x` and stores the number `10` inside it.

#### More examples

```
bola saheb
  -- Store a number
  he ghe age = 25

  -- Store a string (text)
  he ghe name = "Yash"

  -- Store the result of a calculation
  he ghe total = 10 + 20

  -- Print the values
  he bol age       -- prints: 25
  he bol name      -- prints: Yash
  he bol total     -- prints: 30
yeto saheb
```

#### Changing a variable's value

After a variable has been declared, you can change its value using the **`=`** sign (without `he ghe`):

```
bola saheb
  he ghe score = 0       -- declare with initial value
  he bol score            -- prints: 0

  score = 100             -- change the value
  he bol score            -- prints: 100
yeto saheb
```

**Important rules:**
- You **must** declare a variable with `he ghe` before you can use it
- You **cannot** declare the same variable twice in the same scope — the interpreter will show an error
- Variable names can contain letters, numbers, and underscores, but must start with a letter or underscore

---

### 4.4 Data Types

A **data type** tells the interpreter what kind of value you are working with. Maha-Lang supports the following types:

#### Numbers

Numbers can be whole numbers (integers) or numbers with a decimal point.

```
he ghe purna = 42       -- a whole number
he ghe dashank = 3.14   -- a decimal number
```

**When to use:** Whenever you need to count, measure, or calculate something — like age, temperature, prices, or scores.

#### Strings

A string is a piece of text. Strings are always wrapped in **double quotes** (`"`).

```
he ghe greeting = "Namaskar!"
he ghe city = "Pune"
```

You can join (concatenate) strings together using the **`+`** operator:

```
bola saheb
  he ghe first = "Maha"
  he ghe second = "Lang"
  he bol first + second     -- prints: MahaLang
  he bol first + " " + second   -- prints: Maha Lang
yeto saheb
```

You can also join a string with a number — the number will automatically be converted to text:

```
bola saheb
  he ghe version = 1
  he bol "Bol version: " + version   -- prints: Bol version: 1
yeto saheb
```

**When to use:** Whenever you need to work with text — like names, messages, labels, or sentences.

#### Booleans

A boolean is a value that is either **true** or **false**. In Maha-Lang:

- **`barobr`** means true (correct)
- **`chuk`** means false (wrong)

```
bola saheb
  he ghe sunny = barobr
  he ghe raining = chuk

  he bol sunny      -- prints: barobr
  he bol raining    -- prints: chuk
yeto saheb
```

**When to use:** Whenever you need to represent a yes/no or on/off situation — like "Is the user logged in?" or "Has the task been completed?"

#### Null

**`shunya`** represents "nothing" or "no value." It is used when a variable intentionally has no meaningful value.

```
bola saheb
  he ghe result = shunya
  he bol result    -- prints: shunya
yeto saheb
```

**When to use:** When you want to indicate that something does not have a value yet, or when a function does not return anything.

---

### 4.5 Printing Output

To display something on the screen, use **`he bol`** (which means "say this"):

```
bola saheb
  he bol "Namaskar, Jaga!"         -- prints a string
  he bol 42                         -- prints a number
  he bol barobr                     -- prints: barobr

  he ghe x = 10
  he bol x                          -- prints the value of a variable
  he bol x + 5                      -- prints: 15

  he bol "Result: " + (3 + 4)       -- prints: Result: 7
yeto saheb
```

You can print:
- **Strings** — text in double quotes
- **Numbers** — raw numbers or results of calculations
- **Variables** — whatever value is stored inside them
- **Expressions** — any combination of values and operators

---

## 5. Operators

Operators are special symbols that tell the interpreter to perform a specific operation — like adding two numbers or comparing two values.

### 5.1 Arithmetic Operators

These operators work with numbers and help you do maths.

| Operator | Meaning        | Example     | Result |
|----------|----------------|-------------|--------|
| `+`      | Addition       | `10 + 3`    | `13`   |
| `-`      | Subtraction    | `10 - 3`    | `7`    |
| `*`      | Multiplication | `10 * 3`    | `30`   |
| `/`      | Division       | `10 / 3`    | `3.333…` |

#### Operator precedence

Just like in maths, multiplication and division happen **before** addition and subtraction:

```
bola saheb
  he bol 2 + 3 * 4    -- prints: 14  (not 20!)
  -- Because: 3 * 4 = 12, then 2 + 12 = 14
yeto saheb
```

If you want addition to happen first, use **parentheses** `()`:

```
bola saheb
  he bol (2 + 3) * 4    -- prints: 20
  -- Because: 2 + 3 = 5, then 5 * 4 = 20
yeto saheb
```

#### Complete example

```
bola saheb
  he ghe a = 10
  he ghe b = 40

  -- Addition
  he ghe sum = a + b
  he bol sum                  -- prints: 50

  -- Precedence: * before +
  he ghe result = 2 + 3 * 4
  he bol result               -- prints: 14

  -- Division
  he ghe half = 10 / 5
  he bol half                 -- prints: 2

  -- Chain operations
  he ghe x = 10
  he ghe y = 10
  he ghe product = x * y
  he bol product              -- prints: 100
yeto saheb
```

**Expected output:**

```
50
14
2
100
```

**Important:** Dividing by zero is not allowed and will cause an error.

#### String concatenation with `+`

The `+` operator does double duty — when used with strings, it joins them together:

```
bola saheb
  he ghe naam = "Yash"
  he bol "Namaskar, " + naam + "!"   -- prints: Namaskar, Yash!
yeto saheb
```

---

### 5.2 Comparison Operators

Comparison operators compare two values and produce a boolean result (`barobr` or `chuk`). They are the building blocks of decision-making in your programs.

| Operator | Meaning                  | Example      | Result    |
|----------|--------------------------|--------------|-----------|
| `==`     | Equal to                 | `5 == 5`     | `barobr`  |
| `!=`     | Not equal to             | `5 != 3`     | `barobr`  |
| `<`      | Less than                | `3 < 5`      | `barobr`  |
| `>`      | Greater than             | `5 > 3`      | `barobr`  |
| `<=`     | Less than or equal to    | `5 <= 5`     | `barobr`  |
| `>=`     | Greater than or equal to | `3 >= 5`     | `chuk`    |

#### Example: using comparisons in conditions

```
bola saheb
  he ghe age = 18
  jr age >= 18 {
    he bol "Adult"
  } nahitr {
    he bol "Minor"
  }
  -- prints: Adult
yeto saheb
```

You will use comparison operators most often inside `jr` (if) statements and `joparyant` (while) loops to make decisions and control the flow of your program.

---

### 5.3 Logical Operators

Logical operators combine or modify boolean values. They help you build more complex conditions.

| Operator  | Meaning | Description                                           |
|-----------|---------|-------------------------------------------------------|
| `ani`     | AND     | `barobr` only if **both** sides are `barobr`          |
| `kinva`   | OR      | `barobr` if **at least one** side is `barobr`         |
| `nahi`    | NOT     | Flips the value — `barobr` becomes `chuk` and vice versa |

#### Real-life logic examples

Think of these operators as everyday decision-making:

- **`ani` (AND):** "I will go outside if it is sunny **AND** I have free time." Both conditions must be true.
- **`kinva` (OR):** "I will eat pizza **OR** pasta." At least one of them needs to be available.
- **`nahi` (NOT):** "If it is **NOT** raining, I will go for a walk." Flip the condition.

#### Code examples

```
bola saheb
  he ghe sunny = barobr
  he ghe freeTime = barobr

  -- AND: both must be true
  jr sunny ani freeTime {
    he bol "Let's go outside!"
  }
  -- prints: Let's go outside!

  -- OR: at least one must be true
  he ghe hasPizza = chuk
  he ghe hasPasta = barobr

  jr hasPizza kinva hasPasta {
    he bol "Dinner is ready!"
  }
  -- prints: Dinner is ready!

  -- NOT: flip the condition
  he ghe raining = chuk

  jr nahi raining {
    he bol "No rain, go for a walk!"
  }
  -- prints: No rain, go for a walk!
yeto saheb
```

**Short-circuit evaluation:** Maha-Lang is smart about logical operators. With `ani`, if the left side is `chuk`, the right side is not even checked (because the result must be `chuk` no matter what). Similarly, with `kinva`, if the left side is `barobr`, the right side is skipped.

---

## 6. Control Flow

Control flow is how you tell your program to make decisions and repeat actions. Without control flow, your program would just run every line from top to bottom, one after another. Control flow lets you **choose** which lines run and **repeat** lines multiple times.

### 6.1 Conditional Statements (`jr` / `nahitr`)

Conditional statements let your program make decisions. "If something is true, do this. Otherwise, do that."

#### Simple `jr` (if)

```
bola saheb
  he ghe temperature = 35

  jr temperature > 30 {
    he bol "It's hot today!"
  }
  -- prints: It's hot today!
yeto saheb
```

**How it works:**
1. The interpreter checks the condition: `temperature > 30`
2. Since `35 > 30` is `barobr` (true), it runs the code inside the `{ }` block
3. If the condition were `chuk` (false), the block would be skipped entirely

#### `jr` / `nahitr` (if / else)

Use `nahitr` (else) to provide an alternative — what to do when the condition is false:

```
bola saheb
  he ghe score = 45

  jr score >= 50 {
    he bol "Pass!"
  } nahitr {
    he bol "Fail."
  }
  -- prints: Fail.
yeto saheb
```

#### `jr` / `nahitr jr` / `nahitr` (if / else-if / else)

When you have more than two possibilities, use `nahitr jr` (else-if) to check additional conditions:

```
bola saheb
  he ghe x = 15

  jr x > 20 {
    he bol "x khup mota aahe"
  } nahitr jr x > 10 {
    he bol "x mota aahe"
  } nahitr {
    he bol "x chota aahe"
  }
  -- prints: x mota aahe
yeto saheb
```

**How it works:**
1. First checks: is `x > 20`? → `15 > 20` is `chuk`. Skip.
2. Then checks: is `x > 10`? → `15 > 10` is `barobr`. Run this block!
3. The `nahitr` block is **not** checked because a match was already found.

You can chain as many `nahitr jr` blocks as you need:

```
bola saheb
  he ghe marks = 85

  jr marks >= 90 {
    he bol "Grade: A+"
  } nahitr jr marks >= 80 {
    he bol "Grade: A"
  } nahitr jr marks >= 70 {
    he bol "Grade: B"
  } nahitr jr marks >= 60 {
    he bol "Grade: C"
  } nahitr {
    he bol "Grade: F"
  }
  -- prints: Grade: A
yeto saheb
```

#### Using logical operators in conditions

You can combine conditions using `ani`, `kinva`, and `nahi`:

```
bola saheb
  he ghe a = 5
  he ghe b = 8

  jr a > 0 ani b > 0 {
    he bol "Both are positive"
  }
  -- prints: Both are positive

  he ghe isRaining = chuk

  jr nahi isRaining {
    he bol "No rain today"
  }
  -- prints: No rain today
yeto saheb
```

---

### 6.2 Loops (`joparyant`)

A **loop** repeats a block of code over and over, as long as a condition remains true. Loops are incredibly useful — they save you from writing the same code many times.

Instead of writing:

```
he bol 1
he bol 2
he bol 3
he bol 4
he bol 5
```

You can write a loop that does it automatically.

#### Basic `joparyant` (while) loop

```
bola saheb
  he ghe i = 0
  joparyant i < 5 {
    he bol i
    i = i + 1
  }
yeto saheb
```

**Expected output:**

```
0
1
2
3
4
```

**Step-by-step execution:**

| Iteration | Value of `i` | Is `i < 5`? | Action                      |
|-----------|-------------|-------------|------------------------------|
| 1st       | 0           | barobr      | Print `0`, set `i` to `1`   |
| 2nd       | 1           | barobr      | Print `1`, set `i` to `2`   |
| 3rd       | 2           | barobr      | Print `2`, set `i` to `3`   |
| 4th       | 3           | barobr      | Print `3`, set `i` to `4`   |
| 5th       | 4           | barobr      | Print `4`, set `i` to `5`   |
| 6th       | 5           | chuk        | Stop! Exit the loop.         |

#### `thamb` — Break (exit the loop early)

Sometimes you want to stop a loop before its condition becomes false. Use **`thamb`** (which means "stop") to immediately exit the loop:

```
bola saheb
  he ghe sum = 0
  he ghe j = 1

  joparyant j < 100 {
    sum = sum + j
    jr sum > 9 {
      thamb              -- exit the loop right now
    }
    j = j + 1
  }

  he bol sum             -- prints: 10
yeto saheb
```

**What happens:** The loop keeps adding numbers (1 + 2 + 3 + 4 = 10). When the sum exceeds 9, `thamb` immediately stops the loop.

#### `pudhe ja` — Continue (skip to the next iteration)

Sometimes you want to skip the rest of the current iteration and move on to the next one. Use **`pudhe ja`** (which means "move forward"):

```
bola saheb
  he ghe i = 0
  joparyant i < 5 {
    jr i == 2 {
      i = i + 1
      pudhe ja          -- skip the rest, go to next iteration
    }
    he bol i
    i = i + 1
  }
yeto saheb
```

**Expected output:**

```
0
1
3
4
```

Notice that `2` is missing — when `i` was `2`, the `pudhe ja` skipped the `he bol` statement and jumped straight to the next iteration.

---

## 7. Functions (`karya`)

A **function** is a reusable block of code that you give a name to. Instead of writing the same code over and over, you write it once inside a function and then "call" that function whenever you need it.

### Defining a function

Use **`karya`** (which means "task" or "work") to define a function:

```
karya add(a, b) {
  parat a + b
}
```

Let us break this down:
- **`karya`** — tells the interpreter you are defining a function
- **`add`** — the name of the function (you choose this)
- **`(a, b)`** — the parameters (inputs) the function accepts
- **`{ ... }`** — the body (the code that runs when the function is called)
- **`parat`** — returns a value back to whoever called the function

### Calling a function

To use a function, write its name followed by the values (arguments) in parentheses:

```
bola saheb

karya add(a, b) {
  parat a + b
}

he ghe result = add(3, 5)
he bol result                -- prints: 8
yeto saheb
```

### Functions with no return value

If a function does not use `parat`, it returns `shunya` (null) by default:

```
bola saheb

karya greet(name) {
  he bol "Namaskar, " + name + "!"
}

he ghe _ = greet("Bol")     -- prints: Namaskar, Bol!
yeto saheb
```

**Note:** When you call a function and want to discard its result, store it in a variable named `_` (or any name). This is because every function call in Maha-Lang must currently be part of an expression.

### Functions with local variables

Variables declared inside a function are **local** — they exist only inside that function and do not affect the rest of your program:

```
bola saheb

karya square(n) {
  he ghe result = n * n
  parat result
}

he ghe answer = square(5)
he bol answer               -- prints: 25
-- "result" does not exist out here; it stays inside the function
yeto saheb
```

### Nested function calls

You can use the result of one function as an argument to another:

```
bola saheb

karya add(a, b) {
  parat a + b
}

-- add(3, add(2, 3)) = add(3, 5) = 8
he ghe r = add(3, add(2, 3))
he bol r                    -- prints: 8
yeto saheb
```

### Recursion

A function can call **itself**. This is called **recursion**. It is a powerful technique for solving problems that can be broken down into smaller versions of the same problem.

#### Example: Factorial

The factorial of a number `n` (written as `n!`) is the product of all numbers from 1 to n:
- `5! = 5 × 4 × 3 × 2 × 1 = 120`
- `0! = 1` (by definition)

```
bola saheb

karya factorial(n) {
  jr n <= 1 {
    parat 1
  }
  parat n * factorial(n - 1)
}

he bol factorial(5)    -- prints: 120
he bol factorial(0)    -- prints: 1
yeto saheb
```

**Step-by-step for `factorial(5)`:**

```
factorial(5)
  = 5 * factorial(4)
  = 5 * 4 * factorial(3)
  = 5 * 4 * 3 * factorial(2)
  = 5 * 4 * 3 * 2 * factorial(1)
  = 5 * 4 * 3 * 2 * 1
  = 120
```

#### Example: Power function

Calculate `base` raised to the power `exp` (e.g., 2³ = 8):

```
bola saheb

karya power(base, exp) {
  he ghe result = 1
  he ghe i = 0
  joparyant i < exp {
    result = result * base
    i = i + 1
  }
  parat result
}

he bol power(2, 3)    -- prints: 8
yeto saheb
```

### Function hoisting

In Maha-Lang, functions are "hoisted" — this means you can call a function **before** it is defined in the file. The interpreter registers all function definitions first, then runs the rest of the code.

```
bola saheb

-- Call the function before defining it
he bol add(1, 2)       -- prints: 3

karya add(a, b) {
  parat a + b
}

yeto saheb
```

---

## 8. Modularization

Currently, Maha-Lang programs are written in a **single file**. There is no built-in support for importing code from other files or splitting your program across multiple files.

**What this means:**

- All your functions, variables, and logic go into one `.bol` file
- For small learning programs, this is perfectly fine
- It keeps things simple and focused

**Current capabilities:**

- You can organize your code within a single file using comments and functions
- Functions help you keep related code together and reusable
- Comments (`--`) help you create visual sections in your file

**Example of organizing a single file:**

```
bola saheb

-- ── Helper Functions ─────────────────
karya add(a, b) {
  parat a + b
}

karya square(n) {
  parat n * n
}

-- ── Main Program ─────────────────────
he ghe result = add(3, square(4))
he bol result    -- prints: 19

yeto saheb
```

---

## 9. Code Examples

Here are complete, runnable programs that bring together the concepts you have learned.

### Example 1: Hello World

The simplest possible Maha-Lang program:

```
bola saheb
  he bol "Namaskar, Jaga!"
yeto saheb
```

**Expected output:**
```
Namaskar, Jaga!
```

**Explanation:**
1. `bola saheb` — starts the program
2. `he bol "Namaskar, Jaga!"` — prints the greeting to the screen
3. `yeto saheb` — ends the program

---

### Example 2: Simple Calculator

A program that performs basic arithmetic on two numbers:

```
bola saheb

  he ghe a = 20
  he ghe b = 4

  he bol "a = " + a
  he bol "b = " + b

  he bol "Sum: " + (a + b)
  he bol "Difference: " + (a - b)
  he bol "Product: " + (a * b)
  he bol "Quotient: " + (a / b)

yeto saheb
```

**Expected output:**
```
a = 20
b = 4
Sum: 24
Difference: 16
Product: 80
Quotient: 5
```

**Explanation:**
1. We declare two variables `a` and `b` with values 20 and 4
2. We print each arithmetic operation using string concatenation with `+`
3. The expressions inside parentheses are evaluated first, then converted to text and joined with the labels

---

### Example 3: FizzBuzz

A classic programming exercise — print numbers from 1 to 20, but:
- If the number is divisible by 3, print "Fizz"
- If the number is divisible by 5, print "Buzz"
- If the number is divisible by both 3 and 5, print "FizzBuzz"
- Otherwise, print the number

Since Maha-Lang does not have a modulo (`%`) operator, we can use a creative workaround with a counter:

```
bola saheb

  he ghe i = 1
  he ghe countOf3 = 0
  he ghe countOf5 = 0

  joparyant i <= 15 {
    countOf3 = countOf3 + 1
    countOf5 = countOf5 + 1

    he ghe printed = chuk

    jr countOf3 == 3 ani countOf5 == 5 {
      he bol "FizzBuzz"
      countOf3 = 0
      countOf5 = 0
      printed = barobr
    }

    jr nahi printed ani countOf3 == 3 {
      he bol "Fizz"
      countOf3 = 0
      printed = barobr
    }

    jr nahi printed ani countOf5 == 5 {
      he bol "Buzz"
      countOf5 = 0
      printed = barobr
    }

    jr nahi printed {
      he bol i
    }

    i = i + 1
  }

yeto saheb
```

**Expected output:**
```
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
```

**Explanation:**
1. We maintain two counters that track multiples of 3 and 5
2. When a counter hits its target, we print the corresponding word and reset the counter
3. The `printed` flag prevents printing both a word and the number on the same iteration

---

### Example 4: Recursive Functions

A program demonstrating multiple recursive functions:

```
bola saheb

-- Factorial: n! = n × (n-1) × ... × 1
karya factorial(n) {
  jr n <= 1 {
    parat 1
  }
  parat n * factorial(n - 1)
}

-- Absolute value: make negative numbers positive
karya abs(x) {
  jr x < 0 {
    parat x * -1
  }
  parat x
}

-- Power: base raised to exp
karya power(base, exp) {
  he ghe result = 1
  he ghe i = 0
  joparyant i < exp {
    result = result * base
    i = i + 1
  }
  parat result
}

-- Maximum of two numbers
karya max(a, b) {
  jr a > b {
    parat a
  }
  parat b
}

he bol factorial(5)    -- 120
he bol factorial(0)    -- 1
he bol power(2, 3)     -- 8
he bol max(3, 1)       -- 3

yeto saheb
```

**Expected output:**
```
120
1
8
3
```

---

## 10. Common Mistakes & Tips

Here are some common mistakes beginners make, along with explanations and tips to avoid them.

### Mistake 1: Forgetting `bola saheb` or `yeto saheb`

```
-- ❌ This will cause an error
he bol "Hello"
```

**Why it happens:** Every Maha-Lang program needs its opening and closing markers.

**Fix:** Always wrap your code:

```
-- ✅ Correct
bola saheb
  he bol "Hello"
yeto saheb
```

---

### Mistake 2: Using a variable before declaring it

```
bola saheb
  he bol x       -- ❌ Error: x is not declared
yeto saheb
```

**Why it happens:** The interpreter does not know what `x` is because you never created it.

**Fix:** Declare the variable first with `he ghe`:

```
bola saheb
  he ghe x = 10
  he bol x       -- ✅ prints: 10
yeto saheb
```

---

### Mistake 3: Declaring the same variable twice

```
bola saheb
  he ghe x = 10
  he ghe x = 20   -- ❌ Error: x is already declared
yeto saheb
```

**Why it happens:** You can only use `he ghe` once per variable name in the same scope.

**Fix:** Use `=` (without `he ghe`) to change the value of an existing variable:

```
bola saheb
  he ghe x = 10
  x = 20          -- ✅ Change the value
  he bol x         -- prints: 20
yeto saheb
```

---

### Mistake 4: Missing curly braces in conditions and loops

```
bola saheb
  he ghe x = 5
  jr x > 3
    he bol "big"   -- ❌ Error: missing { }
yeto saheb
```

**Why it happens:** The `jr`, `nahitr jr`, `nahitr`, and `joparyant` keywords all require curly braces `{ }` around their code blocks.

**Fix:**

```
bola saheb
  he ghe x = 5
  jr x > 3 {
    he bol "big"   -- ✅ Correct
  }
yeto saheb
```

---

### Mistake 5: Using a non-boolean condition in `jr` or `joparyant`

```
bola saheb
  he ghe x = 5
  jr x {            -- ❌ Error: x is a number, not a boolean
    he bol "yes"
  }
yeto saheb
```

**Why it happens:** Maha-Lang requires conditions to be boolean values (`barobr` or `chuk`). Unlike some languages, numbers and strings are not automatically treated as true or false.

**Fix:** Use a comparison operator to create a boolean:

```
bola saheb
  he ghe x = 5
  jr x > 0 {       -- ✅ This produces a boolean
    he bol "yes"
  }
yeto saheb
```

---

### Mistake 6: Dividing by zero

```
bola saheb
  he bol 10 / 0    -- ❌ Error: division by zero
yeto saheb
```

**Why it happens:** Division by zero is mathematically undefined, and Maha-Lang will catch this and show an error.

**Fix:** Always ensure the divisor is not zero before dividing.

---

### Mistake 7: Forgetting to update the loop variable

```
bola saheb
  he ghe i = 0
  joparyant i < 5 {
    he bol i
    -- ❌ Forgot: i = i + 1
    -- This loop will run FOREVER!
  }
yeto saheb
```

**Why it happens:** If `i` never changes, the condition `i < 5` is always true, creating an **infinite loop**.

**Fix:** Always update your loop variable inside the loop:

```
bola saheb
  he ghe i = 0
  joparyant i < 5 {
    he bol i
    i = i + 1     -- ✅ Don't forget this!
  }
yeto saheb
```

---

### Mistake 8: Mismatched function argument count

```
bola saheb
  karya add(a, b) {
    parat a + b
  }

  he bol add(1)       -- ❌ Error: add needs 2 arguments, got 1
yeto saheb
```

**Why it happens:** The function was defined to accept 2 parameters, but you only passed 1.

**Fix:** Always pass the exact number of arguments the function expects:

```
he bol add(1, 2)      -- ✅ Correct: 2 arguments
```

---

### General Tips

1. **Start small.** Write a tiny program, run it, see the output, then add more. Do not try to write a big program all at once.
2. **Use comments.** Write `--` notes to explain what each part of your code does. This helps you when you come back to the code later.
3. **Read the error messages.** Maha-Lang's error messages tell you what went wrong and on which line. Read them carefully — they are your best debugging tool.
4. **Test one thing at a time.** If something is not working, isolate the problem. Create a small program that only tests the part that is broken.
5. **Do not be afraid to experiment.** Maha-Lang is a safe playground. You cannot break anything permanently. Try things, see what happens, learn from the results.

---

## 11. Keyword Reference

Here is a complete list of every keyword in Maha-Lang:

| Keyword        | Meaning              | Description                                       |
|----------------|----------------------|---------------------------------------------------|
| `bola saheb`   | Program start        | Marks the beginning of your program               |
| `yeto saheb`   | Program end          | Marks the end of your program                     |
| `he ghe`       | Declare variable     | Creates a new variable: `he ghe x = 10`           |
| `he bol`       | Print                | Prints a value to the screen: `he bol "Hello"`    |
| `jr`           | If                   | Starts a conditional: `jr x > 5 { ... }`          |
| `nahitr jr`    | Else if              | Additional condition: `nahitr jr x > 3 { ... }`   |
| `nahitr`       | Else                 | Default case: `nahitr { ... }`                    |
| `joparyant`    | While                | Repeats while true: `joparyant i < 10 { ... }`    |
| `thamb`        | Break                | Immediately exits the current loop                |
| `pudhe ja`     | Continue             | Skips to the next loop iteration                  |
| `karya`        | Function             | Defines a function: `karya add(a, b) { ... }`     |
| `parat`        | Return               | Returns a value from a function: `parat x + y`    |
| `barobr`       | True                 | Boolean true value                                |
| `chuk`         | False                | Boolean false value                               |
| `shunya`       | Null                 | Represents "no value" or "nothing"                |
| `ani`          | AND                  | Logical AND: `a ani b`                            |
| `kinva`        | OR                   | Logical OR: `a kinva b`                           |
| `nahi`         | NOT                  | Logical NOT: `nahi a`                             |
| `--`           | Comment              | Everything after `--` on a line is ignored        |

---

## 12. Conclusion & Next Steps

### What you have learned

If you have read through this documentation and tried the examples, you now understand:

- **What Maha-Lang is** and why it was created
- **How to set up your environment** and run programs
- **Variables** — how to store and change values
- **Data types** — numbers, strings, booleans, and null
- **Operators** — arithmetic, comparison, and logical
- **Control flow** — making decisions with `jr` and repeating with `joparyant`
- **Functions** — reusable blocks of code, including recursion
- **Common mistakes** and how to avoid them

These are the **fundamental building blocks** of programming. Every programming language has these same concepts — variables, conditions, loops, and functions. The syntax may look different, but the logic is the same.

### What to do next

1. **Experiment!** Modify the examples. Change numbers, add conditions, write new functions. See what happens. Break things on purpose, then fix them.

2. **Write your own programs.** Start with small ideas:
   - A program that counts down from 10 to 1
   - A function that checks if a number is even or odd
   - A program that prints a multiplication table

3. **Try the Web Playground.** Maha-Lang has a browser-based playground where you can write and run code without installing anything. It includes a code editor with syntax highlighting and example programs built in.

4. **Explore the source code.** One of the most valuable things about Maha-Lang is that it is **open source** and easy to read. The entire interpreter is built in a clean pipeline:
   - **Lexer** — reads your source code character by character and creates tokens
   - **Parser** — takes the tokens and builds a tree structure (AST)
   - **Interpreter** — walks the tree and executes your program

   Understanding how this pipeline works will teach you how *all* programming languages work under the hood.

5. **Have fun.** Remember — Maha-Lang is your playground. There is no pressure, no deadlines, no right or wrong way to explore. Every line of code you write is a step forward in your learning journey.

---

> **Maha-Lang** — Built for learning. Designed with love. 🚀
