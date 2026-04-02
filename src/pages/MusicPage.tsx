import { useMemo, useState } from 'react'
import { tracks, type MusicTrack } from '../data/tracks'

const genres: Array<MusicTrack['genre'] | 'All'> = ['All', 'Pop', 'Lo-Fi', 'Electronic', 'Hip-Hop', 'Rock']

function getCoverClass(id: number) {
  const variants = ['aurora', 'sunset', 'ocean', 'mono', 'ember'] as const
  return `cover-${variants[(id - 1) % variants.length]}`
}

export function MusicPage() {
  const [query, setQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<MusicTrack['genre'] | 'All'>('All')

  const filteredTracks = useMemo(() => {
    return tracks.filter((track) => {
      const matchesGenre = selectedGenre === 'All' || track.genre === selectedGenre
      const q = query.trim().toLowerCase()
      const matchesQuery =
        q.length === 0 ||
        track.title.toLowerCase().includes(q) ||
        track.artist.toLowerCase().includes(q)

      return matchesGenre && matchesQuery
    })
  }, [query, selectedGenre])

  return (
    <main className="page-grid narrow">
      <section className="section-card rhythm-page-head">
        <p className="eyebrow">Music</p>
        <h1>Play queue inspired by Rhythm</h1>
        <div className="library-controls rhythm-controls">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search track or artist"
            aria-label="Search tracks"
          />
          <div className="genre-row" role="tablist" aria-label="Filter tracks by genre">
            {genres.map((genre) => (
              <button
                key={genre}
                type="button"
                className={selectedGenre === genre ? 'chip active' : 'chip'}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-card rhythm-list-wrap" aria-label="Available music tracks">
        <div className="rhythm-list" role="list">
          {filteredTracks.map((track) => (
            <article key={track.id} role="listitem" className="rhythm-row">
              <div className="rhythm-track-meta">
                <div className={`track-cover ${getCoverClass(track.id)}`} aria-hidden="true" />
                <p className="track-main rhythm-track-main">
                  <strong>{track.title}</strong>
                  <small>{track.artist}</small>
                </p>
              </div>

              <div className="rhythm-actions" aria-hidden="true">
                <button type="button" className="icon-btn" tabIndex={-1}>
                  ...
                </button>
                <button type="button" className="icon-btn heart" tabIndex={-1}>
                  ♡
                </button>
              </div>

              <time className="track-duration" dateTime={`PT${track.duration.replace(':', 'M')}S`}>
                {track.duration}
              </time>
            </article>
          ))}
        </div>
        {filteredTracks.length === 0 && (
          <p className="empty-state">No tracks match your search. Try another genre or keyword.</p>
        )}
      </section>
    </main>
  )
}
