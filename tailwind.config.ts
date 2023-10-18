import { type Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config satisfies Config;
