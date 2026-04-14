(function(){
// Inject CSS
var s=document.createElement('style');
s.textContent="\n  #shrf-btn{position:fixed;bottom:90px;right:24px;width:64px;height:64px;cursor:pointer;z-index:2147483647;background:none;border:none;padding:0;filter:drop-shadow(0 6px 16px rgba(26,126,200,.3));animation:shrf-fl 3s ease-in-out infinite;}\n  @keyframes shrf-fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}\n  #shrf-bub{position:fixed;bottom:162px;right:12px;background:#fff;border:1.5px solid #c8e4f8;border-radius:12px;padding:6px 14px;font-size:12px;font-weight:600;color:#1A7EC8;font-family:sans-serif;box-shadow:0 3px 12px rgba(26,126,200,.2);z-index:2147483646;white-space:nowrap;transition:opacity .5s;cursor:pointer;}\n  #shrf-bub::after{content:'';position:absolute;bottom:-7px;left:50%;transform:translateX(-50%);border-left:6px solid transparent;border-right:6px solid transparent;border-top:7px solid #fff;}\n  #shrf-bub::before{content:'';position:absolute;bottom:-9px;left:50%;transform:translateX(-50%);border-left:7px solid transparent;border-right:7px solid transparent;border-top:8px solid #c8e4f8;}\n  #shrf-panel{position:fixed;bottom:172px;right:24px;width:360px;max-height:600px;border-radius:22px;background:#fff;border:1.5px solid #d0e8f8;box-shadow:0 12px 50px rgba(26,126,200,.15);z-index:2147483645;display:none;flex-direction:column;overflow:hidden;font-family:sans-serif;}\n  #shrf-panel.on{display:flex;}\n  #shrf-hdr{background:#1A7EC8;padding:11px 14px;display:flex;align-items:center;gap:10px;flex-shrink:0;}\n  #shrf-hdr-ico{width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0;}\n  #shrf-hdr-name{font-size:11px;font-weight:700;color:#fff;letter-spacing:1.5px;}\n  #shrf-hdr-sub{font-size:10px;color:rgba(255,255,255,.7);margin-top:2px;}\n  #shrf-cls{width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.2);border:none;color:#fff;cursor:pointer;font-size:14px;margin-left:auto;flex-shrink:0;}\n  #shrf-msgs{flex:1;overflow-y:auto;padding:13px 12px;display:flex;flex-direction:column;gap:9px;background:#f8fcff;}\n  .shrf-msg{display:flex;gap:7px;align-items:flex-end;}\n  .shrf-msg.u{flex-direction:row-reverse;}\n  .shrf-av{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:8px;font-weight:700;}\n  .shrf-av.ai{background:#1A7EC8;color:#fff;}\n  .shrf-av.u{background:#ddeefa;color:#1A7EC8;}\n  .shrf-bub{max-width:84%;padding:8px 12px;border-radius:16px;font-size:13px;line-height:1.55;}\n  .shrf-msg.ai .shrf-bub{background:#e8f4ff;color:#1a3a5c;border-radius:4px 16px 16px 16px;border:1px solid #d0e8f8;}\n  .shrf-msg.u .shrf-bub{background:#1A7EC8;color:#fff;border-radius:16px 4px 16px 16px;}\n  .shrf-pc{background:#fff;border:1.5px solid #d0e8f8;border-radius:12px;margin-top:8px;overflow:hidden;display:block;text-decoration:none;}\n  .shrf-pc:hover{border-color:#1A7EC8;}\n  .shrf-pc img{width:100%;height:120px;object-fit:contain;background:#f0f8ff;padding:8px;display:block;}\n  .shrf-pc-body{padding:8px 10px 10px;}\n  .shrf-pc-brand{font-size:9px;color:#7ab8d8;text-transform:uppercase;letter-spacing:.5px;}\n  .shrf-pc-name{font-size:11px;font-weight:600;color:#1a3a5c;line-height:1.4;margin:2px 0 5px;}\n  .shrf-pc-row{display:flex;align-items:center;justify-content:space-between;}\n  .shrf-pc-price{font-size:13px;font-weight:700;color:#1A7EC8;}\n  .shrf-pc-btn{font-size:10px;background:#1A7EC8;color:#fff;padding:4px 10px;border-radius:20px;font-weight:600;}\n  .shrf-typing{display:flex;gap:4px;padding:2px 0;align-items:center;}\n  .shrf-typing span{width:5px;height:5px;border-radius:50%;background:#1A7EC8;animation:shrf-tb 1.2s infinite;}\n  .shrf-typing span:nth-child(2){animation-delay:.2s;}\n  .shrf-typing span:nth-child(3){animation-delay:.4s;}\n  @keyframes shrf-tb{0%,80%,100%{opacity:.25;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}\n  #shrf-chips{padding:0 11px 7px;display:flex;flex-wrap:wrap;gap:5px;background:#f8fcff;flex-shrink:0;}\n  .shrf-chip{font-size:11px;padding:5px 11px;border-radius:20px;border:1.5px solid #c8e0f8;background:#fff;color:#1A7EC8;cursor:pointer;font-family:sans-serif;}\n  .shrf-chip:hover{background:#e8f4ff;}\n  #shrf-irow{padding:8px 10px 10px;border-top:1.5px solid #e0f0f8;display:flex;gap:6px;align-items:center;background:#fff;flex-shrink:0;}\n  #shrf-inp{flex:1;font-family:sans-serif;font-size:13px;background:#f0f8ff;border:1.5px solid #c8e0f8;border-radius:20px;padding:8px 14px;color:#1a3a5c;outline:none;}\n  #shrf-inp:focus{border-color:#1A7EC8;}\n  #shrf-snd{width:34px;height:34px;border-radius:50%;background:#1A7EC8;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;}\n  #shrf-foot{text-align:center;font-size:9px;color:#b8d8ec;padding:0 0 7px;background:#fff;flex-shrink:0;}
  #shrf-cam{width:34px;height:34px;border-radius:50%;background:#e8f4ff;border:1.5px solid #c8e0f8;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  #shrf-cam:hover{background:#d0e8f8;}
  #shrf-img-preview{padding:6px 12px 0;background:#fff;flex-shrink:0;display:none;}
  #shrf-img-preview img{width:80px;height:80px;object-fit:cover;border-radius:8px;border:1.5px solid #c8e0f8;}
  #shrf-img-preview .shrf-img-remove{font-size:10px;color:#e74c3c;cursor:pointer;margin-left:6px;font-weight:600;}
  .shrf-msg-img{width:160px;height:120px;object-fit:cover;border-radius:8px;display:block;margin-bottom:4px;}\n  @media(max-width:480px){#shrf-panel{bottom:0;right:0;left:0;width:100%;border-radius:20px 20px 0 0;max-height:85vh;}#shrf-btn{bottom:86px;right:16px;width:56px;height:56px;}}\n";
document.head.appendChild(s);

// Wait for body then build UI
function init(){
(function(){

var K='SECURE';
var M='claude-haiku-4-5-20251001';
var SYS='You are SHARAF AI - official AI shopping assistant for Sharaf Electro KKTC (sharafstore.com).\n\n=== STORE INFO ===\nWebsite: https://sharafstore.com | Email: info@sharafstore.com\nWhatsApp: +90 533 850 8819 | Phone: +90 533 850 8820\nFounded 2014 | 150+ brands | 3000+ products\n\n=== 6 STORES ===\n1. Dereboyu/Lefkosa: Avenue AVM, Mehmet Akif Cd No:1-2 | Tel: +90 542 877 33 20 | 10:00-19:00\n2. Girne: Elektrokur Karsisi, Ecevit Cd No:14 | Tel: +90 542 886 74 86 | 10:00-19:00\n3. Guzelyurt: Orange Mall AVM 2.kat | Tel: +90 548 836 66 90 | 10:00-21:00 (7 days)\n4. Alsancak/Girne: Karaoglanoglu Cd Yayla No:37 | Tel: +90 542 886 45 45 | 10:00-19:00\n5. Cataloy: Besparmaklar Cd No:92 | Tel: +90 548 837 66 94 | 10:00-19:00\n6. Magusa: see https://www.sharafstore.com/en/store-locator\n\n=== TAX FREE ===\nPage: https://www.sharafstore.com/en/tax-free\nForeign nationals can claim VAT refund. Show passport at purchase. Upload approved invoice: https://www.sharafstore.com/en/onayli-belge-gonderimi\n\n=== DELIVERY ===\nKKTC only | Free over 10000 TL | 3-5 business days | 2 year warranty\nDeals: https://www.sharafstore.com/en/firsat-kosesi\nAfter-sales: https://www.sharafstore.com/en/our-services\nRefund policy: https://www.sharafstore.com/en/geri-odeme-politikasi\n\n=== YOUR JOB ===\nI give you user query + matching products. Pick best 1-3, reply helpfully.\nReply ONLY in valid JSON:\n{"reply":"1-2 sentences in user language","products":[{"n":"name","p":"price","u":"url","i":"img","b":"brand"}],"chips":["chip1","chip2","chip3"]}\nRules: Only use catalog products I send. Never invent. Mention Vergi Iadesi for products over 20000 TL. KKTC delivery only.';
var CAT=[];

function buildUI(){
  var bub=document.createElement('div');
  bub.id='shrf-bub';
  bub.textContent='Merhaba! 👋';
  document.body.appendChild(bub);
  setTimeout(function(){bub.style.opacity='0';},3000);

  var btn=document.createElement('button');
  btn.id='shrf-btn';
  btn.innerHTML='<svg width="64" height="64" viewBox="0 0 220 265" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="rw" cx="32%" cy="22%" r="68%"><stop offset="0%" stop-color="#fff"/><stop offset="45%" stop-color="#eaf4fb"/><stop offset="100%" stop-color="#c0d8ec"/></radialGradient><radialGradient id="ra" cx="28%" cy="18%" r="72%"><stop offset="0%" stop-color="#f8fdff"/><stop offset="50%" stop-color="#ddeefa"/><stop offset="100%" stop-color="#b0cee8"/></radialGradient><radialGradient id="rv" cx="50%" cy="35%" r="60%"><stop offset="0%" stop-color="#102840"/><stop offset="100%" stop-color="#040d18"/></radialGradient><radialGradient id="re" cx="36%" cy="30%" r="62%"><stop offset="0%" stop-color="#a0f4ff"/><stop offset="40%" stop-color="#2dd8f8"/><stop offset="100%" stop-color="#08b0d0"/></radialGradient></defs><path d="M110 138 C74 138,48 158,48 190 C48 226,70 252,110 254 C150 254,172 226,172 190 C172 158,146 138,110 138Z" fill="url(#rw)" stroke="#c0d8ec" stroke-width="2"/><ellipse cx="82" cy="155" rx="18" ry="11" fill="#fff" opacity=".55" transform="rotate(-15 82 155)"/><path d="M56 162 C36 165,22 184,24 206 C26 226,38 242,52 245 C62 248,72 238,72 222 C72 200,66 175,56 162Z" fill="url(#ra)" stroke="#c0d8ec" stroke-width="1.5"/><path d="M164 162 C184 165,198 184,196 206 C194 226,182 242,168 245 C158 248,148 238,148 222 C148 200,154 175,164 162Z" fill="url(#ra)" stroke="#c0d8ec" stroke-width="1.5"/><rect x="96" y="118" width="28" height="22" rx="8" fill="url(#ra)" stroke="#c0d8ec" stroke-width="1.2"/><rect x="32" y="20" width="156" height="102" rx="40" fill="url(#rw)" stroke="#c0d8ec" stroke-width="1.5"/><ellipse cx="88" cy="33" rx="42" ry="11" fill="#fff" opacity=".52"/><ellipse cx="32" cy="71" rx="14" ry="22" fill="url(#rw)" stroke="#c0d8ec" stroke-width="1.2"/><ellipse cx="188" cy="71" rx="14" ry="22" fill="url(#rw)" stroke="#c0d8ec" stroke-width="1.2"/><rect x="46" y="30" width="128" height="82" rx="30" fill="url(#rv)"/><circle cx="85" cy="62" r="13" fill="url(#re)"/><ellipse cx="81" cy="56" rx="5" ry="4" fill="#fff" opacity=".78"/><circle cx="135" cy="62" r="13" fill="url(#re)"/><ellipse cx="131" cy="56" rx="5" ry="4" fill="#fff" opacity=".78"/><path d="M98 91 Q110 104 122 91" fill="none" stroke="#28d4f4" stroke-width="3.5" stroke-linecap="round"/></svg>';
  document.body.appendChild(btn);

  var panel=document.createElement('div');
  panel.id='shrf-panel';
  panel.innerHTML='<div id="shrf-hdr"><div id="shrf-hdr-ico"><svg width="20" height="22" viewBox="0 0 220 265"><defs><radialGradient id="hw" cx="32%" cy="22%" r="68%"><stop offset="0%" stop-color="#fff"/><stop offset="100%" stop-color="#c0d8ec"/></radialGradient><radialGradient id="hv" cx="50%" cy="35%" r="60%"><stop offset="0%" stop-color="#102840"/><stop offset="100%" stop-color="#040d18"/></radialGradient><radialGradient id="he" cx="36%" cy="30%" r="62%"><stop offset="0%" stop-color="#a0f4ff"/><stop offset="40%" stop-color="#2dd8f8"/><stop offset="100%" stop-color="#08b0d0"/></radialGradient></defs><rect x="32" y="20" width="156" height="102" rx="40" fill="url(#hw)"/><ellipse cx="32" cy="71" rx="14" ry="22" fill="url(#hw)"/><ellipse cx="188" cy="71" rx="14" ry="22" fill="url(#hw)"/><rect x="46" y="30" width="128" height="82" rx="30" fill="url(#hv)"/><circle cx="85" cy="62" r="13" fill="url(#he)"/><circle cx="135" cy="62" r="13" fill="url(#he)"/><path d="M98 91 Q110 104 122 91" fill="none" stroke="#28d4f4" stroke-width="4" stroke-linecap="round"/></svg></div><div><div id="shrf-hdr-name">SHARAF AI</div><div id="shrf-hdr-sub">&#9679; Çevrimiçi · KKTC</div></div><button id="shrf-cls">✕</button></div><div id="shrf-msgs"><div class="shrf-msg ai"><div class="shrf-av ai">AI</div><div class="shrf-bub">Merhaba! Ben <strong>SHARAF AI</strong> — ürün asistanınız.<br>Resim, fiyat ve link ile göstereyim!<br><span style="font-size:11px;color:#7ab8d8;">Ask me about any product!</span></div></div></div><div id="shrf-chips"><div class="shrf-chip">🎮 PS5</div><div class="shrf-chip">📱 iPhone</div><div class="shrf-chip">💻 MacBook</div><div class="shrf-chip">📺 TV</div><div class="shrf-chip">🛴 Segway</div><div class="shrf-chip">💝 Hediye</div></div><div id="shrf-img-preview"></div><div id="shrf-irow"><button id="shrf-cam" title="Upload image"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A7EC8" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></button><input id="shrf-inp" type="text" placeholder="Ne arıyorsunuz? / What do you need?" autocomplete="off"/><button id="shrf-snd"><svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg></button></div><div id="shrf-foot">SHARAF ELECTRO · sharafstore.com · KKTC</div>';
  document.body.appendChild(panel);

  var isOpen=false;
  function toggle(){
    isOpen=!isOpen;
    panel.classList.toggle('on',isOpen);
    if(isOpen){bub.style.opacity='0';setTimeout(function(){var i=document.getElementById('shrf-inp');if(i)i.focus();},300);}
  }

  btn.addEventListener('click',toggle);
  bub.addEventListener('click',toggle);
  document.getElementById('shrf-cls').addEventListener('click',toggle);

  document.getElementById('shrf-chips').addEventListener('click',function(e){
    var chip=e.target.closest('.shrf-chip');
    if(chip){
      var map={'🎮 PS5':'PS5','📱 iPhone':'iPhone','💻 MacBook':'MacBook','📺 TV':'TV','🛴 Segway':'Segway','💝 Hediye':'hediye önerisi'};
      go(map[chip.textContent]||chip.textContent.trim());
    }
  });

  document.getElementById('shrf-snd').addEventListener('click',doSend);

  // Camera button - create hidden file input
  var fileInput=document.createElement('input');
  fileInput.type='file';
  fileInput.accept='image/*';
  fileInput.style.display='none';
  document.body.appendChild(fileInput);

  document.getElementById('shrf-cam').addEventListener('click',function(){
    fileInput.click();
  });

  fileInput.addEventListener('change',function(){
    var file=fileInput.files[0];
    if(!file)return;
    var reader=new FileReader();
    reader.onload=function(e){
      var result=e.target.result;
      var b64=result.split(',')[1];
      var type=file.type||'image/jpeg';
      currentImageB64=b64;
      currentImageType=type;
      // Show preview
      var prev=document.getElementById('shrf-img-preview');
      prev.innerHTML='<img src="'+result+'"/><span class="shrf-img-remove" onclick="clearImg()">Remove</span>';
      prev.style.display='flex';
      prev.style.alignItems='center';
      document.getElementById('shrf-inp').placeholder='Ask about this image...';
      document.getElementById('shrf-inp').focus();
    };
    reader.readAsDataURL(file);
    fileInput.value='';
  });
  document.getElementById('shrf-inp').addEventListener('keydown',function(e){if(e.key==='Enter')doSend();});
}

function searchCat(q){
  var words=q.toLowerCase().split(/\s+/).filter(function(w){return w.length>1;});
  var scored=[];
  for(var i=0;i<CAT.length;i++){
    var p=CAT[i];
    var text=(p.n+' '+(p.b||'')+' '+(p.c||'')).toLowerCase();
    var score=0;
    for(var j=0;j<words.length;j++){if(text.indexOf(words[j])!==-1)score+=2;}
    if(text.indexOf(q.toLowerCase())!==-1)score+=5;
    if(score>0)scored.push({p:p,s:score});
  }
  scored.sort(function(a,b){return b.s-a.s;});
  return scored.slice(0,8).map(function(x){return x.p;});
}

if(window.CAT&&window.CAT.length)CAT=window.CAT;
var chatHistory=[],busy=false,currentImageB64=null,currentImageType=null;

function scrollDown(){var m=document.getElementById('shrf-msgs');if(m)m.scrollTop=m.scrollHeight;}

function addMsg(html,who){
  var d=document.createElement('div');
  d.className='shrf-msg '+who;
  var av=who==='ai'?'<div class="shrf-av ai">AI</div>':'<div class="shrf-av u">SIZ</div>';
  d.innerHTML=av+'<div class="shrf-bub">'+html+'</div>';
  var msgs=document.getElementById('shrf-msgs');
  if(msgs){msgs.appendChild(d);scrollDown();}
  return d;
}

function showTyping(){var d=addMsg('<div class="shrf-typing"><span></span><span></span><span></span></div>','ai');d.id='shrf-typ';}
function hideTyping(){var t=document.getElementById('shrf-typ');if(t)t.remove();}

function buildCards(prods){
  if(!prods||!prods.length)return'';
  return prods.map(function(p){
    var img=p.i?'<img src="'+p.i+'" alt="" loading="lazy" onerror="this.style.display=\'none\'">':'';
    var brand=p.b?'<div class="shrf-pc-brand">'+p.b+'</div>':'';
    return '<a class="shrf-pc" href="'+p.u+'" target="_blank" rel="noopener">'+img+'<div class="shrf-pc-body">'+brand+'<div class="shrf-pc-name">'+p.n+'</div><div class="shrf-pc-row"><div class="shrf-pc-price">'+p.p+'</div><div class="shrf-pc-btn">Incele →</div></div></div></a>';
  }).join('');
}

function setChips(arr){
  var c=document.getElementById('shrf-chips');
  if(!c)return;
  if(!arr||!arr.length)arr=['Baska urun','Daha ucuz?','Stok?'];
  c.innerHTML=arr.map(function(x){return '<div class="shrf-chip">'+x+'</div>';}).join('');
}

function render(data){
  var html=data.reply||'';
  if(data.products&&data.products.length)html+=buildCards(data.products);
  addMsg(html,'ai');
  setChips(data.chips);
}

function go(text,imgB64,imgType){
  if(busy)return;
  busy=true;
  // Show user message with image if present
  if(imgB64){
    var imgHtml='<img class="shrf-msg-img" src="data:'+imgType+';base64,'+imgB64+'"/>';
    if(text)imgHtml+=text;
    addMsg(imgHtml,'u');
  }else{
    addMsg(text,'u');
  }
  var chips=document.getElementById('shrf-chips');
  if(chips)chips.innerHTML='';
  showTyping();
  var matches=searchCat(text||'');
  var ctx=matches.length>0?'CATALOG:\n'+matches.map(function(p){return p.n+'|'+p.p+'|'+(p.b||'')+'|URL:'+p.u+'|IMG:'+p.i;}).join('\n'):'No match.';
  // Build message content
  var msgContent;
  if(imgB64){
    msgContent=[
      {type:'image',source:{type:'base64',media_type:imgType,data:imgB64}},
      {type:'text',text:(text||'What product is this? Find similar products in the catalog.')+'\n\n'+ctx}
    ];
  }else{
    msgContent=text+'\n\n'+ctx;
  }
  chatHistory.push({role:'user',content:msgContent});
  if(chatHistory.length>10)chatHistory=chatHistory.slice(-10);
  var xhr=new XMLHttpRequest();
  xhr.open('POST','https://s-haraf-chat.vercel.app/api/chat',true);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.onreadystatechange=function(){
    if(xhr.readyState!==4)return;
    hideTyping();
    if(xhr.status===200){
      try{
        var data=JSON.parse(xhr.responseText);
        var raw='';
        if(data&&data.content)data.content.forEach(function(b){if(b.type==='text')raw+=b.text;});
        try{
          var p=JSON.parse(raw.replace(/```json|```/g,'').trim());
          chatHistory.push({role:'assistant',content:raw});
          render(p);
        }catch(e){addMsg(raw||'Bir hata olustu.','ai');setChips(['Tekrar dene']);}
      }catch(e){addMsg('Hata.','ai');setChips(['Tekrar dene']);}
    }else if(xhr.status===429){
      addMsg('Cok fazla istek. 10sn bekleyip deneyin.','ai');
      setTimeout(function(){busy=false;},10000);
      setChips(['Tekrar dene']);return;
    }else{
      addMsg('Baglanti hatasi('+xhr.status+').','ai');setChips(['Tekrar dene']);
    }
    busy=false;
  };
  xhr.onerror=function(){hideTyping();addMsg('Baglanti hatasi.','ai');setChips(['Tekrar dene']);busy=false;};
  xhr.send(JSON.stringify({messages:chatHistory}));
}

function doSend(){
  var i=document.getElementById('shrf-inp');
  if(!i)return;
  var t=i.value.trim();
  if(!t&&!currentImageB64)return;
  i.value='';
  var imgB64=currentImageB64,imgType=currentImageType;
  // Clear image preview
  currentImageB64=null;currentImageType=null;
  var prev=document.getElementById('shrf-img-preview');
  if(prev){prev.style.display='none';prev.innerHTML='';}
  go(t,imgB64,imgType);
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',buildUI);}
else{buildUI();}

})();
}

window.clearImg=function(){
  currentImageB64=null;currentImageType=null;
  var prev=document.getElementById('shrf-img-preview');
  if(prev){prev.style.display='none';prev.innerHTML='';}
  var inp=document.getElementById('shrf-inp');
  if(inp)inp.placeholder='Ne ariyorsunuz? / What do you need?';
};

if(document.body){init();}
else{document.addEventListener('DOMContentLoaded',init);}
})();
