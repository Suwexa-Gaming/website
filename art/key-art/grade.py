"""Final grade for the rendered key art: light shafts, bloom, lens fringe, vignette,
fine grain, then export. Usage: python grade.py <input.png> <output.webp> [--plain]"""
import sys

import numpy as np
from PIL import Image, ImageFilter


def find_sun(a):
    """The centre of the brightest area, where the light shafts start."""
    h, w, _ = a.shape
    small = Image.fromarray((a * 255).astype(np.uint8)).convert("L").resize((64, 36)).filter(ImageFilter.GaussianBlur(2))
    y, x = np.unravel_index(np.argmax(np.asarray(small)), (36, 64))
    return (x + 0.5) / 64 * w, (y + 0.5) / 36 * h


def light_shafts(a, sun, steps=14, spread=0.05):
    """Radial blur of the bright areas away from the sun; dark objects cut the beams."""
    h, w, _ = a.shape
    sw, sh = w // 3, h // 3
    base = Image.fromarray((np.clip(a - 0.42, 0, 1) * 255).astype(np.uint8)).resize((sw, sh))
    cx, cy = sun[0] / 3, sun[1] / 3
    total = np.zeros((sh, sw, 3), dtype=np.float32)
    for k in range(steps):
        z = 1 + k * spread
        m = base.transform((sw, sh), Image.AFFINE, (1 / z, 0, cx - cx / z, 0, 1 / z, cy - cy / z), Image.BILINEAR)
        total += np.asarray(m, dtype=np.float32) / 255.0 * (0.9 ** k)
    total /= steps
    return np.asarray(Image.fromarray((np.clip(total, 0, 1) * 255).astype(np.uint8)).resize((w, h), Image.BILINEAR), dtype=np.float32) / 255.0


def lens_fringe(a, amount=0.0009):
    """A trace of chromatic aberration toward the corners."""
    h, w, _ = a.shape
    out = a.copy()
    for ch, k in ((0, 1 + amount), (2, 1 - amount)):
        im = Image.fromarray((a[..., ch] * 255).astype(np.uint8))
        m = im.transform((w, h), Image.AFFINE, (1 / k, 0, w / 2 * (1 - 1 / k), 0, 1 / k, h / 2 * (1 - 1 / k)), Image.BILINEAR)
        out[..., ch] = np.asarray(m, dtype=np.float32) / 255.0
    return out


def grade(im, sun=None):
    a = np.asarray(im.convert("RGB"), dtype=np.float32) / 255.0
    h, w, _ = a.shape
    sun = sun or find_sun(a)
    shafts = light_shafts(a, sun)
    bright = np.clip(a - 0.46, 0, 1) * 1.6
    base = Image.fromarray((bright * 255).astype(np.uint8))
    glow = sum(
        np.asarray(base.filter(ImageFilter.GaussianBlur(r * w / 2560)), dtype=np.float32) / 255.0 * k
        for r, k in ((5, 0.34), (24, 0.34), (130, 0.3))
    )
    glow = glow + shafts * np.array([1.0, 0.72, 0.42], dtype=np.float32) * 0.8
    a = 1 - (1 - a) * (1 - np.clip(glow, 0, 1))
    a = lens_fringe(a)
    y, x = np.mgrid[0:h, 0:w]
    v = ((x / w - 0.5) ** 2 + (y / h - 0.5) ** 2) ** 1.25
    a *= (1 - np.clip(v * 1.1, 0, 0.5))[..., None]
    # Crush the floor to the site's near-black, keep the warmth in the mids.
    return np.clip((a - 0.012) / (1 - 0.012), 0, 1)


if __name__ == "__main__":
    src, dst = sys.argv[1], sys.argv[2]
    im = Image.open(src).convert("RGB")
    a = np.asarray(im, dtype=np.float32) / 255.0 if "--plain" in sys.argv else grade(im)
    rng = np.random.default_rng(7)
    a = a + rng.normal(0, 0.0065, a.shape[:2])[..., None]
    Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8)).save(dst, quality=90, method=6)
