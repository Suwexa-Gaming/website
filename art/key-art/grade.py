"""Final grade for the rendered key art: bloom, vignette, fine grain, WebP export.
Usage: python grade.py <input.png> <output.webp> [--plain]"""
import sys
import numpy as np
from PIL import Image, ImageFilter

src, dst = sys.argv[1], sys.argv[2]
plain = "--plain" in sys.argv
im = Image.open(src).convert("RGB")
a = np.asarray(im, dtype=np.float32) / 255.0
h, w, _ = a.shape

if not plain:
    bright = np.clip(a - 0.42, 0, 1) * 1.7
    base = Image.fromarray((bright * 255).astype(np.uint8))
    glow = sum(
        np.asarray(base.filter(ImageFilter.GaussianBlur(r * w / 2560)), dtype=np.float32) / 255.0 * k
        for r, k in ((10, 0.55), (42, 0.42), (130, 0.34))
    )
    a = 1 - (1 - a) * (1 - np.clip(glow, 0, 1))
    y, x = np.mgrid[0:h, 0:w]
    v = ((x / w - 0.5) ** 2 + (y / h - 0.5) ** 2) ** 1.25
    a *= (1 - np.clip(v * 1.1, 0, 0.5))[..., None]
    # Crush the floor to the site's near-black, keep the warmth in the mids.
    a = np.clip((a - 0.012) / (1 - 0.012), 0, 1)

rng = np.random.default_rng(7)
a += rng.normal(0, 0.0065, a.shape[:2])[..., None]
Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8)).save(dst, quality=88, method=6)
