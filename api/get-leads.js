export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const URL = 'https://ehjhsbrcbtqcvmgzjzkm.supabase.co';
  const KEY = 'sb_secret_B9AG8VXwdsj5D5SK7Ebn6g_KRLgiHOZ';
  const H = { 'apikey': KEY, 'Authorization': 'Bearer ' + KEY };

  let fisLeads = [];
  let grantLeads = [];

  try {
    const r1 = await fetch(URL + '/rest/v1/fis_leads?order=created_at.desc&limit=500', { headers: H });
    const d1 = await r1.json();
    if (Array.isArray(d1)) {
      fisLeads = d1.map(l => ({
        name: ((l.first_name||'') + ' ' + (l.last_name||'')).trim(),
        email: l.email||'',
        phone: l.phone||'',
        address: '',
        message: l.message||'',
        source: l.page||l.type||'contact-form',
        created_at: l.created_at
      }));
    }
  } catch(e) {}

  try {
    const r2 = await fetch(URL + '/rest/v1/contact_submissions?order=created_at.desc&limit=500', { headers: H });
    const d2 = await r2.json();
    if (Array.isArray(d2)) {
      grantLeads = d2.map(l => ({
        name: l.name||'',
        email: l.email||'',
        phone: l.phone||'',
        address: l.address||'',
        message: l.message||'',
        source: l.source||'grant-page',
        created_at: l.created_at
      }));
    }
  } catch(e) {}

  const all = [...fisLeads, ...grantLeads]
    .sort((a,b) => new Date(b.created_at) - new Date(a.created_at));

  return res.status(200).json({ total: all.length, fis: fisLeads.length, grant: grantLeads.length, leads: all });
}