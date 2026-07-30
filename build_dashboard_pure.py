#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_dashboard.py 의 pandas-free 버전.
model_params.json + regression_result_ppt.json(있으면, 없으면 regression_result.json)
+ battery_sessions.csv 표본 → dashboard_template.html /*__DATA__*/ 주입 → index.html
"""
import csv, json, os, random

OUT = os.path.dirname(os.path.abspath(__file__))
def load(name):
    return json.load(open(os.path.join(OUT, name), encoding="utf-8"))

params = load("model_params.json")
reg_path = "regression_result_ppt.json" if os.path.exists(os.path.join(OUT,"regression_result_ppt.json")) else "regression_result.json"
reg = load(reg_path)

rows = []
with open(os.path.join(OUT, "battery_sessions.csv"), encoding="utf-8-sig") as f:
    for r in csv.DictReader(f):
        rows.append(r)

SESSION_COLS = ["session_id","model_id","cleaning_mode","cleaning_time_min",
 "start_battery_pct","end_battery_pct","battery_drop_pct",
 "consumption_rate","ambient_temp_c","soh","aborted"]

rng = random.Random(3)
by = {}
for r in rows: by.setdefault(r["model_id"], []).append(r)
sessions = []
for m in sorted(by):
    for r in sorted(rng.sample(by[m], min(6, len(by[m]))), key=lambda x: x["session_id"]):
        s = {}
        for c in SESSION_COLS:
            v = r[c]
            try: s[c] = int(v) if c in ("session_id","aborted") else (v if c in ("model_id","cleaning_mode") else float(v))
            except ValueError: s[c] = v
        sessions.append(s)

n = len(rows)
mean = lambda c: sum(float(r[c]) for r in rows)/n
ds = dict(n=n, users=len(set(r["user_id"] for r in rows)),
 avg_time=round(mean("cleaning_time_min"),1), avg_drop=round(mean("battery_drop_pct"),1),
 avg_rate=round(mean("consumption_rate"),2), abort=round(mean("aborted")*100,1))

payload = json.dumps(dict(params=params, reg=reg, sessions=sessions, ds=ds),
                     ensure_ascii=False, separators=(",", ":"))
tpl = open(os.path.join(OUT, "dashboard_template.html"), encoding="utf-8").read()
assert "/*__DATA__*/" in tpl
html = tpl.replace("/*__DATA__*/{}", payload).replace("/*__DATA__*/", payload)
open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(html)
print(f"index.html 재생성 — {len(html)/1024:.0f} KB · reg={reg_path} · 세션 표본 {len(sessions)}건")
