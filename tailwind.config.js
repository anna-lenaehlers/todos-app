/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        ptsans: ['"PT Sans"'],
        "ptsans-caption": ['"PT Sans Caption"'],
        ptserif: ['"PT Serif"'],
        "ptserif-caption": ['"PT Serif Caption"'],
      },
      gridTemplateColumns: {
        "5-1-5": "5fr 1fr 5fr",
        "1-8-1": "1fr 8fr 1fr",
      },
      colors: {
        grey: "#0C0C0F",
      },
    },
  },
  plugins: [],
};
