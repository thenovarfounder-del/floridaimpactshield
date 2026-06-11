export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const {
      firstName, lastName, email, phone,
      county, message, annualPremium, windowCount,
      type, status, source, page, conversationLength
    } = req.body;

    if (!email) return res.status(400).json({ error: 'Email required' });

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

    // Save to Supabase
    const dbRes = await fetch(SUPABASE_URL + '/rest/v1/fis_leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        first_name: firstName || '',
        last_name: lastName || '',
        email: email,
        phone: phone || '',
        county: county || '',
        message: message || '',
        annual_premium: annualPremium || '',
        window_count: windowCount || '',
        type: type || 'contact_form',
        status: status || 'new',
        source: source || 'Website',
        page: page || '/',
        conversation_length: conversationLength || 0
      })
    });

    if (!dbRes.ok) {
      const err = await dbRes.text();
      console.error('Supabase error:', err);
    }

    // Send email notification via Resend
    const RESEND_KEY = process.env.RESEND_API_KEY;
    if (RESEND_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + RESEND_KEY
        },
        body: JSON.stringify({
          from: 'Florida Impact Shield <onboarding@resend.dev>',
          to: ['randylevine961@gmail.com'],
          subject: '🔥 New Lead — Florida Impact Shield — ' + (firstName || '') + ' ' + (lastName || ''),
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a1628;color:#f0f7ff;padding:32px;border-radius:12px;">
              <h2 style="color:#0ea5e9;margin-bottom:24px;">New Lead from Florida Impact Shield</h2>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:#94a3b8;">Name</td><td style="padding:8px 0;color:#f0f7ff;font-weight:600;">${firstName || ''} ${lastName || ''}</td></tr>
                <tr><td style="padding:8px 0;color:#94a3b8;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#38bdf8;">${email}</a></td></tr>
                <tr><td style="padding:8px 0;color:#94a3b8;">Phone</td><td style="padding:8px 0;"><a href="tel:${phone}" style="color:#38bdf8;">${phone || 'Not provided'}</a></td></tr>
                <tr><td style="padding:8px 0;color:#94a3b8;">County</td><td style="padding:8px 0;color:#f0f7ff;">${county || 'Not provided'}</td></tr>
                <tr><td style="padding:8px 0;color:#94a3b8;">Type</td><td style="padding:8px 0;color:#f59e0b;font-weight:600;">${type || 'contact_form'}</td></tr>
                <tr><td style="padding:8px 0;color:#94a3b8;">Message</td><td style="padding:8px 0;color:#f0f7ff;">${message || 'No message'}</td></tr>
                <tr><td style="padding:8px 0;color:#94a3b8;">Source</td><td style="padding:8px 0;color:#f0f7ff;">${source || 'Website'}</td></tr>
              </table>
              <div style="margin-top:24px;padding:16px;background:rgba(14,165,233,0.1);border-radius:8px;border-left:3px solid #0ea5e9;">
                <p style="margin:0;color:#38bdf8;font-weight:600;">Call them now: ${phone || 'No phone provided'}</p>
              </div>
              <p style="margin-top:24px;font-size:12px;color:#64748b;">Florida Impact Shield &copy; 2026 &middot; floridaimpactshield.com</p>
            </div>
          `
        })
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Lead API error:', err);
    return res.status(500).json({ error: err.message });
  }
}