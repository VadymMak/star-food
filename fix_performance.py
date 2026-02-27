"""
Performance Fix Script for star-food
RUN FROM star-food PROJECT ROOT:
  python fix_performance.py

Fixes:
  1. Hero CLS 0.202 → removes fadeUp animation (opacity+transform at load = layout shift)
  2. WhatsApp pulse → replaces box-shadow animation with composited transform
  3. Adds will-change hints for GPU compositing
"""

import os

files = {}

# ============================================================
# FIX 1: Hero CSS — remove fadeUp, use opacity-only fade (no CLS)
# ============================================================
files["src/components/Hero/Hero.module.css"] = """\
.hero {
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.45) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 20px;
  /* Opacity-only animation: NO transform, NO layout shift */
  animation: fadeIn 0.8s ease-out;
}

.badge {
  display: inline-block;
  border: 1px solid var(--gold);
  color: var(--gold);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 8px 24px;
  margin-bottom: 28px;
  border-radius: 2px;
}

.title {
  font-family: var(--font-display);
  font-size: 3.8rem;
  font-weight: 700;
  line-height: 1.15;
  margin-bottom: 20px;
  color: var(--white);
}

.gold {
  color: var(--gold);
}

.bgImage {
  object-fit: cover;
  z-index: 0;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.fadeBottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(transparent, var(--dark));
  z-index: 1;
}

/* ===== ANIMATION — opacity only, no transform = zero CLS ===== */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .title {
    font-size: 2.6rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .title {
    font-size: 2rem;
  }

  .badge {
    font-size: 0.65rem;
    padding: 6px 16px;
    letter-spacing: 2px;
  }

  .subtitle {
    font-size: 0.95rem;
    margin-bottom: 30px;
  }
}
"""

# ============================================================
# FIX 2: WhatsApp — composited animation (transform instead of box-shadow)
# ============================================================
files["src/components/WhatsAppButton/WhatsAppButton.module.css"] = """\
.button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #25d366;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
  transition: transform 0.3s ease;
  z-index: 900;
  /* Composited animation — GPU-accelerated, no jank */
  will-change: transform;
  animation: pulse 2s infinite;
}

.button:hover {
  transform: scale(1.1);
}

.icon {
  color: #fff;
  font-size: 1.8rem;
}

/* Composited pulse: uses transform (GPU) instead of box-shadow (CPU repaint) */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 600px) {
  .button {
    width: 52px;
    height: 52px;
    bottom: 20px;
    right: 20px;
  }

  .icon {
    font-size: 1.5rem;
  }
}
"""

# ============================================================
# WRITE ALL FILES
# ============================================================
for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Fixed: {path}")

print("\n✅ Performance fixes applied!")
print("Changes:")
print("  1. Hero: fadeUp → fadeIn (opacity only, no transform = zero CLS)")
print("  2. WhatsApp: box-shadow pulse → transform scale (GPU composited)")
print("\nExpected improvement:")
print("  CLS: 0.202 → ~0.002 (font only, unfixable)")
print("  Performance: +10-15 points")
print("\nDeploy: git add . && git commit -m 'perf: fix CLS and composited animations' && git push")
print("Test on PRODUCTION in incognito (not localhost!)")
