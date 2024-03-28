import "styles/tailwind.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Steganografi",

  openGraph: {
    images: [
      {
        width: 1200,
        height: 630,
        url: "../public/steganograpgy.png",
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
