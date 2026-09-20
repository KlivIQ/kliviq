import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3'

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_mail/gmail/v1'

const BodySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  mobile: z.string().trim().min(6).max(25),
  services: z.array(z.string().trim().min(1).max(120)).min(1).max(10),
  message: z.string().trim().max(2000).optional().default(''),
  source: z.string().trim().max(60).optional().default('website'),
})

const b64 = (s: string) =>
  btoa(Array.from(new TextEncoder().encode(s), (b) => String.fromCharCode(b)).join(''))
const b64url = (s: string) => b64(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
const header = (v: string) => (/^[\x00-\x7F]*$/.test(v) ? v : `=?UTF-8?B?${b64(v)}?=`)
const esc = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function buildRawEmail(opts: { to: string; subject: string; replyTo?: string; html: string }): string {
  const lines = [
    'From: KlivIQ <hello@kliviq.com>',
    `To: ${opts.to}`,
    `Subject: ${header(opts.subject)}`,
    ...(opts.replyTo ? [`Reply-To: ${opts.replyTo}`] : []),
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset="UTF-8"',
    '',
    opts.html,
  ]
  return b64url(lines.join('\r\n'))
}

async function sendEmail(raw: string): Promise<{ ok: boolean; status: number; body: string }> {
  const res = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
      'X-Connection-Api-Key': Deno.env.get('GOOGLE_MAIL_API_KEY') ?? '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw }),
  })
  const body = await res.text()
  return { ok: res.ok, status: res.status, body }
}

const row = (label: string, value: string) =>
  `<tr><td style="padding:8px 12px;color:#888;font-size:13px;vertical-align:top;white-space:nowrap;">${label}</td><td style="padding:8px 12px;font-size:14px;color:#111;">${value}</td></tr>`

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const jsonHeaders = { ...corsHeaders, 'Content-Type': 'application/json' }

  let parsed: z.infer<typeof BodySchema>
  try {
    const result = BodySchema.safeParse(await req.json())
    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error.flatten().fieldErrors }), { status: 400, headers: jsonHeaders })
    }
    parsed = result.data
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400, headers: jsonHeaders })
  }

  const { name, email, mobile, services, message, source } = parsed
  const safeName = esc(name)
  const safeEmail = esc(email)

  // 1) Enquiry email to KlivIQ
  const enquiryHtml = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">
    <div style="background:#0a0a0f;padding:20px 24px;">
      <span style="color:#34d399;font-size:18px;font-weight:bold;">KlivIQ</span>
      <span style="color:#ccc;font-size:14px;"> — New Consultation Enquiry</span>
    </div>
    <div style="padding:8px 12px 16px;">
      <table style="border-collapse:collapse;width:100%;">
        ${row('Name', safeName)}
        ${row('Email', `<a href="mailto:${safeEmail}" style="color:#0d9488;">${safeEmail}</a>`)}
        ${row('Mobile', esc(mobile))}
        ${row('Services', services.map(esc).join(', '))}
        ${row('Source', esc(source))}
        ${row('Message', esc(message) || '<em style="color:#999;">—</em>')}
      </table>
    </div>
    <div style="padding:12px 24px;background:#f7f7f7;font-size:12px;color:#999;">Replying to this email goes directly to the visitor.</div>
  </div>`

  // 2) Confirmation email to the visitor
  const confirmHtml = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">
    <div style="background:#0a0a0f;padding:20px 24px;">
      <span style="color:#34d399;font-size:18px;font-weight:bold;">KlivIQ</span>
    </div>
    <div style="padding:24px;">
      <p style="font-size:15px;color:#111;margin:0 0 12px;">Hi ${safeName},</p>
      <p style="font-size:14px;color:#333;line-height:1.6;margin:0 0 12px;">
        Thanks for reaching out! Your consultation enquiry has been received. We will get back to you within <strong>24 business hours</strong>.
      </p>
      <p style="font-size:14px;color:#333;line-height:1.6;margin:0 0 4px;"><strong>Your selected services:</strong></p>
      <p style="font-size:14px;color:#333;margin:0 0 16px;">${services.map(esc).join(', ')}</p>
      <p style="font-size:14px;color:#333;line-height:1.6;margin:0;">
        Meanwhile, feel free to explore <a href="https://kliviq.com" style="color:#0d9488;">kliviq.com</a>.
      </p>
      <p style="font-size:14px;color:#333;margin:16px 0 0;">— Team KlivIQ<br/><span style="color:#888;font-size:13px;">hello@kliviq.com</span></p>
    </div>
  </div>`

  const enquiry = await sendEmail(
    buildRawEmail({
      to: 'hello@kliviq.com',
      subject: `New Consultation Enquiry — ${name}`,
      replyTo: `${name} <${email}>`,
      html: enquiryHtml,
    }),
  )
  if (!enquiry.ok) {
    console.error(`Enquiry email failed [${enquiry.status}]: ${enquiry.body}`)
    return new Response(
      JSON.stringify({ error: 'Provider request failed', status: enquiry.status, details: enquiry.body }),
      { status: enquiry.status, headers: jsonHeaders },
    )
  }

  const confirm = await sendEmail(
    buildRawEmail({
      to: email,
      subject: 'We received your enquiry — KlivIQ',
      html: confirmHtml,
    }),
  )
  if (!confirm.ok) {
    // Enquiry already delivered — log but don't fail the visitor's request
    console.error(`Confirmation email failed [${confirm.status}]: ${confirm.body}`)
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: jsonHeaders })
})
