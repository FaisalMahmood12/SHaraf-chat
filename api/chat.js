export const config = { runtime: 'edge' };

export default async function handler(req) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') return new Response(null, { status: 200, headers: cors });
  if (req.method !== 'POST') return new Response('Not allowed', { status: 405, headers: cors });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return new Response(JSON.stringify({ error: 'API key missing' }), { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } });

  try {
    const body = await req.json();
    const messages = body.messages;
    const lastMessage = messages[messages.length - 1];
    const hasImage = Array.isArray(lastMessage?.content) &&
      lastMessage.content.some(c => c.type === 'image');

    let finalMessages = messages;

    if (hasImage) {
      // Step 1: Identify product in image
      const analyzeRes = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 150,
          system: 'Identify the product in the image. Reply ONLY in this format: BRAND:xxx|TYPE:xxx|KEYWORDS:word1,word2,word3',
          messages: [{ role: 'user', content: lastMessage.content }],
        }),
      });

      const analyzeData = await analyzeRes.json();
      let analysis = '';
      if (analyzeData?.content) analyzeData.content.forEach(b => { if (b.type === 'text') analysis += b.text; });

      const brandMatch = analysis.match(/BRAND:([^|]+)/i);
      const keywordsMatch = analysis.match(/KEYWORDS:([^\n|]+)/i);
      const typeMatch = analysis.match(/TYPE:([^|]+)/i);

      const brand = brandMatch ? brandMatch[1].trim().toLowerCase() : '';
      const type = typeMatch ? typeMatch[1].trim().toLowerCase() : '';
      const keywords = keywordsMatch ? keywordsMatch[1].trim().toLowerCase() : '';

      const catalog = body.catalog || [];
      const searchTerms = [brand, type, ...keywords.split(',').map(k => k.trim())].filter(t => t.length > 2);

      const matched = catalog.filter(p => {
        const txt = (p.n + ' ' + (p.b || '') + ' ' + (p.c || '')).toLowerCase();
        return searchTerms.some(t => txt.includes(t));
      }).slice(0, 8);

      const catalogCtx = matched.length > 0
        ? 'KATALOG:\n' + matched.map(p => p.n + '|' + p.p + '|' + (p.b || '') + '|URL:' + p.u + '|IMG:' + (p.i || '')).join('\n')
        : 'Exact match not found. Suggest most similar products from catalog and encourage purchase.';

      const userText = Array.isArray(lastMessage.content)
        ? (lastMessage.content.find(c => c.type === 'text')?.text || '')
        : lastMessage.content;

      finalMessages = [
        ...messages.slice(0, -1),
        {
          role: 'user', content: [
            ...lastMessage.content.filter(c => c.type === 'image'),
            { type: 'text', text: 'Image analysis: ' + analysis + '\nCustomer note: ' + (userText || 'none') + '\n\n' + catalogCtx }
          ]
        }
      ];
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        system: `Sen SHARAF AI'sin - Sharaf Electro KKTC resmi alisveris asistanisin (sharafstore.com).

MAGAZA: sharafstore.com | WhatsApp: +90 533 850 8819 | Tel: +90 533 850 8820
KKTC'de 6 magaza | 10.000 TL uzeri ucretsiz kargo | 2 yil garanti

DIL KURALI - COK ONEMLI:
- Musteri hangi dilde yazarsa O DILDE cevap ver
- Ingilizce mesaj → Ingilizce cevap
- Turkce mesaj → Turkce cevap
- Karisik mesaj → son mesajin diline gore cevap ver

MARKA ONCELIGI:
- TV aramasinda musterinin belirli bir markasi yoksa → TCL markasini one cik
- Supurge/vacuum aramasinda belirli marka yoksa → Bissell markasini one cik
- Musteri belirli marka isterse → o markayi goster

KATALOG KULLANIMI:
- Gonderilen KATALOG verisi seniN GERCEK STOKUNDUR - buna guvene
- "Yok" deme - katalogda arama yap, mutlaka bir seyin vardir
- Tam eslesme yoksa BENZER urunu oner - satis amaclisin
- 20.000 TL uzeri urunlerde Vergi Iadesi belirt

YANIT FORMATI - KESINLIKLE:
- SADECE ham JSON, markdown yok, backtick yok
- { ile basla } ile bitir
- Alan adlari: n, p, u, i, b

{"reply":"yanitin","products":[{"n":"urun","p":"fiyat TL","u":"https://sharafstore.com/shop/...","i":"https://sharafstore.com/web/image/product.template/.../image_512","b":"marka"}],"chips":["1","2","3"]}`,
        messages: finalMessages,
      }),
    });

    if (!res.ok) return new Response(JSON.stringify({ error: `API error ${res.status}` }), { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } });

    const data = await res.json();
    let raw = '';
    if (data?.content) data.content.forEach(b => { if (b.type === 'text') raw += b.text; });
    raw = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
    const s = raw.indexOf('{'), e = raw.lastIndexOf('}');
    if (s !== -1 && e !== -1) raw = raw.substring(s, e + 1);

    return new Response(JSON.stringify({ content: [{ type: 'text', text: raw }] }), {
      headers: { ...cors, 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...cors, 'Content-Type': 'application/json' } });
  }
}
