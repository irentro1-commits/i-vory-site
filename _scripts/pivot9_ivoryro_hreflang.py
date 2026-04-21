#!/usr/bin/env python3
"""PIVOT.9 — inject hreflang 3-way on i-vory.ro (RO side mirror).

Adds on each RO page:
  <link rel="alternate" hreflang="ro" href="https://i-vory.ro/...">
  <link rel="alternate" hreflang="en" href="https://i-vory.studio/...">
  <link rel="alternate" hreflang="x-default" href="https://i-vory.studio/...">

Idempotent via HREFLANG_START/END marker + pre-strip of any existing hreflang tags.

SKIPS:
  - case/iorga.html (HIDE_IORGA policy — hidden both domains)
  - blog/metrici-reale-social-media-2026.html (RO-only, no EN equivalent)
  - 404.html (error page, no alternates)
"""
import re
import sys
from pathlib import Path

ROOT = Path("/sessions/practical-cool-dirac/mnt/websites/ivory-ro/deploy")

HREFLANG_MAP = {
    "index.html":                                              ("", ""),
    "portofoliu.html":                                         ("portofoliu.html", "portofoliu.html"),
    "cookies.html":                                            ("cookies.html", "cookies.html"),
    "gdpr.html":                                               ("gdpr.html", "gdpr.html"),
    "privacy.html":                                            ("privacy.html", "privacy.html"),
    "terms.html":                                              ("terms.html", "terms.html"),
    "blog/index.html":                                         ("blog/", "blog/"),
    "blog/cat-costa-social-media-romania-2026.html":           ("blog/cat-costa-social-media-romania-2026.html",)*2,
    "blog/ce-face-agentie-social-media-marketing.html":        ("blog/ce-face-agentie-social-media-marketing.html",)*2,
    "blog/cum-alegi-agentie-social-media-2026.html":           ("blog/cum-alegi-agentie-social-media-2026.html",)*2,
    "blog/de-ce-ai-nevoie-de-social-media.html":               ("blog/de-ce-ai-nevoie-de-social-media.html",)*2,
    "blog/tiktok-vs-instagram-2026.html":                      ("blog/tiktok-vs-instagram-2026.html",)*2,
    "case/ghibu.html":                                         ("case/ghibu.html", "case/ghibu.html"),
    "case/popa.html":                                          ("case/popa.html", "case/popa.html"),
    "case/urbancat.html":                                      ("case/urbancat.html", "case/urbancat.html"),
}

HL_START = "<!-- HREFLANG_START PIVOT.9 -->"
HL_END = "<!-- HREFLANG_END PIVOT.9 -->"


def log(msg):
    print(msg, flush=True)


def build_hreflang_block(ro_seg, en_seg):
    ro_url = f"https://i-vory.ro/{ro_seg}" if ro_seg else "https://i-vory.ro/"
    en_url = f"https://i-vory.studio/{en_seg}" if en_seg else "https://i-vory.studio/"
    return f"""{HL_START}
<link rel="alternate" hreflang="ro" href="{ro_url}">
<link rel="alternate" hreflang="en" href="{en_url}">
<link rel="alternate" hreflang="x-default" href="{en_url}">
{HL_END}"""


def normalize_hreflang(rel_path, ro_seg, en_seg):
    p = ROOT / rel_path
    if not p.exists():
        log(f"  SKIP {rel_path} (missing)")
        return False
    content = p.read_text(encoding="utf-8")

    content = re.sub(
        r'\s*<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href="[^"]*"\s*/?>\s*',
        "\n",
        content,
        flags=re.IGNORECASE
    )

    content = re.sub(
        re.escape(HL_START) + r".*?" + re.escape(HL_END),
        "",
        content,
        flags=re.DOTALL
    )

    new_block = build_hreflang_block(ro_seg, en_seg)

    if "</head>" in content:
        content = content.replace("</head>", f"{new_block}\n</head>", 1)
    else:
        log(f"  WARN {rel_path}: no </head> found")
        return False

    p.write_text(content, encoding="utf-8")
    return True


if __name__ == "__main__":
    log("=" * 70)
    log("PIVOT.9 — inject hreflang 3-way on i-vory.ro")
    log("=" * 70)
    for rel, (ro_seg, en_seg) in HREFLANG_MAP.items():
        if normalize_hreflang(rel, ro_seg, en_seg):
            log(f"  ✓ {rel} → ro+en+x-default")
    log("=" * 70)
    log("DONE")
    log("=" * 70)
