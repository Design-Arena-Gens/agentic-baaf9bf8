import type { ReactNode } from "react";

export const metadata = {
  title: "Video Editing WhatsApp Bot",
  description: "WhatsApp chatbot for video editing services",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, \"Apple Color Emoji\", \"Segoe UI Emoji\"",
          background: "#0b0f17",
          color: "#e5e7eb",
        }}
      >
        {children}
      </body>
    </html>
  );
}
