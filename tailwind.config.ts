import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        linkedin: {
          50: '#eff8ff',
          100: '#daf0fe',
          200: '#bee2fd',
          300: '#91cffc',
          400: '#5db3f8',
          500: '#3795f2',
          600: '#0a66c2',
          700: '#0553a1',
          800: '#0e4b82',
          900: '#0f3f6b',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
