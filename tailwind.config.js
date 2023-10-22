/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        highlight: "#e54065",
        primary: "#f4f5f9",
        grayBorder: "#cfd2dc",
        "primary-foreground": "#636363",
        "filter-btn": "#e1e4ea",
        "read-background": "#f2f2f2",
        "primary-background": "#F3F6FA",
      },
    },
  },
  plugins: [],
};
