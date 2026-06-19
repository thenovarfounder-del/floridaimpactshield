export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const SB = 'https://ehjhsbrcbtqcvmgzjzkm.supabase.co';
  const SK = 'sb_secret_B9AG8VXwdsj5D5SK7Ebn6g_KRLgiHOZ';
  const H = { 'apikey': SK, 'Authorization': 'Bearer ' + SK };

  if (req.method === 'GET') {
    const r = await fetch(SB + '/rest/v1/fis_leads?order=created_at.desc&limit=500', { headers: H });
    const d = await r.json();
    return res.status(200).json(Array.isArray(d) ? d : []);
  }

  if (req.method === 'POST') {
    let b = {};
    try {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      b = JSON.parse(Buffer.concat(chunks).toString());
    } catch(e) {}
    await fetch(SB + '/rest/v1/fis_leads', {
      method: 'POST',
      headers: { ...H, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
      body: JSON.stringify({
        first_name: b.firstName || b.name || '',
        last_name: b.lastName || '',
        email: b.email || '',
        phone: b.phone || '',
        county: b.county || b.address || '',
        message: b.message || '',
        type: b.type || 'contact_form',
        status: 'new',
        source: b.source || 'website',
        page: b.page || '/'
      })
    });
    return res.status(200).json({ success: true });
  }
}
