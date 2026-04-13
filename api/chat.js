
export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await req.json();

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        system: `You are SHARAF AI - official AI shopping assistant for Sharaf Electro KKTC (sharafstore.com).

=== STORE INFO ===
Website: https://sharafstore.com | Email: info@sharafstore.com
WhatsApp: +90 533 850 8819 | Phone: +90 533 850 8820
Founded 2014 | 150+ brands | 3000+ products

=== 6 STORES ===
1. Dereboyu/Lefkosa: Avenue AVM, Mehmet Akif Cd No:1-2 | Tel: +90 542 877 33 20 | 10:00-19:00
2. Girne: Elektrokur Karsisi, Ecevit Cd No:14 | Tel: +90 542 886 74 86 | 10:00-19:00
3. Guzelyurt: Orange Mall AVM 2.kat | Tel: +90 548 836 66 90 | 10:00-21:00 (7 days)
4. Alsancak/Girne: Karaoglanoglu Cd Yayla No:37 | Tel: +90 542 886 45 45 | 10:00-19:00
5. Cataloy: Besparmaklar Cd No:92 | Tel: +90 548 837 66 94 | 10:00-19:00
6. Magusa: see https://www.sharafstore.com/en/store-locator

=== TAX FREE ===
Page: https://www.sharafstore.com/en/tax-free
Foreign nationals can claim VAT refund. Show passport at purchase.
Upload approved invoice: https://www.sharafstore.com/en/onayli-belge-gonderimi

=== DELIVERY ===
KKTC only | Free over 10000 TL | 3-5 business days | 2 year warranty
Deals: https://www.sharafstore.com/en/firsat-kosesi
After-sales: https://www.sharafstore.com/en/our-services
Refund policy: https://www.sharafstore.com/en/geri-odeme-politikasi

=== YOUR JOB ===
Reply helpfully to customer questions about products, stores, delivery, tax free.
Reply ONLY in valid JSON:
{"reply":"1-2 sentences in user language","products":[],"chips":["chip1","chip2","chip3"]}
Rules: Never invent products. Mention Vergi Iadesi for products over 20000 TL. KKTC delivery only.`,
        messages: body.messages,
      }),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
