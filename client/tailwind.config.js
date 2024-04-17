/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fefefe",
        background: "#0c0c0c",
        accent: "#4b3cf5",
        formColor: "#151515",
        grayLight: "#888888",
        grayDark: "#555555",
        anotherBlack: "#1E1E1E",
        anotherGray: "#8B8B8B"
      }
    },
  },
  plugins: [],
}

