module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'keelworks-blue': '#E6F0FF',
        'keelworks-text': {
          DEFAULT: '#1F2937',
          light: '#6B7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}