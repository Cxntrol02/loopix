import type {
  CommandCategory,
  FeatureItem,
  NavItem,
  StatItem,
  Testimonial,
} from '../types/site'

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Commands', href: '/commands' },
  { label: 'Team', href: '/team' },
  { label: 'Dashboard', href: '/dashboard' },
]

export const heroStats: StatItem[] = [
  { label: 'Servers online', value: '12.8K' },
  { label: 'Tracks queued daily', value: '364K' },
  { label: 'Avg command latency', value: '42ms' },
  { label: 'Uptime', value: '99.99%' },
]

export const features: FeatureItem[] = [
  {
    title: 'Crystal-Clear Audio Pipeline',
    description:
      'Adaptive streaming keeps playback smooth and balanced, even during heavy peak hours.',
    highlight: 'Low-latency playback with smart source fallback.',
  },
  {
    title: 'Moderation-Safe Queue Controls',
    description:
      'Role-based queue controls let trusted members skip, lock, and clean playlists without chaos.',
    highlight: 'Permission presets designed for active communities.',
  },
  {
    title: 'Beautiful Web Dashboard',
    description:
      'Configure everything from autoplay to DJ mode in one polished dashboard with live telemetry.',
    highlight: 'Server management without touching raw config files.',
  },
  {
    title: 'Smart Recommendation Engine',
    description:
      'Keep sessions alive with auto-suggested tracks based on queue context and listening history.',
    highlight: 'Context-aware recommendations tuned for communities.',
  },
]

export const commandCategories: CommandCategory[] = [
  {
    category: 'Music',
    commands: [
      'play',
      'pause',
      'resume',
      'skip',
      'stop',
      'nowplaying',
      'queue',
      'shuffle',
      'loop',
      'seek',
      'search',
      'volume',
    ],
  },
  {
    category: 'Utility',
    commands: ['help', 'ping'],
  },
  {
    category: 'Filters',
    commands: ['bassboost', 'nightcore', 'vaporwave'],
  },
]

export const testimonials: Testimonial[] = [
  {
    quote:
      'Loopix transformed our event nights. Queue fights disappeared and audio quality is miles ahead.',
    author: 'NovaHeart',
    role: 'Community Lead, NightShift',
  },
  {
    quote:
      'The dashboard is exactly what our mod team needed. Fast, clean, and easy to trust.',
    author: 'HexaTune',
    role: 'Moderator, Pulse Arena',
  },
]
