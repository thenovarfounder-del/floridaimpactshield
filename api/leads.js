export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const SB = 'https://ehjhsbrcbtqcvmgzjzkm.supabase.co';
  const SK = 'sb_secret_B9AG8VXwdsj5D5SK7Ebn6g_KRLgiHOZ';
  const H = { 'apikey': SK, 'Authorization': 'Bearer ' + SK, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' };

  if (req.method === 'GET') {
    try {
      const r1 = await fetch(SB + '/rest/v1/fis_leads?order=created_at.desc&limit=500', { headers: { 'apikey': SK, 'Authorization': 'Bearer ' + SK } });
      const d1 = await r1.json();
      return res.status(200).json(Array.isArray(d1) ? d1 : []);
    } catch(e) { return res.status(500).json({ error: e.message }); }
  }

  if (req.method === 'POST') {
    try {
      const b = req.body || {};
      await fetch(SB + '/rest/v1/fis_leads', {
        method: 'POST',
        headers: H,
        body: JSON.stringify({
          first_name: b.firstName || b.name || '',
          last_name: b.lastName || '',
          email: b.email || '',
          phone: b.phone || '',
          county: b.county || b.address || '',
          message: b.message || b.notes || '',
          type: b.type || 'contact_form',
          status: 'new',
          source: b.source || 'website',
          page: b.page || '/'
        })
      });
      return res.status(200).json({ success: true });
    } catch(e) { return res.status(500).json({ error: e.message }); }
  }
}