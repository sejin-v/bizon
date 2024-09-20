/** @type {import('tailwindcss').Config} */
const spaceObject = {}
for (let i = 1; i < 10; i++) {
  const width = 2 ** i
  const space = width * 4
  spaceObject[space] = `${width}rem`
}
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        ...spaceObject,
        '1/7': '14.285714%',
        '1/10': '10%',
        '1/9': '11%',
        '1/8': '12.5%',
      },
    },
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
}
