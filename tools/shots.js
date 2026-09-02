/* UI 캡처 생성 — node tools/shots.js  (로컬 서버 http://localhost:4173 필요) */
const puppeteer=require('puppeteer-core');const fs=require('fs');const path=require('path');
const OUT=path.resolve(__dirname,'..','shots');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL='http://localhost:4173/app.html';
fs.mkdirSync(OUT,{recursive:true});
const setup=`(cfg)=>{
  ['fab','a2hs','demo','scrim','toast'].forEach(function(id){var e=document.getElementById(id);if(e)e.style.display='none'});
  if(cfg.presets){
    localStorage.removeItem('coach-presets');
    pickModel('D');W.area=20;W.pet=true;W.carpet=true;W.time='심야';W.session='split';W.dock='always';W.voice='cat';SOH=88;presetAdd('부모님댁');
    pickModel('C');W.area=24;W.pet=false;W.carpet=false;W.time='오후';W.session='batch';W.dock='ondemand';W.voice='pororo';SOH=100;presetAdd('우리집');
    W.model=null;W.voice=null;SOH=100;
  } else { try{localStorage.removeItem('coach-presets')}catch(e){} }
  if(cfg.model) pickModel(cfg.model);
  Object.assign(W, cfg.W||{});
  if(cfg.soh!=null){SOH=cfg.soh;var se=document.getElementById('soh');if(se){se.value=SOH;document.getElementById('soh-v').textContent=SOH+'%'}}
  if(cfg.step!=null){ W.step=cfg.step; if(W.step===STEP_RESULT) W.sub=inferSub(); renderWiz(); }
  if(cfg.coach){
    W.sub=inferSub(); W.step=STEP_RESULT; renderWiz(); wizNext();
    if(cfg.want){var band=[];for(var s=100;s>=6;s--){SOC=s;if(judge().state===cfg.want)band.push(s)}
      SOC=band.length?band[Math.floor(band.length/2)]:(cfg.soc||70);}
    else if(cfg.soc!=null) SOC=cfg.soc;
    if(cfg.cleaning) startClean(false);
    clearOpCache(); draw(); scrollTo(0,0);
  }
  return {step:W.step, model:W.model, state:(typeof started!=='undefined'&&started?judge().state:null)};
}`;
const BASE={time:'저녁',session:'batch',dock:'always',carpet:false,pet:false,hair:false};
const SHOTS=[
 {f:'01_onboard_type',m:'mobile',cfg:{step:1}},
 {f:'02_q_area',m:'mobile',cfg:{model:'B',W:{...BASE},step:2}},
 {f:'03_q_carpet',m:'mobile',cfg:{model:'C',W:{...BASE},step:3}},
 {f:'04_q_time',m:'mobile',cfg:{model:'E',W:{...BASE,time:null},step:6}},
 {f:'05_voice_A',m:'mobile',cfg:{model:'A',W:{...BASE},step:9}},
 {f:'06_voice_C',m:'mobile',cfg:{model:'C',W:{...BASE},step:9}},
 {f:'07_result',m:'mobile',cfg:{model:'A',W:{...BASE,voice:'karina'},step:10}},
 {f:'08_coach_ok_C',m:'mobile',cfg:{model:'C',W:{...BASE,voice:'pororo'},coach:1,want:'ok'}},
 {f:'09_coach_tight_E',m:'mobile',cfg:{model:'E',W:{...BASE,voice:'lyw'},coach:1,want:'tight'}},
 {f:'10_coach_charge_D',m:'mobile',cfg:{model:'D',W:{...BASE,pet:true,carpet:true,voice:'dog'},coach:1,want:'charge'}},
 {f:'11_cleaning_B',m:'mobile',cfg:{model:'B',W:{...BASE,hair:true,voice:'jk'},coach:1,soc:80,cleaning:1}},
 {f:'12_muted_C',m:'mobile',cfg:{model:'C',W:{...BASE,time:'오후',voice:'tiniping'},coach:1,want:'ok'}},
 {f:'13_presets',m:'mobile',cfg:{presets:1,step:1}},
 {f:'14_soh_low',m:'mobile',cfg:{model:'C',W:{...BASE,voice:'pororo'},coach:1,soc:82,soh:78}},
 {f:'T_A',m:'mobile',cfg:{model:'A',W:{...BASE,voice:'iu'},coach:1,want:'ok'}},
 {f:'T_B',m:'mobile',cfg:{model:'B',W:{...BASE,voice:'jk'},coach:1,want:'ok'}},
 {f:'T_C',m:'mobile',cfg:{model:'C',W:{...BASE,voice:'pororo'},coach:1,want:'ok'}},
 {f:'T_D',m:'mobile',cfg:{model:'D',W:{...BASE,area:12,voice:'dog'},coach:1,want:'ok'}},
 {f:'T_E',m:'mobile',cfg:{model:'E',W:{...BASE,voice:'lyw'},coach:1,want:'ok'}},
 {f:'20_desktop_link',m:'desk',cfg:{model:'D',W:{...BASE,pet:true,voice:'dog'},coach:1,soc:62}},
];
(async()=>{
 const browser=await puppeteer.launch({executablePath:CHROME,headless:'new',
   args:['--no-sandbox','--hide-scrollbars','--force-device-scale-factor=2','--font-render-hinting=none']});
 for(const s of SHOTS){
  const page=await browser.newPage();
  await page.setViewport(s.m==='mobile'?{width:390,height:844,deviceScaleFactor:3,isMobile:true,hasTouch:true}
                                       :{width:1500,height:900,deviceScaleFactor:2});
  await page.goto(URL,{waitUntil:'networkidle0'});
  const info=await page.evaluate(new Function('return '+setup)(), s.cfg);
  await new Promise(r=>setTimeout(r, s.cfg.cleaning?900:450));
  const clip = s.m==='mobile' ? await page.evaluate(()=>{
     const r=document.querySelector('.scrn').getBoundingClientRect();
     const root=document.querySelector('#op.on')||document.querySelector('#wiz');
     let bottom=0;
     root.querySelectorAll('*').forEach(e=>{const b=e.getBoundingClientRect();
       if(b.height>0&&b.width>0&&b.bottom>bottom) bottom=b.bottom;});
     return {x:0,y:0,width:Math.round(r.width),
             height:Math.max(300,Math.min(Math.round(bottom+22),Math.round(r.height),window.innerHeight))};
   }) : null;
  await page.screenshot({path:path.join(OUT,s.f+'.png'), clip:clip||undefined});
  console.log(s.f.padEnd(20), JSON.stringify(info));
  await page.close();
 }
 await browser.close(); console.log('\n캡처 완료 →',OUT);
})().catch(e=>{console.error('실패:',e.message);process.exit(1)});
