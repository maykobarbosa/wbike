import sharp from "sharp";
import path from "path";

const inputPath = path.resolve("public/images/logo.png");
const outputPath = path.resolve("public/images/logo-nobg.png");

async function removeBg() {
  const image = sharp(inputPath).ensureAlpha();

  // Get raw pixel data
  const { data, info } = await image
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // Process pixels: make white/near-white pixels transparent
  for (let i = 0; i < width * height; i++) {
    const idx = i * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    // If the pixel is near-white (all channels > 230), make it transparent
    if (r > 230 && g > 230 && b > 230) {
      data[idx + 3] = 0; // Set alpha to 0
    }
    // Also handle light gray edges for smoother result
    else if (r > 210 && g > 210 && b > 210) {
      // Partial transparency for anti-aliasing
      const brightness = (r + g + b) / 3;
      const alpha = Math.max(0, Math.min(255, Math.round((255 - brightness) * 5)));
      data[idx + 3] = alpha;
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .png()
    .toFile(outputPath);

  console.log(`Done! Saved to ${outputPath}`);
}

removeBg().catch(console.error);
