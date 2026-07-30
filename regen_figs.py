#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
3차 최종 보정식 기준으로 진단 그래프를 재생성한다.
 fig1_scatter   : 실측 vs 예측 산점도 (원문식 · 최종 보정식)
 fig2_residual  : 잔차 진단 — 시작 SOC · 온도 · 가동 시간별 원문식 잔차 추세
 fig3_error     : 오차 분포 히스토그램 (원문식 vs 보정식)
 fig4_waterfall : 오차 원인 분해 (결과보고 슬라이드 8 — 47.5 / 33.9 / 18.5%)
입력: 전체모델_세션로그.csv (가동 1분 미만 제외)
"""
import csv, os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm

# 한글 폰트
for cand in ["AppleGothic", "Apple SD Gothic Neo", "Malgun Gothic", "NanumGothic"]:
    if any(cand in f.name for f in fm.fontManager.ttflist):
        plt.rcParams["font.family"] = cand; break
plt.rcParams["axes.unicode_minus"] = False

OUT = os.path.dirname(os.path.abspath(__file__))
RES, C0, BETA, AC, AH = 5.0, 2.14, 0.237, 0.0056, 0.0012
RI = {"eco": 1.56, "std": 2.63, "turbo": 5.00}

rows = []
with open(os.path.join(OUT, "전체모델_세션로그.csv"), encoding="utf-8-sig") as f:
    for r in csv.DictReader(f):
        if float(r["dur"]) >= 1.0:
            rows.append(r)

fl = lambda r, k: float(r[k])
def ppt(r):
    soc = fl(r,"soc_disp"); k = fl(r,"k_true"); T = fl(r,"amb"); soh = fl(r,"soh_true") or 1.0
    base = fl(r,"p_eco")*RI["eco"] + fl(r,"p_std")*RI["std"] + fl(r,"p_turbo")*RI["turbo"]
    tf = 1 + AC*max(0,18-T) + AH*max(0,T-30)
    sf = 1 + BETA*(1-((soc+RES)/2)/100)**2
    return max(0.0, (soc-RES-C0)/(base*k*tf*sf/soh))

act  = [fl(r,"T_act")  for r in rows]
des  = [fl(r,"T_pred") for r in rows]
cor  = [ppt(r)          for r in rows]
GREEN, GRAY, RED, INK = "#0f9d58", "#9ca3af", "#d93025", "#14161a"

# ── fig1 산점도 ─────────────────────────────
import random
idx = random.Random(7).sample(range(len(rows)), 1200)
fig, ax = plt.subplots(figsize=(7.4, 5.4), dpi=150)
ax.scatter([act[i] for i in idx], [des[i] for i in idx], s=9, alpha=.35, c=GRAY, label="① 정의서 원문식", edgecolors="none")
ax.scatter([act[i] for i in idx], [cor[i] for i in idx], s=9, alpha=.4,  c=GREEN, label="② 최종 보정식", edgecolors="none")
mx = max(max(act), max(des))*1.03
ax.plot([0,mx],[0,mx], ls="--", lw=1.2, c=INK, label="완전 일치선")
ax.set_xlabel("실측 사용 가능 시간 (분)"); ax.set_ylabel("예측값 (분)")
ax.set_title("실측 vs 예측 — 원문식은 일관되게 위쪽(과대), 보정식은 대각선 밀집", fontsize=11)
ax.legend(frameon=False, fontsize=9); ax.grid(alpha=.25, lw=.5)
fig.tight_layout(); fig.savefig(os.path.join(OUT,"figs","fig1_scatter.png")); plt.close(fig)

# ── fig2 잔차 진단 (원문식 잔차의 추세 = 누락 항 근거) ──
def binned(xs, ys, nb=14):
    lo, hi = min(xs), max(xs); w = (hi-lo)/nb or 1
    cx, cy = [], []
    for b in range(nb):
        sel = [y for x,y in zip(xs,ys) if lo+b*w <= x < lo+(b+1)*w]
        if len(sel) >= 30: cx.append(lo+(b+.5)*w); cy.append(sum(sel)/len(sel))
    return cx, cy
resid_d = [d-a for d,a in zip(des,act)]
resid_c = [c-a for c,a in zip(cor,act)]
feats = [("시작 SOC (%)", [fl(r,"soc_disp") for r in rows]),
         ("주변 온도 (℃)", [fl(r,"amb") for r in rows]),
         ("가동 시간 (분)", [fl(r,"dur") for r in rows])]
fig, axes = plt.subplots(1, 3, figsize=(11.5, 3.6), dpi=150, sharey=True)
for ax, (nm, xs) in zip(axes, feats):
    cx, cy = binned(xs, resid_d); ax.plot(cx, cy, "-o", ms=3.5, c=GRAY, label="원문식 잔차")
    cx, cy = binned(xs, resid_c); ax.plot(cx, cy, "-o", ms=3.5, c=GREEN, label="보정식 잔차")
    ax.axhline(0, c=INK, lw=.8, ls="--"); ax.set_xlabel(nm); ax.grid(alpha=.25, lw=.5)
axes[0].set_ylabel("평균 잔차 (분)"); axes[0].legend(frameon=False, fontsize=8.5)
fig.suptitle("잔차 진단 — 원문식 잔차에 남은 추세가 곧 누락된 항", fontsize=11, y=1.0)
fig.tight_layout(); fig.savefig(os.path.join(OUT,"figs","fig2_residual.png")); plt.close(fig)

# ── fig3 오차 분포 ─────────────────────────
fig, ax = plt.subplots(figsize=(7.4, 4.4), dpi=150)
ax.hist(resid_d, bins=60, range=(-4, 8), alpha=.55, color=GRAY,  label=f"① 원문식 (평균 {sum(resid_d)/len(resid_d):+.2f}분)")
ax.hist(resid_c, bins=60, range=(-4, 8), alpha=.6,  color=GREEN, label=f"② 최종 보정식 (평균 {sum(resid_c)/len(resid_c):+.2f}분)")
ax.axvline(0, c=INK, lw=1, ls="--")
ax.set_xlabel("예측 - 실측 (분)"); ax.set_ylabel("세션 수")
ax.set_title("오차 분포 — 보정 후 0 중심으로 이동", fontsize=11)
ax.legend(frameon=False, fontsize=9); ax.grid(alpha=.25, lw=.5)
fig.tight_layout(); fig.savefig(os.path.join(OUT,"figs","fig3_error.png")); plt.close(fig)

# ── fig4 오차 원인 분해 (결과보고 슬라이드 8) ──
labels = ["식에 없는 항\n(기동 전력·저잔량 가중)", "값이 틀린 항\n(모드별 소모율 r)", "적용 위치가 틀린 항\n(온도 보정)"]
shares = [47.5, 33.9, 18.5]
colors = [RED, "#e0a341", "#1e6fd9"]
fig, ax = plt.subplots(figsize=(7.4, 4.2), dpi=150)
start = 0
for lab, sh, cc in zip(labels, shares, colors):
    ax.barh(0, sh, left=start, color=cc, height=.5)
    ax.text(start+sh/2, 0, f"{sh}%", ha="center", va="center", color="#fff", fontsize=12, fontweight="bold")
    ax.text(start+sh/2, -.52, lab, ha="center", va="top", fontsize=9, color=INK)
    start += sh
ax.set_xlim(0, 100); ax.set_ylim(-1.15, .6); ax.axis("off")
ax.set_title("원문식 오차 원인 분해 — 절반은 계산식에 항 자체가 없어서 발생 (대표 모델 기준)", fontsize=11)
fig.tight_layout(); fig.savefig(os.path.join(OUT,"figs","fig4_waterfall.png")); plt.close(fig)

print("figs 재생성 완료: fig1, fig2, fig3, fig4")
