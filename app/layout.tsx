import "styles/tailwind.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Steganografi",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
