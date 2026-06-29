/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // Prevent Tailwind from overriding Docusaurus base styles
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./docs/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg: "#0B0E14",
        neoncyan: "#00F0FF",
        "cyan-neon": "#00F0FF",
        "gold-cyber": "#FBBF24",
        glasscard: "rgba(255, 255, 255, 0.05)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        cyanGlow: "0 0 15px rgba(0, 240, 255, 0.4)",
        cyanGlowIntense: "0 0 25px rgba(0, 240, 255, 0.8)",
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle, rgba(0, 240, 255, 0.07) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
}
