/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f9ff',
                    500: '#1098ad',
                    600: '#0c8599',
                    700: '#0a6b7d',
                }
            },
            fontFamily: {
                flags: ['TwemojiCountryFlags', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
