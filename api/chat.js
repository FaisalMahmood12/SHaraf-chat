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

    // Check if last message contains an image
    const hasImage = Array.isArray(lastMessage?.content) && 
      lastMessage.content.some(c => c.type === 'image');

    let finalMessages = messages;

    if (hasImage) {
      // STEP 1: Analyze image to identify product
      const analyzeRes = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 200,
          system: 'You are a product recognition expert. Analyze the image and identify: 1) Brand name, 2) Product type/category, 3) Model name if visible. Reply in this exact format: BRAND:xxx|TYPE:xxx|MODEL:xxx|KEYWORDS:keyword1,keyword2,keyword3',
          messages: [{ role: 'user', content: lastMessage.content }],
        }),
      });

      const analyzeData = await analyzeRes.json();
      let analysis = '';
      if (analyzeData?.content) {
        analyzeData.content.forEach(b => { if (b.type === 'text') analysis += b.text; });
      }

      // Extract keywords from analysis
      const keywordsMatch = analysis.match(/KEYWORDS:([^\n|]+)/i);
      const brandMatch = analysis.match(/BRAND:([^\n|]+)/i);
      const typeMatch = analysis.match(/TYPE:([^\n|]+)/i);

      const brand = brandMatch ? brandMatch[1].trim().toLowerCase() : '';
      const type = typeMatch ? typeMatch[1].trim().toLowerCase() : '';
      const keywords = keywordsMatch ? keywordsMatch[1].trim() : '';

      // STEP 2: Search catalog with identified keywords
      const catalogData = body.catalog || [];
      
      // Filter catalog by brand and type
      const searchTerms = [brand, type, ...keywords.split(',').map(k => k.trim())].filter(Boolean);
      
      const matchedProducts = catalogData.filter(p => {
        const productText = (p.n + ' ' + (p.b || '') + ' ' + (p.c || '')).toLowerCase();
        return searchTerms.some(term => term.length > 2 && productText.includes(term));
      }).slice(0, 8);

      const catalogContext = matchedProducts.length > 0
        ? 'KATALOG ESLESMELER:\n' + matchedProducts.map(p => p.n + '|' + p.p + '|' + (p.b || '') + '|URL:' + p.u + '|IMG:' + (p.i || '')).join('\n')
        : 'Bu marka/urun katalogda bulunamadi. Alternatif urun onerisi yapabilirsin.';

      // Build new message with analysis + catalog
      const userText = Array.isArray(lastMessage.content) 
        ? (lastMessage.content.find(c => c.type === 'text')?.text || '')
        : lastMessage.content;

      const enhancedContent = [
        ...lastMessage.content.filter(c => c.type === 'image'),
        { 
          type: 'text', 
          text: `Resim analizi: ${analysis}\n\nMusteri notu: ${userText || 'Yok'}\n\n${catalogContext}\n\nBu bilgilere dayanarak musteri icin en uygun urunleri oner.`
        }
      ];

      finalMessages = [
        ...messages.slice(0, -1),
        { role: 'user', content: enhancedContent }
      ];
    }

    // Final response
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        system: `Sen SHARAF AI'sin - Sharaf Electro KKTC'nin resmi alisveris asistanisin (sharafstore.com).

MAGAZA: sharafstore.com | WhatsApp: +90 533 850 8819 | Tel: +90 533 850 8820
KKTC'de 6 magaza | 150+ marka | 3000+ urun | 10.000 TL uzeri ucretsiz kargo | 2 yil garanti

DIL KURALI:
- Musteri Turkce yazarsa TURKCE cevap ver
- Musteri Ingilizce yazarsa INGILIZCE cevap ver
- Varsayilan dil TURKCE

SATIS AMACI: Her zaman musteri satin alma yapmayi hedefle. Urun bulunamasa bile alternatif oner.
VERGI IADESI: 20.000 TL uzeri urunlerde yabanci uyruklular icin Vergi Iadesi'nden bahset.

YANIT FORMATI - KESINLIKLE UYMALI:
- SADECE ham JSON don, markdown yok, backtick yok
- { ile basla } ile bitir
- Alan adlari: n, p, u, i, b

{"reply":"yanitin","products":[{"n":"urun adi","p":"fiyat TL","u":"https://sharafstore.com/shop/...","i":"https://sharafstore.com/web/image/product.template/.../image_512","b":"marka"}],"chips":["secenek1","secenek2","secenek3"]}`,
        messages: finalMessages,
      }),
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: `API error ${res.status}` }), { status: 502, headers: { ...cors, 'Content-Type': 'application/json' } });
    }

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
