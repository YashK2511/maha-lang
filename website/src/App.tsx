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

  const handleReset = () => {
    setCode(EXAMPLES[selectedExample as keyof typeof EXAMPLES]);
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
      {/* SECTION 1: HERO / INTRO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-logo">🗣️ BOL</div>
          <h1 className="hero-title">A toy programming language built from scratch</h1>
          <p className="hero-subtitle">
            A Marathi-flavoured interpreted language designed for learning how compilers and interpreters work.
          </p>
          <div className="hero-cli">
            <code>bol run examples/maza.bol</code>
          </div>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={scrollToPlayground}>Try Playground</button>
            <a href="https://github.com/YashK2511/bol-lang" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">View GitHub</a>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT I BUILT */}
      <section className="built section">
        <div className="section-container">
          <h2 className="section-title">What I Built</h2>
          <div className="content-box">
            <p className="text-large">
              BOL is an interpreted programming language designed to be small, explicit, and educational.
            </p>
            <div className="feature-grid">
              <div className="feature-item">
                <strong>Custom Interpreter</strong>
                <p>Written entirely in TypeScript with zero dependencies.</p>
              </div>
              <div className="feature-item">
                <strong>End-to-End Pipeline</strong>
                <p>From character stream to AST execution.</p>
              </div>
              <div className="feature-item">
                <strong>CLI & Web</strong>
                <p>Packaged as a production-ready CLI and this web playground.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS (PIPELINE) */}
      <section className="works section">
        <div className="section-container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-description">
            The BOL engine executes code in three distinct phases.
          </p>
          <div className="pipeline">
            <div className="pipeline-step">
              <div className="step-tag">1</div>
              <h3>Lexer</h3>
              <p>Breaks source code into <strong>Tokens</strong> like keywords, numbers, and strings.</p>
            </div>
            <div className="pipeline-arrow">→</div>
            <div className="pipeline-step">
              <div className="step-tag">2</div>
              <h3>Parser</h3>
              <p>Builds an <strong>Abstract Syntax Tree</strong> (AST) using recursive descent.</p>
            </div>
            <div className="pipeline-arrow">→</div>
            <div className="pipeline-step">
              <div className="step-tag">3</div>
              <h3>Interpreter</h3>
              <p>Walks the <strong>AST</strong> and performs runtime operations with scope and environment management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PLAYGROUND */}
      <section className="playground section" ref={playgroundRef} id="playground">
        <div className="section-container full-width">
          <div className="playground-header">
            <h2 className="section-title">Interative Playground</h2>
            <p className="section-description white">Write BOL code and see it execute in real-time within your browser.</p>
          </div>

          <div className="playground-container">
            <header className="playground-toolbar">
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
                <button className="reset-button" onClick={handleReset}>Ghalav (Reset)</button>
              </div>
              <div className="actions">
                <button
                  className={`run-button ${status === 'running' ? 'loading' : ''}`}
                  onClick={handleRun}
                  disabled={status === 'running'}
                >
                  {status === 'running' ? 'Chaltoy...' : 'Pala (Run)'}
                </button>
                <div className={`status-badge ${status}`}>
                  {status === 'ready' && 'Tayyar'}
                  {status === 'running' && 'Chalu'}
                  {status === 'success' && 'Yashasvi'}
                  {status === 'error' && 'Chuk'}
                </div>
              </div>
            </header>

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
                    <div className="empty-message">Output ithe disel...</div>
                  )}
                  {output.map((line, i) => (
                    <div key={i} className="console-line">{line}</div>
                  ))}
                  {error && (
                    <div className="console-error">
                      <span className="error-icon">✗</span>
                      <span className="error-message">{error}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW TO USE */}
      <section className="usage section">
        <div className="section-container">
          <h2 className="section-title">How To Use</h2>
          <div className="usage-grid">
            <div className="usage-card">
              <h3>For Web</h3>
              <p>Use the editor above to experiment with variables, loops, and functions instantly.</p>
            </div>
            <div className="usage-card">
              <h3>For CLI</h3>
              <p>Install via npm and run local files:</p>
              <code>bol run maza.bol</code>
            </div>
            <div className="usage-card">
              <h3>Syntax</h3>
              <ul>
                <li><code>he ghe x = 5</code> — Declare</li>
                <li><code>he bol x</code> — Print</li>
                <li><code>jr x &gt; 0</code> — If</li>
                <li><code>karya f()</code> — Function</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FOOTER */}
      <footer className="footer-v2">
        <div className="footer-content">
          <div className="footer-links">
            <a href="https://github.com/YashK2511/bol-lang" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
          </div>
          <p className="copyright">Built for learning by Yash • 2026</p>
          <p className="disclaimer">
            This is a learning-focused toy language, not intended for production use.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
