export type MusicTrack = {
  id: number
  title: string
  artist: string
  genre: 'Pop' | 'Lo-Fi' | 'Electronic' | 'Hip-Hop' | 'Rock'
  duration: string
  source: 'Spotify' | 'YouTube' | 'SoundCloud'
  plays: string
}

export const tracks: MusicTrack[] = [
  { id: 1, title: 'Neon Avenue', artist: 'Astra Vale', genre: 'Electronic', duration: '3:41', source: 'Spotify', plays: '1.2M' },
  { id: 2, title: 'Cloudline', artist: 'Milo Drift', genre: 'Lo-Fi', duration: '2:55', source: 'YouTube', plays: '782K' },
  { id: 3, title: 'South Side Echo', artist: 'Prime Color', genre: 'Hip-Hop', duration: '3:18', source: 'Spotify', plays: '964K' },
  { id: 4, title: 'Quiet Stars', artist: 'Lena Noor', genre: 'Pop', duration: '4:01', source: 'SoundCloud', plays: '541K' },
  { id: 5, title: 'Rush Hour Skyline', artist: 'Static Mode', genre: 'Rock', duration: '3:29', source: 'YouTube', plays: '689K' },
  { id: 6, title: 'Blue Tape', artist: 'Noctis', genre: 'Lo-Fi', duration: '2:41', source: 'Spotify', plays: '410K' },
  { id: 7, title: 'Parallel Lights', artist: 'Kira North', genre: 'Electronic', duration: '3:12', source: 'YouTube', plays: '835K' },
  { id: 8, title: 'Paper Planes', artist: 'Vera Bloom', genre: 'Pop', duration: '3:07', source: 'Spotify', plays: '1.0M' },
]
