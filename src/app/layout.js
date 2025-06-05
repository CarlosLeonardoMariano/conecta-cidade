import { Inter, Roboto, Poppins, Montserrat } from 'next/font/google'
import './globals.css'


// Configuração de cada fonte
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-roboto' })
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-poppins' })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-montserrat' })


export const metadata = {
  title: {
    default: "CONECTA CIDADE",
    template: "%s | CONECTA CIDADE",
  },
  description: "Plataforma oficial para conectar sua cidade com serviços e comércios locais.",
  keywords: ["cidade", "comércio local", "serviços", "conecta", "app", "plataforma"],
  authors: [{ name: "Code in Life", url: "https://seusite.com" }],
  creator: "Code in Life",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  openGraph: {
    title: "CONECTA CIDADE - Plataforma Oficial",
    
    description: "Conecte-se com os melhores serviços e comércios da sua cidade.",
    url: "https://seusite.com",
    siteName: "CONECTA CIDADE",
    images: [
      {
        url: "https://seusite.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CONECTA CIDADE",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    nocache: true,
  },

   // ✅ Adicione esta linha:
  icons: {
    icon: "/WhatsApp Image 2025-06-03 at 21.57.13.jpeg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.variable} ${roboto.variable} ${poppins.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
