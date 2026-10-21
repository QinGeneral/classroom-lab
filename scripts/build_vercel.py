#!/usr/bin/env python3
"""Package the existing dist assets with Vercel's static Build Output API."""
import hashlib
import json
import shutil
from pathlib import Path

root = Path(__file__).resolve().parents[1]
source = root / 'dist'
output = root / '.vercel' / 'output'
static = output / 'static'
if static.exists():
    shutil.rmtree(static)
shutil.copytree(source, static)
output.joinpath('config.json').write_text(json.dumps({'version': 3}) + '\n')
assets = [path for path in source.rglob('*') if path.is_file()]
for path in assets:
    packaged = static / path.relative_to(source)
    assert hashlib.sha256(path.read_bytes()).digest() == hashlib.sha256(packaged.read_bytes()).digest()
print(f'Packaged {len(assets)} unchanged static assets into .vercel/output/static')
