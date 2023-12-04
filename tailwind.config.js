/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "375px",
        lg: "1440px",
      },
      colors: {
        // primary colors
        moderateBlue: "hsl(238, 40%, 52%)",
        softRed: "hsl(358, 79%, 66%)",
        lightGrayishBlue: "hsl(239, 57%, 85%)",
        PaleRed: "hsl(357, 100%, 86%)",

        // neutral
        DarkBlue: "hsl(212, 24%, 26%)",
        GrayishBlue: "hsl(211, 10%, 45%)",
        LightGray: "hsl(223, 19%, 93%)",
        veryLightGray: "hsl(228, 33%, 97%)",
        White: "hsl(0, 0%, 100%)",
      },
    },
  },
  plugins: [],
};
