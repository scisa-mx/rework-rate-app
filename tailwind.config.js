/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideIn: {
          from: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
          to: { transform: 'translateX(0)' },
        },
        swipeOut: {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: 'translateX(-2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        ripple: 'ripple 0.6s ease-out',
        hide: 'hide 100ms ease-in',
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        swipeOut: 'swipeOut 100ms ease-out',
        fadeIn: 'fadeIn 150ms ease-out',
        fadeOut: 'fadeOut 150ms ease-in',
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
