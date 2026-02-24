import { useState, useEffect, useCallback, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { runBol, RunResult } from './runBol';
import './App.css';

const DEFAULT_CODE = `bola saheb

he bol "Hello World!"

yeto saheb`;

function App() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'ready' | 'running' | 'success' | 'error'>('ready');
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
      {/* Section 1: Hero */}
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
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">View GitHub</a>
          </div>
        </div>
      </section>

      {/* Section 2: What I Built (Architecture) */}
      <section className="architecture section">
        <div className="section-container">
          <h2 className="section-title">What I Built</h2>
          <p className="section-description">
            I built a complete end-to-end execution pipeline in TypeScript, following the classic stages of language implementation.
          </p>
          <div className="architecture-grid">
            <div className="arch-card">
              <div className="arch-icon">🔍</div>
              <h3>Lexer</h3>
              <p>Converts raw source code into a stream of meaningful tokens.</p>
            </div>
            <div className="arch-card">
              <div className="arch-icon">🌳</div>
              <h3>Parser</h3>
              <p>Transforms tokens into an Abstract Syntax Tree (AST) using recursive descent.</p>
            </div>
            <div className="arch-card">
              <div className="arch-icon">⚙️</div>
              <h3>Interpreter</h3>
              <p>Walks the AST and executes logic directly with a custom environment and scope management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Playground */}
      <section className="playground section" ref={playgroundRef}>
        <div className="section-container full-width">
          <div className="playground-header">
            <h2 className="section-title">Try it Yourself</h2>
            <p className="section-description white">Edit the code and click Run to see how the language executes.</p>
          </div>

          <div className="playground-container">
            <header className="playground-toolbar">
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
                  {status === 'running' && 'Chalu Aahe'}
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
                    defaultLanguage="javascript"
                    theme="vs-dark"
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

      {/* Section 4: Language Syntax */}
      <section className="syntax section">
        <div className="section-container">
          <h2 className="section-title">Language Syntax</h2>
          <div className="syntax-grid">
            <div className="syntax-item">
              <h3>Variables</h3>
              <pre><code>{`he ghe x = 10\nhe bol x`}</code></pre>
              <p>Declare with <code>he ghe</code> and print with <code>he bol</code>.</p>
            </div>
            <div className="syntax-item">
              <h3>Control Flow</h3>
              <pre><code>{`jr x > 5 {\n  he bol "mota"\n}`}</code></pre>
              <p>Classic <code>jr</code> (if) and <code>joparyant</code> (while) logic.</p>
            </div>
            <div className="syntax-item">
              <h3>Functions</h3>
              <pre><code>{`karya add(a, b) {\n  parat a + b\n}`}</code></pre>
              <p>Define with <code>karya</code> and return with <code>parat</code>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Quick Start */}
      <section className="quick-start section">
        <div className="section-container">
          <h2 className="section-title">How to Use It</h2>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <div className="step-text">Write BOL code in the playground or a <code>.bol</code> file.</div>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <div className="step-text">Run it using the CLI: <code>bol run file.bol</code></div>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <div className="step-text">See the results instantly in your console or browser.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Footer */}
      <footer className="footer-v2">
        <div className="footer-content">
          <div className="footer-links">
            <a href="https://github.com">GitHub Repository</a>
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
