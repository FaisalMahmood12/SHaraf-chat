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

MAGAZALAR:
1. Dereboyu/Lefkosa: Avenue AVM | Tel: +90 542 877 33 20 | 10:00-19:00
2. Girne: Ecevit Cd No:14 | Tel: +90 542 886 74 86 | 10:00-19:00
3. Guzelyurt: Orange Mall AVM | Tel: +90 548 836 66 90 | 10:00-21:00
4. Alsancak/Girne: Yayla No:37 | Tel: +90 542 886 45 45 | 10:00-19:00
5. Cataloy: Besparmaklar Cd No:92 | Tel: +90 548 837 66 94 | 10:00-19:00
6. Magusa: sharafstore.com/en/store-locator

DIL KURALI:
- Musteri Turkce yazarsa TURKCE cevap ver
- Musteri Ingilizce yazarsa INGILIZCE cevap ver
- Varsayilan dil TURKCE

HEDIYE ONERISI: Musteri hediye sorarsa butce ve kisi icin en uygun urunu oner.
FIYAT ARALIGIM: Musteri fiyat araligim sorarsa katalogdan o aralikta urunler goster.
RESIM: Musteri resim gonderirse urunu tani ve katalogdan benzerlerini bul.
VERGI IADESI: 20.000 TL uzeri urunlerde yabanci uyruklular icin Vergi Iadesi'nden bahset.

YANIT FORMATI - KESINLIKLE UYMALI:
- SADECE ham JSON don, markdown yok, backtick yok
- { ile basla, } ile bitir
- Alan adlari: n, p, u, i, b
- Sadece KATALOG'daki urunleri kullan

{"reply":"yanitin","products":[{"n":"urun adi","p":"fiyat TL","u":"https://sharafstore.com/shop/...","i":"https://sharafstore.com/web/image/product.template/.../image_512","b":"marka"}],"chips":["secenek1","secenek2","secenek3"]}`,
        messages: body.messages,
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
