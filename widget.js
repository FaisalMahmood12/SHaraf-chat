(function(){
var s=document.createElement('style');
s.textContent='#shrf-btn{position:fixed;bottom:90px;right:24px;width:64px;height:64px;cursor:pointer;z-index:2147483647;background:none;border:none;padding:0;filter:drop-shadow(0 6px 16px rgba(26,126,200,.3))}#shrf-bub{display:none;position:fixed;bottom:162px;right:12px;background:#fff;border:1.5px solid #c8e4f8;border-radius:12px;padding:6px 14px;font-size:12px;font-weight:600;color:#1A7EC8;font-family:sans-serif;box-shadow:0 3px 12px rgba(26,126,200,.2);z-index:2147483646;white-space:nowrap;transition:opacity .5s;cursor:pointer}#shrf-bub::after{content:"";position:absolute;bottom:-7px;left:50%;transform:translateX(-50%);border-left:6px solid transparent;border-right:6px solid transparent;border-top:7px solid #fff}#shrf-bub::before{content:"";position:absolute;bottom:-9px;left:50%;transform:translateX(-50%);border-left:7px solid transparent;border-right:7px solid transparent;border-top:8px solid #c8e4f8}#shrf-panel{position:fixed;bottom:172px;right:24px;width:360px;max-height:600px;border-radius:22px;background:#fff;border:1.5px solid #d0e8f8;box-shadow:0 12px 50px rgba(26,126,200,.15);z-index:2147483645;display:none;flex-direction:column;overflow:hidden;font-family:sans-serif}#shrf-panel.on{display:flex}#shrf-hdr{background:#1A7EC8;padding:11px 14px;display:flex;align-items:center;gap:10px;flex-shrink:0}#shrf-hdr-ico{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0}#shrf-hdr-name{font-size:11px;font-weight:700;color:#fff;letter-spacing:1.5px}#shrf-hdr-sub{font-size:10px;color:rgba(255,255,255,.7);margin-top:2px}#shrf-cls{width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.2);border:none;color:#fff;cursor:pointer;font-size:14px;margin-left:auto;flex-shrink:0}#shrf-msgs{flex:1;overflow-y:auto;padding:13px 12px;display:flex;flex-direction:column;gap:9px;background:#f8fcff}.shrf-msg{display:flex;gap:7px;align-items:flex-end}.shrf-msg.u{flex-direction:row-reverse}.shrf-av{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:8px;font-weight:700}.shrf-av.ai{background:#1A7EC8;color:#fff}.shrf-av.u{background:#ddeefa;color:#1A7EC8}.shrf-bub{max-width:84%;padding:8px 12px;border-radius:16px;font-size:13px;line-height:1.55}.shrf-msg.ai .shrf-bub{background:#e8f4ff;color:#1a3a5c;border-radius:4px 16px 16px 16px;border:1px solid #d0e8f8}.shrf-msg.u .shrf-bub{background:#1A7EC8;color:#fff;border-radius:16px 4px 16px 16px}.shrf-pc{background:#fff;border:1.5px solid #d0e8f8;border-radius:12px;margin-top:8px;overflow:hidden;display:block;text-decoration:none}.shrf-pc:hover{border-color:#1A7EC8}.shrf-pc img{width:100%;height:130px;object-fit:contain;background:#f0f8ff;padding:10px;display:block;box-sizing:border-box}.shrf-pc-body{padding:8px 10px 10px}.shrf-pc-brand{font-size:9px;color:#7ab8d8;text-transform:uppercase;letter-spacing:.5px;font-weight:600}.shrf-pc-name{font-size:11px;font-weight:600;color:#1a3a5c;line-height:1.4;margin:2px 0 5px}.shrf-pc-row{display:flex;align-items:center;justify-content:space-between}.shrf-pc-price{font-size:13px;font-weight:700;color:#1A7EC8}.shrf-pc-btn{font-size:10px;background:#1A7EC8;color:#fff;padding:4px 10px;border-radius:20px;font-weight:600}.shrf-typing{display:flex;gap:4px;padding:2px 0;align-items:center}.shrf-typing span{width:5px;height:5px;border-radius:50%;background:#1A7EC8;animation:shrf-tb 1.2s infinite}.shrf-typing span:nth-child(2){animation-delay:.2s}.shrf-typing span:nth-child(3){animation-delay:.4s}@keyframes shrf-tb{0%,80%,100%{opacity:.25;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}#shrf-chips{padding:0 11px 7px;display:flex;flex-wrap:wrap;gap:5px;background:#f8fcff;flex-shrink:0}.shrf-chip{font-size:11px;padding:5px 11px;border-radius:20px;border:1.5px solid #c8e0f8;background:#fff;color:#1A7EC8;cursor:pointer;font-family:sans-serif}.shrf-chip:hover{background:#e8f4ff}#shrf-irow{padding:8px 10px 10px;border-top:1.5px solid #e0f0f8;display:flex;gap:6px;align-items:center;background:#fff;flex-shrink:0}#shrf-inp{flex:1;font-family:sans-serif;font-size:13px;background:#f0f8ff;border:1.5px solid #c8e0f8;border-radius:20px;padding:8px 14px;color:#1a3a5c;outline:none}#shrf-inp:focus{border-color:#1A7EC8}#shrf-snd{width:34px;height:34px;border-radius:50%;background:#1A7EC8;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0}#shrf-foot{text-align:center;font-size:9px;color:#b8d8ec;padding:0 0 7px;background:#fff;flex-shrink:0}@media(max-width:480px){#shrf-panel{bottom:0;right:0;left:0;width:100%;border-radius:20px 20px 0 0;max-height:85vh}#shrf-btn{bottom:86px;right:16px;width:56px;height:56px}}';
document.head.appendChild(s);

var el=document.createElement('div');
el.innerHTML='<button id="shrf-btn" onclick="shrfToggle()"><svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="shrfg1" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#2196F3"/><stop offset="100%" stop-color="#1565C0"/></linearGradient></defs><circle cx="32" cy="32" r="32" fill="url(#shrfg1)"/><rect x="16" y="21" width="32" height="24" rx="6" fill="white" opacity="0.95"/><circle cx="24" cy="31" r="4.5" fill="#1A7EC8"/><circle cx="40" cy="31" r="4.5" fill="#1A7EC8"/><circle cx="25.2" cy="29.8" r="1.8" fill="white"/><circle cx="41.2" cy="29.8" r="1.8" fill="white"/><rect x="24" y="38" width="16" height="3" rx="1.5" fill="#1A7EC8" opacity="0.5"/><line x1="32" y1="21" x2="32" y2="14" stroke="white" stroke-width="2.5" stroke-linecap="round"/><circle cx="32" cy="12.5" r="3" fill="white"/><rect x="11" y="27" width="5" height="9" rx="2.5" fill="white" opacity="0.85"/><rect x="48" y="27" width="5" height="9" rx="2.5" fill="white" opacity="0.85"/></svg></button><div id="shrf-bub" onclick="shrfToggle()">Merhaba!</div><div id="shrf-panel"><div id="shrf-hdr"><div id="shrf-hdr-ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="14" rx="4" fill="white" opacity="0.9"/><circle cx="8" cy="13" r="2.2" fill="#1A7EC8"/><circle cx="16" cy="13" r="2.2" fill="#1A7EC8"/><circle cx="8.7" cy="12.3" r="0.9" fill="white"/><circle cx="16.7" cy="12.3" r="0.9" fill="white"/><line x1="12" y1="7" x2="12" y2="3" stroke="white" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="2.5" r="1.5" fill="white"/></svg></div><div><div id="shrf-hdr-name">SHARAF AI</div><div id="shrf-hdr-sub">Alisveris Asistani - Cevrimici</div></div><button id="shrf-cls" onclick="shrfToggle()">X</button></div><div id="shrf-msgs"></div><div id="shrf-chips"></div><div id="shrf-irow"><input id="shrf-inp" placeholder="Urun, teslimat, magaza sor..." onkeydown="if(event.key===\'Enter\')shrfSend()"/><button id="shrf-snd" onclick="shrfSend()"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></button></div><div id="shrf-foot">Powered by SHARAF AI - sharafstore.com</div></div>';
document.body.appendChild(el);

var shrfOpen=false,shrfBusy=false,shrfHistory=[];
var SHRF_API='https://s-haraf-chat.vercel.app/api/chat';

var cs=document.createElement('script');
cs.src='https://s-haraf-chat.vercel.app/catalog.js';
document.head.appendChild(cs);

setTimeout(function(){
  if(!shrfOpen){
    var b=document.getElementById('shrf-bub');
    if(b){b.style.display='block';setTimeout(function(){b.style.opacity='0';setTimeout(function(){b.style.display='none';b.style.opacity='1';},500);},8000);}
  }
},60000);

window.shrfToggle=function(){
  shrfOpen=!shrfOpen;
  document.getElementById('shrf-panel').classList.toggle('on',shrfOpen);
  document.getElementById('shrf-bub').style.display='none';
  if(shrfOpen&&shrfHistory.length===0){
    shrfAddMsg('Merhaba! Ben SHARAF AI, kisisel alisveris asistaninizim. Size nasil yardimci olabilirim?','ai');
    shrfSetChips(['Telefonlar','TV Firsatlar','Magazalar','Teslimat']);
  }
};

function shrfScroll(){var m=document.getElementById('shrf-msgs');if(m)m.scrollTop=m.scrollHeight;}

function shrfAddMsg(html,who){
  var d=document.createElement('div');
  d.className='shrf-msg '+who;
  var av=who==='ai'?'<div class="shrf-av ai">AI</div>':'<div class="shrf-av u">SIZ</div>';
  d.innerHTML=av+'<div class="shrf-bub">'+html+'</div>';
  document.getElementById('shrf-msgs').appendChild(d);
  shrfScroll();
}

function shrfCards(prods){
  var h='';
  prods.forEach(function(p){
    var img=p.i?'<img src="'+p.i+'" alt="" onerror="this.style.display=\'none\'"/>':'';
    h+='<a class="shrf-pc" href="'+(p.u||'#')+'" target="_blank">'+img+'<div class="shrf-pc-body"><div class="shrf-pc-brand">'+(p.b||'')+'</div><div class="shrf-pc-name">'+(p.n||'')+'</div><div class="shrf-pc-row"><span class="shrf-pc-price">'+(p.p||'')+'</span><span class="shrf-pc-btn">Urun Git</span></div></div></a>';
  });
  return h;
}

function shrfSetChips(arr){
  var c=document.getElementById('shrf-chips');
  if(!c)return;
  if(!arr||!arr.length)arr=['Baska urun','Daha ucuz?','Stok?'];
  c.innerHTML=arr.map(function(x){return '<div class="shrf-chip" onclick="shrfChip(this)">'+x+'</div>';}).join('');
}

window.shrfChip=function(el){document.getElementById('shrf-inp').value=el.textContent;shrfSend();};

function shrfShowTyping(){
  var d=document.createElement('div');
  d.className='shrf-msg ai';d.id='shrf-typing';
  d.innerHTML='<div class="shrf-av ai">AI</div><div class="shrf-bub"><div class="shrf-typing"><span></span><span></span><span></span></div></div>';
  document.getElementById('shrf-msgs').appendChild(d);shrfScroll();
}
function shrfHideTyping(){var t=document.getElementById('shrf-typing');if(t)t.remove();}

function shrfSearch(q){
  if(typeof CAT==='undefined')return[];
  var terms=q.toLowerCase().split(' ').filter(function(t){return t.length>1;});
  var scored=[];
  for(var i=0;i<CAT.length;i++){
    var p=CAT[i];
    var txt=(p.n+' '+(p.b||'')+' '+(p.c||'')).toLowerCase();
    var s=0;
    for(var j=0;j<terms.length;j++){if(txt.indexOf(terms[j])>-1)s+=terms[j].length;}
    if(s>0)scored.push({p:p,s:s});
  }
  scored.sort(function(a,b){return b.s-a.s;});
  return scored.slice(0,5).map(function(x){return x.p;});
}

window.shrfSend=function(){
  var i=document.getElementById('shrf-inp');
  if(!i)return;
  var t=i.value.trim();
  if(!t||shrfBusy)return;
  shrfBusy=true;i.value='';
  shrfAddMsg(t,'u');
  document.getElementById('shrf-chips').innerHTML='';
  shrfShowTyping();
  var matches=shrfSearch(t);
  var ctx=matches.length>0?'CATALOG MATCHES:\n'+matches.map(function(p){return p.n+'|'+p.p+'|'+(p.b||'')+'|URL:'+p.u+'|IMG:'+(p.i||'')+'|CAT:'+(p.c||'');}).join('\n'):'No matching products found.';
  shrfHistory.push({role:'user',content:t+'\n\n'+ctx});
  if(shrfHistory.length>10)shrfHistory=shrfHistory.slice(-10);
  fetch(SHRF_API,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({messages:shrfHistory})
  })
  .then(function(r){return r.json();})
  .then(function(data){
    shrfHideTyping();
    var raw='';
    if(data&&data.content)data.content.forEach(function(b){if(b.type==='text')raw+=b.text;});
    try{
      var p=JSON.parse(raw.replace(/```json|```/g,'').trim());
      shrfHistory.push({role:'assistant',content:raw});
      var html=p.reply||'';
      if(p.products&&p.products.length)html+=shrfCards(p.products);
      shrfAddMsg(html,'ai');
      shrfSetChips(p.chips);
    }catch(e){shrfAddMsg(raw||'Bir hata olustu.','ai');shrfSetChips(['Tekrar dene']);}
    shrfBusy=false;
  })
  .catch(function(){
    shrfHideTyping();
    shrfAddMsg('Baglanti hatasi. Lutfen tekrar deneyin.','ai');
    shrfSetChips(['Tekrar dene']);
    shrfBusy=false;
  });
};

})();
