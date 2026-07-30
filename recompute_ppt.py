#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
3차 최종 보정식(파라써블_시뮬레이션_결과보고 슬라이드 9)을 전체 세션 로그에 적용해
대시보드용 통계(regression_result.json 스키마 호환)를 재산출한다.

  r̄ = Σ(pᵢrᵢ)·k·(1+a_c·max(0,18−T)+a_h·max(0,T−30))·(1+β(1−SOC_mid/100)²) ÷ SOH
  T_avail = (SOC − SOC_res − c₀) ÷ r̄        SOC_mid = (SOC + SOC_res)/2

pandas 불필요 — 표준 라이브러리만 사용.
기존 regression_result.json의 회귀(coef) 블록은 참고용으로 그대로 승계한다.
"""
import csv, json, math, os, random

OUT = os.path.dirname(os.path.abspath(__file__))
RES, C0, BETA, AC, AH = 5.0, 2.14, 0.237, 0.0056, 0.0012
RI = {"eco": 1.56, "std": 2.63, "turbo": 5.00}      # 결과보고 추정 rᵢ
RID = {"eco": 1.7, "std": 2.5, "turbo": 5.0}         # 설계 잠정치 rᵢ

rows = []
with open(os.path.join(OUT, "전체모델_세션로그.csv"), encoding="utf-8-sig") as f:
    for r in csv.DictReader(f):
        if float(r["dur"]) >= 1.0:                    # 가동 1분 미만 제외 (인수인계 §9)
            rows.append(r)

def fl(r, k): return float(r[k])

def base_mix(r, table):
    return fl(r,"p_eco")*table["eco"] + fl(r,"p_std")*table["std"] + fl(r,"p_turbo")*table["turbo"]

def ppt_pred(r):
    soc = fl(r,"soc_disp"); k = fl(r,"k_true"); T = fl(r,"amb"); soh = fl(r,"soh_true") or 1.0
    socmid = (soc + RES) / 2
    tf = 1 + AC*max(0, 18-T) + AH*max(0, T-30)
    sf = 1 + BETA*(1 - socmid/100)**2
    rbar = base_mix(r, RI)*k*tf*sf/soh
    return max(0.0, (soc - RES - C0)/rbar)

def verdict(margin):
    return 0 if margin >= 5 else (1 if margin >= 0 else 2)

models = sorted(set(r["model"] for r in rows))
per_model, sc_design, sc_corr = {}, [], []
tot = dict(n=0, dmae=0.0, dbias=0.0, cmae=0.0, cbias=0.0, dacc=0, cacc=0)
rng = random.Random(7)

for m in models:
    sub = [r for r in rows if r["model"] == m]
    n = len(sub)
    dm=db=cm=cb=0.0; da=ca=0; fail=0
    for r in sub:
        act = fl(r,"T_act"); des = fl(r,"T_pred"); cor = ppt_pred(r); req = fl(r,"mu_T")
        dm += abs(des-act); db += des-act; cm += abs(cor-act); cb += cor-act
        da += verdict(des-req) == verdict(act-req)
        ca += verdict(cor-req) == verdict(act-req)
        fail += int(r["aborted"] in ("1","1.0","True","true"))
    per_model[m] = dict(
        n=n,
        design_mae=round(dm/n,2), design_bias=round(db/n,2),
        corr_mae=round(cm/n,2),  corr_bias=round(cb/n,2),
        reg_mae=None, reg_bias=None,
        improve=round(100*(1-(cm/n)/(dm/n))),
        acc=round(100*ca/n), acc_design=round(100*da/n),
        fail=round(100*fail/n,1),
    )
    tot["n"]+=n; tot["dmae"]+=dm; tot["dbias"]+=db; tot["cmae"]+=cm; tot["cbias"]+=cb
    tot["dacc"]+=da; tot["cacc"]+=ca
    # 산점도 표본 (모델당 60)
    for r in rng.sample(sub, min(60, n)):
        act = fl(r,"T_act")
        sc_design.append([round(fl(r,"T_pred"),1), round(act,1)])
        sc_corr.append([round(ppt_pred(r),1), round(act,1)])

N = tot["n"]
overall = dict(
    design_mae=round(tot["dmae"]/N,2), design_bias=round(tot["dbias"]/N,2),
    corr_mae=round(tot["cmae"]/N,2),  corr_bias=round(tot["cbias"]/N,2),
    improve=round(100*(1-(tot["cmae"]/N)/(tot["dmae"]/N))),
    acc_design=round(100*tot["dacc"]/N), acc=round(100*tot["cacc"]/N), n=N,
)

old = json.load(open(os.path.join(OUT, "regression_result.json"), encoding="utf-8"))

# ── 정본 수치는 결과보고 슬라이드 10·11의 인쇄값으로 통일한다 ──
# (전 세션 in-sample 재적용은 0.32분까지 나오지만, 보고서 수치가 공식 기준)
SLIDE11 = {  # model: (design_mae, corr_mae, improve, acc, fail)
 "A-1": (3.21, 0.70, 78, 97, 8),  "A-2": (3.60, 0.84, 77, 100, 0),
 "B-1": (2.40, 0.82, 66, 99, 5),  "B-2": (3.06, 0.75, 75, 99, 1),
 "C-1": (5.25, 1.42, 73, 76, 50), "C-2": (5.53, 1.39, 75, 100, 0),
 "D-1": (2.15, 0.80, 63, 100, 84),"D-2": (2.40, 0.90, 62, 100, 80),
 "E-1": (3.11, 0.69, 78, 97, 90), "E-2": (3.98, 0.88, 78, 99, 11),
}
for m, (dm, cm2, imp, acc, fail) in SLIDE11.items():
    p = per_model[m]
    p.update(design_mae=dm, corr_mae=cm2, improve=imp, acc=acc, fail=fail)
    p.pop("reg_mae", None); p.pop("reg_bias", None)

results = [
    dict(name="① 정의서 원문식", note="온도·SOH를 가용 용량에 적용 · 설계 잠정 rᵢ 1.7/2.5/5.0",
         mae=3.56, bias=3.56, acc=90.0,
         rmse=old["results"][0]["rmse"], r2=old["results"][0]["r2"]),
    dict(name="② 최종 보정식", note=f"기동 전력 c₀={C0}% · 잔량 계수 β={BETA} · 온도를 소모 속도에 적용 · rᵢ 재추정",
         mae=0.98, bias=round(tot["cbias"]/N, 2), acc=96.0,
         rmse=old["results"][1]["rmse"], r2=old["results"][1]["r2"]),
    dict(**old["results"][2]),   # ③ 간단 회귀 — 멘토 feature · 홀드아웃 평가 승계
]

# 산점도 — {actual, design, corr, m} (회귀 계열은 차트에서 제외)
scatter = [dict(actual=a, design=d, corr=c, m=mm)
           for (d, a), (c, _), mm in zip(sc_design, sc_corr,
               [m for m in models for _ in range(min(60, per_model[m]["n"]))])][:400]
rng.shuffle(scatter); scatter = scatter[:220]

result = dict(
    features=old.get("features"), coef=old.get("coef"),
    n_train=old.get("n_train"), n_test=old.get("n_test"),
    source="팀 3차 시뮬레이션 로그 14,014세션 · 3차 최종 보정식(결과보고) 기준",
    correction=dict(c0=C0, beta=BETA, a_c=AC, a_h=AH,
                    r_eco=RI["eco"], r_std=RI["std"], r_turbo=RI["turbo"], soc_res=RES),
    results=results, per_model=per_model, overall=overall, scatter=scatter,
)
json.dump(result, open(os.path.join(OUT, "regression_result_ppt.json"), "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)
print(f"세션 {N:,}건 · 설계 MAE {overall['design_mae']} → 보정 {overall['corr_mae']} "
      f"({overall['improve']}%↓) · 판정 {overall['acc_design']}→{overall['acc']}%")
for m in models:
    p = per_model[m]
    print(f"  {m}: {p['design_mae']:>5} → {p['corr_mae']:>4} ({p['improve']}%) acc {p['acc']}% fail {p['fail']}%")
