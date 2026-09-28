import fs from 'node:fs';

const xml = JSON.parse(
  fs
    .readFileSync('authoring/items/Recruitment/scripts/media-maps/recruitment-image-xml.json', 'utf8')
    .replace(/^\uFEFF/, '')
);
const assets = Object.entries(xml)
  .map(([file, value]) => {
    const src = value.match(/src="([^"]+)"/)?.[1] || '';
    const damId = value.match(/dam-id="([^"]+)"/)?.[1] || '';
    const alt = file.replace(/\.[a-z]+$/, '');
    return `  '${file}': { src: '${src}', damId: '${damId}', alt: '${alt}' },`;
  })
  .join('\n');

const body = `/** Content Hub brand 112600. Public src + dam-id. Never hotlink weareaspire.com. */

export type DamAsset = { src: string; damId: string; alt: string };

export type ImageField = { value?: { src?: string; alt?: string } };

export const DAM: Record<string, DamAsset> = {
${assets}
};

export const imageSrc = (field: ImageField | undefined, file: string): string =>
  field?.value?.src || DAM[file]?.src || '';
`;

fs.writeFileSync('industry-verticals/recruitment/src/lib/aspire-dam.ts', body.replace(/\n/g, '\r\n'));
console.log('wrote aspire-dam.ts');
