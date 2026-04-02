const commandRows = [
  {
    command: '/play query',
    description: 'Searches tracks and starts playback instantly.',
    access: 'Everyone',
  },
  {
    command: '/queue',
    description: 'Shows current queue with pagination.',
    access: 'Everyone',
  },
  {
    command: '/skip',
    description: 'Skips the active track or starts vote-skip.',
    access: 'DJ / Mod',
  },
  {
    command: '/filters preset',
    description: 'Applies bass boost, nightcore, and more.',
    access: 'DJ / Mod',
  },
  {
    command: '/autoplay',
    description: 'Keeps music going with related tracks.',
    access: 'Everyone',
  },
]

export function CommandsPage() {
  return (
    <main className="page-grid narrow">
      <section className="section-card">
        <p className="eyebrow">Command Center</p>
        <h1>Simple commands, professional control</h1>
        <p>
          Loopix commands are designed to be predictable, readable, and fast for both
          moderators and listeners.
        </p>
      </section>

      <section className="section-card table-wrap">
        <div className="command-table" role="table" aria-label="Loopix command list">
          <div className="head" role="row">
            <span role="columnheader">Command</span>
            <span role="columnheader">Description</span>
            <span role="columnheader">Access</span>
          </div>
          {commandRows.map((item) => (
            <div key={item.command} role="row">
              <code role="cell">{item.command}</code>
              <p role="cell">{item.description}</p>
              <span role="cell">{item.access}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
