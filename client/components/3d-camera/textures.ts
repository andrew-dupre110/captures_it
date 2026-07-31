import * as THREE from "three";

/**
 * Procedural textures for the camera model. Everything here is drawn to a
 * canvas at runtime — the intro must not pull any asset over the network.
 *
 * Normal maps are non-colour data, so they keep the default NoColorSpace.
 */

const SIZE = 256;

/** Triangle wave in [0,1] with period 1. */
const tri = (x: number) => {
  const f = x - Math.floor(x);
  return f < 0.5 ? f * 2 : 2 - f * 2;
};

/**
 * Convert a height field to a tangent-space normal map via central differences.
 * Wraps at the edges so the result tiles seamlessly.
 */
function heightToNormal(height: Float32Array, strength: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(SIZE, SIZE);

  const at = (x: number, y: number) =>
    height[((y + SIZE) % SIZE) * SIZE + ((x + SIZE) % SIZE)];

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const dx = (at(x + 1, y) - at(x - 1, y)) * strength;
      const dy = (at(x, y + 1) - at(x, y - 1)) * strength;
      // normalise (-dx, -dy, 1)
      const len = Math.hypot(dx, dy, 1);
      const i = (y * SIZE + x) * 4;
      img.data[i] = ((-dx / len) * 0.5 + 0.5) * 255;
      img.data[i + 1] = ((-dy / len) * 0.5 + 0.5) * 255;
      img.data[i + 2] = (1 / len) * 0.5 * 255 + 127.5;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/**
 * Diamond knurling — the cross-hatched grip machined into focus rings and
 * control dials. Two crossed triangle waves make a field of small pyramids.
 * `freq` is cycles across the tile, so it tiles cleanly at integer values.
 */
function knurlNormal(freq: number, strength: number): THREE.CanvasTexture {
  const h = new Float32Array(SIZE * SIZE);
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const u = x / SIZE;
      const v = y / SIZE;
      h[y * SIZE + x] = tri((u + v) * freq) * tri((u - v) * freq);
    }
  }
  return heightToNormal(h, strength);
}

/** Fine pebble grain for the rubberised body covering. */
function grainNormal(): THREE.CanvasTexture {
  // value noise on a wrapping lattice, a couple of octaves
  const rand = new Float32Array(SIZE * SIZE);
  let seed = 1337;
  for (let i = 0; i < rand.length; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    rand[i] = seed / 4294967296;
  }

  const h = new Float32Array(SIZE * SIZE);
  // box-blur the noise a few times to turn white noise into pebbles
  let src = rand;
  for (let pass = 0; pass < 2; pass++) {
    const dst = new Float32Array(SIZE * SIZE);
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        let sum = 0;
        for (let oy = -1; oy <= 1; oy++) {
          for (let ox = -1; ox <= 1; ox++) {
            sum +=
              src[((y + oy + SIZE) % SIZE) * SIZE + ((x + ox + SIZE) % SIZE)];
          }
        }
        dst[y * SIZE + x] = sum / 9;
      }
    }
    src = dst;
  }
  for (let i = 0; i < h.length; i++) h[i] = src[i];

  return heightToNormal(h, 14);
}

/** White text on transparent, for the OLYMPUS / OM-1 badges. */
function textTexture(
  text: string,
  opts: { weight?: string; letterSpacing?: string } = {}
): THREE.CanvasTexture {
  const w = 512;
  const h = 128;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#f2f2f4";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${opts.weight ?? "600"} 76px Inter, Helvetica, Arial, sans-serif`;
  if ("letterSpacing" in ctx) {
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
      opts.letterSpacing ?? "6px";
  }
  ctx.fillText(text, w / 2, h / 2 + 4);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/**
 * Dark engraved lettering wrapped around a lens barrel. Drawn wide and short
 * so it maps onto a cylinder's UVs, which run u around the circumference.
 */
function engravingTexture(): THREE.CanvasTexture {
  const w = 2048;
  const h = 128;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#0b0b0d";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = "600 42px Inter, Helvetica, Arial, sans-serif";
  ctx.fillText("OLYMPUS OM-SYSTEM  ZUIKO AUTO-W 1:2  f=35mm", w * 0.28, h / 2);
  ctx.font = "500 34px Inter, Helvetica, Arial, sans-serif";
  ctx.fillText("JAPAN  •  ø49mm", w * 0.78, h / 2);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

export type CameraTextures = {
  knurlAperture: THREE.CanvasTexture;
  knurlFocus: THREE.CanvasTexture;
  knurlDial: THREE.CanvasTexture;
  grainBody: THREE.CanvasTexture;
  grainGrip: THREE.CanvasTexture;
  olympus: THREE.CanvasTexture;
  om1: THREE.CanvasTexture;
  engraving: THREE.CanvasTexture;
  dispose: () => void;
};

/**
 * Each surface gets its own texture instance, because `repeat` lives on the
 * texture rather than the material — a shared instance would force the lens
 * rings and the body panels to tile at the same density.
 *
 * Lathe UVs run u around the circumference and v along the profile, so the
 * rings need a high repeat.x and a low repeat.y.
 */
export function makeTextures(): CameraTextures {
  const knurlAperture = knurlNormal(16, 24);
  knurlAperture.repeat.set(34, 2);

  const knurlFocus = knurlNormal(16, 24);
  knurlFocus.repeat.set(44, 3);

  const knurlDial = knurlNormal(20, 20);
  knurlDial.repeat.set(30, 1);

  const grainBody = grainNormal();
  grainBody.repeat.set(14, 9);

  const grainGrip = grainNormal();
  grainGrip.repeat.set(6, 14);

  const olympus = textTexture("OLYMPUS", { letterSpacing: "10px" });
  const om1 = textTexture("OM-1", { weight: "700", letterSpacing: "4px" });
  const engraving = engravingTexture();

  const all = [
    knurlAperture,
    knurlFocus,
    knurlDial,
    grainBody,
    grainGrip,
    olympus,
    om1,
    engraving,
  ];

  return {
    knurlAperture,
    knurlFocus,
    knurlDial,
    grainBody,
    grainGrip,
    olympus,
    om1,
    engraving,
    dispose: () => all.forEach((t) => t.dispose()),
  };
}
