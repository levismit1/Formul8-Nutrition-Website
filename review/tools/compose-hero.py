import numpy as np, sys
from PIL import Image, ImageDraw, ImageFilter
CX, BASE_Y, SCALE = int(sys.argv[1]), int(sys.argv[2]), float(sys.argv[3])
bg = Image.open("review/kitchen/kitchen-raw.png").convert("RGBA")
W, H = bg.size
jar0 = Image.open("review/product-cutout.png").convert("RGBA")
jw, jh = round(jar0.width * SCALE), round(jar0.height * SCALE)
jar = jar0.resize((jw, jh), Image.LANCZOS)
def blurred_ellipse(cx, cy, rx, ry, alpha, blur, color=(38, 34, 30)):
    m = Image.new("L", (W, H), 0)
    ImageDraw.Draw(m).ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=int(255 * alpha))
    m = m.filter(ImageFilter.GaussianBlur(blur))
    layer = Image.new("RGBA", (W, H), color + (0,)); layer.putalpha(m); return layer
x0, y0 = CX - jw // 2, BASE_Y - jh
out = bg
# cast shadow, light comes from the window on the left so it falls to the right
out = Image.alpha_composite(out, blurred_ellipse(CX + 70, BASE_Y + 8, int(jw * 0.95), 36, 0.20, 30))
# faint reflection on the polished marble
refl = jar.transpose(Image.FLIP_TOP_BOTTOM)
rh = 92                      # stay on the counter top: the front edge is about 100px below the base
refl = refl.crop((0, 0, jw, rh)).filter(ImageFilter.GaussianBlur(1.6))
ra = np.array(refl).astype(np.float32)
fade = (np.linspace(1.0, 0.0, rh, dtype=np.float32) ** 1.6 * 0.15)[:, None]
ra[..., 3] *= fade
refl = Image.fromarray(ra.astype(np.uint8), "RGBA")
rl = Image.new("RGBA", (W, H), (0, 0, 0, 0)); rl.paste(refl, (x0, BASE_Y + 3))
out = Image.alpha_composite(out, rl)
# contact shadow, tight and dark right under the base
out = Image.alpha_composite(out, blurred_ellipse(CX + 4, BASE_Y - 3, int(jw * 0.50), 17, 0.62, 7))
out = Image.alpha_composite(out, blurred_ellipse(CX + 2, BASE_Y - 2, int(jw * 0.47), 6, 0.70, 3))
jl = Image.new("RGBA", (W, H), (0, 0, 0, 0)); jl.paste(jar, (x0, y0), jar)
out = Image.alpha_composite(out, jl).convert("RGB")
out.save(f"{sys.argv[4]}", quality=95)
print("jar", jw, "x", jh, "at", x0, y0, "| image", W, "x", H)
