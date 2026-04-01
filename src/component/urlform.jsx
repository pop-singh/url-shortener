import React, { useState } from "react";
import "./urlform.css";
import { shortenUrl } from "./../service/service";
import { Link } from "react-router-dom";

const MAX_HISTORY = 5;

function isValidUrl(value) {
  return /^https?:\/\/.+/.test(value.trim());
}

function UrlForm() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  const handleShortener = async () => {
    if (url.trim() === "") {
      setError("Please enter a URL.");
      return;
    }
    if (!isValidUrl(url)) {
      setError("URL must start with http:// or https://");
      return;
    }

    setLoading(true);
    setError("");
    setShortUrl("");
    setCopied(false);

    try {
      const response = await shortenUrl(url);
      const result = response.data.shortUrl;
      setShortUrl(result);
      setHistory((prev) => [
        { original: url, short: result },
        ...prev.filter((h) => h.original !== url),
      ].slice(0, MAX_HISTORY));
    } catch (err) {
      console.error("Error shortening URL:", err);
      setError("Error shortening URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setUrl("");
    setError("");
    setShortUrl("");
    setCopied(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleShortener();
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="form-header">
        <span className="form-icon">🔗</span>
        <h1>URL Shortener</h1>
        <p className="form-subtitle">Paste a long URL and get a short link instantly</p>
      </div>

      {/* Input */}
      <label htmlFor="url-input">Enter Link</label>
      <div className="input-wrapper">
        <input
          id="url-input"
          type="text"
          placeholder="https://example.com/very/long/url"
          value={url}
          onChange={(e) => { setUrl(e.target.value); setError(""); }}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        {url && (
          <button
            className="clear-btn"
            onClick={handleClear}
            aria-label="Clear input"
            type="button"
          >
            ✕
          </button>
        )}
      </div>

      {error && <span className="error-message">{error}</span>}

      <button
        className={`shorten-btn${loading ? " loading" : ""}`}
        onClick={handleShortener}
        disabled={loading}
      >
        {loading ? <span className="spinner" /> : null}
        {loading ? "Shortening…" : "Shorten URL"}
      </button>

      {/* Result */}
      {shortUrl && (
        <div className="result">
          <p className="result-label">Short URL</p>
          <a href={shortUrl} target="_blank" rel="noreferrer" className="result-url">
            {shortUrl}
          </a>
          <div className="result-actions">
            <button className="action-btn copy-btn" onClick={handleCopy}>
              {copied ? "✓ Copied!" : "📋 Copy"}
            </button>
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="action-btn open-btn"
            >
              ↗ Open
            </a>
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="history-section">
          <p className="history-title">Recent</p>
          <ul className="history-list">
            {history.map((item, i) => (
              <li key={i} className="history-item">
                <span className="history-original">{item.original}</span>
                <a
                  href={item.short}
                  target="_blank"
                  rel="noreferrer"
                  className="history-short"
                >
                  {item.short}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation */}
      <Link to="/imageupload" className="nav-button">
        Go to Image Upload →
      </Link>
    </div>
  );
}

export default UrlForm;
