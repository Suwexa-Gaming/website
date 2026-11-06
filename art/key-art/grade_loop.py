"""Grades the hero animation frames with the same look as the stills, minus grain,
which video compression would only smear. Usage: python grade_loop.py <in-dir> <out-dir>"""
import glob
import os
import sys

import numpy as np
from PIL import Image, ImageFilter

src, dst = sys.argv[1], sys.argv[2]
os.makedirs(dst, exist_ok=True)

for path in sorted(glob.glob(os.path.join(src, "*.png"))):
    im = Image.open(path).convert("RGB")
    a = np.asarray(im, dtype=np.float32) / 255.0
    h, w, _ = a.shape
    base = Image.fromarray((np.clip(a - 0.42, 0, 1) * 1.7 * 255).astype(np.uint8))
    glow = sum(
        np.asarray(base.filter(ImageFilter.GaussianBlur(r * w / 2560)), dtype=np.float32) / 255.0 * k
        for r, k in ((10, 0.55), (42, 0.42), (130, 0.34))
    )
    a = 1 - (1 - a) * (1 - np.clip(glow, 0, 1))
    y, x = np.mgrid[0:h, 0:w]
    v = ((x / w - 0.5) ** 2 + (y / h - 0.5) ** 2) ** 1.25
    a *= (1 - np.clip(v * 1.1, 0, 0.5))[..., None]
    a = np.clip((a - 0.012) / (1 - 0.012), 0, 1)
    out = Image.fromarray((a * 255).astype(np.uint8))
    out.save(os.path.join(dst, os.path.basename(path)), compress_level=1)
