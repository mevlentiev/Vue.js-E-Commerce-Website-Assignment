/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'dark',
    content: [
        './public/index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                primary: '#42b983',
                secondary: '#35495e',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif']
            },
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/line-clamp')
    ]
}
