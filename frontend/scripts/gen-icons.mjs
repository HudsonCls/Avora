// Gera os ícones PNG do PWA sem dependências externas (usa zlib nativo).
// Ícone: quadrado verde-escuro da marca com o "A" (pico + ponto) do brandbook Avora.
import zlib from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
mkdirSync(pub, { recursive: true });

const CRC = (() => {
  const t = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function u32(n) {
  const b = Buffer.alloc(4);
  b.writeUInt32BE(n >>> 0, 0);
  return b;
}
function chunk(type, data) {
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  return Buffer.concat([u32(data.length), body, u32(crc32(body))]);
}
function png(size, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.concat([u32(size), u32(size), Buffer.from([8, 6, 0, 0, 0])]);
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  const idat = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', idat), chunk('IEND', Buffer.alloc(0))]);
}

// Vértices do "A" da marca (aproximação poligonal do path oficial em espaço 0-100;
// os pequenos arredondamentos de canto do path original somem em qualquer resolução
// de ícone). O ponto abaixo é desenhado à parte, como círculo.
const MARK_POLY = [
  [50, 14], [83, 79], [80.5, 83], [69, 83], [65.5, 80.5],
  [50, 47], [34.5, 80.5], [31, 83], [19.5, 83], [17, 79],
];
const MARK_DOT = { cx: 50, cy: 61, r: 7.5 };

function pointInPolygon(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    const intersects = yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

/**
 * Desenha o ícone: fundo verde-escuro (arredondado ou não) + marca "A" verde,
 * centralizada. `markFrac` controla quanto do quadrado a marca (em seu espaço
 * 0-100 nativo) ocupa — 0.5 replica a mesma proporção usada nos badges do app
 * (h-7 dentro de h-14); maskable usa uma fração menor por segurança de recorte.
 */
function drawIcon(size, markFrac, rounded) {
  const buf = Buffer.alloc(size * size * 4);
  const px = (x, y, r, g, b) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    const i = (y * size + x) * 4;
    buf[i] = r;
    buf[i + 1] = g;
    buf[i + 2] = b;
    buf[i + 3] = 255;
  };

  const rad = rounded ? size * 0.22 : 0;
  const inCorner = (x, y) => {
    const corners = [
      [rad, rad],
      [size - rad, rad],
      [rad, size - rad],
      [size - rad, size - rad],
    ];
    for (const [cx, cy] of corners) {
      const outsideX = (cx === rad && x < rad) || (cx !== rad && x > size - rad);
      const outsideY = (cy === rad && y < rad) || (cy !== rad && y > size - rad);
      if (outsideX && outsideY) {
        if (Math.hypot(x - cx, y - cy) > rad) return true;
      }
    }
    return false;
  };

  // offset/scale mapeiam o espaço nativo 0-100 da marca para markFrac*size,
  // centralizado no ícone.
  const scale = (markFrac * size) / 100;
  const offset = (size - markFrac * size) / 2;

  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) {
      if (inCorner(x, y)) continue;
      const mx = (x - offset) / scale;
      const my = (y - offset) / scale;
      const inMark =
        pointInPolygon(mx, my, MARK_POLY) || Math.hypot(mx - MARK_DOT.cx, my - MARK_DOT.cy) <= MARK_DOT.r;
      if (inMark) px(x, y, 0x16, 0xa3, 0x4a); // verde da marca
      else px(x, y, 0x0f, 0x3d, 0x2e); // fundo verde-escuro
    }
  return buf;
}

const targets = [
  ['pwa-192x192.png', 192, 0.5, true],
  ['pwa-512x512.png', 512, 0.5, true],
  ['maskable-512.png', 512, 0.4, false],
  ['apple-touch-icon.png', 180, 0.5, true],
];
for (const [name, size, markFrac, rounded] of targets) {
  writeFileSync(join(pub, name), png(size, drawIcon(size, markFrac, rounded)));
  console.log('gerado', name);
}

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0F3D2E"/><g transform="translate(16,16) scale(0.32)" fill="#16A34A"><path d="M50 14 L83 79 C84 81 82.5 83 80.5 83 L69 83 C67.5 83 66 82 65.5 80.5 L50 47 L34.5 80.5 C34 82 32.5 83 31 83 L19.5 83 C17.5 83 16 81 17 79 L50 14Z"/><circle cx="50" cy="61" r="7.5"/></g></svg>`;
writeFileSync(join(pub, 'favicon.svg'), favicon);
console.log('gerado favicon.svg');
