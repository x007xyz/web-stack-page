import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import LineClamp from "@tailwindcss/line-clamp"


export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    LineClamp
  ],
} satisfies Config;
