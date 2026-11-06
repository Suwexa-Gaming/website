"""Grades the hero animation frames with the same look as the stills, minus grain,
which video compression would only smear. Usage: python grade_loop.py <in-dir> <out-dir>"""
import glob
import os
import sys

import numpy as np
from PIL import Image

from grade import find_sun, grade

src, dst = sys.argv[1], sys.argv[2]
os.makedirs(dst, exist_ok=True)
paths = sorted(glob.glob(os.path.join(src, "*.png")))
# One light source for the whole loop, so the shafts never jump.
first = np.asarray(Image.open(paths[0]).convert("RGB"), dtype=np.float32) / 255.0
sun = find_sun(first)
for path in paths:
    a = grade(Image.open(path), sun)
    Image.fromarray((a * 255).astype(np.uint8)).save(os.path.join(dst, os.path.basename(path)), compress_level=1)
