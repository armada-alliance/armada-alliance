#!/usr/bin/env python3
"""Regenerate poolids.json: the bech32 pool IDs of every Armada Alliance pool.

Pool membership comes from the stake-pool pages in
services/website/content/en/stake-pools/<hex pool id>.md. Each hex ID is
resolved to its bech32 ID through the public Koios API (no API key needed).
IDs Koios doesn't know about (never registered on mainnet) are skipped.
"""
import json
import pathlib
import sys
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[2]
POOLS_DIR = ROOT / "services/website/content/en/stake-pools"
OUT = ROOT / "poolids.json"
KOIOS = "https://api.koios.rest/api/v1/pool_list"


def main() -> int:
    hex_ids = sorted(p.stem.lower() for p in POOLS_DIR.glob("*.md"))
    if not hex_ids:
        print(f"no stake-pool pages found in {POOLS_DIR}", file=sys.stderr)
        return 1

    url = (f"{KOIOS}?select=pool_id_hex,pool_id_bech32,pool_status"
           f"&pool_id_hex=in.({','.join(hex_ids)})")
    req = urllib.request.Request(url, headers={"Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        rows = json.load(resp)

    by_hex = {r["pool_id_hex"]: r for r in rows}
    missing = [h for h in hex_ids if h not in by_hex]
    for h in missing:
        print(f"warning: {h} not found on chain, skipped", file=sys.stderr)
    for r in rows:
        if r.get("pool_status") != "registered":
            print(f"note: {r['pool_id_bech32']} is {r.get('pool_status')}", file=sys.stderr)

    pool_ids = [by_hex[h]["pool_id_bech32"] for h in hex_ids if h in by_hex]
    if not pool_ids:
        print("koios returned no pools; refusing to write an empty list", file=sys.stderr)
        return 1

    OUT.write_text(json.dumps(pool_ids) + "\n")
    print(f"The total number of pirates in the armada is {len(pool_ids)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
