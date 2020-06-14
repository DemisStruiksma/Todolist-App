const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix.postCss('./src/styles/app.css', './css/', [
    tailwindcss('./tailwind.js')
]);
mix.js('./src/scripts/app.js', './js/');