import { useState } from "react";
import "./Docs.css";

const SECTIONS = [
  { id: "getting-started", label: "Getting Started" },
  { id: "authentication", label: "Authentication" },
  { id: "shorten-url", label: "POST /shorten" },
  { id: "get-info", label: "GET /info/:code" },
  { id: "rate-limits", label: "Rate Limits" },
  { id: "errors", label: "Error Reference" },
];

export default function Docs() {
  const [active, setActive] = useState("getting-started");

  return (
    <div className="docs-page">
      {/* Sidebar */}
      <aside className="docs-sidebar">
        <p className="sidebar-heading">API Reference</p>
        <nav className="sidebar-nav">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`sidebar-link ${active === s.id ? "sidebar-link--active" : ""}`}
              onClick={() => setActive(s.id)}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="sidebar-meta">
          <p className="sidebar-version">API Version: <strong>v1.0</strong></p>
          <p className="sidebar-base">Base URL:</p>
          <code className="sidebar-url">http://localhost:8080</code>
        </div>
      </aside>

      {/* Content */}
      <main className="docs-content">
        <div className="docs-intro">
          <span className="docs-badge">Documentation</span>
          <h1 className="docs-title">LinkSnap API</h1>
          <p className="docs-subtitle">
            Integrate URL shortening into your application with our simple REST API.
          </p>
        </div>

        {/* Getting Started */}
        <section id="getting-started" className="doc-section">
          <h2>Getting Started</h2>
          <p>
            The LinkSnap API lets you shorten URLs, retrieve link info, and manage your
            links programmatically. All requests and responses use <code>JSON</code>.
          </p>
          <div className="doc-callout">
            <strong>Base URL</strong>
            <CodeBlock code="http://localhost:8080" />
          </div>
        </section>

        {/* Authentication */}
        <section id="authentication" className="doc-section">
          <h2>Authentication</h2>
          <p>
            Free-tier requests require no authentication. Pro and Enterprise plans
            use API keys passed in the request header.
          </p>
          <CodeBlock
            label="Header"
            code={`Authorization: Bearer YOUR_API_KEY`}
          />
        </section>

        {/* POST /shorten */}
        <section id="shorten-url" className="doc-section">
          <h2>POST /shorten</h2>
          <p>Shortens a long URL and returns a short link.</p>

          <h3>Request</h3>
          <div className="endpoint-row">
            <span className="method-badge method-post">POST</span>
            <code>/shorten</code>
          </div>
          <CodeBlock
            label="Request body"
            code={`{
  "url": "https://example.com/very/long/path?with=query&params=here"
}`}
          />

          <h3>Response</h3>
          <CodeBlock
            label="200 OK"
            code={`{
  "shortUrl": "http://localhost:8080/abc123",
  "code": "abc123",
  "originalUrl": "https://example.com/very/long/path?with=query&params=here",
  "createdAt": "2026-03-31T10:00:00Z"
}`}
          />

          <h3>Parameters</h3>
          <table className="param-table">
            <thead>
              <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><code>url</code></td>
                <td>string</td>
                <td><span className="req-badge">Yes</span></td>
                <td>The long URL to shorten. Must include <code>http://</code> or <code>https://</code>.</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* GET /info */}
        <section id="get-info" className="doc-section">
          <h2>GET /info/:code</h2>
          <p>Retrieves metadata about a shortened link.</p>

          <div className="endpoint-row">
            <span className="method-badge method-get">GET</span>
            <code>/info/abc123</code>
          </div>

          <CodeBlock
            label="200 OK"
            code={`{
  "code": "abc123",
  "originalUrl": "https://example.com/...",
  "clicks": 142,
  "createdAt": "2026-03-31T10:00:00Z",
  "lastClickedAt": "2026-03-31T14:22:00Z"
}`}
          />
        </section>

        {/* Rate Limits */}
        <section id="rate-limits" className="doc-section">
          <h2>Rate Limits</h2>
          <p>Rate limits are applied per IP address for unauthenticated requests.</p>
          <table className="param-table">
            <thead>
              <tr><th>Plan</th><th>Limit</th><th>Window</th></tr>
            </thead>
            <tbody>
              <tr><td>Free</td><td>10 requests</td><td>Per minute</td></tr>
              <tr><td>Pro</td><td>300 requests</td><td>Per minute</td></tr>
              <tr><td>Enterprise</td><td>Custom</td><td>—</td></tr>
            </tbody>
          </table>
          <div className="doc-callout doc-callout--warning">
            When rate limited, the API returns <code>429 Too Many Requests</code>.
          </div>
        </section>

        {/* Error Reference */}
        <section id="errors" className="doc-section">
          <h2>Error Reference</h2>
          <p>All errors follow a consistent shape:</p>
          <CodeBlock
            label="Error body"
            code={`{
  "error": "INVALID_URL",
  "message": "The provided URL is not valid.",
  "status": 400
}`}
          />
          <table className="param-table">
            <thead>
              <tr><th>Status</th><th>Code</th><th>Meaning</th></tr>
            </thead>
            <tbody>
              <tr><td>400</td><td>INVALID_URL</td><td>URL is missing or malformed.</td></tr>
              <tr><td>401</td><td>UNAUTHORIZED</td><td>API key is missing or invalid.</td></tr>
              <tr><td>404</td><td>NOT_FOUND</td><td>Short code does not exist.</td></tr>
              <tr><td>429</td><td>RATE_LIMITED</td><td>Too many requests.</td></tr>
              <tr><td>500</td><td>SERVER_ERROR</td><td>Internal server error.</td></tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

function CodeBlock({ label, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block">
      {label && <span className="code-label">{label}</span>}
      <button className="code-copy-btn" onClick={handleCopy}>
        {copied ? "✓ Copied" : "Copy"}
      </button>
      <pre><code>{code}</code></pre>
    </div>
  );
}
