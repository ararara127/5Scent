import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        "sf-pro": ["-apple-system", "BlinkMacSystemFont", "San Francisco", "Helvetica Neue", "sans-serif"],
      },
      fontSize: {
        h1: ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h2: ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h3: ["1.875rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        body: ["1rem", { lineHeight: "1.6" }],
      },
    },
  },
} satisfies Config;
