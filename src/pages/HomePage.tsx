import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <main className="page-grid">
      <section className="hero-card">
        <p className="eyebrow">Professional Discord Music Platform</p>
        <h1>
          Clean sound. Fast controls.
          <span>Built for communities that listen together.</span>
        </h1>
        <p>
          Loopix delivers stable playback, intuitive queue management, and premium-grade
          command handling for modern Discord servers.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="https://discord.com" target="_blank" rel="noreferrer">
            Add to Discord
          </a>
          <Link className="btn btn-secondary" to="/music">
            Browse Music Library
          </Link>
        </div>
        <ul className="stats-list" aria-label="Loopix quick stats">
          <li>
            <strong>120K+</strong>
            <span>listeners</span>
          </li>
          <li>
            <strong>99.95%</strong>
            <span>uptime</span>
          </li>
          <li>
            <strong>35ms</strong>
            <span>avg response</span>
          </li>
        </ul>
      </section>

      <section className="now-playing">
        <h2>Live Session Preview</h2>
        <div className="player-block">
          <p className="tiny">Now playing</p>
          <h3>Midnight City Lights</h3>
          <p>Echo District</p>
          <div className="progress-line">
            <span />
          </div>
          <div className="timing-row">
            <span>01:12</span>
            <span>03:56</span>
          </div>
        </div>
      </section>

      <section className="feature-strip">
        <article>
          <h3>Reliable Streaming</h3>
          <p>Low-latency playback with region-optimized nodes.</p>
        </article>
        <article>
          <h3>Smart Queue System</h3>
          <p>Skip voting, smart autoplay, and role-aware control.</p>
        </article>
        <article>
          <h3>Modern Slash Commands</h3>
          <p>Structured, discoverable commands with clean outputs.</p>
        </article>
      </section>

      <section className="premium-panel">
        <div className="premium-heading">
          <p className="eyebrow">Loopix Premium</p>
          <h2>Advanced features for high-traffic servers</h2>
        </div>
        <div className="premium-grid">
          <div className="price-box">
            <p className="plan">Free</p>
            <h3>$0</h3>
            <p>Core commands, stable playback, queue essentials.</p>
          </div>
          <div className="price-box highlighted">
            <p className="plan">Premium</p>
            <h3>$4.99/mo</h3>
            <p>HQ audio, always-on sessions, and priority performance.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
