export default function Page() {
  return (
    <main style={{ padding: "48px 24px", maxWidth: 900, margin: "0 auto" }}>
      <section style={{ textAlign: "center", marginBottom: 48 }}>
        <h1 style={{ fontSize: 36, lineHeight: 1.2, margin: 0 }}>WhatsApp Chatbot for Video Editing Service</h1>
        <p style={{ opacity: 0.85, marginTop: 12 }}>
          Automated WhatsApp assistant to capture requirements, share quotes, and guide uploads.
        </p>
      </section>

      <section style={{ background: "#111827", padding: 24, borderRadius: 12, border: "1px solid #1f2937" }}>
        <h2 style={{ marginTop: 0 }}>How it works</h2>
        <ol style={{ lineHeight: 1.7 }}>
          <li>Point your WhatsApp webhook to <code>/api/whatsapp</code>.</li>
          <li>Set env vars: <code>VERIFY_TOKEN</code>, <code>WHATSAPP_TOKEN</code>, <code>WHATSAPP_PHONE_NUMBER_ID</code>.</li>
          <li>Incoming messages get an automated menu and guided prompts.</li>
          <li>Responses are sent via WhatsApp Cloud API.</li>
        </ol>
        <p style={{ opacity: 0.8 }}>Use Meta&apos;s WhatsApp Cloud API or a provider that forwards the standard payload.</p>
      </section>

      <section style={{ marginTop: 28, display: "flex", gap: 12 }}>
        <a href="/api/health" style={{ padding: "10px 14px", borderRadius: 8, background: "#10b981", color: "black", textDecoration: "none", fontWeight: 600 }}>Health Check</a>
        <a href="https://developers.facebook.com/docs/whatsapp/cloud-api" target="_blank" rel="noreferrer" style={{ padding: "10px 14px", borderRadius: 8, background: "#3b82f6", color: "white", textDecoration: "none", fontWeight: 600 }}>Cloud API Docs</a>
      </section>
    </main>
  );
}
