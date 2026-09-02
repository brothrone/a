# 발표 산출물 생성기

슬라이드와 대본을 손으로 고치지 않고 코드로 생성한다.
수치가 바뀌면 스크립트만 고치고 다시 돌리면 전체가 갱신된다.

```bash
cd tools && npm install     # 최초 1회 (pptxgenjs, docx)
cd ..
node tools/make.js          # 발표자료_배터리코칭.pptx (본문 11 + 부록 7)
node tools/script.js        # 최종발표_대본.docx
python3 tools/qa.py 발표자료_배터리코칭.pptx   # 넘침·겹침·여백 검사
```

| 파일 | 역할 |
|---|---|
| `deck.js` | 팔레트·레이아웃 헬퍼 (표, 플로우 노드, 캡처 배치) |
| `build.js` | 본문 11장 |
| `appendix.js` | 부록 7장 + 파일 저장 |
| `make.js` | 위 둘을 순서대로 실행 |
| `script.js` | 발표 대본 docx |
| `qa.py` | 도형 좌표 기반 레이아웃 검사 |

캡처는 `shots/`, 분석 그래프는 `figs/`에서 읽는다.
캡처 크기는 PNG 헤더에서 직접 읽으므로 다시 떠도 표가 어긋나지 않는다.
