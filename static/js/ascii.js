// Values to determine the size of each symbol.
const GRID_SIZE = 24;
const GRID_SIZE_HALF = GRID_SIZE / 2;
const DEVICE_SCALE = window.devicePixelRatio || 1;
const FONT = Math.floor(GRID_SIZE * 5 / 6) + 'px GT America Mono OCC';

// Number of milliseconds between animation redraws.
const ANIMATION_SPEED = 22;

// Determines how dense the generated "terrain" is. Higher values
// will cause more variety in a smaller amount of space.
const DENSENESS = 1.7;

// Determines how quickly symbols randomly cycle.
const SPONTANEITY = 0.05;

// Mouse sensitivity.
const SENSITIVITY = 1.5;

// Pentagram brand symbols for OCC.
const LEVELS = [
  { char: '.', color: '#173B31' },
  { char: '-', color: '#1A4538' },
  { char: '+', color: '#1D4E3E' },
  { char: '×', color: '#2A7558' },
  { char: '/', color: '#369B71' },
  { char: '×', color: '#2A7558' },
  { char: '+', color: '#1D4E3E' },
  { char: '-', color: '#1A4538' },
];

let ctx;
let grid;
let len;
let w;
let h;
let posX = 0;
let posY = 0;
let intensity = 1;
let mod = 0;
let mouseX = 0;
let mouseY = 0;
let lastFrame;

function resizeCanvas() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = Math.floor(w * DEVICE_SCALE);
  canvas.height = Math.floor(h * DEVICE_SCALE);
  ctx.scale(DEVICE_SCALE, DEVICE_SCALE);
  createGrid();
}

function step(timestamp) {
  const delta = timestamp - lastFrame;
  if (lastFrame === undefined || delta >= ANIMATION_SPEED) {
    lastFrame = timestamp;
    ctx.clearRect(0, 0, w, h);
    ctx.font = FONT;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const motionX = Math.floor(posX);
    const motionY = Math.floor(posY);
    for (let i = 0; i < (w / GRID_SIZE); i++) {
      for (let j = 0; j < (h / GRID_SIZE); j++) {
        const x = GRID_SIZE_HALF + i * GRID_SIZE;
        const y = GRID_SIZE_HALF + j * GRID_SIZE;
        const level = getLevelAt(i + motionX, j + motionY, mod);
        ctx.fillStyle = level.color;
        ctx.fillText(level.char, x, y);
      }
    }
    posX += Math.random() * (mouseX / w - 0.5) * -SENSITIVITY;
    posY += Math.random() * (mouseY / h - 0.5) * -SENSITIVITY;
    mod += Math.random() * SPONTANEITY;
  }
  window.requestAnimationFrame(step);
}

/**
 * Generates a number, taking into account the size of the
 * current pass through the diamond-square algorithm. Each
 * successive pass decreases the amount of randomness by
 * design, while the global intensity setting (DENSENESS)
 * allows for additional control.
 *
 * @param {number} size Size of the allowed randomness
 * @returns {number} Random number
 */
function generateRandom(size) {
  return (Math.random() - 0.5) * size * intensity;
}

/**
 * Converts a coordinate pair to a 1D array index and retrieves
 * the value at that position.
 *
 * @param {number} x X coordinate
 * @param {number} y Y coordinate
 * @returns {number} Value at position
 */
function getValueAt(x, y) {
  while (x < 0) x += len;
  while (y < 0) y += len;
  x %= len;
  y %= len;
  return grid[y * len + x];
}

/**
 * Converts a coordinate pair to a 1D array index and stores
 * the provided value.
 *
 * @param {number} x X coordinate
 * @param {number} y Y coordinate
 * @param {number} val Updated value
 */
function setValueAt(x, y, val) {
  grid[y * len + x] = val;
}

/**
 * Converts a float value into a discrete symbol and color value.
 * An additional modifier is provided to cycle through symbols at
 * a separate rate from its position.
 *
 * @param {number} x X coordinate
 * @param {number} y Y coordinate
 * @param {number} mod Additional modifier
 * @returns {object} Symbol character and color
 */
function getLevelAt(x, y, mod) {
  const chars = LEVELS.length;
  const val = getValueAt(x, y);
  let idx = Math.floor(chars * (mod + val + (len / 2)) / len);
  while (idx < 0) {
    idx += chars;
  }
  return LEVELS[idx % chars];
}

/**
 * Executes the "diamond" step of the algorithm, updating a target
 * cell with the average of its distant diagonal neighbor cells
 * added to a random value.
 *
 * @param {number} x Low x coordinate
 * @param {number} y Low y coordinate
 * @param {number} size Distance to adjacents
 */
function diamondStep(x, y, size) {
  const avg = getValueAt(x, y)
            + getValueAt(x + size + size, y)
            + getValueAt(x, y + size + size)
            + getValueAt(x + size + size, y + size + size);
  setValueAt(x + size, y + size, (avg / 4) + generateRandom(size));
}

/**
 * Executes the "square" step of the algorithm, updating a target
 * cell with the average of its distant cardinal neighbor cells
 * added to a random value.
 *
 * @param {number} x Center x coordinate
 * @param {number} y Center y coordinate
 * @param {number} size Distance to adjacents=
 */
function squareStep(x, y, size) {
  let num = 0;
  const total = [
    getValueAt(x, y - size),
    getValueAt(x - size, y),
    getValueAt(x, y + size),
    getValueAt(x + size, y),
  ].reduce((acc, cur) => {
    if (cur === undefined) return acc;
    num++;
    return acc + cur;
  }, 0);
  const avg = total / num;
  setValueAt(x, y, avg + generateRandom(size));
}

/**
 * Creates a new blank square grid with a size large enough
 * to fit the screen but also satisfies the 2^n + 1 requirement
 * of the diamond-square algorithm.
 * 
 * See https://en.wikipedia.org/wiki/Diamond-square_algorithm
 */
function createGrid() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const cols = Math.ceil(w / GRID_SIZE);
  const rows = Math.ceil(h / GRID_SIZE);
  const side = Math.max(cols, rows);
  len = Math.pow(2, Math.ceil(Math.log2(side - 2))) + 1;
  grid = new Float32Array(len * len);
  intensity = 1;

  let size = len - 1;

  // Seed edges of the grid
  setValueAt(0, 0, generateRandom(size));
  setValueAt(0, size, generateRandom(size));
  setValueAt(size, 0, generateRandom(size));
  setValueAt(size, size, generateRandom(size));

  while (size > 1) {
    const halfSize = size / 2;
    for (let x = 0; x < (len - 1); x += size) {
      for (let y = 0; y < (len - 1); y += size) {
        diamondStep(x, y, halfSize);
      }
    }

    for (let x = 0; x < len; x += size) {
      for (let y = -halfSize; y < (len - halfSize - 1); y += size) {
        squareStep(x, y + size, halfSize);
      }
    }

    for (let x = -halfSize; x < (len - halfSize - 1); x += size) {
      for (let y = 0; y < len; y += size) {
        squareStep(x + size, y, halfSize);
      }
    }

    size = halfSize;
    intensity *= DENSENESS;
  }
}

const canvas = document.getElementById('ascii');
if (canvas) {
  ctx = canvas.getContext('2d');

  resizeCanvas();
  window.requestAnimationFrame(step);

  window.addEventListener('resize', resizeCanvas);

  /**
   * Mouse position dictates the speed and direction of the
   * "navigation" of the terrain.
   */
  window.addEventListener('mousemove', (e) => {
    mouseX = e.screenX;
    mouseY = e.screenY;
  });
}
