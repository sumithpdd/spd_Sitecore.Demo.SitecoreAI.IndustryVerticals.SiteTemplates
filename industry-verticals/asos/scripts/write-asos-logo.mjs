import fs from 'fs';
import sharp from 'sharp';

const svg = fs.readFileSync('public/asos/logo.svg', 'utf8');
const white = svg.replace('fill="#000"', 'fill="#fff"');

await Promise.all([
  sharp(Buffer.from(svg)).resize(186, 56).png().toFile('public/asos/logo.png'),
  sharp(Buffer.from(white)).resize(186, 56).png().toFile('public/asos/logo-white.png'),
]);

console.log('wrote public/asos/logo.png and logo-white.png');
