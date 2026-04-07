#!/usr/bin/env python3
"""Scan pictures/ recursively for images and write pictures/manifest.json (URL paths for the static site)."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PICS = ROOT / "pictures"
# Web-friendly raster types (HEIC etc. often won't render in browsers,  omit)
EXTS = {
    ".jpg",
    ".jpeg",
    ".jpe",
    ".png",
    ".webp",
    ".gif",
    ".avif",
    ".jfif",
    ".bmp",
    ".tif",
    ".tiff",
}


def main() -> None:
    PICS.mkdir(parents=True, exist_ok=True)
    rels: list[str] = []
    for p in PICS.rglob("*"):
        if not p.is_file():
            continue
        if p.name.lower() == "manifest.json":
            continue
        if p.suffix.lower() not in EXTS:
            continue
        rel = p.relative_to(PICS).as_posix()
        rels.append(rel)
    rels.sort()
    paths = [f"pictures/{r}" for r in rels]
    out = PICS / "manifest.json"
    out.write_text(json.dumps(paths, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(paths)} entr{'y' if len(paths) == 1 else 'ies'} to {out}")


if __name__ == "__main__":
    main()
