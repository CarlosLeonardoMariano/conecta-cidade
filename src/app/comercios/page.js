"use client";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import Link from "next/link";
import Image from "next/image";
import { Clock, DollarSign } from "lucide-react";



export default function Comercios() {
  const [comercios, setComercios] = useState([]);
  const [filtro, setFiltro] = useState(""); // Filtro de categoria
    const [busca, setBusca] = useState("");  // Estado da barra de pesquisa


  useEffect(() => {
    async function fetchData() {
      const response = await api.get("/publico");
      setComercios(response.data);
    }
    fetchData();
  }, []);


// Função de filtragem
const comerciosFiltrados = comercios.filter((item) => {

  // Filtro por categoria
  let categoriaOK = true;
  if (filtro) {
    if (filtro === "Comidas") categoriaOK = item.tipo === "Comidas";
    else if (filtro === "Mecânicos") categoriaOK = item.tipo === "Mecânicos";
    else if (filtro === "Moda e Estilo") categoriaOK = item.tipo === "Moda e Estilo";
    else if (filtro === "Veiculos") categoriaOK = item.tipo === "Veiculos";
    else if (filtro === "Games") categoriaOK = item.tipo === "Games";
    else if (filtro === "Celulares e acessorios") categoriaOK = item.tipo === "Celulares e acessorios";
    else categoriaOK = item.tipo === filtro;
  }

  // Filtro por nome (busca) na barra de pesquisa
  let pesquisa = item.nome.toLowerCase().includes(busca.toLowerCase())
  return categoriaOK && pesquisa;
});


  return (
    <>
      {/* HEADER */}
      <header className="bg-black w-full shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo + nome */}
          <div className="flex items-center space-x-2">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-white font-bold text-lg select-none cursor-pointer">
              <Image src="/logo3.png" width={200} height={150} alt="logo" />
            </div>
            <Link href="/">
              <span className="text-white text-xl font-semibold tracking-wide select-none">
                Conecta Cidade
              </span>
            </Link>
          </div>
          {/* Navegação */}
          <nav className="hidden md:flex space-x-6">
            <a href="#sobre" className="text-gray-300 hover:text-white transition font-medium">
              Sobre
            </a>
            <a href="#vantagens" className="text-gray-300 hover:text-white transition font-medium">
              Vantagens
            </a>
            <a href="#servicos" className="text-gray-300 hover:text-white transition font-medium">
              Serviços
            </a>
            <a href="#comerciantes" className="text-gray-300 hover:text-white transition font-medium">
              Comerciantes
            </a>
            <a href="#contato" className="text-gray-300 hover:text-white transition font-medium">
              Contato
            </a>
          </nav>
          {/* Botões login/cadastro */}
          <div className="hidden md:flex space-x-3">
            <button className="text-gray-300 hover:text-white font-semibold px-3 py-1.5 rounded-md transition">
              Entrar
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-md transition">
              Cadastrar
            </button>
          </div>
          {/* Botão mobile */}
          <div className="md:hidden">
            <button aria-label="Abrir menu" className="text-white focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        {/* Título + seta indicadora */}
        <div className="max-w-3xl mx-auto text-center py-8 px-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-white leading-snug">
            Procure os melhores <span className="font-bold">comércios</span> da cidade
          </h1>
          <button
            aria-label="Role para baixo"
            className="mt-8 animate-bounce inline-flex items-center justify-center  text-white shadow-md w-12 h-12 mx-auto transition "
          >
            <svg
              className="w-5 h-5"
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
      </header>

      {/* BARRA DE PESQUISA */}
      <section className="max-w-5xl mx-auto px-6 mt-6">
        <div className="relative">
          <input
            type="search"
            placeholder="Pesquisar comércios, serviços, produtos..."
            className="w-full py-4 pl-12 pr-4 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition text-gray-900"
            aria-label="Pesquisar comércios"
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="max-w-[86rem] mx-auto px-6 mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 uppercase text-center">Categorias</h2>
        <div className="flex space-x-6 overflow-x-auto no-scrollbar pb-2">

          {/* Card TODOS */}
          <div
            className="bg-white shadow-md rounded-lg p-6 flex-shrink-0 w-48 flex flex-col items-center cursor-pointer hover:shadow-2xl hover:scale-95 transition-transform border-[0.5px] border-gray-200"
            onClick={() => setFiltro("")}
          >
            <div className="bg-slate-700 rounded-full p-4 mb-4">
              <Image src="/todas as lojas.png" width={100} height={70} alt="logo" className="transition-transform duration-1000 animate-pulse scale-110" />
            </div>
            <h3 className="text-base font-medium text-gray-900">Todas as lojas</h3>
            <p className="text-gray-600 text-center mt-2">Comidas, Mecânicos, Games...</p>
          </div>

          {/* Card Comida */}
          <div
            className="bg-white shadow-md rounded-lg p-6 flex-shrink-0 w-48 flex flex-col items-center cursor-pointer hover:shadow-2xl hover:scale-95 transition-transform border-[0.5px] border-gray-200"
            onClick={() => setFiltro("Comidas")}
          >
            <div className="bg-slate-700 rounded-full p-4 mb-4">
              <Image src="/pizza.png" width={100} height={70} alt="logo" className="transition-transform duration-1000 animate-spin-left scale-110" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Comidas</h3>
            <p className="text-gray-600 text-center mt-2">Restaurantes, Lanchonetes e Pizzarias</p>
          </div>

          {/* Card Mecânico */}
          <div
            className="bg-white shadow-md rounded-lg p-6 flex-shrink-0 w-48 flex flex-col items-center cursor-pointer hover:shadow-2xl hover:scale-95 transition-transform border-[0.5px] border-gray-200"
            onClick={() => setFiltro("Mecânicos")}
          >
            <div className="bg-blue-600 rounded-full p-4 mb-4">
              <Image src="/mecanico2.png" width={79} height={70} alt="Logo" className="transition-transform duration-1000 animate-pulse" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Mecânicos</h3>
            <p className="text-gray-600 text-center mt-2">Oficinas, consertos e peças</p>
          </div>

          {/* Card Roupas */}
          <div
            className="bg-white shadow-md rounded-lg p-6 flex-shrink-0 w-48 flex flex-col items-center cursor-pointer hover:shadow-2xl hover:scale-95 transition-transform border-[0.5px] border-gray-200"
            onClick={() => setFiltro("Moda e Estilo")}
          >
            <div className="bg-slate-400 rounded-full p-4 mb-4">
              <Image src="/terno.png" width={100} height={70} alt="Logo" className="transition-transform duration-1000 animate-pulse" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Moda e Estilo</h3>
            <p className="text-gray-600 text-center mt-2">Roupas, acessórios e artigos para realçar seu visual</p>
          </div>

          {/* Card Loja de Carro */}
          <div
            className="bg-white shadow-md rounded-lg p-6 flex-shrink-0 w-48 flex flex-col items-center cursor-pointer hover:shadow-2xl hover:scale-95 transition-transform border-[0.5px] border-gray-200"
            onClick={() => setFiltro("Veiculos")}
          >
            <div className="bg-blue-700 rounded-full p-4 mb-4">
              <Image src="/carro1.png" width={100} height={70} alt="logo" className="transition-transform duration-1000 animate-pulse scale-125" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Veiculos</h3>
            <p className="text-gray-600 text-center mt-2">Venda e acessórios de Veiculos</p>
          </div>

          {/* Card Games */}
          <div
            className="bg-white shadow-md rounded-lg p-6 flex-shrink-0 w-48 flex flex-col items-center cursor-pointer hover:shadow-2xl hover:scale-95 transition-transform border-[0.5px] border-gray-200"
            onClick={() => setFiltro("Games")}
          >
            <div className="bg-purple-600 rounded-full p-4 mb-4">
              <Image src="/Default_A_highly_detailed_photorealistic_image_of_a_small_PS5_1_28235a25-27ca-4cfc-b1cd-c33d8df683fe_0.png" width={99} height={70} alt="Logo" className="transition-transform duration-1000 animate-pulse scale-125" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Games</h3>
            <p className="text-gray-600 text-center mt-2">Lojas e acessórios gamers</p>
          </div>

          {/* Card Loja de Celular */}
          <div
            className="bg-white shadow-md rounded-lg p-6 flex-shrink-0 w-[215px] flex flex-col items-center cursor-pointer hover:shadow-2xl hover:scale-95 transition-transform border-[0.5px] border-gray-200"
            onClick={() => setFiltro("Celulares e acessorios")}
          >
            <div className="bg-black rounded-full p-4 mb-4">
              <Image src="/iphone.png" width={100} height={80} alt="Logo" className="transition-transform duration-1000 animate-pulse scale-150" />
            </div>
            <h3 className="text-base font-medium text-gray-900">Celulares e acessorios</h3>
            <p className="text-gray-600 text-center mt-2">Vendas e consertos</p>
          </div>
        </div>
      </section>



     {/* SECTION PARA LISTAR OS COMERCIOS */}
<section className="w-full bg-[#f2f2f2] py-10 px-4">
 <h2 className="text-3xl font-bold text-gray-900 uppercase text-center mb-10">
  {filtro ? `${filtro}` : "Todas as lojas"}
</h2>


  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
    {comerciosFiltrados.length === 0 ? (
      <div className="col-span-full text-center text-gray-500 text-xl py-10">
        Nenhum comércio encontrado para esta categoria.
      </div>
    ) : (
      comerciosFiltrados.map((indexComercio) => (
        <a
    key={indexComercio.id}
    href={`comercios/${indexComercio.id}`}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white rounded-2xl shadow-lg p-5 flex flex-col md:flex-row items-center md:items-start gap-6 transition hover:shadow-2xl cursor-pointer"
  >
    {/* Imagem do lado esquerdo */}
    <div className="w-full md:w-1/3 flex justify-center">
      <img
        src={indexComercio.banner}
        alt="Banner do comércio"
        width={140}
        height={140}
        className="object-contain rounded-full transition-transform duration-1000 hover:scale-110 mt-0.5"
      />
      <button
        aria-label="Role para o lado"
        className="mt-8 animate-slow-ping transition-transform duration-[10000] inline-flex items-center justify-center text-green-800 w-12 h-12 mx-auto"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    {/* Informações do lado direito */}
    <div className="w-full md:w-2/3 space-y-2 text-center md:text-left">
      <h1 className="text-2xl font-semibold text-gray-800 uppercase">{indexComercio.nome}</h1>
      <p className="text-base text-gray-600">Categoria: {indexComercio.tipo}</p>
      <div className="flex items-center gap-1">
        <Clock className="w-5 h-5 text-green-800" />
        <span>{indexComercio.tempoRetirada} - {indexComercio.tempoEntrega}</span>
      </div>
      <div className="flex text-center items-center gap-1">
        <DollarSign className="w-4 h-4 text-green-800" />
        <span>{indexComercio.taxaEntrega}</span>
      </div>
      <div className="mt-2">
        <span className="inline-block bg-green-100 text-green-800 text-base px-3 py-1 rounded-full font-medium uppercase">
          Aberto
        </span>
      </div>
    </div>
  </a>
      ))
    )}
  </div>
</section>

    </>
  );
}
