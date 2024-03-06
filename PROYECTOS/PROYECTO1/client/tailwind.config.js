/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "docker-blue": "rgb(26, 123, 242)",
        "docker-blue-hover": "rgb(12, 73, 194)",
        "docker-100": "rgba(26, 123, 242, 0.9)",
        "docker-text": "#474747",
        "docker-hover": "rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
};
