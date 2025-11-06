import { NextResponse } from "next/server";
import { sendTextMessage } from "../../../lib/whatsapp";

// GET: Webhook verification for WhatsApp Cloud API
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token && challenge) {
    if (token === process.env.VERIFY_TOKEN) {
      return new Response(challenge, { status: 200 });
    }
    return new Response("Invalid verify token", { status: 403 });
  }

  return new Response("Bad request", { status: 400 });
}

// POST: Handle incoming messages
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic guard for WhatsApp webhook shape
    const changes = body?.entry?.[0]?.changes?.[0];
    const value = changes?.value;
    const messages = value?.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ ok: true });
    }

    const msg = messages[0];
    const from = msg.from as string | undefined; // WhatsApp ID (phone)
    const textBody: string = (msg.text?.body || msg.button?.text || msg.interactive?.list_reply?.title || "").trim();

    if (!from) {
      return NextResponse.json({ ok: true });
    }

    const reply = buildReply(textBody);

    // Fire-and-forget send; do not block webhook response
    sendTextMessage(from, reply).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

function buildReply(input: string): string {
  const lower = input.toLowerCase();

  if (!input) {
    return greeting();
  }

  if (/(hi|hello|hey|menu|start|help)\b/.test(lower)) {
    return greeting();
  }

  if (/quote|price|cost|estimate/.test(lower)) {
    return (
      "Great! To prepare a quote, please reply with:\n\n" +
      "1) Video length (in seconds)\n" +
      "2) Source footage links (Drive/Dropbox)\n" +
      "3) Style (e.g., vlog, promo, reels)\n" +
      "4) Deadline (date/time)\n" +
      "5) Notes (music, captions, brand)\n\n" +
      "I?ll send an estimate once I have these details."
    );
  }

  if (/upload|send file|files/.test(lower)) {
    return (
      "You can upload your footage to Drive/Dropbox and reply with the link.\n" +
      "If you prefer, ask for a secure upload link and I?ll provide options."
    );
  }

  if (/status|progress|update/.test(lower)) {
    return (
      "Status checks: reply with your project email or reference.\n" +
      "I?ll look it up and share the latest progress."
    );
  }

  if (/rev(ision|ise|amp)/.test(lower)) {
    return (
      "Revisions are welcome! Please list your change requests with timestamps.\n" +
      "I?ll confirm scope and turnaround."
    );
  }

  if (/deadline|turnaround|eta/.test(lower)) {
    return (
      "Typical turnaround: 24?72 hours depending on scope and queue.\n" +
      "Share your deadline and I?ll confirm availability."
    );
  }

  // Default fallback
  return (
    "Got it! Here?s what I can help with:\n\n" +
    "1) Quote ? type: quote\n" +
    "2) Upload ? type: upload\n" +
    "3) Status ? type: status\n" +
    "4) Revisions ? type: revisions\n\n" +
    "Or say ?menu? to see options again."
  );
}

function greeting() {
  return (
    "?? Hi! I?m your Video Editing Assistant on WhatsApp.\n\n" +
    "I can help you with:\n" +
    "? Getting a quote (type: quote)\n" +
    "? Sharing files (type: upload)\n" +
    "? Project status (type: status)\n" +
    "? Revisions (type: revisions)\n\n" +
    "Ask about pricing, turnaround, captions, reels, and more."
  );
}
