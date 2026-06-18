export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const SUPABASE_URL = process.env.SUPABASE_URL || 'https://ehjhsbrcbtqcvmgzjzkm.supabase.co';
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || 'sb_secret_B9AG8VXwdsj5D5SK7Ebn6g_KRLgiHOZ';

  try {
    // Pull from fis_leads table
    let fisLeads = [];
    try {
      const r1 = await fetch(SUPABASE_URL + '/rest/v1/fis_leads?order=created_at.desc&limit=500', {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
      });
      const d1 = await r1.json();
      if (Array.isArray(d1)) fisLeads = d1.map(l => ({
        name: (l.first_name || '') + ' ' + (l.last_name || ''),
        email: l.email || '',
        phone: l.phone || '',
        county: l.county || '',
        message: l.message || '',
        source: l.page || l.type || 'contact-form',
        created_at: l.created_at
      }));
    } catch(e) {}

    // Pull from contact_submissions table
    let contactLeads = [];
    try {
      const r2 = await fetch(SUPABASE_URL + '/rest/v1/contact_submissions?order=created_at.desc&limit=500', {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
      });
      const d2 = await r2.json();
      if (Array.isArray(d2)) contactLeads = d2.map(l => ({
        name: l.name || '',
        email: l.email || '',
        phone: l.phone || '',
        county: '',
        message: l.message || '',
        address: l.address || '',
        source: l.source || 'grant-page',
        created_at: l.created_at
      }));
    } catch(e) {}

    // Combine and sort by date newest first
    const all = [...fisLeads, ...contactLeads].sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
    return res.status(200).json(all);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}