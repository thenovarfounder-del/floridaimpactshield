export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const URL = process.env.SUPABASE_URL;
  const KEY = process.env.SUPABASE_SERVICE_KEY;
  const headers = { 'apikey': KEY, 'Authorization': 'Bearer ' + KEY };

  try {
    // Pull fis_leads
    let fisLeads = [];
    try {
      const r1 = await fetch(URL + '/rest/v1/fis_leads?order=created_at.desc&limit=500', { headers });
      const d1 = await r1.json();
      if (Array.isArray(d1)) {
        fisLeads = d1.map(l => ({
          name: ((l.first_name||'') + ' ' + (l.last_name||'')).trim(),
          email: l.email||'',
          phone: l.phone||'',
          county: l.county||'',
          address: '',
          message: l.message||'',
          source: l.page||l.type||'contact-form',
          created_at: l.created_at
        }));
      }
    } catch(e) { console.log('fis_leads error:', e.message); }

    // Pull contact_submissions
    let contactLeads = [];
    try {
      const r2 = await fetch(URL + '/rest/v1/contact_submissions?order=created_at.desc&limit=500', { headers });
      const d2 = await r2.json();
      if (Array.isArray(d2)) {
        contactLeads = d2.map(l => ({
          name: l.name||'',
          email: l.email||'',
          phone: l.phone||'',
          county: '',
          address: l.address||'',
          message: l.message||'',
          source: l.source||'grant-page',
          created_at: l.created_at
        }));
      }
    } catch(e) { console.log('contact_submissions error:', e.message); }

    // Combine sorted newest first
    const all = [...fisLeads, ...contactLeads]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return res.status(200).json(all);
  } catch(err) {
    return res.status(500).json({ error: err.message });
  }
}