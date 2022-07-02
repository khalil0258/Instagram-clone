module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#b9b9b9",
        global: "#4e4e4e",
        abone: "#76c4f7",
        body: "rgb(250, 250, 250)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
