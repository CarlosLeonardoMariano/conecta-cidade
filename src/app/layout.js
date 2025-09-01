// ✅ Importação das fontes
import { Inter, Roboto, Poppins, Montserrat, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import { ToastContainer } from 'react-toastify';


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const roboto = Roboto({ subsets: ['latin'], weight: ['100','200','400', '700'], variable: '--font-roboto' })
const poppins = Poppins({ subsets: ['latin'], weight: ['100','200','400', '600'], variable: '--font-poppins' })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-montserrat' })
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-source-serif-4',
});

// ✅ ISSO aqui é o correto para SEO e redes sociais
export const metadata = {
  title: {
    default: "Conecta Cidade Tudo que você precisa para se conectar",
    template: "%s | CONECTA CIDADE",
  },
  description: "Plataforma oficial para conectar sua cidade com serviços e comércios locais.",
  keywords: ["cidade", "comércio local", "serviços", "conecta", "app", "plataforma"],
  authors: [{ name: "Code in Life", url: "https://seusite.com" }],
  creator: "Code in Life",
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
  icons: {
    icon: "/logo3.png",
  },
};

// ✅ ISSO aqui é somente para configurações da viewport e themeColor
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body
        className={`${inter.variable} ${roboto.variable} ${poppins.variable} ${montserrat.variable} ${sourceSerif.variable} antialiased`}
      >
        {children}
          <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
