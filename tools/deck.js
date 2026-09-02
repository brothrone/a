/* 최종 발표자료 생성기 — node tools/deck.js
   슬라이드를 손으로 그리지 않고 코드로 만든다. 수치가 바뀌면 전체를 다시 생성한다. */
const pptx=require('pptxgenjs'); const fs=require('fs'); const path=require('path');
const ROOT=path.resolve(__dirname,'..');
const S=path.join(ROOT,'shots')+'/', F=path.join(ROOT,'figs')+'/';
const P=new pptx(); P.layout='LAYOUT_WIDE'; P.author='파라써블'; P.title='배터리 라이프 코칭 UX';

/* PNG 헤더에서 크기를 직접 읽는다 — 캡처를 다시 떠도 표가 어긋나지 않는다 */
const dimCache={};
function dim(key){
 if(dimCache[key])return dimCache[key];
 const b=fs.readFileSync(S+key+'.png');
 return dimCache[key]=[b.readUInt32BE(16), b.readUInt32BE(20)];
}

const INK='14181D',INK2='2B333B',MUT='79838C',LINE='DDE3E7',WASH='F4F6F7',W='FFFFFF',
      G='1FA971',A='DF8A16',R='D93B41',GD='16794F',AD='9C6008',RD='9E2A30';
const H='Arial',B='Arial',M=0.62,CW=13.33-M*2,CY=2.15;
const S_=()=>{const s=P.addSlide();s.background={color:W};return s};
const D_=()=>{const s=P.addSlide();s.background={color:INK};return s};

function head(s,kick,ttl,ld,dark){
 s.addText(kick,{x:M,y:0.34,w:CW,h:0.26,fontFace:H,fontSize:10.5,bold:true,color:dark?'8C99A4':MUT,margin:0,charSpacing:1.4});
 s.addText(ttl,{x:M,y:0.64,w:CW,h:0.66,fontFace:H,fontSize:29,bold:true,color:dark?W:INK,margin:0,valign:'top',charSpacing:-0.6});
 if(ld) s.addText(ld,{x:M,y:1.42,w:CW,h:0.3,fontFace:B,fontSize:12.5,color:dark?'A9B5BF':MUT,margin:0});
}
function bullets(s,items,x,y,w,sz,col,gap){
 const fs=sz||12;
 items.forEach((t,i)=>{
  s.addShape(P.ShapeType.rect,{x,y:y+i*(gap||0.42)+fs/72*0.44,w:0.07,h:0.032,fill:{color:col===W?'93A0AB':MUT},line:{width:0}});
  s.addText(t,{x:x+0.18,y:y+i*(gap||0.42),w:w-0.18,h:gap||0.42,fontFace:B,fontSize:fs,color:col||INK2,margin:0,valign:'top',lineSpacing:fs*1.42});
 });
}
function shot(s,key,o){
 const d=dim(key), ar=d[1]/d[0]; let w=o.w,h=o.h;
 if(w&&!h)h=w*ar; if(h&&!w)w=h/ar;
 const x=o.cx!=null?o.cx-w/2:o.x;
 s.addShape(P.ShapeType.roundRect,{x:x-0.04,y:o.y-0.04,w:w+0.08,h:h+0.08,rectRadius:0.06,fill:{color:WASH},line:{color:LINE,width:1}});
 s.addImage({path:S+key+'.png',x,y:o.y,w,h});
 return {x,y:o.y,w,h,cx:x+w/2,by:o.y+h};
}
function cap(s,r,t1,t2,c){
 const cx=Math.max(0.52,r.x-0.4), cw=Math.min(r.w+0.8,13.33-0.52-cx);
 s.addText(t1,{x:cx,y:r.by+0.1,w:cw,h:0.24,fontFace:H,fontSize:9.5,bold:true,color:c||INK,align:'center',margin:0});
 if(t2)s.addText(t2,{x:cx,y:r.by+0.33,w:cw,h:0.24,fontFace:B,fontSize:8.5,color:MUT,align:'center',margin:0});
}
function node(s,x,y,w,h,txt,o){o=o||{};
 s.addShape(P.ShapeType.roundRect,{x,y,w,h,rectRadius:0.07,fill:{color:o.fill||W},line:{color:o.line||LINE,width:o.lw||1.25,dashType:o.dash||'solid'}});
 s.addText(txt,{x:x+0.05,y,w:w-0.1,h,fontFace:H,fontSize:o.fs||9,bold:true,color:o.color||INK,align:'center',valign:'middle',margin:0,lineSpacing:(o.fs||9)*1.28});
}
const arrow=(s,x,y,w,c)=>s.addShape(P.ShapeType.line,{x,y,w,h:0,line:{color:c||'B9C2C9',width:1.4,endArrowType:'triangle'}});
const vArrow=(s,x,y,h,c)=>s.addShape(P.ShapeType.line,{x,y,w:0,h,line:{color:c||'B9C2C9',width:1.4,endArrowType:'triangle'}});
const hline=(s,x,y,w,c)=>s.addShape(P.ShapeType.line,{x,y,w,h:0,line:{color:c||'CBD3D9',width:1.2}});
function chip(s,x,y,t,col,bg){const w=Math.max(0.5,t.length*0.082+0.26);
 s.addShape(P.ShapeType.roundRect,{x,y,w,h:0.26,rectRadius:0.06,fill:{color:bg||WASH},line:{width:0}});
 s.addText(t,{x,y,w,h:0.26,fontFace:H,fontSize:8.5,bold:true,color:col||INK2,align:'center',valign:'middle',margin:0});return w}
const apx=(s,t)=>t&&s.addText(t,{x:M,y:6.95,w:CW,h:0.28,fontFace:B,fontSize:9.5,color:MUT,margin:0});
function demo(s,t){if(!t)return;
 s.addShape(P.ShapeType.roundRect,{x:M,y:6.4,w:CW,h:0.42,rectRadius:0.09,fill:{color:'EDF6F1'},line:{width:0}});
 s.addText('데모',{x:M+0.16,y:6.4,w:0.5,h:0.42,fontFace:H,fontSize:9,bold:true,color:GD,valign:'middle',margin:0});
 s.addText(t,{x:M+0.68,y:6.4,w:CW-0.85,h:0.42,fontFace:B,fontSize:10.5,color:GD,valign:'middle',margin:0});}
function tbl(s,x,y,w,rows,cols,o){o=o||{};
 const rh=o.rh||0.34;
 rows.forEach((r,i)=>{
  const yy=y+i*rh, hdr=(i===0&&o.header), isHi=(o.hi!=null&&i===o.hi);
  s.addShape(P.ShapeType.rect,{x,y:yy,w,h:rh,fill:{color:hdr?INK:(isHi?'EDF6F1':(i%2?W:WASH))},line:{width:0}});
  let cx=x;
  r.forEach((c,j)=>{
   const cwd=w*cols[j];
   s.addText(String(c),{x:cx+0.1,y:yy,w:cwd-0.2,h:rh,fontFace:hdr?H:(j===0?H:B),fontSize:o.fs||9,
     bold:hdr||j===0,color:hdr?W:(o.colColor&&o.colColor[j]?o.colColor[j]:INK2),
     valign:'middle',margin:0,align:o.align&&o.align[j]?o.align[j]:'left',lineSpacing:(o.fs||9)*1.25});
   cx+=cwd;});
 });}
function flow3(s,x,y,w,pain,fix,val,col){
 const bh=1.16, gap=0.34;
 [[pain,'기존의 불편',WASH,MUT,INK],[fix,'개선한 것',col,W,W],[val,'사용자 가치','EDF6F1',GD,GD]].forEach((v,i)=>{
  const yy=y+i*(bh+gap);
  s.addShape(P.ShapeType.roundRect,{x,y:yy,w,h:bh,rectRadius:0.1,fill:{color:v[2]},line:{width:0}});
  s.addText(v[1],{x:x+0.24,y:yy+0.1,w:w-0.48,h:0.24,fontFace:H,fontSize:8.5,bold:true,color:v[3],margin:0,charSpacing:1.1});
  s.addText(v[0],{x:x+0.24,y:yy+0.36,w:w-0.48,h:0.72,fontFace:B,fontSize:11.5,color:v[4],margin:0,valign:'top',lineSpacing:16});
  if(i<2)vArrow(s,x+w/2,yy+bh+0.04,gap-0.1,i===0?MUT:col);
 });
}
module.exports={P,S_,D_,head,bullets,shot,cap,node,arrow,vArrow,hline,chip,apx,demo,tbl,flow3,dim,
  INK,INK2,MUT,LINE,WASH,W,G,A,R,GD,AD,RD,H,B,M,CW,CY,S,F};
