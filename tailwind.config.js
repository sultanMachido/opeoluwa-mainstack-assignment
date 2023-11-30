/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // extend: {},
    extend: {
      // keyframes: {
      //   slide: {
      //     "0%": {
      //       transform: "translateX(0px)",
      //     },

      //     "50%": {
      //       transform: "translateX(calc(600px - 100%))",
      //     },

      //     "100%": {
      //       transform: "translateX(100px)",
      //     },
      //   },
      // },
      animation: {
        transition: "transform 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
