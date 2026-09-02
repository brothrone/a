/* 부록 7장 */
const D=require('./deck.js');
const {P,S_,head,bullets,shot,node,arrow,vArrow,chip,apx,tbl,
 INK,INK2,MUT,LINE,WASH,W,G,A,R,GD,AD,RD,H,B,M,CW,CY,F}=D;

/* A1 */
{const s=S_();
 head(s,'Appendix A1','세부 유형 10종','계열 5종(A~E) × 갈림 기준 1개');
 const rows=[['코드 · 이름','핵심 리스크','수명 코칭','기준 소모율'],
  ['A-1 가끔·방치형','저SOC 장기 보관 → 자가방전 열화','2주 미사용 시 55% 보관 충전','2.416'],
  ['A-2 가끔·상시거치형','만충 상시 유지 → 고SOC 스트레스','80% 상한 충전 권장','2.416'],
  ['B-1 짧고 잦은 터보상시','고전류 방전 및 발열 누적','터보 8분 = 표준 15분, 모드 다이어트','4.289'],
  ['B-2 짧고 잦은 스팟터보','특이 리스크 없음 (기준 그룹)','주간 배터리 효율 점수 리포트','3.341'],
  ['C-1 장시간 완주형','1회 방전 심도(DoD) 과다','종료 예상 잔량 표시 · DoD 70% 상한','1.881'],
  ['C-2 장시간 분할형','등가 사이클 카운트 급증','분할 2회=0.9사이클, 통합 1회=0.7사이클','1.881'],
  ['D-1 고빈도 다중세션형','완주 불가 + 급속충전 발열','급속충전 직후 5분 냉각 대기','4.052'],
  ['D-2 고빈도 팩교체형','팩별 사용 불균형','팩별 사이클 편차 표시 · 교체 시점 예고','4.052'],
  ['E-1 주말 집중형','주중 방전 방치 + 여유 시간 부족','예상 청소일 12시간 전 사전 충전','2.523'],
  ['E-2 균등 분산형','특이 리스크 없음 (기준 그룹)','경고 없이 주간 요약 · 예상 수명만 표시','2.416']];
 tbl(s,M,CY,CW,rows,[0.22,0.28,0.36,0.14],{header:true,rh:0.38,fs:9,align:['left','left','left','right'],colColor:[INK,RD,INK2,INK]});
 s.addText('기준 소모율(%/분)은 유형별 모드 사용 비율에서 나온다 — C-1 1.881 vs B-1 4.289가 그 차이다.',
  {x:M,y:6.5,w:CW,h:0.3,fontFace:B,fontSize:9.5,color:MUT,margin:0});
 apx(s,'← 본론 2 · 결론 3에서 연결');
 s.addNotes('질문이 오면 여기로 넘긴다.');}

/* A2 */
{const s=S_();
 head(s,'Appendix A2','유형 추론 규칙','자동 추론은 임의 분류가 아니라 명시적 규칙이다');
 const qs=[['집 평수','예측 파라미터',G],['카펫 · 러그','예측 파라미터',G],['반려동물','예측 파라미터',G],
           ['머리카락','예측 파라미터',G],['청소 시간대','무음 정책',A],['한 번에 몰아서?','세부 유형 분기',R],['거치대 상시?','세부 유형 분기',R]];
 qs.forEach((v,i)=>{const y=CY+i*0.55;
  s.addShape(P.ShapeType.roundRect,{x:M,y,w:2.5,h:0.46,rectRadius:0.07,fill:{color:W},line:{color:LINE,width:1.2}});
  s.addText(v[0],{x:M+0.14,y,w:2.2,h:0.46,fontFace:H,fontSize:9.5,bold:true,color:INK,valign:'middle',margin:0});
  s.addShape(P.ShapeType.rect,{x:M+2.62,y:y+0.13,w:0.08,h:0.2,fill:{color:v[2]},line:{width:0}});
  s.addText(v[1],{x:M+2.8,y,w:1.5,h:0.46,fontFace:B,fontSize:8.5,color:v[2]===G?GD:(v[2]===A?AD:RD),valign:'middle',margin:0});});
 s.addText('분기용 2개 · 예측 파라미터 4개 · 무음 정책 1개',{x:M,y:CY+3.95,w:4.4,h:0.28,fontFace:B,fontSize:9.5,color:MUT,margin:0});
 node(s,5.3,CY+1.5,1.6,0.8,'규칙 기반\n추론기',{fill:INK,color:W,line:INK,fs:10});
 arrow(s,4.95,CY+1.9,0.3); arrow(s,6.95,CY+1.9,0.3);
 const rules=[['A계열','거치대 상시 거치 → A-2 / 쓸 때만 → A-1',INK],
              ['B계열','몰아서 → B-1 / 나눠서 → B-2',INK],
              ['C계열','몰아서 → C-1 / 나눠서 → C-2',INK],
              ['D계열','몰아서 → D-2 / 나눠서 → D-1   ※ 방향이 반대',RD],
              ['E계열','몰아서 → E-1 / 나눠서 → E-2',INK]];
 rules.forEach((v,i)=>{const y=CY+0.35+i*0.72;
  s.addShape(P.ShapeType.roundRect,{x:7.45,y,w:5.25,h:0.6,rectRadius:0.08,fill:{color:v[2]===RD?'FCEDEE':WASH},line:{width:0}});
  s.addText(v[0],{x:7.6,y,w:0.9,h:0.6,fontFace:H,fontSize:10,bold:true,color:v[2],valign:'middle',margin:0});
  s.addText(v[1],{x:8.5,y,w:4.1,h:0.6,fontFace:B,fontSize:9.5,color:v[2]===RD?RD:INK2,valign:'middle',margin:0});});
 s.addText('판정 근거는 문장으로 되돌려준다 — “거치대에 항상 꽂아두는 습관 → 만충이 오래 유지되어 고SOC 스트레스가 쌓입니다”',
  {x:M,y:6.4,w:CW,h:0.3,fontFace:B,fontSize:10,italic:true,color:INK2,margin:0});
 apx(s,'← 본론 2에서 연결');
 s.addNotes('D계열만 매핑이 반대다.');}

/* A3 */
{const s=S_();
 head(s,'Appendix A3','계산식 구조 변경','항을 신설하고, 항이 붙는 위치를 옮겼다');
 s.addShape(P.ShapeType.roundRect,{x:M,y:CY,w:5.9,h:1.3,rectRadius:0.1,fill:{color:WASH},line:{width:0}});
 s.addText('정의서 원문식',{x:M+0.24,y:CY+0.12,w:5.4,h:0.26,fontFace:H,fontSize:10,bold:true,color:MUT,margin:0,charSpacing:1});
 s.addText('(잔량 − 예비 잔량) × 온도·SOH 보정\n÷ 모드별 소모율 (설계 잠정 1.7 / 2.5 / 5.0)',
  {x:M+0.24,y:CY+0.44,w:5.4,h:0.8,fontFace:H,fontSize:11,color:INK,margin:0,lineSpacing:19});
 arrow(s,6.5,CY+0.65,0.28,INK);
 s.addShape(P.ShapeType.roundRect,{x:6.82,y:CY,w:5.88,h:1.3,rectRadius:0.1,fill:{color:'EDF6F1'},line:{width:0}});
 s.addText('3차 최종 보정식',{x:7.06,y:CY+0.12,w:5.4,h:0.26,fontFace:H,fontSize:10,bold:true,color:GD,margin:0,charSpacing:1});
 s.addText('(잔량 − 예비 잔량 − 기동 전력)\n÷ [ 기준 소모율 × 부하 × 온도 × (1 + 전압강하 항) ]',
  {x:7.06,y:CY+0.44,w:5.4,h:0.8,fontFace:H,fontSize:11,bold:true,color:GD,margin:0,lineSpacing:19});
 const ch=[['① 없던 항 신설','기동 전력 c₀ = 2.14% · 저잔량 전압강하 β = 0.237','식에 없는 항 47.5% 해소',R,RD],
           ['② 값 재추정','모드별 소모율 = 1.56 / 2.63 / 5.00 (%/분)','값이 틀린 항 33.9% 해소',A,AD],
           ['③ 위치 이동','온도 계수를 가용 용량 → 소모 속도로','적용 위치가 틀린 항 18.5% 해소',G,GD]];
 ch.forEach((v,i)=>{const y=CY+1.45+i*0.72;
  s.addShape(P.ShapeType.roundRect,{x:M,y,w:CW,h:0.66,rectRadius:0.08,fill:{color:WASH},line:{width:0}});
  s.addShape(P.ShapeType.rect,{x:M+0.18,y:y+0.22,w:0.09,h:0.22,fill:{color:v[3]},line:{width:0}});
  s.addText(v[0],{x:M+0.42,y,w:2.2,h:0.66,fontFace:H,fontSize:10.5,bold:true,color:INK,valign:'middle',margin:0});
  s.addText(v[1],{x:M+2.7,y,w:5.3,h:0.66,fontFace:B,fontSize:9.5,color:INK2,valign:'middle',margin:0});
  s.addText(v[2],{x:M+8.1,y,w:3.9,h:0.66,fontFace:B,fontSize:9.5,bold:true,color:v[4],valign:'middle',align:'right',margin:0});});
 const kk=[['예비 잔량 5%','이 아래는 실사용 시간에서 제외'],['온도 보정','18℃ 미만 · 30℃ 초과에만 작동'],
           ['부하 계수 ≤ 1.40','카펫 0.15 · 반려동물 0.10 · 장모 0.08'],['SOH','실효 소모율의 분모로 적용']];
 kk.forEach((v,i)=>{const x=M+i*3.1;
  s.addShape(P.ShapeType.roundRect,{x,y:5.8,w:2.9,h:0.68,rectRadius:0.07,fill:{color:W},line:{color:LINE,width:1}});
  s.addText(v[0],{x:x+0.16,y:5.86,w:2.6,h:0.26,fontFace:H,fontSize:9.5,bold:true,color:INK,margin:0});
  s.addText(v[1],{x:x+0.16,y:6.12,w:2.6,h:0.3,fontFace:B,fontSize:8,color:MUT,margin:0,lineSpacing:10});});
 s.addText('슬라이드용으로 다시 쓴 식이 아니라, 코칭 화면의 세 지표를 만들어내는 앱의 그 함수다.',
  {x:M,y:6.56,w:CW,h:0.3,fontFace:B,fontSize:10,italic:true,color:INK,margin:0});
 apx(s,'← 결론 1에서 연결 · 3식 비교는 A4 · 오차 분해는 A5');
 s.addNotes('앱에 도는 식과 슬라이드의 식이 같다고 분명히 답한다.');}

/* A4 */
{const s=S_();
 head(s,'Appendix A4','계산식 3종 비교','검증 데이터 13,392건 · 동일 조건 비교');
 const rows=[['방식','평균 오차','편향','완주 판정 정확도','RMSE','R²'],
  ['① 정의서 원문식','3.56분','+3.56분','90.0%','4.14','0.8645'],
  ['② 3차 최종 보정식 (채택)','0.98분','−0.12분','96.0%','1.92','0.9710'],
  ['③ 간단 회귀 (변수 5개)','1.71분','−0.08분','93.7%','2.35','0.9562']];
 tbl(s,M,CY,7.5,rows,[0.34,0.13,0.14,0.19,0.1,0.1],{header:true,rh:0.46,fs:9.5,hi:2,align:['left','right','right','right','right','right']});
 s.addText('편향 부호가 핵심',{x:M,y:CY+2.2,w:3,h:0.3,fontFace:H,fontSize:11,bold:true,color:INK,margin:0});
 s.addText('원문식만 +3.56분으로 전량 과대추정이라 “완주 가능”이라 해놓고 꺼지는 방향으로만 틀린다. 나머지 둘은 사실상 무편향이다.',
  {x:M,y:CY+2.52,w:7.5,h:0.5,fontFace:B,fontSize:10,color:INK2,margin:0,lineSpacing:14});
 s.addText('물리식이 회귀보다 정확했고, 각 항의 의미를 설명할 수 있어 해석 가능성에서도 앞선다.',
  {x:M,y:CY+3.05,w:7.5,h:0.3,fontFace:B,fontSize:10,bold:true,color:GD,margin:0});
 s.addText('앱의 판정 경계',{x:8.4,y:CY,w:4.3,h:0.3,fontFace:H,fontSize:11,bold:true,color:INK,margin:0});
 [['여유 5분 이상','완주 가능',G],['여유 0 ~ 5분','빠듯함',A],['여유 음수','충전 필요',R],['만충으로도 음수','분할 청소',A]].forEach((v,i)=>{const y=CY+0.4+i*0.5;
  s.addShape(P.ShapeType.roundRect,{x:8.4,y,w:4.3,h:0.42,rectRadius:0.06,fill:{color:WASH},line:{width:0}});
  s.addShape(P.ShapeType.rect,{x:8.55,y:y+0.11,w:0.08,h:0.2,fill:{color:v[2]},line:{width:0}});
  s.addText(v[0],{x:8.78,y,w:1.8,h:0.42,fontFace:B,fontSize:9.5,color:INK2,valign:'middle',margin:0});
  s.addText(v[1],{x:10.6,y,w:1.95,h:0.42,fontFace:H,fontSize:9.5,bold:true,color:v[2]===G?GD:(v[2]===A?AD:RD),valign:'middle',align:'right',margin:0});});
 s.addText('임계 잔량은 고정값이 아니라, 목표 여유 시간을 만족하는 잔량을 조건별로 역산해 얻는다.',
  {x:8.4,y:CY+2.5,w:4.3,h:0.6,fontFace:B,fontSize:9.5,color:MUT,margin:0,lineSpacing:13});
 s.addShape(P.ShapeType.roundRect,{x:M,y:6.05,w:CW,h:0.72,rectRadius:0.08,fill:{color:WASH},line:{width:0}});
 s.addText('집계 기준 각주 — 대시보드에는 세션 단위 전체 집계(3.71 → 0.32분, 89% → 99%)도 함께 실려 있습니다. 발표 수치는 모델별 결과 집계 기준(3.56 → 0.98분, 90.0% → 96.0%)으로 통일했습니다.',
  {x:M+0.2,y:6.05,w:CW-0.4,h:0.72,fontFace:B,fontSize:9.5,color:INK2,valign:'middle',margin:0,lineSpacing:13});
 apx(s,'← 본론 3 · 결론 1에서 연결');
 s.addNotes('집계 단위가 달라 두 세트가 있다고 먼저 밝힌다.');}

/* A5 */
{const s=S_();
 head(s,'Appendix A5','오차 요인 분해','진단이 처방을 지목했다 — 튜닝으로는 최대 33.9%까지만');
 s.addImage({path:F+'fig4_waterfall.png',x:M,y:CY,w:5.9,h:3.35});
 const dz=[['47.5%','식에 없는 항','기동 전력 · 전압강하 항 신설',R,RD],
           ['33.9%','값이 틀린 항','모드별 소모율 재추정',A,AD],
           ['18.5%','적용 위치가 틀린 항','온도 계수를 소모 속도로 이동',G,GD]];
 s.addText('진단',{x:7.0,y:CY-0.02,w:1.5,h:0.24,fontFace:H,fontSize:9,bold:true,color:MUT,margin:0,charSpacing:1});
 s.addText('처방',{x:9.95,y:CY-0.02,w:1.5,h:0.24,fontFace:H,fontSize:9,bold:true,color:MUT,margin:0,charSpacing:1});
 dz.forEach((v,i)=>{const y=CY+0.25+i*1.05;
  s.addText(v[0],{x:7.0,y,w:1.3,h:0.42,fontFace:H,fontSize:21,bold:true,color:v[4],margin:0});
  s.addText(v[1],{x:7.0,y:y+0.44,w:2.3,h:0.28,fontFace:H,fontSize:10,bold:true,color:INK,margin:0});
  arrow(s,9.4,y+0.3,0.4,v[3]);
  s.addShape(P.ShapeType.roundRect,{x:9.95,y:y-0.02,w:2.75,h:0.66,rectRadius:0.07,fill:{color:WASH},line:{width:0}});
  s.addText(v[2],{x:10.1,y:y-0.02,w:2.45,h:0.66,fontFace:B,fontSize:9.5,color:INK2,valign:'middle',margin:0,lineSpacing:13});});
 s.addText('잔차를 조건별(모드 · 잔량 구간 · 온도 · 세션 길이)로 층화해 각 층에 남는 계통적 패턴을 추적했다. 계수만 다시 맞췄다면 오차의 절반도 잡지 못했다.',
  {x:M,y:6.15,w:CW,h:0.5,fontFace:B,fontSize:10,color:INK2,margin:0,lineSpacing:14});
 apx(s,'← 결론 1에서 연결 · 처방의 실제 형태는 A3');
 s.addNotes('검증과 진단을 가르는 지점이다.');}

/* A6 */
{const s=S_();
 head(s,'Appendix A6','모델별 검증 결과','10종 전부 개선 · 가장 어려운 케이스도 함께');
 const md=[['A-1',3.21,0.70,78],['A-2',3.60,0.84,77],['B-1',2.40,0.82,66],['B-2',3.06,0.75,75],['C-1',5.25,1.42,73],
           ['C-2',5.53,1.39,75],['D-1',2.15,0.80,63],['D-2',2.40,0.90,62],['E-1',3.11,0.69,78],['E-2',3.98,0.88,78]];
 const x0=1.5, sc=1.02;
 s.addText('원문식',{x:4.4,y:CY-0.1,w:1.6,h:0.24,fontFace:B,fontSize:8.5,color:MUT,margin:0});
 s.addText('보정식',{x:1.75,y:CY-0.1,w:1.6,h:0.24,fontFace:B,fontSize:8.5,color:GD,margin:0});
 s.addText('개선율',{x:8.35,y:CY-0.1,w:1.0,h:0.24,fontFace:B,fontSize:8.5,color:MUT,margin:0,align:'right'});
 md.forEach((v,i)=>{const y=CY+0.2+i*0.4;
  s.addText(v[0],{x:M,y:y-0.09,w:0.8,h:0.26,fontFace:H,fontSize:9,bold:true,color:INK,valign:'middle',margin:0});
  s.addShape(P.ShapeType.line,{x:x0+v[2]*sc,y:y+0.04,w:(v[1]-v[2])*sc,h:0,line:{color:'C3CCD3',width:2.5}});
  s.addShape(P.ShapeType.ellipse,{x:x0+v[1]*sc-0.07,y:y-0.03,w:0.14,h:0.14,fill:{color:'9AA6AE'},line:{width:0}});
  s.addShape(P.ShapeType.ellipse,{x:x0+v[2]*sc-0.07,y:y-0.03,w:0.14,h:0.14,fill:{color:G},line:{width:0}});
  s.addText(v[1].toFixed(2),{x:x0+v[1]*sc+0.12,y:y-0.09,w:0.6,h:0.26,fontFace:B,fontSize:8,color:MUT,valign:'middle',margin:0});
  s.addText('−'+v[3]+'%',{x:8.35,y:y-0.09,w:1.0,h:0.26,fontFace:H,fontSize:8.5,bold:true,color:GD,valign:'middle',align:'right',margin:0});});
 s.addShape(P.ShapeType.roundRect,{x:9.6,y:CY,w:3.1,h:1.5,rectRadius:0.08,fill:{color:'FCEDEE'},line:{width:0}});
 s.addText('가장 어려운 케이스 — C-1',{x:9.78,y:CY+0.12,w:2.8,h:0.26,fontFace:H,fontSize:9.5,bold:true,color:RD,margin:0});
 s.addText('완주 판정 정확도는 보정 후에도 76%로 10종 중 유일하게 낮다. 다만 개선폭은 55% → 76%로 가장 크다. 세션이 길수록 작은 예측 오차가 완주 여부를 뒤집기 쉽기 때문이다.',
  {x:9.78,y:CY+0.4,w:2.8,h:1.02,fontFace:B,fontSize:8.5,color:INK2,margin:0,lineSpacing:12});
 s.addShape(P.ShapeType.roundRect,{x:9.6,y:CY+1.65,w:3.1,h:0.85,rectRadius:0.08,fill:{color:'EDF6F1'},line:{width:0}});
 s.addText('최대 개선 — E-1',{x:9.78,y:CY+1.76,w:2.8,h:0.26,fontFace:H,fontSize:9.5,bold:true,color:GD,margin:0});
 s.addText('완주 판정 정확도 50% → 97%',{x:9.78,y:CY+2.04,w:2.8,h:0.4,fontFace:B,fontSize:9,color:INK2,margin:0,lineSpacing:12});
 const env=[['설치형 웹앱 · 오프라인','단일 HTML 기반 PWA. 서비스워커가 음성 클립까지 전 자산을 캐시해 네트워크가 끊겨도 전 구간 동작'],
            ['데모 제어','“완주 경계” · “빠듯 경계” 버튼은 목표 여유 시간을 만족하는 잔량을 역산해 즉시 점프시킨다'],
            ['검증 재현','사용 이력 → 재계산 스크립트 → 결과 데이터로 수치 전량 재현 가능']];
 env.forEach((v,i)=>{const x=M+i*4.15;
  s.addShape(P.ShapeType.roundRect,{x,y:6.0,w:3.9,h:0.85,rectRadius:0.08,fill:{color:WASH},line:{width:0}});
  s.addText(v[0],{x:x+0.18,y:6.08,w:3.5,h:0.24,fontFace:H,fontSize:9,bold:true,color:INK,margin:0});
  s.addText(v[1],{x:x+0.18,y:6.32,w:3.5,h:0.48,fontFace:B,fontSize:8,color:MUT,margin:0,lineSpacing:10});});
 s.addNotes('C-1 76%를 먼저 말한다.');}

/* A7 */
{const s=S_();
 head(s,'Appendix A7','SOC · SOH 상세','질문 대비 — 용어 정의와 수명 판정 기준');
 const T=[['구분','SOC (State of Charge)','SOH (State of Health)'],
  ['뜻','지금 남은 충전량','신품 대비 남은 성능'],
  ['범위','0 ~ 100% · 쓰면 줄고 충전하면 회복','100%에서 시작해 단조 감소 · 회복 안 됨'],
  ['변하는 속도','한 번의 청소로도 크게 변함','수백 사이클에 걸쳐 서서히 변함'],
  ['답하는 질문','오늘 이 청소를 끝낼 수 있는가','앞으로 얼마나 더 쓸 수 있는가'],
  ['앱에서의 쓰임','상태 판정(완주/빠듯/충전)의 입력','예측식의 소모 속도 보정 + 교체 시점 안내']];
 tbl(s,M,CY,CW,T,[0.16,0.42,0.42],{header:true,rh:0.5,fs:9.5,colColor:[INK,GD,AD]});
 s.addShape(P.ShapeType.roundRect,{x:M,y:CY+3.15,w:5.9,h:1.5,rectRadius:0.1,fill:{color:'FCEDEE'},line:{width:0}});
 s.addText('흔한 오해',{x:M+0.24,y:CY+3.28,w:5.4,h:0.26,fontFace:H,fontSize:9.5,bold:true,color:RD,margin:0,charSpacing:1});
 bullets(s,['“SOH 50%면 SOC도 50%” — 아니다. 완전히 다른 축이다',
  'SOH 50%인 배터리도 만충하면 SOC는 100%가 된다. 다만 그 100%가 담는 에너지가 절반이다'],M+0.24,CY+3.6,5.45,9.5,INK2,0.52);
 s.addShape(P.ShapeType.roundRect,{x:6.82,y:CY+3.15,w:5.88,h:1.5,rectRadius:0.1,fill:{color:WASH},line:{width:0}});
 s.addText('수명 판정 기준',{x:7.06,y:CY+3.28,w:5.4,h:0.26,fontFace:H,fontSize:9.5,bold:true,color:INK,margin:0,charSpacing:1});
 bullets(s,['업계 통상 기준 — SOH 80% 미만이면 수명이 다한 것으로 본다',
  '앱은 SOH 80% 미만에서 코칭 화면에 “교체 검토” 안내를 띄운다',
  '적용 방식 — 실효 소모율 ÷ SOH. SOH 80%면 소모 속도 1.25배, 가용 시간 20% 감소'],7.06,CY+3.6,5.45,9.5,INK2,0.42);
 s.addText('SOH를 넣기 전에는 배터리가 늙을수록 안내가 낙관적으로 틀렸다. 넣고 나서는 수명이 닳아도 안내가 계속 맞는다.',
  {x:M,y:6.45,w:CW,h:0.3,fontFace:B,fontSize:10.5,italic:true,color:INK,margin:0});
 apx(s,'← 서론 2 · 본론 4에서 연결');
 s.addNotes('“SOH 50이면 SOC도 50이냐”는 오해를 여기서 끊는다.');}

D.P.writeFile({fileName:require('path').resolve(__dirname,'..','발표자료_배터리코칭.pptx')})
 .then(f=>console.log('생성:',f));
