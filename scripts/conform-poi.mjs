/**
 * Rewrites src/data/data_poi.ts so each entry matches the POI type in types.ts.
 *
 * Usage: npm run conform-poi
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const poiPath = join(__dirname, '../src/data/data_poi.ts');

/** Icon size (px) per category — add or change entries here. */
const ICON_SIZE_BY_CATEGORY = {
    'Satellite Dishes': 27,
    Transformers: 32,
};

const DEFAULT_ICON_SIZE = 24;

const warnedCategories = new Set();

function iconSizeForCategory(category) {
    if (category in ICON_SIZE_BY_CATEGORY) {
        return ICON_SIZE_BY_CATEGORY[category];
    }
    if (!warnedCategories.has(category)) {
        warnedCategories.add(category);
        console.warn(
            `No IconSize mapping for category "${category}"; using default ${DEFAULT_ICON_SIZE}`,
        );
    }
  return DEFAULT_ICON_SIZE;
}

function parseObjectLiteral(text) {
    return new Function(`return ${text}`)();
}

function readBalancedObject(lines, startIdx) {
    let depth = 0;
    let started = false;
    const parts = [];

    for (let i = startIdx; i < lines.length; i++) {
        const line = lines[i];
        parts.push(line);

        for (const char of line) {
        if (char === '{') {
            depth++;
            started = true;
        } else if (char === '}') {
            depth--;
        }
        }

        if (started && depth === 0) {
        let text = parts.join('\n');
        text = text.replace(/,\s*$/, '');
        return { text, endIdx: i };
        }
    }

    throw new Error(`Unclosed object starting at line ${startIdx + 1}`);
}

function parseArraySegments(arrayBody) {
    const lines = arrayBody.split('\n');
    const segments = [];
    let i = 0;

    while (i < lines.length) {
        const trimmed = lines[i].trim();

        if (trimmed === '' || trimmed === ',') {
        i++;
        continue;
        }

        if (trimmed.startsWith('//')) {
        if (trimmed.startsWith('// {')) {
            const block = [];
            while (i < lines.length) {
            block.push(lines[i]);
            if (lines[i].trim().endsWith('},')) {
                i++;
                break;
            }
            i++;
            }
            segments.push({ type: 'preserved', lines: block });
            continue;
        }

        segments.push({ type: 'preserved', lines: [lines[i]] });
        i++;
        continue;
        }

        if (trimmed.startsWith('{')) {
        const { text, endIdx } = readBalancedObject(lines, i);
        segments.push({ type: 'poi', text });
        i = endIdx + 1;
        continue;
        }

        throw new Error(`Unexpected line in pois array: ${lines[i]}`);
    }

    return segments;
}

/** Accept legacy (snake/camel) or already-conformed POI objects. */
function toLegacyShape(raw) {
    if (raw.Name !== undefined) {
        return {
        name: raw.Name,
        description: raw.Description ?? '',
        related_images: raw.RelatedImages ?? [],
        category: raw.Category,
        icon: raw.Icon,
        xPos: raw.X,
        yPos: raw.Y,
        };
    }
    return raw;
}

function transformPoi(raw) {
    const legacy = toLegacyShape(raw);
    const poi = {
        Name: legacy.name,
        Category: legacy.category,
        Icon: legacy.icon,
        IconSize: iconSizeForCategory(legacy.category),
        X: legacy.xPos,
        Y: legacy.yPos,
    };

    if (legacy.description !== undefined && legacy.description !== '') {
        poi.Description = legacy.description;
    }

    if (Array.isArray(legacy.related_images) && legacy.related_images.length > 0) {
        poi.RelatedImages = legacy.related_images;
    }

    return poi;
}

const POI_FIELD_ORDER = [
    'Name',
    'Description',
    'RelatedImages',
    'Category',
    'Icon',
    'IconSize',
    'X',
    'Y',
];

function formatPoi(poi) {
    const inner = '        ';
    const lines = ['    {'];

    const keys = POI_FIELD_ORDER.filter((key) => poi[key] !== undefined);

    keys.forEach((key, index) => {
        const value = poi[key];
        const isLast = index === keys.length - 1;
        const comma = isLast ? '' : ',';

        if (key === 'RelatedImages') {
        const items = value.map((v) => JSON.stringify(v)).join(', ');
        lines.push(`${inner}${key}: [${items}]${comma}`);
        } else if (typeof value === 'string') {
        lines.push(`${inner}${key}: ${JSON.stringify(value)}${comma}`);
        } else {
        lines.push(`${inner}${key}: ${value}${comma}`);
        }
    });

    lines.push('    },');
    return lines.join('\n');
}

function main() {
    const content = readFileSync(poiPath, 'utf8');
    const match = content.match(
        /^([\s\S]*?export const pois[^=]*=\s*)\[([\s\S]*)\];(\s*)$/,
    );

    if (!match) {
        throw new Error('Could not parse data_poi.ts (expected export const pois = [...])');
    }

    const [, prefix, arrayBody, suffix] = match;
    const segments = parseArraySegments(arrayBody);

    let header = prefix.trimEnd().replace(/\s*\[$/, '');
    header = `${header} [`;

    const outParts = [header];
    let transformedCount = 0;

    for (const segment of segments) {
        if (segment.type === 'preserved') {
        outParts.push(segment.lines.join('\n'));
        } else {
        const raw = parseObjectLiteral(segment.text);
        outParts.push(formatPoi(transformPoi(raw)));
        transformedCount++;
        }
    }

    outParts.push('];');

    const trailingNewline = suffix?.includes('\n') ? '\n' : '';
    writeFileSync(poiPath, `${outParts.join('\n')}${trailingNewline}`);
    console.log(`Updated ${poiPath} (${transformedCount} POIs transformed).`);
}

main();
