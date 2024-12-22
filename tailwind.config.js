/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'royal-purple': {
          50: '#faf6fe',
          100: '#f2ebfc',
          200: '#e7dafa',
          300: '#d5bdf5',
          400: '#bc93ed',
          500: '#a16ae2',
          600: '#8b4ad3',
          700: '#7638b8',
          800: '#663399',
          900: '#522a79',
          950: '#371358',
        },
        'gun-powder': {
          50: '#f7f7f8',
          100: '#eeedf1',
          200: '#d7d7e0',
          300: '#b4b4c5',
          400: '#8c8da4',
          500: '#6e6f89',
          600: '#585871',
          700: '#48485c',
          800: '#3e3e4e',
          900: '#373743',
          950: '#25242d',
        },
        victoria: {
          50: '#f2f3fb',
          100: '#e7e9f8',
          200: '#d3d4f2',
          300: '#b9bae8',
          400: '#9f9cdd',
          500: '#8c83d1',
          600: '#7c6ac1',
          700: '#6b59a9',
          800: '#574a89',
          900: '#49416e',
          950: '#2b2640',
        },
      },
      keyframes: {
        ripple: {
          '0%': {
            transform: 'scale(0)',
            opacity: '0.5',
          },
          '100%': {
            transform: 'scale(4)',
            opacity: '0',
          },
        },
      },
      animation: {
        ripple: 'ripple 0.6s ease-out',
      },
    },
  },
  plugins: [],
}
