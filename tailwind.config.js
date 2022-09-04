/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      cardColor: "#ecdfc8",
      buttonColor: "#df7861",
      descColor: "#e08a76",
      appBgColor: "#f4f1ec",
    },
    fontFamily: {
      body: ["Urbanist"],
    },
  },
  plugins: [],
};
