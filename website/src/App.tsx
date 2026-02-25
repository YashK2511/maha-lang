import { useState, useEffect, useCallback, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { runBol, RunResult } from './runBol';
import './App.css';
import { registerBolLanguage } from './bolLanguage';

const EXAMPLES = {
  hello: `bola saheb
-- Hello World
he bol "Hello World!"
yeto saheb`,
  factorial: `bola saheb
-- Factorial using recursion
karya factorial(n) {
  jr n <= 1 {
    parat 1
  }
  parat n * factorial(n - 1)
}

he bol "Factorial of 5 is:"
he bol factorial(5)
yeto saheb`,
  fibonacci: `bola saheb
-- Fibonacci sequence
he ghe a = 0
he ghe b = 1
he ghe temp = 0
he ghe n = 10

he bol "Fibonacci up to " + n + " terms:"

joparyant n > 0 {
  he bol a
  temp = a + b
  a = b
  b = temp
  n = n - 1
}
yeto saheb`
};

const DEFAULT_CODE = EXAMPLES.hello;

function App() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'ready' | 'running' | 'success' | 'error'>('ready');
  const [selectedExample, setSelectedExample] = useState('hello');
  const playgroundRef = useRef<HTMLDivElement>(null);

  const handleRun = useCallback(() => {
    setStatus('running');
    setOutput([]);
    setError(null);

    // Small timeout to show transition if fast
    setTimeout(() => {
      const result: RunResult = runBol(code);
      setOutput(result.lines);
      setError(result.error);
      setStatus(result.error ? 'error' : 'success');
    }, 50);
  }, [code]);

  const handleExampleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value as keyof typeof EXAMPLES;
    setSelectedExample(key);
    setCode(EXAMPLES[key]);
    setStatus('ready');
    setOutput([]);
    setError(null);
  };

  const scrollToPlayground = () => {
    playgroundRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const playgroundInView = playgroundRef.current &&
          window.scrollY + window.innerHeight > playgroundRef.current.offsetTop;

        if (playgroundInView) {
          e.preventDefault();
          handleRun();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRun]);

  return (
    <div className="app-container">
      {/* 1️⃣ Hero Section */}
      <header className="hero">
        <h1 className="hero-title">MAHA LANG</h1>
        <p className="hero-tagline">A programming language build from scratch.</p>
        <p className="hero-subtext">A programming language built for marathi people.</p>
        <p className="hero-credit">Created by Yash Kamble</p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={scrollToPlayground}>Try Playground</button>
        </div>
      </header>

      {/* 2️⃣ Installation Section */}
      <section className="installation section">
        <div className="section-container">
          <h2 className="section-title">Installation</h2>
          <div className="installation-grid">
            <div className="command-box">
              <code className="command">npm i -g bol-lang</code>
              <span className="label">Install CLI</span>
            </div>
            <div className="command-box">
              <code className="command">bol run examples/maza.bol</code>
              <span className="label">Run Code</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ Playground Section */}
      <section className="playground section" ref={playgroundRef} id="playground">
        <div className="section-container">
          <h2 className="section-title">Playground</h2>
          <div className="playground-container">
            <div className="playground-toolbar">
              <div className="toolbar-left">
                <select
                  className="example-selector"
                  value={selectedExample}
                  onChange={handleExampleChange}
                >
                  <option value="hello">Hello World</option>
                  <option value="factorial">Factorial</option>
                  <option value="fibonacci">Fibonacci</option>
                </select>
              </div>
              <div className="toolbar-right">
                <div className={`status-badge ${status}`}>
                  {status === 'ready' && 'Ready'}
                  {status === 'running' && 'Running...'}
                  {status === 'success' && 'Success'}
                  {status === 'error' && 'Error'}
                </div>
                <button
                  className="run-button"
                  onClick={handleRun}
                  disabled={status === 'running'}
                >
                  {status === 'running' ? 'Running...' : 'Run'}
                </button>
              </div>
            </div>

            <div className="editor-console-wrapper">
              <div className="editor-panel">
                <div className="panel-header">
                  <span>Editor</span>
                  <span className="shortcut-hint">Ctrl + Enter</span>
                </div>
                <div className="editor-inner">
                  <Editor
                    height="100%"
                    language="bol"
                    theme="bol-theme"
                    beforeMount={registerBolLanguage}
                    value={code}
                    onChange={(val) => setCode(val || '')}
                    options={{
                      fontSize: 14,
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      padding: { top: 16 },
                      fontFamily: "'Fira Code', monospace",
                    }}
                  />
                </div>
              </div>

              <div className="console-panel">
                <div className="panel-header">Console Output</div>
                <div className="console-content">
                  {output.length === 0 && !error && (
                    <div className="empty-message">Output will appear here...</div>
                  )}
                  {output.map((line, i) => (
                    <div key={i} className="console-line">{line}</div>
                  ))}
                  {error && (
                    <div className="console-error">
                      <div className="error-message">{error}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4️⃣ Documentation / Syntax Section */}
      <section className="docs section">
        <div className="section-container">
          <h2 className="section-title">Documentation</h2>
          <div className="docs-grid">
            <div className="doc-card">
              <h3>Start and End</h3>
              <p>Start and End your code using the <code>bola saheb</code> and <code>yeto saheb</code> keyword.</p>
              <div className="code-snippet">bola saheb {'{'} ... {'}'} yeto saheb</div>
            </div>
            <div className="doc-card">
              <h3>Variables</h3>
              <p>Declare variables using the <code>he ghe</code> keyword.</p>
              <div className="code-snippet">he ghe x = 10</div>
            </div>
            <div className="doc-card">
              <h3>Print Statements</h3>
              <p>Output values to the console using <code>he bol</code>.</p>
              <div className="code-snippet">he bol "Namaskar World!"</div>
            </div>
            <div className="doc-card">
              <h3>Conditionals</h3>
              <p>Use <code>jr</code> for conditional execution.</p>
              <div className="code-snippet">jr x &gt; 5 {'{'} ... {'}'}</div>
            </div>
            <div className="doc-card">
              <h3>Loops</h3>
              <p>Execute code blocks repeatedly using <code>joparyant</code>.</p>
              <div className="code-snippet">joparyant x &gt; 0 {'{'} ... {'}'}</div>
            </div>
            <div className="doc-card">
              <h3>Functions</h3>
              <p>Define reusable logic with <code>karya</code>.</p>
              <div className="code-snippet">karya f(n) {'{'} ... {'}'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5️⃣ Footer */}
      <footer className="footer">
        <div className="section-container">
          <p>Developed by <strong>Yash Kamble</strong></p>
          <p className="footer-contact">Feel free to reach out!</p>
          <div className="footer-links">
            <a
              href="https://github.com/YashK2511"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-btn github-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/yash-kamble-214b5130b/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-btn linkedin-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
