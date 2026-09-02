/* 본문 11장 — node tools/build.js */
const D=require('./deck.js');
const {P,S_,D_,head,bullets,shot,cap,node,arrow,vArrow,hline,chip,apx,demo,tbl,flow3,
 INK,INK2,MUT,LINE,WASH,W,G,A,R,GD,AD,RD,H,B,M,CW,CY,F}=D;

/* ══ 1. 표지 ══ */
{const s=D_();
 s.addShape(P.ShapeType.rect,{x:8.5,y:0,w:4.83,h:7.5,fill:{color:'0D1115'},line:{width:0}});
 shot(s,'08_coach_ok_C',{x:9.32,y:0.6,h:6.3});
 s.addText('파라써블 × 부산대학교 · 미래 AX 생활가전 리빙 솔루션+',{x:M,y:1.85,w:7.2,h:0.3,fontFace:H,fontSize:10.5,bold:true,color:'7FD9A8',margin:0,charSpacing:1.2});
 s.addText('잔량은 기기의 언어,\n코칭 문장은 사용자의 언어',{x:M,y:2.45,w:7.5,h:1.9,fontFace:H,fontSize:38,bold:true,color:W,margin:0,lineSpacing:51,charSpacing:-1});
 s.addText('무선 스틱형 청소기의 배터리 잔량을 “지금 할 행동”으로 번역하는 AX 프로토타입',{x:M,y:4.4,w:7.2,h:0.4,fontFace:B,fontSize:13,color:'A9B5BF',margin:0,lineSpacing:19});
 s.addText('오늘 보여드리는 화면은 전부 실제로 도는 앱 화면입니다',{x:M,y:4.95,w:7.2,h:0.3,fontFace:B,fontSize:11.5,color:'7A8892',margin:0});
 s.addNotes('[15초] 안녕하십니까, 파라써블입니다. 저희는 배터리 잔량을 사용자의 행동으로 번역하는 코칭 UI를 만들었습니다. 오른쪽은 지금 실제로 동작하는 앱 화면입니다.');}

/* ══ 2. 서론 1 ══ */
{const s=S_();
 head(s,'서론 1','문제 정의','기기가 주는 것은 % 하나, 사용자가 묻는 것은 “지금 시작해도 되나”');
 const a=shot(s,'08_coach_ok_C',{x:M,y:CY,h:3.4}); cap(s,a,'C-1 · 24평 · 82%','여유 +15분 → 완주 가능',GD);
 const b=shot(s,'09_coach_tight_E',{x:2.66,y:CY,h:3.4}); cap(s,b,'E-1 · 28평 · 81%','여유 +2분 → 빠듯함',AD);
 bullets(s,['사용자가 던지는 질문 — 지금 시작하면 끝까지 되나 / 어디까지 가능한가 / 중간에 꺼지면 어떡하나',
  '기기가 주는 답은 잔량 %와 LED 칸 수가 전부. 그다음 판단은 전부 사용자 몫이다',
  '잔량은 1%p 차이인데 판정이 갈렸다 — 평수 24 vs 28, 소모 조건이 다르기 때문',
  '완주 여부를 정하는 건 잔량이 아니라 여유 시간이다',
  '게다가 배터리는 쓸수록 늙는다. 같은 82%라도 새 배터리와 2년 쓴 배터리는 다르다'],5.0,CY+0.05,7.7,12,INK2,0.68);
 s.addShape(P.ShapeType.roundRect,{x:5.0,y:5.55,w:7.7,h:0.72,rectRadius:0.09,fill:{color:WASH},line:{width:0}});
 s.addText('두 화면은 조건이 다릅니다. 잔량이 같아도 조건이 다르면 답이 갈리므로, 잔량만으로는 원리적으로 판단할 수 없습니다.',
  {x:5.18,y:5.55,w:7.35,h:0.72,fontFace:B,fontSize:10.5,italic:true,color:INK2,valign:'middle',margin:0,lineSpacing:15});
 s.addNotes('[25초] 왼쪽은 잔량 82%인데 완주 가능, 오른쪽은 81%인데 빠듯함입니다. 평수와 소모 조건이 다르기 때문입니다. 잔량이 같아도 조건이 다르면 답이 갈리므로, 숫자만으로는 지금 시작해도 되는지 알 수 없습니다.');}

/* ══ 3. 서론 2 ══ */
{const s=S_();
 head(s,'서론 2','SOC와 SOH','둘은 독립적이다. 함께 읽어야 “지금 할 수 있는 일”이 나온다');
 [['SOC','State of Charge · 충전 상태','지금 얼마나 남았나. 쓰면 줄고 충전하면 다시 100%가 된다.','오늘 이 청소를 끝낼 수 있는가',G,GD],
  ['SOH','State of Health · 건강 상태','배터리가 얼마나 늙었나. 신품이 100%이고, 한 번 줄면 돌아오지 않는다.','앞으로 이 배터리를 얼마나 더 쓸 수 있는가',A,AD]].forEach((v,i)=>{
  const x=M+i*4.2;
  s.addShape(P.ShapeType.roundRect,{x,y:CY,w:3.95,h:2.5,rectRadius:0.1,fill:{color:WASH},line:{width:0}});
  s.addText(v[0],{x:x+0.26,y:CY+0.16,w:3.4,h:0.5,fontFace:H,fontSize:26,bold:true,color:v[4],margin:0});
  s.addText(v[1],{x:x+0.26,y:CY+0.68,w:3.4,h:0.26,fontFace:H,fontSize:9,bold:true,color:MUT,margin:0});
  s.addText(v[2],{x:x+0.26,y:CY+1.0,w:3.4,h:0.68,fontFace:B,fontSize:11,color:INK2,margin:0,lineSpacing:15});
  s.addText('→ 답하는 질문',{x:x+0.26,y:CY+1.74,w:3.4,h:0.24,fontFace:H,fontSize:8.5,bold:true,color:MUT,margin:0,charSpacing:1});
  s.addText(v[3],{x:x+0.26,y:CY+1.98,w:3.4,h:0.4,fontFace:H,fontSize:11,bold:true,color:v[5],margin:0,lineSpacing:15});});
 s.addShape(P.ShapeType.roundRect,{x:M+8.4,y:CY,w:3.7,h:2.5,rectRadius:0.1,fill:{color:'FCEDEE'},line:{width:0}});
 s.addText('자주 오해하는 것',{x:M+8.66,y:CY+0.16,w:3.2,h:0.26,fontFace:H,fontSize:9,bold:true,color:RD,margin:0,charSpacing:1});
 bullets(s,['SOH 50%라고 해서 SOC가 50%인 건 아니다. 서로 다른 축이다',
  'SOH 80% 미만이면 통상 수명이 다한 것으로 본다 — 교체를 검토할 시점',
  'SOH가 낮으면 만충을 해도 쓸 수 있는 시간 자체가 짧아진다'],M+8.66,CY+0.5,3.2,9.5,INK2,0.62);
 s.addText('그래서 만든 것',{x:M,y:5.1,w:3,h:0.3,fontFace:H,fontSize:11,bold:true,color:MUT,margin:0,charSpacing:1});
 [['행동 판정','완주 가능 / 빠듯함 / 충전 필요',G],['유형별 개인화','생활 습관에서 자동 추론 · 프리셋',A],
  ['수명 코칭','SOH 기반 사용·보관 가이드',R]].forEach((v,i)=>{const x=M+i*4.2;
  s.addShape(P.ShapeType.rect,{x,y:5.5,w:0.09,h:0.5,fill:{color:v[2]},line:{width:0}});
  s.addText(v[0],{x:x+0.24,y:5.46,w:3.5,h:0.3,fontFace:H,fontSize:12.5,bold:true,color:INK,margin:0});
  s.addText(v[1],{x:x+0.24,y:5.76,w:3.5,h:0.3,fontFace:B,fontSize:10.5,color:MUT,margin:0});});
 apx(s,'→ SOC · SOH 상세와 수명 판정 기준은 Appendix A7');
 s.addNotes('[25초] 배터리를 두 숫자로 읽습니다. SOC는 지금 잔량, SOH는 수명입니다. 둘은 독립된 축이고, SOH 80% 미만이면 통상 수명이 다한 것으로 봅니다. 이 둘을 함께 읽어 행동 판정, 유형별 개인화, 수명 코칭 세 가지를 만들었습니다.');}

/* ══ 4. 본론 1 — 전체 설계 ══ */
{const s=S_();
 head(s,'본론 1','전체 설계','실선 = 사용자가 손대는 지점 · 점선 = 앱이 자동으로 처리하는 지점');
 [['온보딩',2.25],['코칭',3.62],['실행',5.35]].forEach(v=>{
  s.addShape(P.ShapeType.rect,{x:M,y:v[1],w:CW,h:v[0]==='코칭'?1.6:0.84,fill:{color:v[0]==='코칭'?'FAFBFC':W},line:{width:0}});
  s.addText(v[0],{x:M,y:v[1]+0.27,w:0.7,h:0.3,fontFace:H,fontSize:9.5,bold:true,color:MUT,margin:0,align:'center'});});
 const n1=[['앱 실행\n· 프리셋',1.4],['유형 A~E',2.42],['질문 7개',3.44],['세부 유형\n자동 판정',4.46],['결과 요약\n· 저장',5.48],['보이스팩',6.5]];
 n1.forEach((v,i)=>{const auto=v[0].indexOf('자동')>=0;
  node(s,v[1],2.34,0.94,0.62,v[0],{dash:auto?'dash':'solid',line:auto?MUT:INK,fs:8});
  if(i<n1.length-1)arrow(s,v[1]+0.94,2.65,0.08);});
 node(s,1.4,3.75,0.94,0.6,'코칭 홈',{fs:8.5}); arrow(s,2.34,4.05,0.08);
 node(s,2.42,3.75,0.94,0.6,'구역 선택',{fs:8.5}); arrow(s,3.36,4.05,0.08);
 node(s,3.44,3.69,1.2,0.72,'상태 판정',{fill:INK,color:W,line:INK,fs:10});
 [['완주 가능\n바로 시작',5.3,G],['빠듯함\n저소음 전환',6.85,A],['충전 필요\n충전·구역 축소',8.4,R],['분할 청소\n1차→충전→2차',9.95,A]].forEach(v=>{
  hline(s,4.64,4.05,v[1]-4.64); vArrow(s,v[1],4.05,0.22);
  node(s,v[1]-0.72,4.31,1.44,0.62,v[0],{line:v[2],lw:1.6,color:v[2],fs:8.5});});
 node(s,11.4,4.31,1.3,0.62,'무음 시간대',{dash:'dash',line:MUT,color:MUT,fs:8.5});
 node(s,4.2,5.45,1.4,0.6,'청소 진행',{fs:8.5}); arrow(s,5.6,5.75,0.1);
 node(s,5.72,5.45,1.5,0.6,'완주 · 거치대 복귀',{fs:8});
 node(s,7.44,5.45,1.5,0.6,'1차 완료 → 충전',{fs:8,line:A,color:AD}); arrow(s,8.94,5.75,0.1);
 node(s,9.06,5.45,1.2,0.6,'2차 청소',{fs:8.5,line:A,color:AD});
 node(s,11.4,5.45,1.3,0.6,'청소 도중 방전',{dash:'dash',line:R,color:RD,fs:8});
 s.addText('실패도 경로 안에 넣었다 — 만충으로도 안 되는 범위는 시작 전에 분할 청소로 분류하고, 도중에 방전돼도 복귀 후 이어서 진행한다.',
  {x:M,y:6.2,w:CW,h:0.3,fontFace:B,fontSize:10.5,color:INK2,margin:0});
 demo(s,'이 동선 전체는 잠시 후 데모에서 처음부터 끝까지 이어서 보여드리겠습니다.');
 s.addNotes('[25초] 온보딩, 코칭, 실행 세 단계이고 사용자가 손대는 곳은 실선 네 군데뿐입니다. 분할 청소와 도중 방전 같은 실패 상황까지 경로로 설계했습니다. 다음 장부터는 이 지도의 지점을 확대한 것입니다.');}

/* ══ 5. 본론 2 — 묻는 방식 ══ */
{const s=S_();
 head(s,'본론 2 · 개선 ①','질문형 온보딩과 프리셋','개인화에 필요한 정보는 반드시 있어야 하는데, 사용자는 자기 유형을 모른다');
 flow3(s,M,CY,5.5,
  '세부 유형은 계산에 반드시 필요하다. 그런데 사용자는 자기가 어떤 유형인지 알 방법이 없다.',
  '생활 언어 질문 7개로 묻고, 답변에서 유형을 규칙 기반으로 추론한다. 한 번 답한 설정은 이름을 붙여 프리셋으로 저장한다.',
  '설정 화면을 한 번도 열지 않는다. 다음부터는 프리셋 한 번 눌러 끝난다.',INK);
 shot(s,'02_q_area',{x:6.3,y:CY,h:1.9});
 shot(s,'07_result',{x:8.15,y:CY,h:1.9});
 shot(s,'13_presets',{x:10.0,y:CY,h:1.9});
 s.addText('질문 7개',{x:6.15,y:CY+1.98,w:1.6,h:0.24,fontFace:B,fontSize:8.5,color:MUT,align:'center',margin:0});
 s.addText('자동 판정 · 근거 제시',{x:7.85,y:CY+1.98,w:2.0,h:0.24,fontFace:B,fontSize:8.5,color:MUT,align:'center',margin:0});
 s.addText('프리셋 저장 · 불러오기',{x:9.7,y:CY+1.98,w:2.1,h:0.24,fontFace:B,fontSize:8.5,color:MUT,align:'center',margin:0});
 s.addText('질문은 분기에만 쓰이지 않는다',{x:6.3,y:CY+2.45,w:6.4,h:0.28,fontFace:H,fontSize:11.5,bold:true,color:INK,margin:0});
 bullets(s,['평수 → 필요 청소 시간','카펫 · 반려동물 · 머리카락 → 흡입 부하 계수','청소 시간대 → 무음 정책','청소 · 보관 습관 → 세부 유형 분기'],6.3,CY+2.78,6.4,10.5,INK2,0.42);
 demo(s,'질문에 답하면 유형이 자동으로 잡히고, 저장한 프리셋을 바로 불러오는 것까지 데모에서 보여드리겠습니다.');
 apx(s,'→ 유형 정의와 분기 규칙은 Appendix A1 · A2');
 s.addNotes('[25초] 유형을 고르게 하는 대신 “카펫을 쓰시나요” 같은 생활 언어 질문 일곱 개로 묻고, 유형은 앱이 추론해 근거와 함께 보여줍니다. 답한 설정은 프리셋으로 저장해 다음부터는 한 번에 불러옵니다.');}

/* ══ 6. 본론 3 — 재는 자 ══ */
{const s=S_();
 head(s,'본론 3 · 개선 ②','여유 시간 기반 판정','출력은 숫자가 아니라 행동이어야 한다 — 그래서 색이 셋이다');
 flow3(s,M,CY,5.5,
  'SOC 고정 임계값은 틀린다. 같은 70%라도 평수·바닥 조건·모드가 다르면 완주 여부가 뒤집힌다.',
  '잔량이 아니라 여유 시간으로 판정한다. 임계 잔량은 고정값이 아니라 목표 여유 시간에서 역산해 얻는다.',
  '“완주 가능”이라는 말을 믿을 수 있게 됐다. 머릿속 계산 세 가지를 앱이 대신한다.',INK);
 const bx=6.3,bw=6.4;
 s.addText('여유 시간 축으로 바꾸면 깨끗이 갈린다',{x:bx,y:CY,w:bw,h:0.28,fontFace:H,fontSize:11.5,bold:true,color:INK,margin:0});
 [[0,2.2,R,'충전 필요'],[2.2,1.3,A,'빠듯함'],[3.5,2.9,G,'완주 가능']].forEach(v=>{
  s.addShape(P.ShapeType.rect,{x:bx+v[0],y:CY+0.38,w:v[1],h:0.6,fill:{color:v[2]},line:{width:0}});
  s.addText(v[3],{x:bx+v[0],y:CY+0.38,w:v[1],h:0.6,fontFace:H,fontSize:9.5,bold:true,color:W,align:'center',valign:'middle',margin:0});});
 s.addText('0분',{x:bx+2.0,y:CY+1.02,w:0.5,h:0.22,fontFace:H,fontSize:8.5,bold:true,color:INK,align:'center',margin:0});
 s.addText('+5분',{x:bx+3.2,y:CY+1.02,w:0.6,h:0.22,fontFace:H,fontSize:8.5,bold:true,color:INK,align:'center',margin:0});
 const p1=shot(s,'08_coach_ok_C',{x:bx,y:CY+1.38,h:1.75}); cap(s,p1,'여유 +15분',null,GD);
 const p2=shot(s,'09_coach_tight_E',{x:bx+2.15,y:CY+1.38,h:1.75}); cap(s,p2,'여유 +2분',null,AD);
 const p3=shot(s,'10_coach_charge_D',{x:bx+4.3,y:CY+1.38,h:1.75}); cap(s,p3,'여유 −9분',null,RD);
 s.addText('세 지표(예상 사용 시간 · 여유 시간 · 청소 후 잔량)는 구역을 하나 누를 때마다 전부 다시 계산된다.',
  {x:bx,y:CY+3.62,w:bw,h:0.3,fontFace:B,fontSize:9.5,color:MUT,margin:0});
 demo(s,'같은 잔량인데 구역을 바꾸면 판정이 실시간으로 뒤집히는 것은 데모에서 보여드리겠습니다.');
 apx(s,'→ 임계값 역산 근거는 Appendix A4');
 s.addNotes('[25초] 잔량 임계값 대신 여유 시간으로 판정합니다. 5분 이상이면 완주 가능, 0에서 5분은 빠듯함, 음수면 충전 필요입니다. 판정이 셋인 이유는 사용자가 고를 행동이 셋뿐이기 때문입니다.');}

/* ══ 7. 본론 4 — 수명 반영 ══ */
{const s=S_();
 head(s,'본론 4 · 개선 ③','배터리 수명(SOH) 반영','수명을 넣자 “오늘 할 수 있는 일”이 배터리 나이까지 반영하게 됐다');
 flow3(s,M,CY,5.5,
  '기존 안내는 SOC만 본다. 배터리가 늙어도 같은 82%면 같은 시간을 쓸 수 있다고 말한다 — 그래서 중간에 꺼진다.',
  'SOH를 실효 소모율에 반영했다. SOH가 낮을수록 소모 속도가 커져 가용 시간이 짧게 산출된다.',
  '수명이 닳아도 안내가 계속 맞는다. 교체 시점(SOH 80% 미만)도 미리 알려준다.',INK);
 const sh1=shot(s,'08_coach_ok_C',{x:6.3,y:CY,h:2.6}); cap(s,sh1,'SOH 100% · 신품','예상 37분 · 여유 +15분',GD);
 const sh2=shot(s,'14_soh_low',{x:8.35,y:CY,h:2.6}); cap(s,sh2,'SOH 78% · 교체 권장','예상 29분 · 여유 +7분',AD);
 s.addText('같은 SOC 82% · 같은 24평 · 같은 5구역',{x:6.3,y:CY+3.3,w:4.1,h:0.26,fontFace:B,fontSize:9.5,italic:true,color:MUT,align:'center',margin:0});
 s.addShape(P.ShapeType.roundRect,{x:10.6,y:CY,w:2.1,h:2.6,rectRadius:0.1,fill:{color:WASH},line:{width:0}});
 s.addText('만충 가동',{x:10.78,y:CY+0.18,w:1.8,h:0.24,fontFace:H,fontSize:9,bold:true,color:MUT,margin:0,charSpacing:1});
 s.addText('47분',{x:10.78,y:CY+0.5,w:1.8,h:0.5,fontFace:H,fontSize:24,bold:true,color:MUT,margin:0});
 s.addText('SOH 100%',{x:10.78,y:CY+1.0,w:1.8,h:0.24,fontFace:B,fontSize:9,color:MUT,margin:0});
 vArrow(s,11.65,CY+1.32,0.28,AD);
 s.addText('37분',{x:10.78,y:CY+1.72,w:1.8,h:0.5,fontFace:H,fontSize:24,bold:true,color:AD,margin:0});
 s.addText('SOH 78% · −20%',{x:10.78,y:CY+2.22,w:1.8,h:0.24,fontFace:B,fontSize:9,bold:true,color:AD,margin:0});
 demo(s,'데모에서 SOH를 내리면 판정이 어떻게 바뀌는지 바로 보여드리겠습니다.');
 apx(s,'→ SOH 적용 방식과 수명 판정 기준은 Appendix A7');
 s.addNotes('[25초] 두 화면 모두 잔량 82%지만 SOH 78%인 오른쪽은 37분이 아니라 29분만 쓸 수 있습니다. SOH를 소모 속도에 반영해 배터리가 늙어도 안내가 계속 맞고, 80% 미만이면 교체 시점을 안내합니다.');}

/* ══ 8. 본론 5 — 기기·IoT 연동 (AX 핵심) ══ */
{const s=S_();
 head(s,'본론 5 · 개선 ④','기기 · IoT 연동','판정은 한 곳에서, 표현은 세 곳에서 — 화면을 보지 않아도 안내가 닿는다');
 const d=shot(s,'20_desktop_link',{x:M,y:CY,h:3.55});
 s.addText('앱에서 설정하면 기기 LCD와 IoT 스피커가 함께 반응한다',{x:M,y:d.by+0.12,w:d.w,h:0.26,fontFace:B,fontSize:9.5,color:MUT,align:'center',margin:0});
 const AX=[['① 판정','앱이 잔량 · 수명 · 환경을 읽어 상태를 확정한다',INK],
           ['② 동기화','같은 판정이 기기 LCD에 그대로 표시된다 — 폰을 켜지 않아도 본체에서 확인',G],
           ['③ 발화','IoT 스피커가 유형별 문장을 읽어준다 — 청소하면서 손을 쓰지 않고 듣는다',A],
           ['④ 상황 인지','심야이거나 영유아 가정의 낮잠 시간대면 소리를 끄고 화면 안내만 남긴다',R]];
 AX.forEach((v,i)=>{const y=CY+i*0.78;
  s.addShape(P.ShapeType.roundRect,{x:8.0,y,w:4.7,h:0.68,rectRadius:0.09,fill:{color:WASH},line:{width:0}});
  s.addShape(P.ShapeType.rect,{x:8.18,y:y+0.22,w:0.09,h:0.24,fill:{color:v[2]},line:{width:0}});
  s.addText(v[0],{x:8.42,y,w:0.9,h:0.68,fontFace:H,fontSize:10,bold:true,color:INK,valign:'middle',margin:0});
  s.addText(v[1],{x:9.35,y,w:3.2,h:0.68,fontFace:B,fontSize:9,color:INK2,valign:'middle',margin:0,lineSpacing:12});});
 s.addShape(P.ShapeType.roundRect,{x:8.0,y:CY+3.2,w:4.7,h:0.86,rectRadius:0.09,fill:{color:'EDF6F1'},line:{width:0}});
 s.addText('네트워크 없이도 전 구간 동작',{x:8.2,y:CY+3.3,w:4.3,h:0.26,fontFace:H,fontSize:10,bold:true,color:GD,margin:0});
 s.addText('설치형 웹앱(PWA)으로 음성 클립까지 캐시해, 발표장 네트워크가 끊겨도 온보딩부터 코칭·음성까지 그대로 돈다.',
  {x:8.2,y:CY+3.56,w:4.3,h:0.44,fontFace:B,fontSize:8.5,color:INK2,margin:0,lineSpacing:12});
 demo(s,'앱에서 바꾼 설정이 기기 화면과 음성으로 함께 나가는 것을 데모에서 보여드리겠습니다.');
 s.addNotes('[25초] 판정은 앱 한 곳에서 하고, 표현은 세 곳으로 나눕니다. 같은 판정이 기기 LCD에 그대로 뜨고, IoT 스피커가 유형별 문장을 읽어줍니다. 심야나 낮잠 시간대에는 소리를 끄고 화면 안내만 남깁니다. 네트워크가 없어도 전 구간 동작합니다.');}

/* ══ 9. 결론 1 — 개선 전후 ══ */
{const s=S_();
 head(s,'결론 1','개선 전후 비교','여기서부터 실제 앱을 띄워놓고 보여드립니다');
 const rows=[['축','기존','지금'],
  ['정보','잔량 % + LED 칸 수','3색 판정 + 세 지표 + 행동 문장'],
  ['입력','자기 유형을 알아야 함','생활 언어 질문 7개 · 프리셋 재사용'],
  ['수명','사용자 시야 밖','SOH 반영 예측 + 교체 시점 안내'],
  ['전달','기기 화면 하나','앱 · 기기 LCD · IoT 스피커 동시 반응'],
  ['정확도','예측 오차 3.56분 · 판정 90.0%','예측 오차 0.98분 · 판정 96.0%'],
  ['실패 처리','방전되면 그냥 멈춤','분할 청소 · 도중 방전 복귀까지 설계']];
 tbl(s,M,CY,6.6,rows,[0.14,0.35,0.51],{header:true,rh:0.47,fs:9.5,colColor:[INK,MUT,GD]});
 const seq=['01_onboard_type','04_q_time','07_result','08_coach_ok_C'];
 const lbl=['유형 · 프리셋','질문 7개','자동 판정','코칭 화면'];
 seq.forEach((k,i)=>{const x=7.55+i*1.32;
  shot(s,k,{x,y:CY,h:2.2});
  s.addText(lbl[i],{x:x-0.1,y:CY+2.3,w:1.35,h:0.26,fontFace:B,fontSize:8.5,color:MUT,align:'center',margin:0});
  if(i<3)arrow(s,x+1.16,CY+1.1,0.14);});
 s.addText('판정별로 버튼 자체가 달라진다',{x:7.55,y:CY+2.72,w:5.15,h:0.28,fontFace:H,fontSize:11,bold:true,color:INK,margin:0});
 [['완주 가능','청소 시작 · 5구역',GD,G],['빠듯함','저소음으로 청소 (여유 확보)',AD,A],['충전 필요','충전 후 시작 · 구역 줄여서 시작',RD,R]].forEach((v,i)=>{const y=CY+3.06+i*0.38;
  s.addShape(P.ShapeType.rect,{x:7.55,y:y+0.06,w:0.08,h:0.2,fill:{color:v[3]},line:{width:0}});
  s.addText(v[0],{x:7.75,y,w:1.15,h:0.32,fontFace:H,fontSize:9,bold:true,color:v[2],valign:'middle',margin:0});
  s.addText('“'+v[1]+'”',{x:8.9,y,w:3.8,h:0.32,fontFace:B,fontSize:9,color:INK2,valign:'middle',margin:0});});
 demo(s,'온보딩부터 판정이 뒤집히는 것까지, 지금부터 앱에서 직접 보여드리겠습니다.');
 apx(s,'→ 예측 계산식 검증 상세는 Appendix A3~A5');
 s.addNotes('[20초 → 데모] 잔량만 보여주던 화면이 행동까지 답하게 됐습니다. 수명과 기기 연동이 이번에 새로 생긴 줄입니다. 지금부터 실제 앱에서 보여드리겠습니다.');}

/* ══ 10. 결론 2 — AX 활용 ══ */
{const s=D_();
 head(s,'결론 2','AX 활용','왼쪽은 AI가 한 일, 오른쪽은 그래서 사용자가 안 해도 되는 일',true);
 const AI=[['①','유형 추론','답변 7개 → 세부 유형','자기 유형을 몰라도 개인화가 성립한다'],
           ['②','소모율 예측','잔량 · 평수 · 구역 → 여유 시간','“완주 가능”이라는 말을 믿을 수 있게 됐다'],
           ['③','수명 반영','SOH 78% → 가용 시간 −20%','배터리가 늙어도 안내가 계속 맞는다'],
           ['④','잔차 진단으로 식 수정','한쪽 쏠림 → 누락 항 신설','중간 방전이 사라졌다 (오차 3.56 → 0.98분)'],
           ['⑤','상황 인지 · IoT 연동','시간대 · 유형 → 음성/화면 전환','알림이 민폐가 되지 않고, 손을 쓰지 않아도 된다']];
 AI.forEach((v,i)=>{const y=CY+0.1+i*0.72;
  s.addShape(P.ShapeType.roundRect,{x:M,y,w:5.85,h:0.62,rectRadius:0.08,fill:{color:'1E252C'},line:{width:0}});
  s.addText(v[0],{x:M+0.14,y,w:0.36,h:0.62,fontFace:H,fontSize:13,bold:true,color:'7FD9A8',valign:'middle',margin:0});
  s.addText(v[1],{x:M+0.56,y,w:2.4,h:0.62,fontFace:H,fontSize:10,bold:true,color:W,valign:'middle',margin:0,lineSpacing:12});
  s.addText(v[2],{x:M+3.0,y,w:2.75,h:0.62,fontFace:B,fontSize:8.5,color:'93A0AB',valign:'middle',margin:0,lineSpacing:11});
  arrow(s,6.6,y+0.31,0.42,'7FD9A8');
  s.addShape(P.ShapeType.roundRect,{x:7.2,y,w:5.5,h:0.62,rectRadius:0.08,fill:{color:'16321F'},line:{width:0}});
  s.addText(v[3],{x:7.4,y,w:5.15,h:0.62,fontFace:H,fontSize:10,bold:true,color:'9BE0BC',valign:'middle',margin:0,lineSpacing:13});});
 s.addShape(P.ShapeType.roundRect,{x:M,y:CY+3.72,w:12.1,h:0.56,rectRadius:0.08,fill:{color:'23303A'},line:{width:0}});
 s.addText('⑥  개발 과정 자체 — Claude Code로 프로토타입 구현과 검증 파이프라인을 구성해 1년치 사용 이력을 반복 재분석',
  {x:M+0.18,y:CY+3.72,w:11.7,h:0.56,fontFace:B,fontSize:10,color:'A9B5BF',valign:'middle',margin:0});
 s.addShape(P.ShapeType.roundRect,{x:M,y:CY+4.46,w:12.1,h:0.56,rectRadius:0.08,fill:{color:'1E252C'},line:{width:0}});
 ['판단 비용 제거','실패 예방','복구 경로'].forEach((t,i)=>{
  s.addText(t,{x:M+0.4+i*3.9,y:CY+4.46,w:2.9,h:0.56,fontFace:H,fontSize:12,bold:true,color:W,valign:'middle',margin:0});
  if(i<2)arrow(s,M+3.2+i*3.9,CY+4.74,0.5,'7FD9A8');});
 s.addText('잔량은 기기의 언어, 코칭 문장은 사용자의 언어 — 번역기는 실제로 동작합니다.',
  {x:M,y:6.95,w:CW,h:0.32,fontFace:H,fontSize:12.5,bold:true,italic:true,color:'7FD9A8',margin:0});
 s.addNotes('[30초] AI는 판단이 필요한 다섯 자리에 들어갔습니다. 유형 추론, 여유 시간 예측, 수명 반영, 잔차 진단으로 식 수정, 상황 인지와 IoT 연동. 사용자 입장에서는 전부 “안 해도 되는 일”이 됐습니다. 개발 과정 자체도 Claude Code로 1년치 사용 이력을 반복 분석했습니다.');}

/* ══ 11. 결론 3 — 확장성 ══ */
{const s=S_();
 head(s,'결론 3','파급효과와 확장성','판정 · 문장 · 음성을 분리해 두어, 확장은 데이터와 계약만 있으면 된다');
 const C4=[
  ['실기기 재검증','사용 이력 → 재계산 → 결과 검증 파이프라인을 실측 로그에 그대로 적용 — 설계 잠정치를 실측값으로 대체한다',G],
  ['타 배터리 가전 이식','판정 로직이 화면과 분리된 순수 함수라, 로봇청소기 등 다른 배터리 가전에 동일 구조로 이식할 수 있다',A],
  ['콘텐츠 확장','보이스팩·코칭 문장은 판정 로직 수정 없이 데이터 추가만으로 확장 — 이번 구현에서 15종까지 확인했다',INK],
  ['배터리 케어 서비스','SOH 기반 교체 시점 안내를 소모품 구독·AS 예약으로 연결 — IoT 스피커·기기 LCD 연동은 이미 동작한다',R]];
 C4.forEach((v,i)=>{const x=M+(i%2)*6.15, y=CY+Math.floor(i/2)*1.58;
  s.addShape(P.ShapeType.roundRect,{x,y,w:5.9,h:1.42,rectRadius:0.1,fill:{color:WASH},line:{width:0}});
  s.addShape(P.ShapeType.rect,{x:x+0.22,y:y+0.2,w:0.09,h:0.3,fill:{color:v[2]},line:{width:0}});
  s.addText(v[0],{x:x+0.46,y:y+0.14,w:5.2,h:0.32,fontFace:H,fontSize:13,bold:true,color:INK,margin:0});
  s.addText(v[1],{x:x+0.46,y:y+0.5,w:5.2,h:0.84,fontFace:B,fontSize:10.5,color:INK2,margin:0,lineSpacing:15});});
 s.addShape(P.ShapeType.roundRect,{x:M,y:5.5,w:CW,h:0.86,rectRadius:0.09,fill:{color:'EDF6F1'},line:{width:0}});
 s.addText('팀 역할 분담 · 5인',{x:M+0.24,y:5.6,w:3,h:0.24,fontFace:H,fontSize:9.5,bold:true,color:GD,margin:0,charSpacing:1});
 let rx=M+0.24;
 ['배터리 모델링·시뮬레이션','데이터 분석·검증','UX·화면 설계','프로토타입 개발','문서화·발표'].forEach(t=>{rx+=chip(s,rx,5.92,t,GD,W)+0.14;});
 s.addText('잔량은 기기의 언어, 코칭 문장은 사용자의 언어 — 같은 번역기가 다음 기기에서도 동작합니다.',
  {x:M,y:6.6,w:CW,h:0.3,fontFace:H,fontSize:12.5,bold:true,italic:true,color:INK,margin:0});
 s.addNotes('[25초] 판정, 문장, 음성이 분리돼 있어 확장이 쉽습니다. 실기기 로그가 오면 같은 파이프라인으로 재검증하고, 같은 구조를 다른 배터리 가전에 이식할 수 있으며, SOH 기반 교체 안내는 배터리 케어 서비스로 이어집니다. 감사합니다.');}

module.exports={};
