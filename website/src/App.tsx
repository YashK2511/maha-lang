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
          <p>Developed by Yash Kamble</p>
          <div className="footer-links">
            <a href="https://github.com/YashK2511/bol-lang" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
