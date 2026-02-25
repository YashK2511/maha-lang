/**
 * TokenKind — every distinct token type in Bol.
 *
 * Why an enum?
 *   Enums give us exhaustiveness checks in switch statements.
 *   When we add a new token kind, TypeScript will immediately
 *   tell us every place that needs to handle it.
 *
 * Compound keywords (HE_GHE, HE_BOL, BOLA_SAHEB, YETO_SAHEB, NAHITR_JR, PUDHE_JA)
 * are emitted as a single token even though they are two words.
 * The Lexer peeks ahead to detect them.
 */
export enum TokenKind {
    // ── Compound keywords (two-word Marathi tokens) ──────────────
    BOLA_SAHEB = "BOLA_SAHEB",   // "bola saheb"  — program start
    YETO_SAHEB = "YETO_SAHEB",   // "yeto saheb"  — program end
    HE_GHE = "HE_GHE",           // "he ghe"       — variable declaration
    HE_BOL = "HE_BOL",           // "he bol"       — print statement
    NAHITR_JR = "NAHITR_JR",     // "nahitr jr"    — else if   [Phase 2]
    PUDHE_JA = "PUDHE_JA",       // "pudhe ja"     — continue   [Phase 2]

    // ── Single-word keywords ──────────────────────────────────────
    JR = "JR",                   // "jr"           — if         [Phase 2]
    NAHITR = "NAHITR",           // "nahitr"       — else       [Phase 2]
    JOPARYANT = "JOPARYANT",     // "joparyant"    — while      [Phase 2]
    THAMB = "THAMB",             // "thamb"        — break      [Phase 2]
    KARYA = "KARYA",             // "karya"        — function   [Phase 3]
    PARAT = "PARAT",             // "parat"        — return     [Phase 3]
    SHUNYA = "SHUNYA",           // "shunya"       — null       [Phase 3]

    KHARA = "KHARA",             // "barobr"        — true       [Phase 2]
    KHOTA = "KHOTA",             // "chuk"        — false      [Phase 2]

    // ── Logical operator keywords ─────────────────────────────────
    ANI = "ANI",                 // "ani"          — and        [Phase 2]
    KINVA = "KINVA",             // "kinva"        — or         [Phase 2]
    NAHI = "NAHI",               // "nahi"         — not        [Phase 2]

    // ── Literals ─────────────────────────────────────────────────
    NUMBER = "NUMBER",           // e.g.  42  or  3.14
    STRING = "STRING",           // e.g.  "Namaskar"

    // ── Identifiers ──────────────────────────────────────────────
    IDENTIFIER = "IDENTIFIER",   // e.g.  x  vel  ghara

    // ── Arithmetic operators ──────────────────────────────────────
    PLUS = "PLUS",               // +
    MINUS = "MINUS",             // -
    STAR = "STAR",               // *
    SLASH = "SLASH",             // /

    // ── Comparison operators ──────────────────────────────────────
    EQ_EQ = "EQ_EQ",             // ==              [Phase 2]
    BANG_EQ = "BANG_EQ",         // !=              [Phase 2]
    LT = "LT",                   // <
    GT = "GT",                   // >
    LT_EQ = "LT_EQ",             // <=              [Phase 2]
    GT_EQ = "GT_EQ",             // >=              [Phase 2]

    // ── Punctuation ───────────────────────────────────────────────
    ASSIGN = "ASSIGN",           // =
    LPAREN = "LPAREN",           // (
    RPAREN = "RPAREN",           // )
    LBRACE = "LBRACE",           // {  — control-flow block open  [Phase 2]
    RBRACE = "RBRACE",           // }  — control-flow block close [Phase 2]
    COMMA = "COMMA",             // ,  — param/arg separator      [Phase 3]

    // ── Structure ─────────────────────────────────────────────────
    NEWLINE = "NEWLINE",         // \n  — statement delimiter
    EOF = "EOF",                 // end of input
}
