/**
 * Hotelna Brand System
 * Centralized branding configuration for consistent design across the application
 */

// Brand Colors
export const brandColors = {
  primary: '#d5b15f', // Hotelna Golden
  primaryDark: '#b8964d',
  primaryLight: '#e5c882',
  background: '#0a0a0a', // Deep Black
  foreground: '#121113', // Dark Gray
  white: '#ffffff',
  textLight: '#e5e5e5',
  textMuted: '#a0a0a0',
  textDark: '#4a4a4a',
} as const

// Typography Scale - Dubai Font System
export const typography = {
  // Display Headings (Hero sections, Major titles)
  display: {
    xl: 'text-6xl md:text-7xl lg:text-8xl', // 4rem - 6rem
    lg: 'text-5xl md:text-6xl lg:text-7xl', // 3rem - 4.5rem
    md: 'text-4xl md:text-5xl lg:text-6xl', // 2.25rem - 3.75rem
  },
  
  // Headings
  heading: {
    h1: 'text-4xl md:text-5xl lg:text-6xl', // Major section titles
    h2: 'text-3xl md:text-4xl lg:text-5xl', // Section titles
    h3: 'text-2xl md:text-3xl lg:text-4xl', // Subsection titles
    h4: 'text-xl md:text-2xl lg:text-3xl', // Card titles
    h5: 'text-lg md:text-xl lg:text-2xl', // Small card titles
    h6: 'text-base md:text-lg lg:text-xl', // Smallest headings
  },
  
  // Body Text
  body: {
    xl: 'text-lg md:text-xl', // Large body (intro paragraphs)
    lg: 'text-base md:text-lg', // Standard large body
    base: 'text-base', // Standard body
    sm: 'text-sm md:text-base', // Small body
    xs: 'text-xs md:text-sm', // Extra small body
  },
  
  // Special Text
  badge: 'text-xs md:text-sm font-medium tracking-wider',
  button: 'text-sm md:text-base font-semibold',
  caption: 'text-xs text-muted-foreground',
  label: 'text-sm font-medium',
} as const

// Spacing System
export const spacing = {
  section: 'py-16 md:py-24 lg:py-32', // Section padding
  container: 'container mx-auto px-4 sm:px-6 lg:px-8',
  cardPadding: 'p-6 md:p-8',
  buttonPadding: 'px-6 py-3 md:px-8 md:py-4',
} as const

// Brand Components
export const brandComponents = {
  // Badges
  badge: 'inline-block px-4 py-1.5 text-xs md:text-sm font-medium tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20',
  
  // Buttons
  primaryButton: 'inline-flex items-center px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-semibold text-background bg-primary rounded-lg shadow-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105',
  secondaryButton: 'inline-flex items-center px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-semibold text-white border border-primary/30 rounded-lg hover:border-primary/60 hover:bg-primary/10 transition-all duration-200',
  
  // Cards
  card: 'bg-card border border-border rounded-2xl p-6 md:p-8 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10',
  
  // Sections
  section: 'relative bg-[#0a0a0a] py-16 md:py-24 lg:py-32 overflow-hidden',
  
  // Gradients
  textGradient: 'bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent',
  goldGradient: 'bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent',
} as const

// Animation Durations
export const animations = {
  fast: 'duration-200',
  normal: 'duration-300',
  slow: 'duration-500',
  slower: 'duration-700',
} as const

// Helper function to combine classes
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Brand-specific text styles
export const brandText = {
  // Primary headings with golden accent
  primaryHeading: (size: keyof typeof typography.heading = 'h1') => 
    cn(typography.heading[size], 'font-bold text-white'),
  
  // Body text with proper contrast
  body: (size: keyof typeof typography.body = 'base') =>
    cn(typography.body[size], 'text-gray-300 leading-relaxed'),
  
  // Muted text
  muted: (size: keyof typeof typography.body = 'sm') =>
    cn(typography.body[size], 'text-gray-400'),
  
  // Golden accent text
  accent: (size: keyof typeof typography.body = 'base') =>
    cn(typography.body[size], 'text-primary'),
} as const

// Export everything for easy imports
export const branding = {
  colors: brandColors,
  typography,
  spacing,
  components: brandComponents,
  animations,
  text: brandText,
} as const
