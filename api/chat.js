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

STORE INFO:
Website: https://sharafstore.com | WhatsApp: +90 533 850 8819 | Phone: +90 533 850 8820
6 stores in KKTC | 150+ brands | 3000+ products | Free delivery over 10000 TL | 2 year warranty

WHEN USER SENDS AN IMAGE:
- Identify what product is shown in the image
- Search the CATALOG MATCHES for similar or identical products
- Recommend the best matching products from catalog
- If no exact match, suggest closest alternatives

YOUR RESPONSE RULES - VERY IMPORTANT:
1. Respond with ONLY a raw JSON object - no markdown, no backticks, no code blocks
2. Start your response with { and end with }
3. Use EXACTLY these short field names: n, p, u, i, b
4. Only use products from CATALOG MATCHES

EXACT JSON FORMAT:
{"reply":"Your helpful reply here","products":[{"n":"product name","p":"price TL","u":"https://sharafstore.com/shop/...","i":"https://sharafstore.com/web/image/product.template/.../image_512","b":"brand"}],"chips":["chip1","chip2","chip3"]}

If no products found: {"reply":"Your reply","products":[],"chips":["chip1","chip2","chip3"]}`,
        messages: body.messages,
      }),
    });

    const data = await response.json();

    let raw = '';
    if (data && data.content) {
      data.content.forEach(b => { if (b.type === 'text') raw += b.text; });
    }

    // Strip markdown code blocks
    raw = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

    // Extract JSON object
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');
    if (start !== -1 && end !== -1) {
      raw = raw.substring(start, end + 1);
    }

    const cleanData = { ...data, content: [{ type: 'text', text: raw }] };

    return new Response(JSON.stringify(cleanData), {
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
