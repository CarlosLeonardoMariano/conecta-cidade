"use client"
import Image from "next/image";
import SeletorDeCidade from "@/components/seletorDeCidades";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";





function scrollSmoth() {
  const scroll = document.getElementById("sobre");
  if (scroll) {
    scroll.scrollIntoView({ behavior: "smooth" });
  }
}


function scroolRodape() {
  const scroll = document.getElementById("rodape")
  if (scroll) {
    scroll.scrollIntoView({ behavior:"smooth"})
    }
}




export default function Home() {
  const router = useRouter();

    const [menuOpen, setMenuOpen] = useState(false);
      const [cidadeSelecionada, setCidadeSelecionada] = useState("");



function handleBuscar() {
  if (!cidadeSelecionada) {
      alert("Escolha a cidade que você deseja buscar");
  }

  router.push('/comercios');
}



  return (
    <main>
      {/* Botão fixo */}
    
           <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setMenuOpen(true)}
          className="flex flex-col gap-[6px] w-10 h-10 justify-center items-center group"
        >
          <span className="w-8 h-[3px] bg-white rounded transition-all group-hover:w-9"></span>
          <span className="w-8 h-[3px] bg-white rounded transition-all group-hover:w-9"></span>
          <span className="w-8 h-[3px] bg-white rounded transition-all group-hover:w-9"></span>
        </button>
      </div>

   <AnimatePresence>
  {menuOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white backdrop-blur-sm z-50 flex items-center justify-center "
      onClick={() => setMenuOpen(false)}
    >
      <motion.div
        initial={{ y: -100, x: 200, opacity: 0 }}
        animate={{ y: 0, x: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white text-black 
          w-full h-full
          md:w-3/5 md:h-4/5
          max-w-none max-h-none
          rounded-none md:rounded-3xl
          p-6 sm:p-10
          relative
          overflow-y-auto
          shadow-2xl
          flex flex-col
        "
      >
        {/* Botão de fechar */}
        <button
          onClick={() => setMenuOpen(false)}
          className="
            absolute top-6 right-6
            text-3xl text-gray-600 hover:text-red-600 font-extrabold
            md:top-8 md:right-8
            z-50
          "
          aria-label="Fechar menu"
        >
          ✕
        </button>

        {/* Conteúdo */}
        <div className="text-center flex-grow overflow-auto">
          <h2 className="text-4xl font-bold mb-3">Bem-vindo ao Conecta Cidade</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Acesse rapidamente nossas seções e descubra como conectamos você ao melhor da sua cidade.
          </p>

          {/* Navegação */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 text-lg font-medium mb-10 justify-items-center max-w-full mx-auto">
            <a href="#sobre" onClick={() => setMenuOpen(false)} className="hover:underline">🧭 Sobre</a>
            <a href="#vantagens" onClick={() => setMenuOpen(false)} className="hover:underline">⚡ Vantagens</a>
            <a href="#sobreComercio" onClick={() => setMenuOpen(false)} className="hover:underline">🛠 Serviços</a>
            <a href="#sobre" onClick={() => setMenuOpen(false)} className="hover:underline">🏪 Comerciantes</a>
            <a href="#faq" onClick={() => setMenuOpen(false)} className="hover:underline">❓ FAQ</a>
            <a href="#rodape" onClick={() => setMenuOpen(false)} className="hover:underline">📞 Contato</a>
          </div>

       




          {/* Redes sociais */}
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook className="w-7 h-7 text-blue-600 hover:scale-110 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="w-7 h-7 text-pink-500 hover:scale-110 transition" />
            </a>
            <a href="https://wa.me/seunumero" target="_blank" rel="noreferrer">
              <FaWhatsapp className="w-7 h-7 text-green-500 hover:scale-110 transition" />
            </a>
          </div>

          {/* Rodapé */}
          <p className="text-sm text-gray-400">
            © 2025 Conecta Cidade. Todos os direitos reservados.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>





        
      {/* HERO */}
      <header className="relative flex flex-col items-center justify-center gap-4 p-4 w-full h-[800px] bg-home bg-cover bg-center text-white">
        <div className="absolute inset-0 bg-black/70 z-0" />
        <div className="relative z-10 text-center">

          <motion.h1 initial={{y:-200, x:-200, opacity:0}}
                      whileInView={{y:0, x:0,  opacity:1}} 
                      transition={{duration:1, ease: "easeInOut"}}
                       viewport={{ once: false }}
          className="text-6xl font-montserrat font-bold uppercase tracking-wider">
            Conecta Cidade
          </motion.h1>




          <motion.p 
          initial={{x:-300, opacity:0}}
          whileInView={{x:0, opacity:1}}
          transition={{duration:1, ease: "easeIn"}}
            viewport={{ once: false }}
          
          className="text-lg font-poppins mt-4 max-w-xl mx-auto text-gray-200">
            Facilitando o acesso da população aos serviços e oportunidades da sua cidade.
          </motion.p>
          <button onClick={scrollSmoth}>
            <div className="mt-12 flex justify-center">
              <svg
                className="w-12 h-12 animate-bounce text-gray-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
        </div>
      </header>

      {/* SOBRE */}
      <motion.section  initial={{x:-300, opacity:0}}
          whileInView={{x:0, opacity:1}}
          transition={{duration:1, ease: "easeIn"}}
            viewport={{ once: false }}
          
          className="w-full h-full flex items-center justify-center pt-5 bg-[#f7f7f7] flex-col gap-4" id="sobre">
        <Image
          src="/logo3.png"
          alt="Logo da plataforma Conecta Cidade"
          width={300}
          height={200}
          className="cursor-pointer"
        />
        <div className="text-center px-4 max-w-3xl">
          <h1 className="text-slate-900 text-4xl sm:text-5xl font-roboto font-bold leading-tight">
            Explore as melhores lojas da sua região
          </h1>
          <p className="mt-4 text-lg text-slate-700 pb-8">
            Encontre os serviços de delivery e comércios mais bem avaliados da sua cidade.
          </p>
        </div>
        <div className="w-full min-h-[400px] flex flex-col items-center gap-20">
          <SeletorDeCidade 
          cidadeSelecionada={cidadeSelecionada}
          setCidadeSelecionada={setCidadeSelecionada}/>


          <button className={`text-center font-roboto bg-black text-white px-6 py-4 rounded-full 
          ${ !cidadeSelecionada ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800" } `} onClick={handleBuscar} disabled={!cidadeSelecionada}>
            Buscar comércios
          </button>
        </div>


      </motion.section>

      {/* VANTAGENS */}
      <section className="w-full py-16 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2 initial={{x:-300, opacity:0}}
          whileInView={{x:0, opacity:1}}
          transition={{duration:1, ease: "easeIn"}}
            viewport={{ once: false }} 
            
            className="text-3xl sm:text-4xl font-bold font-montserrat text-white mb-4" id="sobreComercio">
            Por que usar o Conecta Cidade?
          </motion.h2>
          <div className="h-1 w-24 bg-white mx-auto rounded-full mb-12 animate-pulse" />

          <motion.div initial={{y:0, opacity:0}}
          whileInView={{x:0, opacity:1}}
          transition={{duration:1, ease: "easeIn"}}
            viewport={{ once: false }}

           className="grid grid-cols-1 sm:grid-cols-3 gap-16">
            {[
              { icon: "📍", title: "Descubra comércios locais", text: "Encontre opções próximas com avaliações reais da sua cidade." },
              { icon: "⚡", title: "Economize tempo", text: "Veja os melhores serviços rapidamente com poucos cliques." },
              { icon: "💬", title: "Contato direto", text: "Fale diretamente com lojas via WhatsApp ou telefone." },
              { icon: "🛒", title: "Compre com facilidade", text: "Navegue por lojas e faça pedidos direto da plataforma, sem complicações." },
              { icon: "🌟", title: "Avaliações reais", text: "Veja comentários de outros usuários e escolha com confiança." },
              { icon: "🔒", title: "Segurança garantida", text: "Seus dados e interações protegidos com criptografia e segurança de ponta." }

            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-300 mt-2 text-sm">{item.text}</p>

              </div>
            ))}

          </motion.div>
        </div>

                                
                          {/* Para Comerciantes */}
                          <div className="mt-20 max-w-6xl mx-auto px-4 text-center">
                            <motion.h2
                              initial={{ x: -300, opacity: 0 }}
                              whileInView={{ x: 0, opacity: 1 }}
                              transition={{ duration: 1, ease: "easeIn" }}
                              viewport={{ once: false }}
                              className="text-3xl sm:text-4xl font-bold font-montserrat text-white mb-4"
                            >
                      "Potencialize suas vendas com o Conecta Cidade"
                            </motion.h2>
                            <div className="h-1 w-24 bg-white mx-auto rounded-full mb-12 animate-pulse" />

                            <motion.div
                              initial={{ y: 100, opacity: 0 }}
                              whileInView={{ y: 0, opacity: 1 }}
                              transition={{ duration: 1, ease: "easeInOut" }}
                              viewport={{ once: false }}
                              className="grid grid-cols-1 sm:grid-cols-3 gap-16"
                            >
                              {[
                                { icon: "💼", title: "Ganhe visibilidade", text: "Apareça para moradores da sua cidade e aumente sua clientela." },
                                { icon: "📊", title: "Painel de controle", text: "Gerencie pedidos, produtos e promoções em tempo real." },
                                { icon: "💬", title: "Fale com clientes", text: "Receba pedidos e mensagens diretamente pelo WhatsApp." },
                                { icon: "🎯", title: "Marketing local", text: "Divulgue sua loja de forma direcionada para seu público." },
                                { icon: "💸", title: "Mais vendas", text: "Transforme visitantes em clientes com poucos cliques." },
                                { icon: "🔧", title: "Fácil de usar", text: "Não precisa de conhecimentos técnicos para cadastrar sua loja." }
                              ].map((item, index) => (
                                <div key={index} className="flex flex-col items-center text-center">
                                  <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl mb-4">
                                    {item.icon}
                                  </div>
                                  <h3 className="text-lg font-semibold">{item.title}</h3>
                                  <p className="text-gray-300 mt-2 text-sm">{item.text}</p>
                                </div>
                              ))}
                            </motion.div>
                          </div>
                        {/* Fim Para Comerciantes */}
   

                 <div className="mt-12 flex justify-center">
                    <button onClick={scroolRodape} className="animate-bounce">
                      <svg
                        className="w-12 h-12 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
            </div>

                          
        
      </section>

      {/* RODAPÉ */}
      <footer className="bg-white py-8 text-black text-center">
        <div className="flex justify-center gap-6 mb-4">

          <motion.a  initial={{y:-100, opacity:0}}
          whileInView={{y:0, opacity:1}}
          transition={{duration:0.3, ease: "easeIn"}}
            viewport={{ once: false }}
            
            href="https://facebook.com" target="_blank" rel="noopener noreferrer ">
            <FaFacebook className="w-8 h-8 text-blue-500 hover:text-blue-500 transition  animate-bounce" /> 
          </motion.a>


          <motion.a initial={{y:-100, opacity:0}}
          whileInView={{y:0, opacity:1}}
          transition={{duration:1, ease: "easeIn"}}
            viewport={{ once: false }}

            href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="w-8 h-8 text-pink-500  hover:text-pink-500 transition  animate-bounce " />
          </motion.a>


          <motion.a initial={{y:-100, opacity:0}}
          whileInView={{y:0, opacity:1}}
          transition={{duration:1.5, ease: "easeIn"}}
            viewport={{ once: false }}
            
            href="https://wa.me/seunumero" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="w-8 h-8 text-green-500 hover:text-green-500 transition animate-bounce" />
          </motion.a>
        </div>
        <p className="text-sm text-gray-400" id="rodape">
          © 2025 Conecta Cidade. Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
}
