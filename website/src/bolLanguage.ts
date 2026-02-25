import { Monaco } from "@monaco-editor/react";

export function registerBolLanguage(monaco: Monaco) {
    monaco.languages.register({ id: "bol" });

    monaco.languages.setMonarchTokensProvider("bol", {
        keywords: [
            "bola", "saheb", "yeto", "he", "ghe", "bol", "jr", "nahitr",
            "joparyant", "thamb", "pudhe", "ja", "karya", "parat",
            "barobr", "chuk", "shunya", "ani", "kinva", "nahi"
        ],

        tokenizer: {
            root: [
                // Keywords and multi-word keywords
                [/bola saheb|yeto saheb|he ghe|he bol|nahitr jr|pudhe ja/, "keyword"],
                [/[a-z_][\w]*/, {
                    cases: {
                        "@keywords": "keyword",
                        "@default": "identifier",
                    },
                }],

                // Strings
                [/"([^"\\]|\\.)*$/, "string.invalid"],
                [/"/, "string", "@string"],

                // Comments
                [/--.*$/, "comment"],

                // Numbers
                [/\d+/, "number"],

                // Operators
                [/[+\-*/=<>!]+/, "operator"],
                [/[{}()\[\],.]/, "delimiter"],
            ],

            string: [
                [/[^\\"]+/, "string"],
                [/\\./, "string.escape"],
                [/"/, "string", "@pop"],
            ],
        },
    });

    // Define a simple theme for Bol
    monaco.editor.defineTheme("bol-theme", {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "keyword", foreground: "38bdf8", fontStyle: "bold" },
            { token: "string", foreground: "22c55e" },
            { token: "comment", foreground: "94a3b8", fontStyle: "italic" },
            { token: "number", foreground: "f59e0b" },
            { token: "operator", foreground: "94a3b8" },
        ],
        colors: {
            "editor.background": "#0f172a",
        },
    });
}
