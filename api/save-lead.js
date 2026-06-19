export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const SB = 'https://ehjhsbrcbtqcvmgzjzkm.supabase.co';
  const SK = 'sb_secret_B9AG8VXwdsj5D5SK7Ebn6g_KRLgiHOZ';

  try {
    const body = req.body || {};
    const r = await fetch(SB + '/rest/v1/contact_submissions', {
      method: 'POST',
      headers: {
        'apikey': SK,
        'Authorization': 'Bearer ' + SK,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        name: body.name || '',
        phone: body.phone || '',
        email: body.email || '',
        address: body.address || '',
        message: body.message || '',
        source: body.source || 'website',
        created_at: new Date().toISOString()
      })
    });
    console.log('Supabase response:', r.status);
    return res.status(200).json({ success: true, status: r.status });
  } catch(e) {
    console.log('Error:', e.message);
    return res.status(500).json({ error: e.message });
  }
}