#!/usr/bin/env python3
"""Read back every static ESA asset and compare SHA-256 without persisting auth."""
import argparse
import hashlib
import json
from pathlib import Path
import urllib.parse
import subprocess

parser = argparse.ArgumentParser()
parser.add_argument('--base-url', required=True)
parser.add_argument('--cookie-jar', required=True)
parser.add_argument('--output', default='output/esa-verification.json')
args = parser.parse_args()
base = urllib.parse.urlsplit(args.base_url)
if base.scheme != 'https' or base.query or base.fragment:
    parser.error('Use the HTTPS base URL without a query or fragment.')
root = Path(__file__).resolve().parents[1]
# curl handles Netscape #HttpOnly_ cookie rows that macOS Python 3.9 skips.
results = []
for path in sorted((root / 'dist').rglob('*')):
    if not path.is_file():
        continue
    relative = path.relative_to(root / 'dist').as_posix()
    url = urllib.parse.urljoin(args.base_url.rstrip('/') + '/', relative)
    result = subprocess.run(['curl', '--fail', '--silent', '--show-error', '--location',
        '--connect-timeout', '15', '--max-time', '30', '--cookie', args.cookie_jar,
        '--header', 'Accept-Encoding: identity', '--write-out', '\nHTTP_STATUS:%{http_code}',
        url], capture_output=True, check=True)
    content, status = result.stdout.rsplit(b'\nHTTP_STATUS:', 1)
    local_hash = hashlib.sha256(path.read_bytes()).hexdigest()
    remote_hash = hashlib.sha256(content).hexdigest()
    results.append({'path': relative, 'status': int(status),
                    'sha256': local_hash, 'matches': local_hash == remote_hash})
report = {'base_url': args.base_url.rstrip('/'), 'assets': results,
          'all_match': all(item['matches'] and item['status'] == 200 for item in results)}
out = root / args.output
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'assets_verified': len(results), 'all_match': report['all_match'],
                  'report': str(out.relative_to(root))}, ensure_ascii=False))
raise SystemExit(0 if report['all_match'] else 1)
