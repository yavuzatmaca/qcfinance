import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066CC',
        secondary: '#003D7A',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'size-200': '200% 100%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 0%',
      },
    },
  },
  plugins: [],
  // Performance optimizations
  future: {
    hoverOnlyWhenSupported: true,
  },
  // Reduce CSS file size
  corePlugins: {
    preflight: true,
  },
}
export default config
