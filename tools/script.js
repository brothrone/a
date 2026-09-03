/* 발표 대본 생성 — node tools/script.js */
const {Document,Packer,Paragraph,TextRun,HeadingLevel,AlignmentType,Table,TableRow,TableCell,
 WidthType,ShadingType,BorderStyle,LevelFormat,convertInchesToTwip}=require('docx');
const fs=require('fs'), path=require('path');
const INK='1A1A1A',MUT='5A6570',ACC='1F5C3D',LINE='C9D2D8',WASH='F1F5F7',F='맑은 고딕';
const P=(t,o={})=>new Paragraph({spacing:{after:o.after??120,line:o.line??310},
  children:[new TextRun({text:t,font:F,size:o.size??20,bold:o.bold,color:o.color??INK,italics:o.i})]});
const H1=t=>new Paragraph({spacing:{before:300,after:170},heading:HeadingLevel.HEADING_1,
  children:[new TextRun({text:t,font:F,size:26,bold:true,color:INK})]});
const H2=(t,sub)=>new Paragraph({spacing:{before:220,after:100},heading:HeadingLevel.HEADING_2,
  children:[new TextRun({text:t,font:F,size:21,bold:true,color:ACC}),
    ...(sub?[new TextRun({text:'   '+sub,font:F,size:17,color:MUT})]:[])]});
const cell=(t,{w,b,bg,sz}={})=>new TableCell({width:{size:w,type:WidthType.DXA},
  shading:bg?{type:ShadingType.CLEAR,fill:bg,color:'auto'}:undefined,
  margins:{top:70,bottom:70,left:110,right:110},
  children:[new Paragraph({spacing:{after:0,line:280},
    children:[new TextRun({text:t,font:F,size:sz??17,bold:b,color:INK})]})]});
function table(rows,widths){const total=widths.reduce((a,b)=>a+b,0);
 return new Table({width:{size:total,type:WidthType.DXA},columnWidths:widths,
  borders:{top:{style:BorderStyle.SINGLE,size:4,color:LINE},left:{style:BorderStyle.SINGLE,size:4,color:LINE},
   bottom:{style:BorderStyle.SINGLE,size:4,color:LINE},right:{style:BorderStyle.SINGLE,size:4,color:LINE},
   insideHorizontal:{style:BorderStyle.SINGLE,size:4,color:LINE},insideVertical:{style:BorderStyle.SINGLE,size:4,color:LINE}},
  rows:rows.map((r,ri)=>new TableRow({tableHeader:ri===0,
   children:r.map((c,ci)=>cell(String(c),{w:widths[ci],b:ri===0,bg:ri===0?WASH:undefined}))}))});}
const GAP=(h=120)=>new Paragraph({spacing:{after:h},children:[]});

const SL=[
 ['1','표지','15초','안녕하십니까, 파라써블입니다. 저희는 배터리 잔량을 사용자의 행동으로 번역하는 코칭 UI를 만들었습니다. 오른쪽은 지금 실제로 동작하는 앱 화면입니다.',''],
 ['2','서론 1 · 문제 정의','25초','왼쪽은 잔량 82%인데 완주 가능, 오른쪽은 81%인데 빠듯함입니다. 평수와 소모 조건이 다르기 때문입니다. 잔량이 같아도 조건이 다르면 답이 갈리므로, 숫자만으로는 지금 시작해도 되는지 알 수 없습니다.','조건이 다르다는 걸 먼저 밝히기.'],
 ['3','서론 2 · SOC와 SOH','25초','배터리를 두 숫자로 읽습니다. SOC는 지금 잔량, SOH는 수명입니다. 둘은 독립된 축이고, SOH 80% 미만이면 통상 수명이 다한 것으로 봅니다. 이 둘을 함께 읽어 행동 판정, 유형별 개인화, 수명 코칭 세 가지를 만들었습니다.','심사위원 전원이 배터리·제어 연구원 — 용어를 정확히.'],
 ['4','본론 1 · 전체 설계','25초','온보딩, 코칭, 실행 세 단계이고 사용자가 손대는 곳은 실선 네 군데뿐입니다. 분할 청소와 도중 방전 같은 실패 상황까지 경로로 설계했습니다. 다음 장부터는 이 지도의 지점을 확대한 것입니다.',''],
 ['5','본론 2 · 질문형 온보딩과 프리셋','25초','유형을 고르게 하는 대신 “카펫을 쓰시나요” 같은 생활 언어 질문 일곱 개로 묻고, 유형은 앱이 추론해 근거와 함께 보여줍니다. 답한 설정은 프리셋으로 저장해 다음부터는 한 번에 불러옵니다.','프리셋은 멘토 피드백 반영이라고 명시.'],
 ['6','본론 3 · 여유 시간 기반 판정','25초','잔량 임계값 대신 여유 시간으로 판정합니다. 5분 이상이면 완주 가능, 0에서 5분은 빠듯함, 음수면 충전 필요입니다. 판정이 셋인 이유는 사용자가 고를 행동이 셋뿐이기 때문입니다.',''],
 ['7','본론 4 · 배터리 수명(SOH) 반영','25초','두 화면 모두 잔량 82%지만 SOH 78%인 오른쪽은 37분이 아니라 29분만 쓸 수 있습니다. SOH를 소모 속도에 반영해 배터리가 늙어도 안내가 계속 맞고, 80% 미만이면 교체 시점을 안내합니다.','“같은 82%, 같은 24평”을 강조 — 다른 건 수명뿐.'],
 ['8','본론 5 · LG AI Home 연동','25초','판정은 ThinQ 앱 한 곳에서 하고, 표현은 세 곳으로 나눕니다. 같은 판정이 코드제로 LCD에 그대로 뜨고, 씽큐 온 허브가 유형별 문장을 읽어줍니다. 심야나 낮잠 시간대에는 소리를 끄고 화면 안내만 남깁니다. 씽큐 온은 생성형 AI로 집 안 상태를 상시 모니터링하는 허브이고, 저희 판정은 그 위에 얹히는 코칭 계층입니다.','실제 제품명을 정확히 쓸 것 — 기술 구현 35점의 축.'],
 ['9','결론 1 · 개선 전후 비교','20초','잔량만 보여주던 화면이 행동까지 답하게 됐습니다. 수명과 기기 연동이 이번에 새로 생긴 줄입니다. 지금부터 실제 앱에서 보여드리겠습니다.','→ 데모 2분 30초 진행 후 10장으로 복귀.'],
 ['—','데모 시연','2분 30초','(아래 4장 시나리오 표 참조)','동작 안정성 심사 구간 — 서두르지 말 것.'],
 ['10','결론 2 · AX 활용','30초','AI는 판단이 필요한 다섯 자리에 들어갔습니다. 유형 추론, 여유 시간 예측, 수명 반영, 잔차 진단으로 식 수정, 상황 인지와 AI Home 연동. 사용자 입장에서는 전부 “안 해도 되는 일”이 됐습니다. 개발 과정 자체도 Claude Code로 1년치 사용 이력을 반복 분석했습니다.','가장 중요한 장. 왼쪽 읽고 오른쪽으로 넘기며 말하기.'],
 ['11','결론 3 · 파급효과와 확장성','25초','판정, 문장, 음성이 분리돼 있어 확장이 쉽습니다. 실기기 로그가 오면 같은 파이프라인으로 재검증하고, 같은 구조를 다른 배터리 가전에 이식할 수 있으며, SOH 기반 교체 안내는 배터리 케어 서비스로 이어집니다. 감사합니다.','확장성 20점 — 점수 격차가 가장 큰 항목.'],
];

const body=[];
body.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:70},
  children:[new TextRun({text:'최종 발표 대본',font:F,size:36,bold:true,color:INK})]}));
body.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:60},
  children:[new TextRun({text:'9/11(금) 11:24–11:35 · 부산대 샛벌회관 · 발표+시연 7분 → 질의응답 3분',font:F,size:20,bold:true,color:ACC})]}));
body.push(new Paragraph({alignment:AlignmentType.CENTER,spacing:{after:300},
  children:[new TextRun({text:'공지 기준: 10분 = 발표·시연 7분 + 질의응답 3분 (데모는 7분 안에 포함)',font:F,size:17,color:MUT})]}));

body.push(H1('1. 시간 배분 — 발표 4분 5초 + 데모 2분 30초 = 6분 35초'));
body.push(table([['장','제목','목표'],...SL.map(s=>[s[0],s[1],s[2]])],[700,5200,1300]));
body.push(GAP(60));
body.push(P('넘치면 3장·10장의 예시 나열을 한 개씩 줄일 것. 데모가 밀리면 7단계(빠듯 경계)를 생략.',{size:17,color:MUT,i:true}));

body.push(H1('2. 심사 배점과 커버 지점'));
body.push(table([
 ['평가항목 (배점)','어디서 보여주나'],
 ['문제 정의 및 타당성 (20)','2·3장 문제 정의와 용어 · 11장 팀 역할 분담'],
 ['기술 구현 및 완성도 (35)','7장 SOH · 8장 AI Home 연동 · 데모의 동작 안정성'],
 ['사용자 경험 및 유용성 (25)','4~6장 설계 · 데모의 프리셋·판정 반전·무음 배너'],
 ['파급효과 및 확장성 (20)','11장 확장 4방향 · 10장 AX 활용'],
],[3600,6600]));
body.push(GAP(60));
body.push(P('배점 격차는 파급효과가 가장 크다(상 20 ↔ 하 8). 시간이 밀려도 11장은 지킬 것.',{size:17,color:MUT,i:true}));

body.push(H1('3. 슬라이드별 대본'));
for(const s of SL){
  if(s[0]==='—')continue;
  body.push(H2(`${s[0]}. ${s[1]}`, s[2]));
  body.push(P(s[3],{size:20}));
  if(s[4]) body.push(P('▷ '+s[4],{size:17,color:MUT,i:true,after:60}));
}

body.push(H1('4. 데모 시나리오 (2분 30초)'));
body.push(P('사전 준비 — 앱을 온라인에서 한 번 열어 최신본 캐시 · 프리셋 “우리집”(C유형·24평·오후) 저장 · 배터리 82%·SOH 100% 세팅 · 소리 켜기.',{size:18,color:MUT}));
body.push(GAP(60));
body.push(table([
 ['시간','조작','멘트'],
 ['0:00–0:20','첫 화면에서 프리셋 “우리집” 탭 → 결과 복원','“질문에 다시 답하지 않아도 저장된 설정이 한 번에 돌아옵니다.”'],
 ['0:20–0:40','“이전”으로 질문 화면 → 답 선택(안 넘어감) → “다음”','“답을 골라도 바로 넘어가지 않습니다. 멘토링 피드백을 반영해 확인 후 진행됩니다.”'],
 ['0:40–0:55','보이스팩 화면 ▶ 미리듣기 1회','“보이스는 AI 생성 음성 샘플이고, 유형마다 선택지가 다릅니다.”'],
 ['0:55–1:10','결과 화면 — 판정 근거 문장 · 저장 버튼','“어떤 답 때문에 이 유형인지 근거를 문장으로 돌려줍니다.”'],
 ['1:10–1:30','“코칭 시작” → 상단 프리셋 바에서 “부모님댁” 탭','“코칭 화면에서 바로 다른 집으로 바꿉니다. 테마도 판정도 함께 바뀝니다.”'],
 ['1:30–1:50','다시 “우리집” → 무음 배너 짚기 → 구역 5→2 토글 → 복원','“낮잠 시간대라 소리 대신 배너로 안내합니다. 구역을 빼면 판정이 즉시 다시 계산됩니다.”'],
 ['1:50–2:10','데모 제어 → “빠듯 경계” 점프','“판정이 주황으로, 버튼이 저소음 제안으로 바뀝니다. 이 경계는 역산된 값입니다.”'],
 ['2:10–2:30','SOH 100→78 → “청소 시작”','“잔량은 그대로인데 수명만 낮췄습니다. 예상 시간이 줄고, 상단에 SOH 배지와 교체 검토 안내가 뜹니다.”'],
],[1200,3300,5000]));

body.push(H1('5. 질의응답 대비 (3분)'));
const QA=[
 ['SOC와 SOH의 차이는?','SOC는 지금 잔량, SOH는 신품 대비 성능. 독립된 축이라 SOH 50%여도 만충하면 SOC는 100%가 되며, 그 100%가 담는 에너지가 절반이라는 뜻.'],
 ['SOH 80% 기준의 근거는?','업계에서 통용되는 배터리 수명 종료(EOL) 기준. 앱은 80% 미만에서 코칭 화면에 교체 검토 안내를 표시.'],
 ['판정 임계값을 왜 고정하지 않았나?','같은 잔량이라도 평수·부하·모드에 따라 완주 여부가 뒤집히기 때문. 목표 여유 시간을 만족하는 잔량을 조건별로 역산해 사용.'],
 ['AI·IoT를 구체적으로 어디에 적용했나?','AI는 판단이 필요한 다섯 지점 — 유형 추론, 소모율 예측, 수명 반영, 잔차 진단 기반 식 수정, 상황 인지 무음. 연동은 LG AI Home 구조를 따랐다. ThinQ 앱이 판정하고, 코드제로 LCD와 씽큐 온 허브로 같은 판정이 나간다.'],
 ['대시보드 수치와 발표 수치가 다른 이유는?','집계 단위 차이. 대시보드는 세션 단위 전체 집계, 발표는 모델별 결과 집계이며 발표 기준으로 통일.'],
 ['시뮬레이션 데이터의 신뢰성은?','방전 과정을 분 단위로 재현한 1년치 사용 이력이며, 별도 회귀 모델과 교차 검증했다. 실기기 로그 확보 시 같은 파이프라인으로 재검증하는 것이 다음 단계.'],
 ['유사 주제 팀과의 차별점은?','저희 기준으로만 답한다 — ① 1년치 사용 이력 정량 검증(오차 0.98분·판정 96%) ② 설치되는 웹앱으로 현장에서 실제 동작 ③ SOH까지 반영한 예측 ④ 판정·문장·음성 분리로 기기·스피커 동시 연동. 타 팀 언급은 하지 않는다.'],
 ['씽큐 온이 이미 대화로 제어하는데 이 앱이 왜 필요한가?','허브는 명령을 이해하고 실행하지만, 지금 이 청소를 끝낼 수 있는지는 배터리 상태를 계산해야 나온다. 저희는 그 판정을 만들어 허브가 말할 내용을 제공하는 계층이다. 허브가 없어도 앱 단독으로 동작한다.'],
 ['보이스팩에 실존 인물·캐릭터 이름이 있는데?','적용 예시 표기이며 데모 소리는 AI 생성 음성 샘플. 실제 서비스에는 음성권·저작권 계약이 선행 — 화면에도 고지 문구가 있다.'],
 ['무음 정책은 시계를 읽는 것인가?','아니다. 온보딩에서 답한 청소 시간대와 가구 유형을 조합한 규칙. 소리만 끄고 안내는 화면에 남는다.'],
];
for(const [q,a] of QA){
  body.push(new Paragraph({spacing:{before:110,after:40},
    children:[new TextRun({text:'Q. '+q,font:F,size:19,bold:true,color:INK})]}));
  body.push(P('A. '+a,{size:18,color:MUT,after:60}));
}
body.push(GAP(140));
body.push(new Paragraph({spacing:{before:140,after:80,line:300},
  shading:{type:ShadingType.CLEAR,fill:WASH,color:'auto'},
  children:[new TextRun({text:'준비물 — 노트북·충전기 / 인터넷 없어도 동작(사전에 한 번 온라인 실행) / 소리 출력 / 프리셋 2개 사전 저장 / PPT 발표자 보기(노트에 대본 포함) / 결과보고서는 심사위원이 함께 참고함',
    font:F,size:17,bold:true,color:INK})]}));

const doc=new Document({
  numbering:{config:[{reference:'bul',levels:[
    {level:0,format:LevelFormat.BULLET,text:'·',alignment:AlignmentType.LEFT,
      style:{paragraph:{indent:{left:convertInchesToTwip(0.28),hanging:convertInchesToTwip(0.17)}}}}]}]},
  sections:[{properties:{page:{margin:{top:1100,right:1100,bottom:1100,left:1100}}},children:body}]});
Packer.toBuffer(doc).then(b=>{
  const out=path.resolve(__dirname,'..','최종발표_대본.docx');
  fs.writeFileSync(out,b); console.log('생성:',out);
});
